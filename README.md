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
- **Backend**: Convex (Real-time database with TypeScript)
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Language**: TypeScript
- **Design**: Custom "Wasatch Winter" theme (Deep navy #002244, crisp white backgrounds)

## Why Convex?

Convex is perfect for iOS dating apps because:
- **Real-time sync** - Messages and matches update instantly
- **Offline support** - Works without internet, syncs when online
- **Type-safe** - Full TypeScript support from database to UI
- **Fast** - Optimized queries with automatic caching
- **Simple** - No complex backend setup needed

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Convex account (free at [convex.dev](https://convex.dev))
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

3. **Set up Convex**
   ```bash
   # Install Convex CLI
   npm install -g convex

   # Initialize Convex project (creates convex/ directory if not exists)
   npx convex dev
   ```

   This will:
   - Create a new Convex project (or link to existing)
   - Deploy your schema and functions
   - Give you a deployment URL

4. **Seed the database with date spots**
   ```bash
   # In Convex dashboard or via CLI
   npx convex run dateSpots:seedDateSpots
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Convex deployment URL:
   ```
   EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
   ```

6. **Start the development server**
   ```bash
   npm start
   ```

7. **Run on iOS**
   - Press `i` in the terminal, or
   - Scan the QR code with the Expo Go app on your iPhone

## Convex Database Schema

The app uses the following collections in Convex:

- **users** - User profiles with location, verification, preferences
- **matches** - Mutual likes between users
- **messages** - Chat messages with date spot suggestions
- **dateSpots** - Curated SLC venues (20 pre-populated spots)
- **dailyBatches** - User's daily profile batch
- **reports** - User reports for moderation
- **blocks** - Blocked user relationships
- **swipes** - Like/pass history

See `convex/schema.ts` for the complete schema definition.

## Convex Functions

### Queries (Read Data)
- `users:getUserByPhone` - Find user by phone number
- `users:getUser` - Get user by ID
- `users:getApprovedUsers` - Get all approved users for matching
- `matches:getMatches` - Get user's matches
- `matches:getMessages` - Get messages for a match
- `dateSpots:getAllDateSpots` - Get all date spots
- `dateSpots:getDateSpotsByCategory` - Filter by category
- `dailyBatches:getDailyBatch` - Get today's batch for user

### Mutations (Write Data)
- `users:createUser` - Create new user profile
- `users:updateUser` - Update user profile
- `users:updateAlgorithmPriorities` - Update matching preferences
- `users:approveUser` - Approve user (admin)
- `matches:swipe` - Record like/pass and create match if mutual
- `matches:sendMessage` - Send chat message
- `moderation:reportUser` - Report a user
- `moderation:blockUser` - Block a user
- `dailyBatches:generateDailyBatch` - Generate today's matches

## Project Structure

```
Salt/
├── convex/              # Convex backend
│   ├── schema.ts        # Database schema
│   ├── users.ts         # User queries & mutations
│   ├── matches.ts       # Matching & messaging
│   ├── dateSpots.ts     # Date spots & seeding
│   ├── moderation.ts    # Reports & blocks
│   └── dailyBatches.ts  # Daily batch algorithm
├── src/
│   ├── components/      # Reusable UI components
│   ├── screens/
│   │   ├── onboarding/  # 9 onboarding screens
│   │   └── main/        # 4 main app screens
│   ├── navigation/      # Navigation setup
│   ├── services/        # Convex client
│   ├── theme/           # Design tokens
│   ├── types/           # TypeScript interfaces
│   └── constants/       # Quiz questions
├── app.json             # Expo configuration
└── App.tsx              # Root component with Convex provider
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

## Using Convex in the App

### Reading Data (Queries)
```typescript
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function MyComponent() {
  const dateSpots = useQuery(api.dateSpots.getAllDateSpots);
  // dateSpots automatically updates in real-time!
}
```

### Writing Data (Mutations)
```typescript
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function MyComponent() {
  const swipe = useMutation(api.matches.swipe);

  const handleLike = async (userId, swipedUserId) => {
    await swipe({ userId, swipedUserId, isLike: true });
  };
}
```

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
EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

Get this URL from your Convex dashboard after running `npx convex dev`.

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npx convex dev` - Start Convex backend in dev mode
- `npx convex deploy` - Deploy Convex backend to production

### Design Tokens

The app uses the "Wasatch Winter" design system:

- **Primary Color**: #002244 (Deep navy blue)
- **Background**: #FFFFFF (Crisp white)
- **Font**: Inter (clean sans-serif)
- **Card Style**: Polaroid frames with subtle shadows
- **Effects**: Frosted glass blur on overlays

See `src/theme/` for complete design token definitions.

## Convex Development Tips

### Watching the Database
```bash
# Open Convex dashboard to see data in real-time
npx convex dashboard
```

### Running Functions Manually
```bash
# Seed date spots
npx convex run dateSpots:seedDateSpots

# Generate daily batch for a user
npx convex run dailyBatches:generateDailyBatch '{"userId": "..."}'
```

### Viewing Logs
All console.log statements in Convex functions appear in the dashboard logs.

## Roadmap

### Phase 1 (MVP)
- [x] Core onboarding flow
- [x] Profile cards with swipe functionality
- [x] Convex backend with real-time sync
- [x] Date spots database
- [ ] Chat with date spot suggestions
- [ ] Push notifications
- [ ] Admin review queue UI

### Phase 2 (Growth)
- [ ] Improved matching algorithm based on preferences
- [ ] AI-powered bio generation (GPT integration)
- [ ] Video profile snippets
- [ ] Group date events
- [ ] Date spot reviews and ratings

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
- Convex enforces data validation at the backend
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
