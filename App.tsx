import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConvexProvider } from 'convex/react';
import { convex } from './src/services/convex';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ConvexProvider client={convex}>
        <RootNavigator />
        <StatusBar style="dark" />
      </ConvexProvider>
    </SafeAreaProvider>
  );
}
