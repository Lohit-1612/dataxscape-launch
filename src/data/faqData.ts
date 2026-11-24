export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_LEFT: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Who is eligible to participate?',
    answer: 'Students currently enrolled in undergraduate or postgraduate degree programs at any recognized college or university across India are eligible to participate.',
  },
  {
    id: 'faq-2',
    question: 'What is the required team size?',
    answer: 'Each team must consist of 3 to 4 members. Individual participation is not permitted.',
  },
  {
    id: 'faq-3',
    question: 'Can Panimalar Engineering College students participate?',
    answer: 'Yes! Students from Panimalar Engineering College as well as other colleges and universities nationwide are enthusiastically welcome to participate.',
  },
  {
    id: 'faq-4',
    question: 'Is accommodation provided for participants?',
    answer: 'Yes. Comprehensive hospitality, including comfortable on-campus accommodation, high-speed Wi-Fi connectivity, meals, and refreshments, will be provided throughout the 24-hour hackathon.',
  },
];

export const FAQ_RIGHT: FaqItem[] = [
  {
    id: 'faq-5',
    question: 'Is there any registration fee to participate?',
    answer: 'No. Registration and participation in DataXscape 2k26 are completely free of charge for all shortlisted teams.',
  },
  {
    id: 'faq-6',
    question: 'What should participants bring to the event?',
    answer: 'Participants should bring their laptops, chargers, power strips or extension cords, valid college ID cards, student proof, and any specialized hardware components their project might require.',
  },
  {
    id: 'faq-7',
    question: 'What makes DataXscape unique compared to other hackathons?',
    answer: 'DataXscape 2k26 bridges cutting-edge data science, real-world industry problem statements, mentorship from industry experts, and direct evaluation by senior engineering leaders.',
  },
  {
    id: 'faq-8',
    question: 'How long is the hackathon?',
    answer: 'DataXscape is a 24-hour non-stop hackathon starting with the kick-off orientation and concluding with project submissions, live demonstrations, and the grand finale awards ceremony.',
  },
];
