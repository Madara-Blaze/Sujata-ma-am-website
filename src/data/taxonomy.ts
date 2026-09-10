import type { SubjectMeta, Level, Format } from "@/lib/types";

export const SUBJECTS: SubjectMeta[] = [
  { id: "math", label: "Math", description: "Arithmetic through calculus, statistics and beyond.", icon: "Calculator", accent: "highlighter" },
  { id: "reading-writing", label: "Reading & Writing", description: "Literacy, essays, grammar and creative writing.", icon: "PenLine", accent: "highlighter-mint" },
  { id: "science", label: "Science", description: "Biology, chemistry, physics and lab skills.", icon: "FlaskConical", accent: "highlighter-pink" },
  { id: "test-prep", label: "Test Prep", description: "SAT, ACT, AP exams and standardized testing.", icon: "ClipboardCheck", accent: "highlighter" },
  { id: "coding", label: "Coding", description: "Programming fundamentals through full projects.", icon: "Code2", accent: "highlighter-mint" },
  { id: "languages", label: "Languages", description: "Spanish, French, Mandarin and more, any level.", icon: "Languages", accent: "highlighter-pink" },
  { id: "music", label: "Music", description: "Piano, guitar, voice and music theory.", icon: "Music2", accent: "highlighter" },
  { id: "art", label: "Art & Design", description: "Drawing, painting, digital art and portfolios.", icon: "Palette", accent: "highlighter-mint" },
  { id: "college-essays", label: "College Essays", description: "Personal statements and application strategy.", icon: "GraduationCap", accent: "highlighter-pink" },
  { id: "professional-skills", label: "Professional Skills", description: "Resumes, interviews, Excel, presentations.", icon: "Briefcase", accent: "highlighter" },
  { id: "history-civics", label: "History & Civics", description: "World history, government and social studies.", icon: "Landmark", accent: "highlighter-mint" },
  { id: "public-speaking", label: "Public Speaking", description: "Debate, confidence and presentation coaching.", icon: "Mic2", accent: "highlighter-pink" },
];

export const LEVELS: { id: Level; label: string }[] = [
  { id: "elementary", label: "Elementary" },
  { id: "middle-school", label: "Middle School" },
  { id: "high-school", label: "High School" },
  { id: "college", label: "College" },
  { id: "adult", label: "Adult" },
];

export const FORMATS: { id: Format; label: string }[] = [
  { id: "online", label: "Online" },
  { id: "in-person", label: "In person" },
  { id: "hybrid", label: "Hybrid" },
];

export function subjectLabel(id: string) {
  return SUBJECTS.find((s) => s.id === id)?.label ?? id;
}
