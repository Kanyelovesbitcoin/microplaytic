import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ContainerAnalysis,
  ReuseFrequency,
  HeatExposure,
  ContainerCondition,
  UserContext,
  ScanResult,
} from '../../types/plastic';
import { calculateSafetyScore } from '../../utils/scoringEngine';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface QuestionsScreenProps {
  navigation: any;
  route: {
    params: {
      imageUri: string;
      analysis: ContainerAnalysis;
    };
  };
}

export const QuestionsScreen: React.FC<QuestionsScreenProps> = ({
  navigation,
  route,
}) => {
  const { imageUri, analysis } = route.params;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reuseFrequency, setReuseFrequency] = useState<ReuseFrequency | null>(
    null
  );
  const [heatExposure, setHeatExposure] = useState<HeatExposure | null>(null);
  const [condition, setCondition] = useState<ContainerCondition | null>(null);

  const questions = [
    {
      id: 'reuse',
      question: 'Is this a single-use item or do you reuse it?',
      options: [
        { label: 'Single-use only', value: 'single-use' as ReuseFrequency },
        { label: 'I reuse it sometimes', value: 'sometimes' as ReuseFrequency },
        { label: 'I reuse it regularly', value: 'regularly' as ReuseFrequency },
      ],
    },
    {
      id: 'heat',
      question: 'Do you use this with hot liquids or heated food?',
      options: [
        { label: 'Never', value: 'never' as HeatExposure },
        { label: 'Sometimes', value: 'sometimes' as HeatExposure },
        { label: 'Frequently', value: 'frequently' as HeatExposure },
      ],
    },
    {
      id: 'condition',
      question: 'How would you describe its condition?',
      options: [
        { label: 'New or like new', value: 'new' as ContainerCondition },
        { label: 'Lightly used', value: 'lightly-used' as ContainerCondition },
        { label: 'Scratched or worn', value: 'worn' as ContainerCondition },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: any) => {
    if (questionId === 'reuse') {
      setReuseFrequency(value);
    } else if (questionId === 'heat') {
      setHeatExposure(value);
    } else if (questionId === 'condition') {
      setCondition(value);
    }

    // Move to next question or calculate score
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, calculate score
      calculateAndShowResults(value);
    }
  };

  const calculateAndShowResults = async (lastAnswer: any) => {
    const userContext: UserContext = {
      reuseFrequency: reuseFrequency || 'single-use',
      heatExposure: heatExposure || 'never',
      condition: lastAnswer || condition || 'new',
    };

    const safetyScore = calculateSafetyScore(analysis, userContext);

    const scanResult: ScanResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      imageUri,
      analysis,
      userContext,
      safetyScore,
    };

    // Save to history
    await saveScanToHistory(scanResult);

    // Navigate to results
    navigation.navigate('Results', { scanResult });
  };

  const saveScanToHistory = async (scanResult: ScanResult) => {
    try {
      const existingScansJson = await AsyncStorage.getItem('scan_history');
      const existingScans: ScanResult[] = existingScansJson
        ? JSON.parse(existingScansJson)
        : [];

      const updatedScans = [scanResult, ...existingScans];

      await AsyncStorage.setItem('scan_history', JSON.stringify(updatedScans));
    } catch (error) {
      console.error('Failed to save scan:', error);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigation.goBack();
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Container Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Analyzing</Text>
          <Text style={styles.infoText}>
            {analysis.plasticType.abbreviation} #{analysis.plasticType.code}{' '}
            {analysis.category.replace('-', ' ')}
          </Text>
          {analysis.brand && (
            <Text style={styles.infoBrand}>{analysis.brand}</Text>
          )}
        </View>

        {/* Question */}
        <Text style={styles.question}>{currentQ.question}</Text>

        {/* Options */}
        <View style={styles.options}>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(currentQ.id, option.value)}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>{option.label}</Text>
                <Text style={styles.optionArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Text */}
        <View style={styles.helpCard}>
          <Text style={styles.helpTitle}>Why we ask</Text>
          <Text style={styles.helpText}>
            {currentQ.id === 'reuse' &&
              'Reusing single-use plastics increases microplastic release due to wear and degradation.'}
            {currentQ.id === 'heat' &&
              'Heat significantly increases particle release. Hot liquids can cause plastic to shed 10x more particles.'}
            {currentQ.id === 'condition' &&
              'Scratched or worn plastic has more surface area, releasing more particles into food and drinks.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  backButton: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  infoBrand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xl,
    lineHeight: 32,
  },
  options: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  optionButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  optionArrow: {
    fontSize: 20,
    color: colors.primary,
  },
  helpCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: spacing.lg,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  helpText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
