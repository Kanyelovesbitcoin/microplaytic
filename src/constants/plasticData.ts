import { PlasticType, Alternative } from '../types/plastic';

export const PLASTIC_TYPES: Record<string, PlasticType> = {
  '1': {
    code: '1',
    name: 'Polyethylene Terephthalate',
    abbreviation: 'PET',
    baseScore: 70,
    description: 'Designed for single-use applications',
    commonUses: ['Water bottles', 'Soda bottles', 'Food containers']
  },
  '2': {
    code: '2',
    name: 'High-Density Polyethylene',
    abbreviation: 'HDPE',
    baseScore: 80,
    description: 'More durable, better for reuse than PET',
    commonUses: ['Milk jugs', 'Detergent bottles', 'Thick containers']
  },
  '3': {
    code: '3',
    name: 'Polyvinyl Chloride',
    abbreviation: 'PVC',
    baseScore: 40,
    description: 'Can release harmful chemicals',
    commonUses: ['Pipes', 'Some food wraps', 'Medical tubing']
  },
  '4': {
    code: '4',
    name: 'Low-Density Polyethylene',
    abbreviation: 'LDPE',
    baseScore: 75,
    description: 'Flexible, generally safer',
    commonUses: ['Plastic bags', 'Squeeze bottles', 'Flexible containers']
  },
  '5': {
    code: '5',
    name: 'Polypropylene',
    abbreviation: 'PP',
    baseScore: 85,
    description: 'Heat-resistant, safest for reuse',
    commonUses: ['Yogurt containers', 'Hot food containers', 'Baby bottles']
  },
  '6': {
    code: '6',
    name: 'Polystyrene',
    abbreviation: 'PS',
    baseScore: 50,
    description: 'Can leach styrene, especially when heated',
    commonUses: ['Foam cups', 'Disposable plates', 'Takeout containers']
  },
  '7': {
    code: '7',
    name: 'Other Plastics',
    abbreviation: 'Other',
    baseScore: 60,
    description: 'Mixed category, varies by composition',
    commonUses: ['Large water bottles', 'Sunglasses', 'Mixed plastics']
  }
};

export const REUSE_MODIFIERS = {
  'single-use': 0,
  'sometimes': -15,
  'regularly': -25
};

export const HEAT_MODIFIERS = {
  'never': 0,
  'sometimes': -20,
  'frequently': -30
};

export const CONDITION_MODIFIERS = {
  'new': 0,
  'lightly-used': -5,
  'worn': -10
};

export const SAFER_ALTERNATIVES: Record<string, Alternative[]> = {
  'water-bottle': [
    {
      category: 'Water Bottles',
      material: 'Stainless Steel',
      whySafer: 'No microplastic shedding, extremely durable, maintains temperature',
      whenToSwitch: 'If you regularly reuse plastic water bottles, especially with hot liquids'
    },
    {
      category: 'Water Bottles',
      material: 'Glass with Silicone Sleeve',
      whySafer: 'Zero plastic contact with liquids, easy to clean, no chemical leaching',
      whenToSwitch: 'For home/office use where breakage risk is lower'
    }
  ],
  'food-container': [
    {
      category: 'Food Storage',
      material: 'Glass Containers with Lids',
      whySafer: 'No microplastic release, microwave-safe, no odor retention',
      whenToSwitch: 'If you microwave food in plastic containers or store acidic foods'
    },
    {
      category: 'Food Storage',
      material: 'Silicone Storage Bags',
      whySafer: 'Food-grade silicone is more stable than plastic, reusable, heat-safe',
      whenToSwitch: 'For flexible storage needs like sandwiches and snacks'
    }
  ],
  'disposable-cup': [
    {
      category: 'Hot Drinks',
      material: 'Ceramic Travel Mug',
      whySafer: 'No plastic contact with hot liquids, durable, reusable',
      whenToSwitch: 'If you regularly buy hot coffee in disposable cups'
    },
    {
      category: 'Hot Drinks',
      material: 'Stainless Steel Tumbler',
      whySafer: 'Insulated, no microplastic release, keeps drinks hot/cold',
      whenToSwitch: 'For daily coffee/tea drinkers'
    }
  ],
  'utensil': [
    {
      category: 'Utensils',
      material: 'Bamboo or Metal Utensils',
      whySafer: 'No microplastic release, reusable, portable sets available',
      whenToSwitch: 'If you frequently use disposable plastic utensils'
    }
  ]
};

export const RISK_EXPLANATIONS = {
  heat: {
    high: 'Heat significantly increases microplastic release. Studies show heated plastic can release 10x more particles.',
    medium: 'Occasional heat exposure increases particle release. Hot liquids cause plastic to break down faster.',
    low: 'No heat exposure reduces risk, but other factors still matter.'
  },
  reuse: {
    high: 'Regular reuse of single-use plastics increases particle shedding. Each use creates more micro-abrasions.',
    medium: 'Occasional reuse increases exposure risk. Single-use plastics degrade with repeated washing.',
    low: 'Single-use as intended minimizes exposure from degradation.'
  },
  plasticType: {
    safe: 'This plastic type (PP or HDPE) is more stable and sheds fewer particles.',
    moderate: 'This plastic type sheds a moderate amount of particles during normal use.',
    risky: 'This plastic type is known to shed more particles, especially when stressed.'
  }
};
