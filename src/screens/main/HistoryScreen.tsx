import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScanResult } from '../../types/plastic';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface HistoryScreenProps {
  navigation: any;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const [scans, setScans] = useState<ScanResult[]>([]);
  const [averageScore, setAverageScore] = useState<number | null>(null);

  useEffect(() => {
    loadScans();

    // Refresh when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadScans();
    });

    return unsubscribe;
  }, [navigation]);

  const loadScans = async () => {
    try {
      const scansJson = await AsyncStorage.getItem('scan_history');
      if (scansJson) {
        const loadedScans: ScanResult[] = JSON.parse(scansJson);
        setScans(loadedScans);

        if (loadedScans.length > 0) {
          const avg =
            loadedScans.reduce((sum, scan) => sum + scan.safetyScore.score, 0) /
            loadedScans.length;
          setAverageScore(Math.round(avg));
        }
      }
    } catch (error) {
      console.error('Failed to load scans:', error);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan History</Text>
      </View>

      {scans.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No Scans Yet</Text>
          <Text style={styles.emptyText}>
            Start scanning containers to see your history and track your safety
            score over time.
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={styles.scanButtonText}>Scan Your First Container</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {/* Stats Card */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{scans.length}</Text>
              <Text style={styles.statLabel}>
                Total Scan{scans.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{averageScore || 0}</Text>
              <Text style={styles.statLabel}>Average Score</Text>
            </View>
          </View>

          {/* Scans List */}
          <View style={styles.scansList}>
            {scans.map((scan, index) => (
              <TouchableOpacity
                key={scan.id}
                style={styles.scanItem}
                onPress={() => navigation.navigate('Results', { scanResult: scan })}
              >
                <Image
                  source={{ uri: scan.imageUri }}
                  style={styles.scanImage}
                />

                <View style={styles.scanDetails}>
                  <Text style={styles.scanBrand} numberOfLines={1}>
                    {scan.analysis.brand || 'Unknown Brand'}
                  </Text>
                  <Text style={styles.scanType}>
                    {scan.analysis.plasticType.abbreviation} #
                    {scan.analysis.plasticType.code} •{' '}
                    {scan.analysis.category.replace('-', ' ')}
                  </Text>
                  <Text style={styles.scanDate}>{formatDate(scan.timestamp)}</Text>
                </View>

                <View style={styles.scanScore}>
                  <View
                    style={[
                      styles.scoreCircle,
                      { backgroundColor: scan.safetyScore.color },
                    ]}
                  >
                    <Text style={styles.scoreText}>
                      {scan.safetyScore.score}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.riskLabel,
                      { color: scan.safetyScore.color },
                    ]}
                  >
                    {scan.safetyScore.riskLevel}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  scanButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: colors.white,
    margin: spacing.lg,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
  },
  scansList: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  scanItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scanImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  scanDetails: {
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
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  scanDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  scanScore: {
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  riskLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
