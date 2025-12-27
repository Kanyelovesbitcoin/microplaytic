import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';

interface PhoneVerificationScreenProps {
  onVerified: (phone: string) => void;
}

export const PhoneVerificationScreen: React.FC<PhoneVerificationScreenProps> = ({
  onVerified,
}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    // TODO: Implement Supabase phone auth
    // For now, simulate sending code
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    // TODO: Implement Supabase code verification
    // For now, simulate verification
    setTimeout(() => {
      setLoading(false);
      onVerified(phone);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={1} totalSteps={10} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {step === 'phone' ? 'Enter your phone number' : 'Enter verification code'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 'phone'
            ? 'We\'ll send you a verification code'
            : `We sent a code to ${phone}`}
        </Text>

        {step === 'phone' ? (
          <Input
            label="Phone Number"
            placeholder="(555) 123-4567"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={14}
          />
        ) : (
          <Input
            label="Verification Code"
            placeholder="000000"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Button
          title={step === 'phone' ? 'Send Code' : 'Verify'}
          onPress={step === 'phone' ? handleSendCode : handleVerifyCode}
          loading={loading}
          fullWidth
        />
      </View>
    </View>
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
