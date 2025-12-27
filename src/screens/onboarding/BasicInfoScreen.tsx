import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';

interface BasicInfoScreenProps {
  onComplete: (data: { name: string; age: number }) => void;
}

export const BasicInfoScreen: React.FC<BasicInfoScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
      Alert.alert('Error', 'Please enter a valid age (18+)');
      return;
    }

    onComplete({ name: name.trim(), age: ageNum });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ProgressBar currentStep={2} totalSteps={7} />

          <View style={styles.content}>
            <Text style={styles.title}>Let's get to know you</Text>
            <Text style={styles.subtitle}>Tell us a bit about yourself</Text>

            <Input
              label="Name"
              placeholder="Your first name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
              blurOnSubmit={false}
            />

            <Input
              label="Age"
              placeholder="25"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={2}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                handleContinue();
              }}
            />
          </View>

          <View style={styles.footer}>
            <Button title="Continue" onPress={handleContinue} fullWidth />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['2xl'],
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
  },
});
