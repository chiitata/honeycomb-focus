"use client";

import { useCallback } from "react";
import Timer from "./components/Timer";
import TaskBoard from "./components/TaskBoard";
import HoneyJar from "./components/HoneyJar";
import { Task } from "./lib/types";
import { useLocalStorage } from "./lib/useLocalStorage";
import { copy } from "./lib/copy";

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("hcf.tasks", []);
  const [honey, setHoney] = useLocalStorage<{ date: string; count: number }>(
    "hcf.honey",
    { date: todayKey(), count: 0 },
  );

  const count = honey.date === todayKey() ? honey.count : 0;

  const onFocusComplete = useCallback(() => {
    setHoney((h) => {
      const today = todayKey();
      const base = h.date === today ? h.count : 0;
      return { date: today, count: base + 1 };
    });
  }, [setHoney]);

  return (
    <main className="min-h-screen honeycomb-bg px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-comb">
              {copy.appTitle}
            </h1>
            <p className="mt-1 text-sm text-honey-700">{copy.tagline}</p>
          </div>
          <HoneyJar count={count} />
        </header>

        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <Timer onFocusComplete={onFocusComplete} />
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>

        <footer className="mt-12 text-center text-xs text-honey-600">
          {copy.footer}
        </footer>
      </div>
    </main>
  );
}
