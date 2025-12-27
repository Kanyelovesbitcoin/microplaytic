import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DiscoverScreen } from '../screens/main/DiscoverScreen';
import { MatchesScreen } from '../screens/main/MatchesScreen';
import { DateSpotsScreen } from '../screens/main/DateSpotsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: () => <TabIcon icon="🔍" />,
        }}
      />
      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarIcon: () => <TabIcon icon="💬" />,
        }}
      />
      <Tab.Screen
        name="Date Spots"
        component={DateSpotsScreen}
        options={{
          tabBarIcon: () => <TabIcon icon="📍" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <TabIcon icon="👤" />,
        }}
      />
    </Tab.Navigator>
  );
};

const TabIcon: React.FC<{ icon: string }> = ({ icon }) => {
  return <Text style={{ fontSize: 24 }}>{icon}</Text>;
};
