import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../../components/Button';
import { theme } from '../../theme';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Salt</Text>
        <Text style={styles.tagline}>Find your person in Salt Lake City</Text>
        <Text style={styles.description}>
          A community-verified dating app exclusively for Salt Lake City residents.
          Real connections, real people, real local.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button title="Get Started" onPress={onGetStarted} fullWidth />
        <Text style={styles.disclaimer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  logo: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  tagline: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  description: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
  disclaimer: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
