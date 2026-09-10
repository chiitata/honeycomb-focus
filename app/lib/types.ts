export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type Phase = "focus" | "break";

export const DURATIONS: Record<Phase, number> = {
  focus: 25 * 60,
  break: 5 * 60,
};
