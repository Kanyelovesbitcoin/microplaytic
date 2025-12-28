import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './MainTabNavigator';
import { ScannerScreen } from '../screens/main/ScannerScreen';
import { QuestionsScreen } from '../screens/main/QuestionsScreen';
import { ResultsScreen } from '../screens/main/ResultsScreen';
import { AlternativesScreen } from '../screens/main/AlternativesScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Scanner" component={ScannerScreen} />
      <Stack.Screen name="Questions" component={QuestionsScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
      <Stack.Screen name="Alternatives" component={AlternativesScreen} />
    </Stack.Navigator>
  );
};
