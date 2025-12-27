-- Salt Dating App - Supabase Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  photos TEXT[] DEFAULT '{}',
  bio TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Location
  latitude REAL,
  longitude REAL,
  city TEXT DEFAULT 'Salt Lake City',

  -- Local Verification
  is_transplant BOOLEAN,
  local_verification_answers JSONB DEFAULT '[]',

  -- Activity Preferences
  activity_preferences JSONB DEFAULT '{}',
  sober_preference TEXT CHECK (sober_preference IN ('drinks', 'doesnt-drink', 'no-preference')),

  -- Algorithm Priorities
  proximity_weight INTEGER DEFAULT 50,
  activity_level_weight INTEGER DEFAULT 50,
  shared_interests_weight INTEGER DEFAULT 50,
  local_resident_boost INTEGER DEFAULT 50
);

-- Date Spots Table
CREATE TABLE date_spots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('coffee', 'restaurant', 'outdoor', 'activity', 'bar', 'other')),
  address TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches Table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id_1 UUID REFERENCES users(id) ON DELETE CASCADE,
  user_id_2 UUID REFERENCES users(id) ON DELETE CASCADE,
  matched_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ,
  user_1_liked BOOLEAN DEFAULT false,
  user_2_liked BOOLEAN DEFAULT false,
  UNIQUE(user_id_1, user_id_2)
);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('text', 'date-spot-suggestion', 'date-spot-confirmation')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Daily Batches Table
CREATE TABLE daily_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  profile_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT CHECK (reason IN ('inappropriate-photos', 'harassment', 'spam', 'no-show', 'fake-profile', 'other')),
  details TEXT,
  status TEXT CHECK (status IN ('pending', 'reviewed', 'resolved')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocks Table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_user_id)
);

-- Swipes Table (for tracking likes/passes)
CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  swiped_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  is_like BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, swiped_user_id)
);

-- Indexes for performance
CREATE INDEX idx_users_location ON users(latitude, longitude);
CREATE INDEX idx_users_approved ON users(is_approved);
CREATE INDEX idx_matches_users ON matches(user_id_1, user_id_2);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_daily_batches_user_date ON daily_batches(user_id, date);
CREATE INDEX idx_swipes_user ON swipes(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can read approved profiles
CREATE POLICY "Users can read approved profiles" ON users
  FOR SELECT USING (is_approved = true);

-- Matches policies
CREATE POLICY "Users can read their matches" ON matches
  FOR SELECT USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Messages policies
CREATE POLICY "Users can read messages in their matches" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.match_id
      AND (matches.user_id_1 = auth.uid() OR matches.user_id_2 = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their matches" ON messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = match_id
      AND (matches.user_id_1 = auth.uid() OR matches.user_id_2 = auth.uid())
    )
  );

-- Insert default date spots
INSERT INTO date_spots (name, category, address, description, latitude, longitude) VALUES
  ('Liberty Park', 'outdoor', '600 E 900 S, Salt Lake City, UT 84105', 'Classic SLC park perfect for casual walks and picnics', 40.7406, -111.8720),
  ('The Leonardo', 'activity', '209 E 500 S, Salt Lake City, UT 84111', 'Interactive science and art museum downtown', 40.7614, -111.8866),
  ('Park Cafe', 'restaurant', '604 E 1300 S, Salt Lake City, UT 84105', 'Cozy brunch spot with local favorites', 40.7349, -111.8719),
  ('Ruth''s Diner', 'restaurant', '4160 Emigration Canyon Rd, Salt Lake City, UT 84108', 'Historic diner in Emigration Canyon', 40.7619, -111.8001),
  ('Fisher Brewing', 'bar', '320 W 800 S, Salt Lake City, UT 84101', 'Local brewery with great atmosphere', 40.7549, -111.9011),
  ('Caffe Molise', 'restaurant', '404 S West Temple, Salt Lake City, UT 84101', 'Intimate Italian restaurant downtown', 40.7627, -111.8987),
  ('Red Butte Garden', 'outdoor', '300 Wakara Way, Salt Lake City, UT 84108', 'Beautiful botanical garden with mountain views', 40.7711, -111.8155),
  ('Tracy Aviary', 'activity', '589 E 1300 S, Salt Lake City, UT 84105', 'Bird sanctuary in Liberty Park', 40.7403, -111.8729),
  ('Eva''s Bakery', 'coffee', '155 S Main St, Salt Lake City, UT 84111', 'European-style bakery and cafe', 40.7678, -111.8903),
  ('The Rose Establishment', 'coffee', '235 S 400 W, Salt Lake City, UT 84101', 'Hip coffee shop with great vibe', 40.7659, -111.9019),
  ('Wasatch Brew Pub', 'bar', '2110 S Highland Dr, Salt Lake City, UT 84106', 'Original Utah brewpub', 40.7195, -111.8529),
  ('Natural History Museum', 'activity', '301 Wakara Way, Salt Lake City, UT 84108', 'World-class natural history museum', 40.7665, -111.8123),
  ('Big Cottonwood Canyon', 'outdoor', 'Big Cottonwood Canyon Rd, Salt Lake City, UT', 'Scenic canyon for hiking and outdoor activities', 40.6236, -111.7863),
  ('Memory Grove Park', 'outdoor', '375 N Canyon Rd, Salt Lake City, UT 84103', 'Peaceful park at the mouth of City Creek Canyon', 40.7781, -111.8862),
  ('The Copper Onion', 'restaurant', '111 E Broadway, Salt Lake City, UT 84111', 'Farm-to-table American cuisine', 40.7679, -111.8887),
  ('Purgatory Bar', 'bar', '21 E 100 S, Salt Lake City, UT 84111', 'Craft cocktail bar downtown', 40.7688, -111.8878),
  ('Coffee Garden', 'coffee', '898 S 900 E, Salt Lake City, UT 84102', 'Outdoor coffee spot near the university', 40.7464, -111.8710),
  ('This is the Place Heritage Park', 'activity', '2601 E Sunnyside Ave, Salt Lake City, UT 84108', 'Historical park with pioneer village', 40.7569, -111.8097),
  ('Ensign Peak Trail', 'outdoor', 'Ensign Vista Dr, Salt Lake City, UT 84103', 'Short hike with amazing city views', 40.7929, -111.8995),
  ('Sugarhouse Park', 'outdoor', '1300 E 2100 S, Salt Lake City, UT 84106', 'Popular park for walking, running, and relaxing', 40.7234, -111.8630);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
