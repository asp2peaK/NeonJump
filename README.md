# NeonJump - Neon-Styled Platformer Game

> ⚠️ **Educational Project Notice**
> 
> This is a learning project created for educational purposes. The code may contain non-optimal solutions,
> experimental approaches, and areas for improvement. Feel free to suggest better implementations or
> point out potential optimizations. Learning through coding is a journey, and this project represents
> one step in that journey.

A dynamic platformer game built with Phaser 3, featuring neon-styled graphics and challenging gameplay mechanics. Created by [asp2peaK](https://github.com/asp2peaK) as a personal project to explore game development and modern JavaScript practices.

## About

NeonJump combines classic platformer mechanics with modern neon aesthetics. Players must navigate through procedurally generated levels while collecting glowing orbs. The game features different types of platforms (normal, moving, disappearing, and bounce) and a unique double-jump mechanic.

## ⚠️ Alpha Version Notice

This is an alpha version of the game. Known issues include:
- Double jump can sometimes trigger when collecting orbs before landing
- Collectibles may occasionally spawn inside platforms
- Platforms can sometimes overlap in procedurally generated levels

## Features

- 🎮 Engaging platformer mechanics with double-jump system
- 🌈 Stunning neon-styled graphics and effects
- 🎲 Procedurally generated levels for endless gameplay
- 🏃‍♂️ Various platform types (normal, moving, disappearing, bounce)
- 💎 Collectible orbs and scoring system
- 📈 Progressive difficulty system

## Technical Stack

- Phaser 3 Game Framework
- JavaScript (ES6+)
- Webpack for bundling
- Custom asset pipeline
- Local storage for game state

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/asp2peaK/NeonJump.git
cd NeonJump
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Game Controls

- ⬅️ Arrow Left: Move left
- ➡️ Arrow Right: Move right
- ⬆️ Up Arrow: Jump (press twice for double jump)
- 💎 Collect glowing orbs to score points
- 🏁 Complete levels by collecting all orbs

## Screenshots

### Main Menu
![Main Menu](https://github.com/user-attachments/assets/85c6253b-c3ac-4ae5-a1ba-3f600730bc9b)
*Start your adventure from here*

### Gameplay
![Gameplay](https://github.com/user-attachments/assets/bdb1eecf-157a-4cdc-b01c-d1286e9e292b)
*Jump between platforms and collect glowing orbs*

### Platform Types
![Platform Types](https://github.com/user-attachments/assets/cec7c179-b988-4eee-a9fd-8d1de87f025a)
*Various platform types: normal, moving, disappearing, and bounce platforms*

### Level Generation
![Level Generation](https://github.com/user-attachments/assets/cb9be5fd-635c-4abb-8558-3a56b4edcfc0)
*Procedurally generated levels with dynamic platform placement*

## 🚀 Future Plans

- Personal Leaderboard System
- More Complex Level Designs
  - Unique level themes
  - Special challenge levels
  - Hidden secrets and shortcuts
- Boss Battles
  - Unique boss mechanics
  - Special rewards
- Enhanced Visual Effects
  - Particle systems
  - Screen shake effects
  - Dynamic lighting
- Sound System
  - Background music
  - Sound effects
  - Achievement sounds
- Achievement System
  - Speed-run achievements
  - Collection achievements
  - Special move achievements

## Contributing

While this is primarily a personal project, feel free to fork it and adapt it to your needs. If you find any bugs or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is protected by copyright. You may use it for personal purposes, study the code, and make modifications for personal use. However, commercial use, redistribution without attribution, and claiming the work as your own are prohibited. See the [LICENSE](LICENSE) file for full terms.

## Acknowledgments

- Created by [asp2peaK](https://github.com/asp2peaK)
- Built with Phaser 3
