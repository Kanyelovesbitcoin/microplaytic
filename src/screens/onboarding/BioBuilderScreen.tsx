import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';
import { bioQuestions } from '../../constants/bioQuestions';

interface BioBuilderScreenProps {
  onComplete: (bio: string) => void;
}

export const BioBuilderScreen: React.FC<BioBuilderScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = bioQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === bioQuestions.length - 1;

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      Alert.alert('Required', 'Please answer this question');
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: currentAnswer.trim(),
    };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const generatedBio = generateBio(updatedAnswers);
      onComplete(generatedBio);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousQuestion = bioQuestions[currentQuestionIndex - 1];
      setCurrentAnswer(answers[previousQuestion.id] || '');
    }
  };

  const generateBio = (bioAnswers: Record<string, string>): string => {
    // Simple bio generation from answers
    const parts: string[] = [];

    if (bioAnswers['background-1']) {
      parts.push(bioAnswers['background-1']);
    }
    if (bioAnswers['interests-1']) {
      parts.push(bioAnswers['interests-1']);
    }
    if (bioAnswers['lifestyle-2']) {
      parts.push(bioAnswers['lifestyle-2']);
    }

    return parts.join(' ');
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={6} totalSteps={10} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's create your bio</Text>
        <Text style={styles.subtitle}>
          Question {currentQuestionIndex + 1} of {bioQuestions.length}
        </Text>

        <Text style={styles.question}>{currentQuestion.question}</Text>

        <Input
          placeholder="Type your answer..."
          value={currentAnswer}
          onChangeText={setCurrentAnswer}
          multiline
          numberOfLines={4}
          style={styles.textarea}
        />
      </ScrollView>

      <View style={styles.footer}>
        {currentQuestionIndex > 0 && (
          <Button title="Back" onPress={handleBack} variant="outline" fullWidth />
        )}
        <Button
          title={isLastQuestion ? 'Generate Bio' : 'Next'}
          onPress={handleNext}
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
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing['2xl'],
  },
  question: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.md,
  },
});
