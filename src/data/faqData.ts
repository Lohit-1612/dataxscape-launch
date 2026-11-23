export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_LEFT: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Who is eligible to participate?',
    answer: 'Students currently enrolled in undergraduate or postgraduate degree programs at any recognized university or college across India are eligible to participate.',
  },
  {
    id: 'faq-2',
    question: 'What is the team size?',
    answer: 'Team size is 3 to 4.',
  },
  {
    id: 'faq-3',
    question: 'Can Panimalar Engineering College students participate?',
    answer: 'Yes! Students from Panimalar Engineering College as well as external colleges and universities nationwide are enthusiastically welcome to participate.',
  },
  {
    id: 'faq-4',
    question: 'Is accommodation provided for participants?',
    answer: 'Yes, full hospitality including comfortable on-campus accommodation, high-speed Wi-Fi connectivity, meals, and refreshments throughout the 24-hour hackathon will be provided.',
  },
];

export const FAQ_RIGHT: FaqItem[] = [
  {
    id: 'faq-5',
    question: 'Is there a fee to participate?',
    answer: 'No, registration and participation in DataXscape 2k26 is completely free of charge for all shortlisted teams.',
  },
  {
    id: 'faq-6',
    question: 'What should I bring?',
    answer: 'Bring your laptops, chargers, power strips, valid college ID cards, student proof, and any specialized hardware components your project might need.',
  },
  {
    id: 'faq-7',
    question: 'What makes DataXscape different from other hackathons?',
    answer: 'DataXscape 2k26 bridges cutting-edge data science, real-world industry problem statements, immersive storytelling, and direct evaluation by senior engineering leaders.',
  },
  {
    id: 'faq-8',
    question: 'How long is the hackathon?',
    answer: 'DataXscape is a 24-hour nonstop marathon starting with the kick-off on January 21, 2026, and ending with project submissions and judging on January 22, 2026.',
  },
];
