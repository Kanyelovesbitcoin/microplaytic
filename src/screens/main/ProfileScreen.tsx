import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

export const ProfileScreen: React.FC = () => {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', onPress: () => {} },
        { label: 'Photos', onPress: () => {} },
        { label: 'Bio', onPress: () => {} },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Algorithm Priorities', onPress: () => {} },
        { label: 'Activity Preferences', onPress: () => {} },
        { label: 'Drinking Preference', onPress: () => {} },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'Help & Support', onPress: () => {} },
        { label: 'Privacy Policy', onPress: () => {} },
        { label: 'Terms of Service', onPress: () => {} },
      ],
    },
    {
      title: 'Account Actions',
      items: [
        { label: 'Log Out', onPress: () => {}, danger: true },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.profileName}>Your Name</Text>
          <Text style={styles.profileAge}>Age</Text>
        </View>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex !== section.items.length - 1 && styles.settingItemBorder,
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.settingLabel,
                      item.danger && styles.settingLabelDanger,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={styles.settingArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  profileCard: {
    backgroundColor: theme.colors.frostedGlass,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.card,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontSize: 48,
  },
  profileName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  profileAge: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  sectionContent: {
    backgroundColor: theme.colors.frostedGlass,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.card,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  settingLabelDanger: {
    color: theme.colors.error,
  },
  settingArrow: {
    fontSize: theme.typography.fontSize['2xl'],
    color: theme.colors.textTertiary,
  },
  version: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});
