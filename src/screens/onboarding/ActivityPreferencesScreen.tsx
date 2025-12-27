import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';
import { ActivityPreferences } from '../../types';

interface ActivityPreferencesScreenProps {
  onComplete: (preferences: ActivityPreferences) => void;
}

export const ActivityPreferencesScreen: React.FC<ActivityPreferencesScreenProps> = ({
  onComplete,
}) => {
  const [preferences, setPreferences] = useState<ActivityPreferences>({
    skiing: { interest: false },
    hiking: { interest: false },
    climbing: { interest: false },
    biking: { interest: false },
  });

  const toggleActivity = (activity: keyof ActivityPreferences) => {
    setPreferences({
      ...preferences,
      [activity]: {
        ...preferences[activity],
        interest: !preferences[activity].interest,
      },
    });
  };

  const handleContinue = () => {
    onComplete(preferences);
  };

  const activities = [
    { key: 'skiing' as const, label: 'Skiing/Snowboarding', emoji: '⛷️' },
    { key: 'hiking' as const, label: 'Hiking', emoji: '🥾' },
    { key: 'climbing' as const, label: 'Rock Climbing', emoji: '🧗' },
    { key: 'biking' as const, label: 'Biking', emoji: '🚴' },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={7} totalSteps={10} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What do you love to do?</Text>
        <Text style={styles.subtitle}>Select your favorite activities</Text>

        <View style={styles.activitiesContainer}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.key}
              style={[
                styles.activityCard,
                preferences[activity.key].interest && styles.activityCardActive,
              ]}
              onPress={() => toggleActivity(activity.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.activityEmoji}>{activity.emoji}</Text>
              <Text
                style={[
                  styles.activityLabel,
                  preferences[activity.key].interest && styles.activityLabelActive,
                ]}
              >
                {activity.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Continue" onPress={handleContinue} fullWidth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['2xl'],
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  activityCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: theme.colors.frostedGlass,
    borderWidth: 2,
    borderColor: theme.colors.frostedGlassBorder,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.frosted,
  },
  activityCardActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  activityEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  activityLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  activityLabelActive: {
    color: theme.colors.textLight,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
