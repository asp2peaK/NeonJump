export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add title
        this.add.text(width/2, height/3, 'NEON JUMP', {
            font: '64px monospace',
            fill: '#0ff',
            stroke: '#fff',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Add start button
        const startButton = this.add.text(width/2, height/2, 'Start Game', {
            font: '32px monospace',
            fill: '#fff'
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => startButton.setTint(0x00ffff))
        .on('pointerout', () => startButton.clearTint())
        .on('pointerdown', () => this.scene.start('GameScene'));

        // Add neon glow effect
        this.tweens.add({
            targets: startButton,
            alpha: 0.7,
            yoyo: true,
            repeat: -1,
            duration: 1000
        });
    }
}
