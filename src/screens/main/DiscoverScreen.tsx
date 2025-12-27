import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProfileCard } from '../../components/ProfileCard';
import { theme } from '../../theme';
import { User } from '../../types';

export const DiscoverScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<User[]>([]);

  // Mock data for development
  const mockProfiles: User[] = [];

  const handleLike = () => {
    // TODO: Implement like logic
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePass = () => {
    // TODO: Implement pass logic
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (profiles.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No more profiles today</Text>
          <Text style={styles.emptyStateText}>
            Check back tomorrow for fresh matches tailored just for you!
          </Text>
        </View>
      </View>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Matches</Text>
        <Text style={styles.headerSubtitle}>
          {profiles.length - currentIndex} remaining
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <ProfileCard user={currentProfile} />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.passButton} onPress={handlePass}>
          <Text style={styles.passButtonText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
          <Text style={styles.likeButtonText}>♥</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
  },
  passButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.button,
  },
  passButtonText: {
    fontSize: 32,
    color: theme.colors.error,
  },
  likeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.button,
  },
  likeButtonText: {
    fontSize: 32,
    color: theme.colors.textLight,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
});
