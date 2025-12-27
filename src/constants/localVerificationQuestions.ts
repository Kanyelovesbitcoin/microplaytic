import { LocalVerificationQuestion } from '../types';

export const localVerificationQuestions: LocalVerificationQuestion[] = [
  {
    id: 'canyon-preference',
    question: 'Which canyon is better?',
    options: ['Big Cottonwood', 'Little Cottonwood', 'Both are great!', 'I prefer City Creek'],
    type: 'single-choice',
  },
  {
    id: 'fry-sauce',
    question: 'Where do you stand on fry sauce?',
    options: ['Love it!', 'It\'s okay', 'Not a fan', 'What\'s fry sauce?'],
    type: 'single-choice',
  },
  {
    id: 'neighborhood-vibe',
    question: 'Which vibe speaks to you?',
    options: ['9th and 9th', 'Sugarhouse', 'Downtown', 'Draper', 'Avenues', 'Foothill'],
    type: 'single-choice',
  },
  {
    id: 'residency-status',
    question: 'Are you a transplant or native?',
    options: ['Born and raised', 'Transplant (< 2 years)', 'Transplant (2-5 years)', 'Transplant (5+ years)'],
    type: 'single-choice',
  },
  {
    id: 'ski-resort',
    question: 'If you ski or snowboard, what\'s your go-to resort?',
    options: ['Alta', 'Snowbird', 'Brighton', 'Solitude', 'Park City', 'Deer Valley', 'I don\'t ski/snowboard'],
    type: 'single-choice',
  },
];
