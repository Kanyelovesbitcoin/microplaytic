import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// TEMPORARILY DISABLED - Enable after setting up Convex deployment
// import { ConvexProvider } from 'convex/react';
// import { convex } from './src/services/convex';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* TEMPORARILY DISABLED - Enable after running: npx convex dev */}
      {/* <ConvexProvider client={convex}> */}
        <RootNavigator />
        <StatusBar style="dark" />
      {/* </ConvexProvider> */}
    </SafeAreaProvider>
  );
}
