import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';

interface MatchItem {
  id: string;
  name: string;
  photo: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface MatchesScreenProps {
  onMatchPress: (matchId: string) => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({ onMatchPress }) => {
  const [matches, setMatches] = useState<MatchItem[]>([]);

  const renderMatch = ({ item }: { item: MatchItem }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => onMatchPress(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.photo }} style={styles.matchPhoto} />

      <View style={styles.matchInfo}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchName}>{item.name}</Text>
          <Text style={styles.matchTimestamp}>{item.timestamp}</Text>
        </View>

        <Text style={[styles.matchMessage, item.unread && styles.matchMessageUnread]}>
          {item.lastMessage}
        </Text>
      </View>

      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  if (matches.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No matches yet</Text>
          <Text style={styles.emptyStateText}>
            Start swiping to find your person in Salt Lake City!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>

      <FlatList
        data={matches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.frostedGlass,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card,
  },
  matchPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: theme.spacing.md,
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  matchName: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.text,
  },
  matchTimestamp: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  matchMessage: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  matchMessageUnread: {
    fontWeight: '600',
    color: theme.colors.text,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.relaxed,
  },
});
