export type PlasticResinCode = '1' | '2' | '3' | '4' | '5' | '6' | '7';

export interface PlasticType {
  code: PlasticResinCode;
  name: string;
  abbreviation: string;
  baseScore: number;
  description: string;
  commonUses: string[];
}

export type ReuseFrequency = 'single-use' | 'sometimes' | 'regularly';
export type HeatExposure = 'never' | 'sometimes' | 'frequently';
export type ContainerCondition = 'new' | 'lightly-used' | 'worn';

export type ContainerCategory =
  | 'water-bottle'
  | 'food-container'
  | 'disposable-cup'
  | 'plate'
  | 'utensil'
  | 'other';

export interface UserContext {
  reuseFrequency: ReuseFrequency;
  heatExposure: HeatExposure;
  condition: ContainerCondition;
}

export interface ContainerAnalysis {
  plasticType: PlasticType;
  category: ContainerCategory;
  brand?: string;
  productName?: string;
  confidence: number;
}

export interface SafetyScore {
  score: number; // 0-100
  riskLevel: 'lower' | 'moderate' | 'higher';
  color: string;
  summary: string;
  explanation: string;
  keyRiskFactors: string[];
  recommendations: string[];
}

export interface ScanResult {
  id: string;
  timestamp: Date;
  imageUri: string;
  analysis: ContainerAnalysis;
  userContext: UserContext;
  safetyScore: SafetyScore;
}

export interface Alternative {
  category: string;
  material: string;
  whySafer: string;
  whenToSwitch: string;
}
