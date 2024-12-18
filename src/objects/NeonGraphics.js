export class NeonGraphics {
    static createPlayer(scene, x, y) {
        const player = scene.add.graphics();
        player.lineStyle(2, 0x00ffff, 1);
        player.strokeRect(-16, -16, 32, 32);
        
        player.lineStyle(2, 0x00ffff, 1);
        player.moveTo(-8, -8);
        player.lineTo(8, -8);
        player.moveTo(0, -8);
        player.lineTo(0, 8);
        
        scene.physics.world.enable(player);
        player.body.setSize(32, 32); 
        player.body.setBounce(0);
        player.body.setCollideWorldBounds(true);
        player.body.setDragX(500);
        player.body.setOffset(-16, -16); 
        player.body.setFriction(1);
        
        player.setPosition(x, y);
        return player;
    }
    
    static createPlatform(scene, x, y, width = 200, type = 'normal') {
        const platform = scene.add.graphics();
        
        switch(type) {
            case 'moving':
                platform.lineStyle(2, 0xff00ff, 1);
                platform.strokeRect(-width/2, -10, width, 20);
                break;
            case 'disappearing':
                platform.lineStyle(2, 0xffff00, 1);
                platform.strokeRect(-width/2, -10, width, 20);
                platform.lineStyle(1, 0xffff00, 0.5);
                for (let i = 0; i < width; i += 20) {
                    platform.moveTo(-width/2 + i, -10);
                    platform.lineTo(-width/2 + i + 10, 10);
                }
                break;
            case 'bounce':
                platform.lineStyle(2, 0x00ff00, 1);
                platform.strokeRect(-width/2, -10, width, 20);
                for (let i = 0; i < width; i += 40) {
                    platform.moveTo(-width/2 + i + 20, -5);
                    platform.lineTo(-width/2 + i + 10, 5);
                    platform.lineTo(-width/2 + i + 30, 5);
                }
                break;
            default:
                platform.lineStyle(2, 0xff00ff, 1);
                platform.strokeRect(-width/2, -10, width, 20);
        }
        
        scene.physics.world.enable(platform);
        platform.body.setImmovable(true);
        platform.body.allowGravity = false;
        platform.body.setSize(width, 20);
        platform.body.setOffset(-width/2, -10);
        platform.body.pushable = false;
        
        platform.platformType = type;
        if (type === 'moving') {
            platform.startX = x;
            platform.endX = x + 200;
            platform.movingRight = true;
            
            scene.tweens.add({
                targets: platform,
                x: x + 200,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    platform.movingRight = platform.x < platform.endX;
                }
            });
        }
        
        platform.setPosition(x, y - 16);
        return platform;
    }
    
    static createCollectible(scene, x, y) {
        const collectible = scene.add.graphics();
        collectible.lineStyle(2, 0xffff00, 1);
        collectible.strokeCircle(0, 0, 10);
        
        collectible.lineStyle(2, 0xffff00, 1);
        collectible.moveTo(-5, -5);
        collectible.lineTo(5, 5);
        collectible.moveTo(-5, 5);
        collectible.lineTo(5, -5);
        
        scene.physics.world.enable(collectible);
        collectible.body.setCircle(8); 
        collectible.body.allowGravity = false;
        collectible.body.setOffset(-8, -8); 
        
        scene.tweens.add({
            targets: collectible,
            y: y + 10,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        collectible.setPosition(x, y);
        return collectible;
    }
}
