export interface Prize {
  tier: 'RUNNER UP' | 'CHAMPION' | '2ND RUNNER UP';
  amount: string;
  badgeType: 'silver-red' | 'gold-purple' | 'silver-blue';
  isCenter: boolean;
  borderClass: string;
  glowClass: string;
}

export const PRIZES: Prize[] = [
  {
    tier: 'RUNNER UP',
    amount: '50,000',
    badgeType: 'silver-red',
    isCenter: false,
    borderClass: 'border-sky-500/40',
    glowClass: 'shadow-[0_0_30px_rgba(56,189,248,0.25)]',
  },
  {
    tier: 'CHAMPION',
    amount: '75,000',
    badgeType: 'gold-purple',
    isCenter: true,
    borderClass: 'border-cyan-400/60',
    glowClass: 'shadow-[0_0_45px_rgba(0,210,255,0.45)]',
  },
  {
    tier: '2ND RUNNER UP',
    amount: '25,000',
    badgeType: 'silver-blue',
    isCenter: false,
    borderClass: 'border-blue-500/40',
    glowClass: 'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
  },
];
