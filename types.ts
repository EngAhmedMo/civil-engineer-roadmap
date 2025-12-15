export interface Resource {
  title: string;
  instructor: string;
  cat: 'Site' | 'Shop' | 'Finishing' | 'Office' | 'BIM';
  url: string;
  cssClass: string;
  btnClass: string;
}

export interface DayTask {
  name: string;
  tasks: string[];
}

export interface WeekSchedule {
  id: number;
  title: string;
  source: string;
  days: DayTask[];
}

export interface UserProgress {
  completed: string[];
  unlocked: number[];
}

export type View = 'dashboard' | 'map' | 'resources' | 'aibim' | 'mindset' | 'analytics';