import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { DateSpot } from '../../types';

// This would typically come from Supabase
const mockDateSpots: DateSpot[] = [
  {
    id: '1',
    name: 'Liberty Park',
    category: 'outdoor',
    address: '600 E 900 S, Salt Lake City, UT 84105',
    description: 'Classic SLC park perfect for casual walks and picnics',
    location: { latitude: 40.7406, longitude: -111.8720 },
  },
  {
    id: '2',
    name: 'The Leonardo',
    category: 'activity',
    address: '209 E 500 S, Salt Lake City, UT 84111',
    description: 'Interactive science and art museum downtown',
    location: { latitude: 40.7614, longitude: -111.8866 },
  },
  {
    id: '3',
    name: 'Park Cafe',
    category: 'restaurant',
    address: '604 E 1300 S, Salt Lake City, UT 84105',
    description: 'Cozy brunch spot with local favorites',
    location: { latitude: 40.7349, longitude: -111.8719 },
  },
];

export const DateSpotsScreen: React.FC = () => {
  const [spots] = useState<DateSpot[]>(mockDateSpots);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'coffee', label: 'Coffee' },
    { key: 'restaurant', label: 'Food' },
    { key: 'outdoor', label: 'Outdoor' },
    { key: 'activity', label: 'Activity' },
    { key: 'bar', label: 'Bar' },
  ];

  const filteredSpots = selectedCategory && selectedCategory !== 'all'
    ? spots.filter((spot) => spot.category === selectedCategory)
    : spots;

  const renderSpot = ({ item }: { item: DateSpot }) => (
    <TouchableOpacity style={styles.spotCard} activeOpacity={0.7}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryBadgeText}>{item.category}</Text>
      </View>

      <Text style={styles.spotName}>{item.name}</Text>
      <Text style={styles.spotDescription}>{item.description}</Text>
      <Text style={styles.spotAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Date Spots</Text>
        <Text style={styles.headerSubtitle}>
          Curated locations around Salt Lake City
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.key && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(item.key)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item.key && styles.categoryButtonTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <FlatList
        data={filteredSpots}
        renderItem={renderSpot}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.spotsContainer}
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
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  categoriesContainer: {
    marginBottom: theme.spacing.md,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.backgroundTertiary,
    marginRight: theme.spacing.sm,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  categoryButtonTextActive: {
    color: theme.colors.textLight,
  },
  spotsContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  spotCard: {
    backgroundColor: theme.colors.frostedGlass,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.card,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  categoryBadgeText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
  },
  spotName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  spotDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  spotAddress: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
  },
});
