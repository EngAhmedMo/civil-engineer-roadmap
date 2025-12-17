
export interface Resource {
  title: string;
  instructor: string;
  cat: 'Site' | 'Finishing' | 'Shop' | 'Office' | 'BIM' | 'Infra' | 'Steel' | 'PlanB';
  url: string;
  cssClass: string;
  btnClass: string;
}

export interface GateTest {
  question: string;
  criteria: string; // The specific output required (e.g., "Extract 5 columns volume")
  // remedialUrl removed as requested
}

export interface DayTask {
  name: string;
  tasks: string[];
}

export interface WeekSchedule {
  id: number;
  phase: string;
  title: string;
  source: string;
  days: DayTask[];
  gateTest?: GateTest;
  note?: string; // For Sharkia context or specific instructions
}

export interface UserProgress {
  completed: string[];
  unlocked: number[];
  weekIcons?: Record<number, string>; // Stores custom selected icon for each week
  lastUpdated?: number; // Timestamp for sync logic
  taskTimestamps?: Record<string, number>; // Added to track when each task was completed
}

export type View = 'dashboard' | 'map' | 'resources' | 'aibim' | 'mindset' | 'analytics' | 'session';
