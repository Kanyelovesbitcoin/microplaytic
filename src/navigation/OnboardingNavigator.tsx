import React, { useState } from 'react';
import { View } from 'react-native';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { PhoneVerificationScreen } from '../screens/onboarding/PhoneVerificationScreen';
import { UtahQuizScreen } from '../screens/onboarding/UtahQuizScreen';
import { BasicInfoScreen } from '../screens/onboarding/BasicInfoScreen';
import { PhotoUploadScreen } from '../screens/onboarding/PhotoUploadScreen';
import { BioBuilderScreen } from '../screens/onboarding/BioBuilderScreen';
import { ActivityPreferencesScreen } from '../screens/onboarding/ActivityPreferencesScreen';
import { SoberToggleScreen } from '../screens/onboarding/SoberToggleScreen';
import { AlgorithmPrioritiesScreen } from '../screens/onboarding/AlgorithmPrioritiesScreen';
import {
  LocalVerificationAnswer,
  ActivityPreferences,
  SoberPreference,
  AlgorithmPriorities,
} from '../types';

interface OnboardingNavigatorProps {
  onComplete: () => void;
}

export const OnboardingNavigator: React.FC<OnboardingNavigatorProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    phone: '',
    localVerificationAnswers: [] as LocalVerificationAnswer[],
    name: '',
    age: 0,
    photos: [] as string[],
    bio: '',
    activityPreferences: {} as ActivityPreferences,
    soberPreference: 'no-preference' as SoberPreference,
    algorithmPriorities: {} as AlgorithmPriorities,
  });

  const nextStep = () => setCurrentStep(currentStep + 1);

  const handleWelcome = () => {
    nextStep();
  };

  const handlePhoneVerified = (phone: string) => {
    setOnboardingData({ ...onboardingData, phone });
    nextStep();
  };

  const handleQuizComplete = (answers: LocalVerificationAnswer[]) => {
    setOnboardingData({ ...onboardingData, localVerificationAnswers: answers });
    nextStep();
  };

  const handleBasicInfo = (data: { name: string; age: number }) => {
    setOnboardingData({ ...onboardingData, ...data });
    nextStep();
  };

  const handlePhotosUploaded = (photos: string[]) => {
    setOnboardingData({ ...onboardingData, photos });
    nextStep();
  };

  const handleBioComplete = (bio: string) => {
    setOnboardingData({ ...onboardingData, bio });
    nextStep();
  };

  const handleActivityPreferences = (preferences: ActivityPreferences) => {
    setOnboardingData({ ...onboardingData, activityPreferences: preferences });
    nextStep();
  };

  const handleSoberPreference = (preference: SoberPreference) => {
    setOnboardingData({ ...onboardingData, soberPreference: preference });
    nextStep();
  };

  const handleAlgorithmPriorities = async (priorities: AlgorithmPriorities) => {
    setOnboardingData({ ...onboardingData, algorithmPriorities: priorities });

    // TODO: Save all onboarding data to Supabase
    console.log('Onboarding complete:', { ...onboardingData, algorithmPriorities: priorities });

    // Complete onboarding
    onComplete();
  };

  const screens = [
    <WelcomeScreen key="welcome" onGetStarted={handleWelcome} />,
    <PhoneVerificationScreen key="phone" onVerified={handlePhoneVerified} />,
    <UtahQuizScreen key="quiz" onComplete={handleQuizComplete} />,
    <BasicInfoScreen key="basic" onComplete={handleBasicInfo} />,
    <PhotoUploadScreen key="photos" onComplete={handlePhotosUploaded} />,
    <BioBuilderScreen key="bio" onComplete={handleBioComplete} />,
    <ActivityPreferencesScreen key="activities" onComplete={handleActivityPreferences} />,
    <SoberToggleScreen key="sober" onComplete={handleSoberPreference} />,
    <AlgorithmPrioritiesScreen key="algorithm" onComplete={handleAlgorithmPriorities} />,
  ];

  return <View style={{ flex: 1 }}>{screens[currentStep]}</View>;
};
