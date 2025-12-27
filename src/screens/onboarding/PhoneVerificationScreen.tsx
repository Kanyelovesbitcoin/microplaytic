import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  InputAccessoryView,
  TouchableOpacity
} from 'react-native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';

const INPUT_ACCESSORY_VIEW_ID = 'phoneInputAccessory';

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ProgressBar currentStep={1} totalSteps={10} />

          <View style={styles.content}>
            <Text style={styles.title}>
              {step === 'phone' ? 'Enter your phone number' : 'Enter verification code'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'phone'
                ? 'Tap anywhere outside to close keyboard'
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
                inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
              />
            ) : (
              <Input
                label="Verification Code"
                placeholder="000000"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                inputAccessoryViewID={INPUT_ACCESSORY_VIEW_ID}
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
      </TouchableWithoutFeedback>

      {/* Custom Done button above keyboard */}
      <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
        <View style={styles.keyboardAccessory}>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={Keyboard.dismiss}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
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
  keyboardAccessory: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  doneButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  doneButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
  },
});
