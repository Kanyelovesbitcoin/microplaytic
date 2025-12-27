import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
    proximityWeight: 50,
    activityLevelWeight: 50,
    sharedInterestsWeight: 50,
    localResidentBoost: 50,
  });

  const updatePriority = (key: keyof AlgorithmPriorities, value: number) => {
    setPriorities({
      ...priorities,
      [key]: Math.round(value),
    });
  };

  const handleContinue = () => {
    onComplete(priorities);
  };

  const sliders = [
    {
      key: 'proximityWeight' as const,
      label: 'Proximity',
      description: 'How close they are to you',
    },
    {
      key: 'activityLevelWeight' as const,
      label: 'Activity Level',
      description: 'Similar outdoor interests',
    },
    {
      key: 'sharedInterestsWeight' as const,
      label: 'Shared Interests',
      description: 'Common hobbies and lifestyle',
    },
    {
      key: 'localResidentBoost' as const,
      label: 'Local Resident Boost',
      description: 'Prioritize long-time locals',
    },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={9} totalSteps={10} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Customize your matches</Text>
        <Text style={styles.subtitle}>
          Adjust what matters most to you. You can change this anytime.
        </Text>

        {sliders.map((slider) => (
          <View key={slider.key} style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>{slider.label}</Text>
              <Text style={styles.sliderValue}>{priorities[slider.key]}%</Text>
            </View>
            <Text style={styles.sliderDescription}>{slider.description}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={10}
              value={priorities[slider.key]}
              onValueChange={(value) => updatePriority(slider.key, value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.border}
              thumbTintColor={theme.colors.primary}
            />
          </View>
        ))}
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
  sliderContainer: {
    marginBottom: theme.spacing.xl,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  sliderLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sliderValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  sliderDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
