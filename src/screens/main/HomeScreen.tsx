import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScanResult } from '../../types/plastic';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    loadRecentScans();
  }, []);

  const loadRecentScans = async () => {
    try {
      const scansJson = await AsyncStorage.getItem('scan_history');
      if (scansJson) {
        const scans: ScanResult[] = JSON.parse(scansJson);
        setRecentScans(scans.slice(0, 3)); // Show last 3 scans

        // Calculate average score
        if (scans.length > 0) {
          const avg =
            scans.reduce((sum, scan) => sum + scan.safetyScore.score, 0) /
            scans.length;
          setAverageScore(Math.round(avg));
        }
      }
    } catch (error) {
      console.error('Failed to load scans:', error);
    }
  };

  const handleScanPress = () => {
    navigation.navigate('Scanner');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SafeScan</Text>
        <Text style={styles.subtitle}>Know your container risk. Make safer choices.</Text>
      </View>

      {/* Average Score Card (if user has scans) */}
      {averageScore !== null && (
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Your Average Safety Score</Text>
          <Text style={styles.scoreValue}>{averageScore}/100</Text>
          <Text style={styles.scoreDescription}>
            Based on {recentScans.length} recent scan{recentScans.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Large Scan Button */}
      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <View style={styles.scanButtonIcon}>
          <Text style={styles.scanButtonIconText}>📷</Text>
        </View>
        <Text style={styles.scanButtonText}>Scan Container</Text>
        <Text style={styles.scanButtonSubtext}>
          Take a photo to check safety rating
        </Text>
      </TouchableOpacity>

      {/* Recent Scans Preview */}
      {recentScans.length > 0 && (
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>Recent Scans</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {recentScans.map((scan, index) => (
            <TouchableOpacity
              key={scan.id}
              style={styles.scanItem}
              onPress={() =>
                navigation.navigate('Results', { scanResult: scan })
              }
            >
              <Image source={{ uri: scan.imageUri }} style={styles.scanImage} />
              <View style={styles.scanInfo}>
                <Text style={styles.scanBrand} numberOfLines={1}>
                  {scan.analysis.brand || 'Unknown Brand'}
                </Text>
                <Text style={styles.scanType}>
                  {scan.analysis.plasticType.abbreviation} #
                  {scan.analysis.plasticType.code}
                </Text>
              </View>
              <View
                style={[
                  styles.scoreChip,
                  { backgroundColor: scan.safetyScore.color },
                ]}
              >
                <Text style={styles.scoreChipText}>
                  {scan.safetyScore.score}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Educational Message */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>What We Do</Text>
        <Text style={styles.infoText}>
          We don't detect microplastics. We help you understand which containers
          and habits create higher exposure risk based on scientific research.
        </Text>
      </View>

      {/* Explore Alternatives */}
      <TouchableOpacity
        style={styles.alternativesButton}
        onPress={() => navigation.navigate('Alternatives')}
      >
        <Text style={styles.alternativesButtonText}>
          Explore Safer Alternatives
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  scoreCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  scoreDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  scanButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  scanButtonIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  scanButtonIconText: {
    fontSize: 40,
  },
  scanButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  scanButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  recentSection: {
    marginBottom: spacing.lg,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  scanItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  scanInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  scanBrand: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  scanType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scoreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreChipText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  alternativesButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: spacing.xl,
  },
  alternativesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});
