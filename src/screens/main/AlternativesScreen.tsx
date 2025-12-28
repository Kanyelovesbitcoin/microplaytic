import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SAFER_ALTERNATIVES } from '../../constants/plasticData';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AlternativesScreenProps {
  navigation: any;
  route?: {
    params?: {
      category?: string;
    };
  };
}

export const AlternativesScreen: React.FC<AlternativesScreenProps> = ({
  navigation,
  route,
}) => {
  const highlightedCategory = route?.params?.category;

  const categories = [
    { key: 'water-bottle', title: 'Water Bottles', icon: '💧' },
    { key: 'food-container', title: 'Food Storage', icon: '🍱' },
    { key: 'disposable-cup', title: 'Hot Drinks', icon: '☕' },
    { key: 'utensil', title: 'Utensils', icon: '🍴' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Safer Alternatives</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.introTitle}>Better, Not Perfect</Text>
          <Text style={styles.introText}>
            You don't need to eliminate all plastic. Focus on high-risk uses
            first - heated plastics, reused single-use items, and worn
            containers.
          </Text>
        </View>

        {/* Categories */}
        {categories.map(({ key, title, icon }) => {
          const alternatives = SAFER_ALTERNATIVES[key] || [];
          const isHighlighted = highlightedCategory === key;

          return (
            <View
              key={key}
              style={[
                styles.categorySection,
                isHighlighted && styles.categoryHighlighted,
              ]}
            >
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{icon}</Text>
                <Text style={styles.categoryTitle}>{title}</Text>
              </View>

              {alternatives.map((alt, index) => (
                <View key={index} style={styles.alternativeCard}>
                  <View style={styles.alternativeHeader}>
                    <Text style={styles.materialBadge}>{alt.material}</Text>
                  </View>

                  <Text style={styles.whySafer}>Why it's safer:</Text>
                  <Text style={styles.whySaferText}>{alt.whySafer}</Text>

                  <Text style={styles.whenToSwitch}>When to switch:</Text>
                  <Text style={styles.whenToSwitchText}>
                    {alt.whenToSwitch}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <Text style={styles.bottomTitle}>Making the Switch</Text>
          <Text style={styles.bottomText}>
            Start with the containers you use most often, especially those you
            heat or reuse frequently. Even switching one high-risk container
            can significantly reduce your exposure.
          </Text>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            We don't recommend specific brands or earn from product sales. These
            are material categories shown to be safer based on research.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  intro: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    borderRadius: 16,
    padding: spacing.xl,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  introText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 24,
  },
  categorySection: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  categoryHighlighted: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    paddingVertical: spacing.md,
    marginHorizontal: 0,
    paddingHorizontal: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  alternativeCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alternativeHeader: {
    marginBottom: spacing.md,
  },
  materialBadge: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  whySafer: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.sm,
  },
  whySaferText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginTop: 4,
  },
  whenToSwitch: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
  },
  whenToSwitchText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginTop: 4,
  },
  bottomInfo: {
    backgroundColor: '#F3F4F6',
    margin: spacing.lg,
    borderRadius: 12,
    padding: spacing.lg,
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bottomText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  privacyNote: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    padding: spacing.md,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  privacyText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
});
