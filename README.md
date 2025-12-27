# Salt - A Local Dating App for Salt Lake City

Salt is a community-verified dating app exclusively for Salt Lake City residents. Built with React Native and Expo for iOS, featuring a "Wasatch Winter" design aesthetic.

## Features

### Core Features
- **Local Verification Onboarding** - Utah-specific questionnaire proving community membership
- **Transparent Algorithm Controls** - Users adjust their own matching weights with sliders
- **Date Spot Integration** - 20+ curated SLC venues with suggestion system
- **Sober Toggle** - Respectful drinking preference filter
- **Report and Block** - Safety features with preset reasons
- **Admin Profile Review** - Manual approval queue for quality control

### User Experience
- **Activity-First Profiles** - Outdoor/activity preferences before bio
- **AI-Assisted Bio Builder** - Conversational questions generate authentic bios
- **Curated Daily Batches** - 5-10 high-quality matches per day (no infinite swiping)
- **Polaroid Photo Cards** - Premium card design with frosted glass effects

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Language**: TypeScript
- **Design**: Custom "Wasatch Winter" theme (Deep navy #002244, crisp white backgrounds)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Supabase account
- iOS development setup (for testing on device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/salt.git
   cd salt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
   - Copy your project URL and anon key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on iOS**
   - Press `i` in the terminal, or
   - Scan the QR code with the Expo Go app on your iPhone

## Database Schema

The app uses the following main tables in Supabase:

- **users** - User profiles with location, verification, preferences
- **matches** - Mutual likes between users
- **messages** - Chat messages with date spot suggestions
- **date_spots** - Curated SLC venues (pre-populated with 20 spots)
- **daily_batches** - User's daily profile batch
- **reports** - User reports for moderation
- **blocks** - Blocked user relationships
- **swipes** - Like/pass history

See `supabase-schema.sql` for the complete schema with Row Level Security policies.

## Project Structure

```
Salt/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ProgressBar.tsx
│   │   └── ProfileCard.tsx (Polaroid design)
│   ├── screens/
│   │   ├── onboarding/   # 9 onboarding screens
│   │   └── main/         # 4 main app screens
│   ├── navigation/       # Navigation setup
│   ├── services/         # Supabase client
│   ├── theme/            # Design tokens (colors, typography, spacing)
│   ├── types/            # TypeScript interfaces
│   └── constants/        # Quiz questions, date spots
├── supabase-schema.sql   # Database schema
├── app.json              # Expo configuration
└── App.tsx               # Root component
```

## Onboarding Flow

1. Welcome Screen
2. Phone Verification
3. Utah Quiz (5 questions)
4. Basic Info (name, age)
5. Photo Upload (3-6 photos)
6. AI Bio Builder (7 conversational questions)
7. Activity Preferences (skiing, hiking, climbing, biking)
8. Sober Toggle
9. Algorithm Priorities (4 sliders)

## iOS Deployment

### Using EAS Build

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS**
   ```bash
   eas login
   eas build:configure
   ```

3. **Create iOS build**
   ```bash
   eas build --platform ios
   ```

4. **Submit to App Store**
   ```bash
   eas submit --platform ios
   ```

### App Store Guidelines Compliance

Salt complies with Apple App Store Guideline 4.3 by:
- Serving a specific geographic community (Salt Lake City)
- Local verification questions proving community membership
- Curated local date spots unique to SLC
- Community-specific features (canyon preferences, fry sauce, neighborhoods)

## Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

### Design Tokens

The app uses the "Wasatch Winter" design system:

- **Primary Color**: #002244 (Deep navy blue)
- **Background**: #FFFFFF (Crisp white)
- **Font**: Inter (clean sans-serif)
- **Card Style**: Polaroid frames with subtle shadows
- **Effects**: Frosted glass blur on overlays

See `src/theme/` for complete design token definitions.

## Roadmap

### Phase 1 (MVP)
- [x] Core onboarding flow
- [x] Profile cards with swipe functionality
- [x] Basic matching system
- [ ] Chat with date spot suggestions
- [ ] Push notifications
- [ ] Admin review queue

### Phase 2 (Growth)
- [ ] AI-powered bio generation (GPT integration)
- [ ] Video profile snippets
- [ ] Group date events
- [ ] Date spot reviews and ratings
- [ ] Location-based matching algorithm

### Phase 3 (Scale)
- [ ] Automated profile moderation with AI
- [ ] In-app date planning calendar
- [ ] Premium subscription tier
- [ ] Analytics dashboard
- [ ] Expand to other cities (Boise, Denver, etc.)

## Safety & Moderation

- Manual profile review for first 100-200 users
- One-tap report system with preset reasons
- Immediate block functionality
- Row Level Security in Supabase
- No infinite swiping (prevents abuse)

## Target Market

- **Primary**: 5,000-10,000 users in Salt Lake City metro area
- **Age Range**: 21-40
- **Intentionally niche** for exclusivity and authentic local connections

## Contributing

This is a private project. If you have suggestions or find bugs, please open an issue.

## License

Proprietary - All rights reserved

## Support

For questions or support, contact: support@saltslc.app

---

Built with ❤️ in Salt Lake City
