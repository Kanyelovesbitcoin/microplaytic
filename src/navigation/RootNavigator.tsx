import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainTabNavigator } from './MainTabNavigator';

export const RootNavigator: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // TODO: Check if user is already onboarded
    // Check AsyncStorage or Supabase for user session
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    // TODO: Implement actual check
    // For now, default to onboarding
    setIsOnboarded(false);
  };

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  return (
    <NavigationContainer>
      {isOnboarded ? (
        <MainTabNavigator />
      ) : (
        <OnboardingNavigator onComplete={handleOnboardingComplete} />
      )}
    </NavigationContainer>
  );
};
