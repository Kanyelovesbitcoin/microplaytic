export interface User {
  id: string;
  phone: string;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;

  // Location
  location: {
    latitude: number;
    longitude: number;
    city: string;
  };

  // Local Verification
  localVerification: {
    isTransplant: boolean;
    answers: LocalVerificationAnswer[];
  };

  // Profile Details
  activityPreferences: ActivityPreferences;
  soberPreference: SoberPreference;

  // Algorithm
  algorithmPriorities: AlgorithmPriorities;
}

export interface LocalVerificationAnswer {
  questionId: string;
  question: string;
  answer: string;
}

export interface ActivityPreferences {
  skiing: {
    interest: boolean;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  };
  hiking: {
    interest: boolean;
    frequency?: 'rarely' | 'monthly' | 'weekly' | 'daily';
  };
  climbing: {
    interest: boolean;
    level?: 'beginner' | 'intermediate' | 'advanced';
  };
  biking: {
    interest: boolean;
    type?: 'road' | 'mountain' | 'both';
  };
}

export type SoberPreference = 'drinks' | 'doesnt-drink' | 'no-preference';

export interface AlgorithmPriorities {
  proximityWeight: number;        // 0-100
  activityLevelWeight: number;    // 0-100
  sharedInterestsWeight: number;  // 0-100
  localResidentBoost: number;     // 0-100
}

export interface LocalVerificationQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'single-choice' | 'multiple-choice' | 'text';
}

export interface DateSpot {
  id: string;
  name: string;
  category: 'coffee' | 'restaurant' | 'outdoor' | 'activity' | 'bar' | 'other';
  address: string;
  description: string;
  imageUrl?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Match {
  id: string;
  userId1: string;
  userId2: string;
  matchedAt: string;
  lastMessageAt?: string;
  user1Liked: boolean;
  user2Liked: boolean;
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'date-spot-suggestion' | 'date-spot-confirmation';
  metadata?: DateSpotSuggestionMetadata;
  createdAt: string;
  readAt?: string;
}

export interface DateSpotSuggestionMetadata {
  dateSpotId: string;
  dateSpot: DateSpot;
  suggestedTime?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface DailyBatch {
  id: string;
  userId: string;
  date: string;
  profiles: string[]; // Array of user IDs
  createdAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: ReportReason;
  details?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export type ReportReason =
  | 'inappropriate-photos'
  | 'harassment'
  | 'spam'
  | 'no-show'
  | 'fake-profile'
  | 'other';

export interface Block {
  id: string;
  blockerId: string;
  blockedUserId: string;
  createdAt: string;
}

export interface BioQuestion {
  id: string;
  question: string;
  category: 'background' | 'interests' | 'lifestyle' | 'goals';
}
