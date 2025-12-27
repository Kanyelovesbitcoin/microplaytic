import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';
import { SoberPreference } from '../../types';

interface SoberToggleScreenProps {
  onComplete: (preference: SoberPreference) => void;
}

export const SoberToggleScreen: React.FC<SoberToggleScreenProps> = ({ onComplete }) => {
  const [preference, setPreference] = useState<SoberPreference | null>(null);

  const handleContinue = () => {
    if (preference) {
      onComplete(preference);
    }
  };

  const options: { value: SoberPreference; label: string; description: string }[] = [
    {
      value: 'drinks',
      label: 'I drink',
      description: 'Enjoy the occasional drink',
    },
    {
      value: 'doesnt-drink',
      label: "I don't drink",
      description: 'Prefer to stay sober',
    },
    {
      value: 'no-preference',
      label: 'No preference',
      description: "Open to either",
    },
  ];

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={6} totalSteps={7} />

      <View style={styles.content}>
        <Text style={styles.title}>Drinking preference</Text>
        <Text style={styles.subtitle}>
          Help us match you with people who share your lifestyle
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionCard,
                preference === option.value && styles.optionCardActive,
              ]}
              onPress={() => setPreference(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionLabel,
                  preference === option.value && styles.optionLabelActive,
                ]}
              >
                {option.label}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  preference === option.value && styles.optionDescriptionActive,
                ]}
              >
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!preference}
          fullWidth
        />
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
  optionsContainer: {
    gap: theme.spacing.md,
  },
  optionCard: {
    backgroundColor: theme.colors.frostedGlass,
    borderWidth: 2,
    borderColor: theme.colors.frostedGlassBorder,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.frosted,
  },
  optionCardActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  optionLabelActive: {
    color: theme.colors.textLight,
  },
  optionDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  optionDescriptionActive: {
    color: theme.colors.textLight,
    opacity: 0.9,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
