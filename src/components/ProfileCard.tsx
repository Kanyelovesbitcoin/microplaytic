import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { theme } from '../theme';
import { User } from '../types';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

interface ProfileCardProps {
  user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <View style={styles.polaroidFrame}>
        <View style={styles.imageContainer}>
          {user.photos[0] && (
            <Image source={{ uri: user.photos[0] }} style={styles.image} />
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.age}>{user.age}</Text>
          </View>

          {user.bio && (
            <Text style={styles.bio} numberOfLines={3}>
              {user.bio}
            </Text>
          )}

          <View style={styles.badgesContainer}>
            {user.localVerification.answers.slice(0, 2).map((answer, index) => (
              <View key={index} style={styles.badge}>
                <Text style={styles.badgeText} numberOfLines={1}>
                  {answer.answer}
                </Text>
              </View>
            ))}
          </View>

          {user.activityPreferences && (
            <View style={styles.activitiesRow}>
              {user.activityPreferences.skiing.interest && (
                <Text style={styles.activityIcon}>⛷️</Text>
              )}
              {user.activityPreferences.hiking.interest && (
                <Text style={styles.activityIcon}>🥾</Text>
              )}
              {user.activityPreferences.climbing.interest && (
                <Text style={styles.activityIcon}>🧗</Text>
              )}
              {user.activityPreferences.biking.interest && (
                <Text style={styles.activityIcon}>🚴</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
  },
  polaroidFrame: {
    flex: 1,
    backgroundColor: theme.colors.polaroidFrame,
    borderRadius: theme.borderRadius.xl,
    padding: 16,
    ...theme.shadows.polaroid,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  age: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
  },
  bio: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
    marginBottom: theme.spacing.sm,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  badge: {
    backgroundColor: theme.colors.backgroundTertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  activitiesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  activityIcon: {
    fontSize: 20,
  },
});
