import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';
import { AlgorithmPriorities } from '../../types';

interface AlgorithmPrioritiesScreenProps {
  onComplete: (priorities: AlgorithmPriorities) => void;
}

export const AlgorithmPrioritiesScreen: React.FC<AlgorithmPrioritiesScreenProps> = ({
  onComplete,
}) => {
  const [priorities, setPriorities] = useState<AlgorithmPriorities>({
    proximityWeight: 25, // Miles
    activityLevelWeight: 3, // Level 1-5 (default: Medium)
    sharedInterestsWeight: 50, // Percentage
  });

  const updateSlider = (key: 'proximityWeight' | 'sharedInterestsWeight', value: number) => {
    setPriorities({
      ...priorities,
      [key]: Math.round(value),
    });
  };

  const updateActivityLevel = (level: number) => {
    setPriorities({
      ...priorities,
      activityLevelWeight: level,
    });
  };

  const handleContinue = () => {
    onComplete(priorities);
  };

  const activityLevels = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Medium' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={7} totalSteps={7} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Customize your matches</Text>
        <Text style={styles.subtitle}>
          Adjust what matters most to you. You can change this anytime.
        </Text>

        {/* Proximity Slider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Proximity</Text>
            <Text style={styles.sectionValue}>{priorities.proximityWeight}mi</Text>
          </View>
          <Text style={styles.sectionDescription}>Maximum distance for matches</Text>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={100}
            step={5}
            value={priorities.proximityWeight}
            onValueChange={(value) => updateSlider('proximityWeight', value)}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
        </View>

        {/* Activity Level Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Activity Level Priority</Text>
          <Text style={styles.sectionDescription}>How important are similar outdoor interests?</Text>
          <View style={styles.buttonGroup}>
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level.value}
                style={[
                  styles.levelButton,
                  priorities.activityLevelWeight === level.value && styles.levelButtonActive,
                ]}
                onPress={() => updateActivityLevel(level.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.levelButtonText,
                    priorities.activityLevelWeight === level.value && styles.levelButtonTextActive,
                  ]}
                >
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Shared Interests Slider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Shared Interests</Text>
            <Text style={styles.sectionValue}>{priorities.sharedInterestsWeight}%</Text>
          </View>
          <Text style={styles.sectionDescription}>Common hobbies and lifestyle</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={10}
            value={priorities.sharedInterestsWeight}
            onValueChange={(value) => updateSlider('sharedInterestsWeight', value)}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.border}
            thumbTintColor={theme.colors.primary}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Complete Setup" onPress={handleContinue} fullWidth />
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
  section: {
    marginBottom: theme.spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  sectionLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sectionValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  sectionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  levelButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.frostedGlass,
    borderWidth: 2,
    borderColor: theme.colors.frostedGlassBorder,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    ...theme.shadows.frosted,
  },
  levelButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  levelButtonText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
  },
  levelButtonTextActive: {
    color: theme.colors.textLight,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
