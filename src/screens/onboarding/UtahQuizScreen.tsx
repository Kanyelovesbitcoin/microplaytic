import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { theme } from '../../theme';
import { localVerificationQuestions } from '../../constants/localVerificationQuestions';
import { LocalVerificationAnswer } from '../../types';

interface UtahQuizScreenProps {
  onComplete: (answers: LocalVerificationAnswer[]) => void;
}

export const UtahQuizScreen: React.FC<UtahQuizScreenProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<LocalVerificationAnswer[]>([]);

  const currentQuestion = localVerificationQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === localVerificationQuestions.length - 1;

  const handleSelectAnswer = (answer: string) => {
    const newAnswer: LocalVerificationAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      onComplete(updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={1} totalSteps={7} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's verify you're a local</Text>
        <Text style={styles.subtitle}>
          Question {currentQuestionIndex + 1} of {localVerificationQuestions.length}
        </Text>

        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelectAnswer(option)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  optionsContainer: {
    gap: theme.spacing.md,
  },
  option: {
    backgroundColor: theme.colors.frostedGlass,
    borderWidth: 2,
    borderColor: theme.colors.frostedGlassBorder,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    ...theme.shadows.frosted,
  },
  optionText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.text,
    textAlign: 'center',
  },
});
