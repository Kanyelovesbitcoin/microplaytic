import {
  PlasticType,
  UserContext,
  SafetyScore,
  ContainerAnalysis,
} from '../types/plastic';
import {
  PLASTIC_TYPES,
  REUSE_MODIFIERS,
  HEAT_MODIFIERS,
  CONDITION_MODIFIERS,
  RISK_EXPLANATIONS,
} from '../constants/plasticData';

export function calculateSafetyScore(
  analysis: ContainerAnalysis,
  userContext: UserContext
): SafetyScore {
  const { plasticType } = analysis;
  const { reuseFrequency, heatExposure, condition } = userContext;

  // Base score from plastic type
  let score = plasticType.baseScore;

  // Apply modifiers
  score += REUSE_MODIFIERS[reuseFrequency];
  score += HEAT_MODIFIERS[heatExposure];
  score += CONDITION_MODIFIERS[condition];

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine risk level and color
  const { riskLevel, color } = getRiskLevel(score);

  // Generate explanation and key risk factors
  const { summary, explanation, keyRiskFactors, recommendations } =
    generateExplanation(plasticType, userContext, score, analysis.category);

  return {
    score: Math.round(score),
    riskLevel,
    color,
    summary,
    explanation,
    keyRiskFactors,
    recommendations,
  };
}

function getRiskLevel(score: number): { riskLevel: SafetyScore['riskLevel']; color: string } {
  if (score >= 80) {
    return { riskLevel: 'lower', color: '#10B981' }; // Green
  } else if (score >= 50) {
    return { riskLevel: 'moderate', color: '#F59E0B' }; // Orange/Yellow
  } else {
    return { riskLevel: 'higher', color: '#EF4444' }; // Red
  }
}

function generateExplanation(
  plasticType: PlasticType,
  userContext: UserContext,
  score: number,
  category: string
): {
  summary: string;
  explanation: string;
  keyRiskFactors: string[];
  recommendations: string[];
} {
  const { reuseFrequency, heatExposure, condition } = userContext;
  const keyRiskFactors: string[] = [];
  const recommendations: string[] = [];

  // Build summary
  const summary = buildSummary(plasticType, reuseFrequency, heatExposure);

  // Build detailed explanation
  let explanation = `${plasticType.abbreviation} (#${plasticType.code}) plastic ${plasticType.description.toLowerCase()}. `;

  // Add risk factors
  if (heatExposure !== 'never') {
    keyRiskFactors.push(`Heat exposure: ${heatExposure}`);
    explanation += RISK_EXPLANATIONS.heat[
      heatExposure === 'frequently' ? 'high' : 'medium'
    ];
  }

  if (reuseFrequency !== 'single-use') {
    keyRiskFactors.push(`Reuse: ${reuseFrequency}`);
    explanation += ' ' + RISK_EXPLANATIONS.reuse[
      reuseFrequency === 'regularly' ? 'high' : 'medium'
    ];
  }

  if (condition !== 'new') {
    keyRiskFactors.push(`Condition: ${condition}`);
    explanation += ' Scratched or worn plastic has increased surface area, releasing more particles.';
  }

  keyRiskFactors.push(`Plastic type: ${plasticType.abbreviation} (#${plasticType.code})`);

  // Generate recommendations
  if (heatExposure !== 'never') {
    recommendations.push('Avoid heating this plastic container or using it with hot liquids');
  }

  if (reuseFrequency !== 'single-use' && ['1', '6'].includes(plasticType.code)) {
    recommendations.push('This plastic is designed for single-use. Consider switching to a reusable alternative');
  }

  if (score < 60) {
    recommendations.push('Consider replacing with a safer alternative material (glass, stainless steel, or PP #5 plastic)');
  }

  if (condition === 'worn' || condition === 'lightly-used') {
    recommendations.push('Replace worn containers as scratches increase particle release');
  }

  return {
    summary,
    explanation,
    keyRiskFactors,
    recommendations,
  };
}

function buildSummary(
  plasticType: PlasticType,
  reuseFrequency: UserContext['reuseFrequency'],
  heatExposure: UserContext['heatExposure']
): string {
  const parts: string[] = [];

  if (heatExposure !== 'never') {
    parts.push('heat exposure');
  }

  if (reuseFrequency !== 'single-use') {
    parts.push('reuse');
  }

  if (parts.length === 0) {
    return `${plasticType.abbreviation} plastic is relatively safe for single-use without heat`;
  }

  const factorsText = parts.join(' and ');
  return `${plasticType.abbreviation} releases more particles with ${factorsText}`;
}

export function getPlasticTypeByCode(code: string): PlasticType | undefined {
  return PLASTIC_TYPES[code];
}
