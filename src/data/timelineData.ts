import { Calendar, Code, FileText, User, Clock, Trophy, Flag, Mic, Briefcase } from "lucide-react";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

export type { TimelineItem };

// Official DataXscape 2.0 National Hackathon Stages for Radial Orbital Timeline
export const RADIAL_TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "Registration Opens",
    date: "Phase 01",
    content: "Sign up individually or as a squad on the portal to reserve your spot for DataXscape 2.0.",
    category: "Registration",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Team Shortlisting",
    date: "Phase 02",
    content: "Shortlisted teams and problem domain assignments are published by the academic jury.",
    category: "Selection",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "24-Hour Kick-off",
    date: "Phase 03",
    content: "Grand inauguration, orientation by tech partners, and the non-stop 24-hour building marathon starts.",
    category: "Sprint",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 95,
  },
  {
    id: 4,
    title: "Judging & Demos",
    date: "Phase 04",
    content: "Live demo evaluations, codebase review by industry experts, and architecture scorecards.",
    category: "Evaluation",
    icon: User,
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "Grand Finale",
    date: "Phase 05",
    content: "Closing ceremony, ₹1,50,000 prize distribution, and felicitation of champion innovators.",
    category: "Awards",
    icon: Trophy,
    relatedIds: [4],
    status: "pending",
    energy: 15,
  },
];

// Fallback legacy list
export const TIMELINE_DATA = [
  {
    id: 'step-1',
    phase: 'Phase 01',
    title: 'Registration Opens',
    description: 'Sign up individually or as a team to secure your spot.',
    icon: 'badge',
    align: 'left',
  },
  {
    id: 'step-2',
    phase: 'Phase 02',
    title: 'Students Shortlisted',
    description: 'The list of shortlisted students for the hackathon will be announced.',
    icon: 'calendar',
    align: 'right',
  },
  {
    id: 'step-3',
    phase: 'Phase 03',
    title: 'Hackathon Kick-off',
    description: 'Opening ceremony, keynotes, and the official start of the 24-hour hack.',
    icon: 'mic',
    align: 'left',
  },
  {
    id: 'step-4',
    phase: 'Phase 04',
    title: 'Submission Deadline & Judging',
    description: 'Final projects are submitted, and judging begins.',
    icon: 'trophy',
    align: 'right',
  },
  {
    id: 'step-5',
    phase: 'Phase 05',
    title: 'Winners Announcement',
    description: 'Closing ceremony and announcement of the hackathon winners.',
    icon: 'flag',
    align: 'left',
  },
];
