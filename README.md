# Panda - Special Education Platform

Interactive educational platform for children with special needs. Contains educational content, stories, and questions about Religious Holidays.

## 🎯 About the Project

This platform is a user-friendly educational application designed for children with special needs. It presents topics about Ramadan Bayramı (Eid al-Fitr) in story format and reinforces learning through interactive questions.

## ✨ Features

### 🗺️ Learning Map
- Unit-based level system
- Lock system that unlocks as levels are completed
- Modern and clean card designs
- Easy navigation with left sidebar

### 📚 Storytelling
- Special stories for each level
- Visually supported content (WebP and PNG formats)
- Dynamic image loading (order1.webp, order2.webp, etc.)

### 🔊 Text-to-Speech (TTS)
- Google Translate TTS integration
- Adjustable volume level
- Normal speech speed
- Play/Pause control

### 🎮 Interactive Questions
- Questions related to each story
- Multiple choice question types
- Instant feedback

### 🏆 Badges and Quests
- Unit completion badges
- Daily quest system
- Progress tracking
- Badge collection view

### 📊 Progress Tracking
- Persistent storage with LocalStorage
- User name registration
- Level completion status
- Daily activity tracking

## 🚀 Installation

### Requirements
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```

### Production Build

```bash
npm run build
```

Build files will be created in the `dist/` folder.

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── WelcomeScreen.tsx          # Welcome screen
│   ├── NameScreen.tsx             # Name input screen
│   ├── WelcomeMessageScreen.tsx   # Welcome message screen
│   ├── MapView.tsx                # Main learning map
│   ├── LevelPage.tsx              # Level detail page
│   ├── QuestsScreen.tsx           # Quests screen
│   └── BadgesScreen.tsx           # Badges screen
├── data/                # Data files
│   ├── levels.ts                  # Level definitions
│   └── levelContent.ts            # Level content and questions
├── utils/               # Utility functions
│   ├── tts.ts                     # Text-to-speech service
│   ├── progress.ts                # Progress tracking
│   ├── badges.ts                  # Badge management
│   └── dailyQuests.ts             # Daily quest management
└── types.ts             # TypeScript types
```

## 🎨 Screens and Features

### 1. Welcome Screen
- Panda characters (1.png - 5.png)
- White background
- "GET STARTED" button to begin

### 2. Name Input Screen
- Collects user name
- Modern design with panda image
- "GÖNDER" (SUBMIT) button to continue

### 3. Welcome Message
- "Memnun oldum [name]!" message
- Animated transition
- Automatic redirect to map view

### 4. Learning Map (Map View)
- Left sidebar navigation (ÖĞREN, GÖREVLER, ROZETLER)
- Unit cards (dark blue background)
- Learning path view
- Completed, active, and locked level states

### 5. Level Page
- Story image on the left
- Story text on the right
- TTS control button (black, play icon)
- Volume level adjustment
- Question screen

### 6. Quests Screen
- Daily quests (3 levels, 5 levels, 10 levels)
- Progress bars (completed: green, in progress: black)
- Left sidebar navigation

### 7. Badges Screen
- Unlocked and locked badges
- Unit completion badges
- Collection view

## 🎨 Design Features

- **Colors:**
  - Dark blue (#1e3a5f) - Unit cards
  - Black (#000000) - Buttons, active levels
  - Green (#22c55e) - Completed quests
  - White background - Main theme

- **Typography:**
  - Main headings: 56pt bold
  - Subheadings: 20pt regular
  - Button text: Uppercase, bold

- **Responsive:**
  - Mobile and tablet compatible
  - Flexible layout structure

## 📦 Dependencies

### Main Dependencies
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0

### Development Dependencies
- `typescript` ^5.2.2
- `vite` ^5.0.8
- `@vitejs/plugin-react` ^4.2.1

## 🔧 Configuration

### TTS Settings
TTS volume level is stored in LocalStorage with the key `sila_egitim_tts_volume`.

### Progress Storage
All user progress is stored in LocalStorage:
- `userName` - User name
- `sila_egitim_progress` - Level progress
- `sila_egitim_daily_quests` - Daily quest progress
- `sila_egitim_badges` - Badge status

## 📝 Level Structure

Each level contains the following information:
- `id` - Unique level identifier
- `title` - Level title
- `description` - Level description
- `order` - Ordering (starts from 1)
- `category` - Unit category
- `unlocked` - Unlocked/locked status
- `completed` - Completion status

## 🎯 Usage

1. **First Use:**
   - Click the "GET STARTED" button from the welcome screen
   - Enter your name and press the "GÖNDER" button
   - After the welcome message, you will be automatically redirected to the map view

2. **Playing Levels:**
   - Click on a level in the map view
   - Listen to the story (with TTS button)
   - Answer the questions
   - When a level is completed, the next level unlocks

3. **Quests:**
   - Click on the "GÖREVLER" tab from the left sidebar
   - View your daily goals
   - Completed quests are shown with a green bar

4. **Badges:**
   - Click on the "ROZETLER" tab from the left sidebar
   - View your earned badges
   - Unit completion badges unlock automatically

## 🛠️ Development

### Adding a New Level

1. Add a new level to `src/data/levels.ts`
2. Add level content and questions to `src/data/levelContent.ts`
3. Add image files to `public/assets/` folder (orderX.webp or orderX.png)

### Adding a New Badge

1. Update badge definitions in `src/utils/badges.ts`
2. Add badge images to `public/assets/` folder

## 📄 License

MIT

## 👤 Developer

Murathan

## 🤝 Contributing

We welcome your contributions! Before sending a pull request, please:
1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
