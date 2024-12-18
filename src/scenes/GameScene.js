import { NeonGraphics } from '../objects/NeonGraphics';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.level = 1;
    }

    create() {
        this.gameOver = false;
        this.score = 0;
        this.level = 1;
        
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#00ffff',
            fontFamily: 'Courier New'
        });
        
        this.levelText = this.add.text(16, 56, 'Level: 1', {
            fontSize: '32px',
            fill: '#00ffff',
            fontFamily: 'Courier New'
        });
        
        this.platforms = this.add.group();
        this.collectibles = this.add.group();
        
        this.player = NeonGraphics.createPlayer(this, 400, 300);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpsLeft = 2;
        this.player.wasOnGround = false;
        
        this.createLevel();
        
        this.physics.add.collider(this.player, this.platforms, this.handlePlatformCollision, null, this);
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
    }

    createLevel() {
        this.platforms.clear(true, true);
        this.collectibles.clear(true, true);
        
        const ground = NeonGraphics.createPlatform(this, 400, 600, 800);
        this.platforms.add(ground);
        
        const numPlatforms = Math.min(4 + Math.floor(this.level / 2), 8);
        
        const occupiedAreas = [];
        const platformPositions = [];
        
        if (this.level <= 4) {
            const levelConfigs = [
                [{x: 400, y: 450, width: 200, type: 'normal'}],
                [{x: 200, y: 350, width: 200, type: 'normal'}, {x: 600, y: 350, width: 200, type: 'moving'}],
                [{x: 400, y: 250, width: 200, type: 'disappearing'}, {x: 200, y: 400, width: 200, type: 'bounce'}],
                [{x: 400, y: 400, width: 200, type: 'moving'}, {x: 400, y: 250, width: 200, type: 'disappearing'}]  
            ];
            
            const platforms = levelConfigs[this.level - 1];
            platforms.forEach(config => {
                const platform = NeonGraphics.createPlatform(this, config.x, config.y, config.width, config.type);
                this.platforms.add(platform);
                platformPositions.push({x: config.x, y: config.y, width: config.width});
                occupiedAreas.push({
                    x: config.x - config.width/2,
                    y: config.y - 40,
                    width: config.width,
                    height: 80
                });
            });
        } else {
            const sections = 3;
            const sectionHeight = 350 / sections; 
            
            for (let i = 0; i < numPlatforms; i++) {
                let attempts = 0;
                let platformPlaced = false;
                
                const section = Math.floor(i / (numPlatforms / sections));
                const minY = 200 + section * sectionHeight;
                const maxY = minY + sectionHeight;
                
                while (!platformPlaced && attempts < 50) {
                    const width = Phaser.Math.Between(150, 250);
                    const x = Phaser.Math.Between(width/2 + 50, 800 - width/2 - 50);
                    const y = Phaser.Math.Between(minY, maxY);
                    
                    let hasOverlap = false;
                    const newArea = {
                        x: x - width/2 - 30,
                        y: y - 40,
                        width: width + 60,
                        height: 80
                    };
                    
                    for (const area of occupiedAreas) {
                        if (this.checkOverlap(newArea, area)) {
                            hasOverlap = true;
                            break;
                        }
                    }
                    
                    if (!hasOverlap) {
                        const types = ['normal', 'moving', 'disappearing', 'bounce'];
                        const weights = [40, 30, 20, 10];
                        const type = this.weightedRandom(types, weights);
                        
                        const platform = NeonGraphics.createPlatform(this, x, y, width, type);
                        this.platforms.add(platform);
                        platformPositions.push({x, y, width});
                        occupiedAreas.push(newArea);
                        platformPlaced = true;
                    }
                    
                    attempts++;
                }
            }
        }
        
        this.spawnCollectiblesWithCheck(platformPositions);
    }
    
    spawnCollectiblesWithCheck(platformPositions) {
        if (!platformPositions || platformPositions.length === 0) return;
        
        this.collectibles.clear(true, true);
        const numCollectibles = 5;
        const collectiblePositions = [];
        
        if (this.level <= 4) {
            const baseConfigs = [
                [{x: 400, y: 300}, {x: 200, y: 200}, {x: 600, y: 200}, {x: 300, y: 150}, {x: 500, y: 150}],
                [{x: 200, y: 200}, {x: 600, y: 200}, {x: 400, y: 150}, {x: 300, y: 100}, {x: 500, y: 100}],
                [{x: 400, y: 100}, {x: 200, y: 250}, {x: 600, y: 250}, {x: 300, y: 150}, {x: 500, y: 150}],
                [{x: 400, y: 200}, {x: 200, y: 150}, {x: 600, y: 150}, {x: 300, y: 100}, {x: 500, y: 100}]
            ];
            
            const positions = baseConfigs[this.level - 1];
            positions.forEach(pos => {
                let finalY = pos.y;
                let intersectsWithPlatform = true;
                let attempts = 0;
                
                while (intersectsWithPlatform && attempts < 5) {
                    intersectsWithPlatform = false;
                    for (const platform of platformPositions) {
                        const platformTop = platform.y - 20;
                        const platformBottom = platform.y + 20;
                        const platformLeft = platform.x - platform.width/2 - 20;
                        const platformRight = platform.x + platform.width/2 + 20;
                        
                        if (pos.x >= platformLeft && pos.x <= platformRight &&
                            finalY >= platformTop && finalY <= platformBottom) {
                            intersectsWithPlatform = true;
                            finalY -= 30;
                            break;
                        }
                    }
                    attempts++;
                }
                
                const collectible = NeonGraphics.createCollectible(this, pos.x, finalY);
                this.collectibles.add(collectible);
            });
            return;
        }
        
        for (let i = 0; i < numCollectibles; i++) {
            let attempts = 0;
            let placed = false;
            
            while (!placed && attempts < 50) {
                const platform = Phaser.Math.RND.pick(platformPositions);
                if (!platform) continue;
                
                const offsetX = Phaser.Math.Between(-100, 100);
                const offsetY = Phaser.Math.Between(-120, -40);
                
                const x = platform.x + offsetX;
                const y = platform.y + offsetY;
                
                if (x < 50 || x > 750 || y < 100 || y > 500) {
                    attempts++;
                    continue;
                }
                
                let intersectsWithPlatform = false;
                for (const plat of platformPositions) {
                    const platformTop = plat.y - 20;
                    const platformBottom = plat.y + 20;
                    const platformLeft = plat.x - plat.width/2 - 20;
                    const platformRight = plat.x + plat.width/2 + 20;
                    
                    if (x >= platformLeft && x <= platformRight &&
                        y >= platformTop && y <= platformBottom) {
                        intersectsWithPlatform = true;
                        break;
                    }
                }
                
                if (intersectsWithPlatform) {
                    attempts++;
                    continue;
                }
                
                let tooClose = false;
                for (const pos of collectiblePositions) {
                    const dx = Math.abs(x - pos.x);
                    const dy = Math.abs(y - pos.y);
                    if (dx < 80 && dy < 80) {
                        tooClose = true;
                        break;
                    }
                }
                
                if (!tooClose) {
                    const collectible = NeonGraphics.createCollectible(this, x, y);
                    this.collectibles.add(collectible);
                    collectiblePositions.push({x, y});
                    placed = true;
                }
                
                attempts++;
            }
            
            if (!placed && platformPositions.length > 0) {
                const platform = Phaser.Math.RND.pick(platformPositions);
                const x = platform.x;
                const y = platform.y - 120;
                const collectible = NeonGraphics.createCollectible(this, x, y);
                this.collectibles.add(collectible);
                collectiblePositions.push({x, y});
            }
        }
    }

    collectItem(player, collectible) {
        const dx = Math.abs(player.x - collectible.x);
        const dy = Math.abs(player.y - collectible.y);
        if (dx < 16 && dy < 16) {
            collectible.destroy();
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            
            if (this.collectibles.getLength() === 0) {
                this.level++;
                this.levelText.setText('Level: ' + this.level);
                this.createLevel();
                this.player.setPosition(400, 450);
                this.jumpsLeft = 2;
            }
        }
    }

    checkOverlap(rect1, rect2) {
        return !(rect1.x + rect1.width < rect2.x || 
                rect1.x > rect2.x + rect2.width || 
                rect1.y + rect1.height < rect2.y || 
                rect1.y > rect2.y + rect2.height);
    }

    weightedRandom(items, weights) {
        const totalWeight = weights.reduce((a, b) => a + b);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < items.length; i++) {
            if (random < weights[i]) {
                return items[i];
            }
            random -= weights[i];
        }
        return items[0];
    }

    handlePlatformCollision(player, platform) {
        if (platform.platformType === 'moving' && player.body.touching.down) {
            const platformVelocity = platform.movingRight ? 100 : -100;
            player.body.setVelocityX(platformVelocity);
        }
        
        if (platform.platformType === 'bounce' && player.body.touching.down) {
            player.body.setVelocityY(-700);
            this.jumpsLeft = 2;
        } else if (platform.platformType === 'disappearing' && player.body.touching.down) {
            this.time.delayedCall(500, () => {
                platform.destroy();
            });
        }
    }

    update() {
        if (this.gameOver) {
            return;
        }

        const wasNotTouching = !this.player.wasOnGround;
        const isTouching = this.player.body.touching.down;
        
        if (wasNotTouching && isTouching) {
            this.jumpsLeft = 2;
        }
        this.player.wasOnGround = isTouching;

        const justPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
        if (justPressed && this.jumpsLeft > 0) {
            this.player.body.setVelocityY(-375);
            this.jumpsLeft--;
            this.createJumpEffect();
        }

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(300);
        } else {
            this.player.body.setVelocityX(this.player.body.velocity.x * 0.9);
        }

        if (this.player.y > 650) {
            this.gameOver = true;
            this.player.setPosition(400, 450);
            this.jumpsLeft = 2;
            this.score = 0;
            this.level = 1;
            this.scoreText.setText('Score: ' + this.score);
            this.levelText.setText('Level: ' + this.level);
            this.createLevel();
            this.gameOver = false;
        }
    }

    createJumpEffect() {
        const circle = this.add.circle(this.player.x, this.player.y, 20, 0x00ffff, 0.5);
        
        this.tweens.add({
            targets: circle,
            scale: 2,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                circle.destroy();
            }
        });

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const length = 20;
            
            const line = this.add.line(
                this.player.x,
                this.player.y,
                0,
                0,
                Math.cos(angle) * length,
                Math.sin(angle) * length,
                0x00ffff,
                1
            );
            
            this.tweens.add({
                targets: line,
                scaleX: 2,
                scaleY: 2,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    line.destroy();
                }
            });
        }
    }
}
