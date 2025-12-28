import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScanResult } from '../../types/plastic';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface ResultsScreenProps {
  navigation: any;
  route: {
    params: {
      scanResult: ScanResult;
    };
  };
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const { scanResult } = route.params;
  const { analysis, safetyScore, userContext, imageUri } = scanResult;

  const getRiskLevelText = () => {
    switch (safetyScore.riskLevel) {
      case 'lower':
        return 'Lower Risk';
      case 'moderate':
        return 'Moderate Risk';
      case 'higher':
        return 'Higher Risk';
    }
  };

  const getRiskIcon = () => {
    switch (safetyScore.riskLevel) {
      case 'lower':
        return '✓';
      case 'moderate':
        return '!';
      case 'higher':
        return '⚠️';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Rating</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Container Image */}
        <Image source={{ uri: imageUri }} style={styles.containerImage} />

        {/* Score Card */}
        <View
          style={[
            styles.scoreCard,
            { borderColor: safetyScore.color, borderWidth: 3 },
          ]}
        >
          <View style={styles.scoreHeader}>
            <View>
              <Text style={styles.scoreLabel}>Safety Score</Text>
              <Text style={[styles.scoreValue, { color: safetyScore.color }]}>
                {safetyScore.score}/100
              </Text>
            </View>
            <View
              style={[
                styles.riskBadge,
                { backgroundColor: safetyScore.color },
              ]}
            >
              <Text style={styles.riskIcon}>{getRiskIcon()}</Text>
              <Text style={styles.riskText}>{getRiskLevelText()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Container Info */}
          <View style={styles.containerInfo}>
            <Text style={styles.containerBrand}>
              {analysis.brand || 'Unbranded Container'}
            </Text>
            <Text style={styles.containerType}>
              {analysis.plasticType.name} (
              {analysis.plasticType.abbreviation} #{analysis.plasticType.code})
            </Text>
            <Text style={styles.containerCategory}>
              {analysis.category.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summaryText}>{safetyScore.summary}</Text>
        </View>

        {/* Why This Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why This Rating</Text>
          <Text style={styles.explanationText}>{safetyScore.explanation}</Text>
        </View>

        {/* Key Risk Factors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Risk Factors</Text>
          {safetyScore.keyRiskFactors.map((factor, index) => (
            <View key={index} style={styles.factorItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.factorText}>{factor}</Text>
            </View>
          ))}
        </View>

        {/* Your Usage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Usage</Text>
          <View style={styles.usageGrid}>
            <View style={styles.usageItem}>
              <Text style={styles.usageLabel}>Reuse</Text>
              <Text style={styles.usageValue}>
                {userContext.reuseFrequency}
              </Text>
            </View>
            <View style={styles.usageItem}>
              <Text style={styles.usageLabel}>Heat</Text>
              <Text style={styles.usageValue}>{userContext.heatExposure}</Text>
            </View>
            <View style={styles.usageItem}>
              <Text style={styles.usageLabel}>Condition</Text>
              <Text style={styles.usageValue}>{userContext.condition}</Text>
            </View>
          </View>
        </View>

        {/* Recommendations */}
        {safetyScore.recommendations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {safetyScore.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={styles.recNumber}>{index + 1}</Text>
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Explore Alternatives Button */}
        <TouchableOpacity
          style={styles.alternativesButton}
          onPress={() => navigation.navigate('Alternatives', { category: analysis.category })}
        >
          <Text style={styles.alternativesButtonText}>
            Explore Safer Alternatives →
          </Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            This rating is based on scientific research about plastic safety.
            We don't detect microplastics - we assess exposure risk based on
            container type and usage patterns.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={styles.newScanButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.newScanButtonText}>Scan Another Container</Text>
        </TouchableOpacity>
      </View>
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
  closeButton: {
    fontSize: 24,
    color: colors.text,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  containerImage: {
    width: '100%',
    height: 250,
    backgroundColor: colors.border,
  },
  scoreCard: {
    backgroundColor: colors.white,
    margin: spacing.lg,
    borderRadius: 16,
    padding: spacing.lg,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  riskIcon: {
    fontSize: 16,
    color: colors.white,
  },
  riskText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  containerInfo: {
    gap: 4,
  },
  containerBrand: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  containerType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  containerCategory: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 12,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontWeight: '500',
  },
  explanationText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  factorItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: spacing.sm,
  },
  factorText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  usageGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  usageItem: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
  },
  usageLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  usageValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  recNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginRight: spacing.sm,
    width: 24,
  },
  recommendationText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
  alternativesButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  alternativesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  disclaimer: {
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: 12,
    padding: spacing.lg,
  },
  disclaimerText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  bottomAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  newScanButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newScanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
