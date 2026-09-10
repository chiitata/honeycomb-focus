"use client";

import { useState } from "react";
import { Task } from "../lib/types";
import { copy } from "../lib/copy";

export default function TaskBoard({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [draft, setDraft] = useState("");

  const addTask = () => {
    const title = draft.trim();
    if (!title) return;
    setTasks((t) => [
      { id: crypto.randomUUID(), title, done: false, createdAt: Date.now() },
      ...t,
    ]);
    setDraft("");
  };

  const toggle = (id: string) =>
    setTasks((t) =>
      t.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );

  const remove = (id: string) =>
    setTasks((t) => t.filter((task) => task.id !== id));

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <section className="rounded-3xl bg-white/80 shadow-lg ring-1 ring-honey-200 p-8 backdrop-blur w-full">
      <header className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold text-comb">{copy.tasks.heading}</h2>
        <span className="text-sm text-honey-700">{copy.tasks.remaining(remaining)}</span>
      </header>

      <div className="flex gap-2 mb-5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder={copy.tasks.placeholder}
          className="flex-1 rounded-full border border-honey-200 bg-honey-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-honey-400"
        />
        <button
          onClick={addTask}
          className="px-5 py-2 rounded-full bg-honey-500 text-white font-semibold text-sm hover:bg-honey-600 transition"
        >
          {copy.tasks.add}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-sm text-honey-600 py-8">
          {copy.tasks.empty}
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 rounded-2xl border border-honey-100 bg-honey-50/60 px-4 py-2.5"
            >
              <button
                onClick={() => toggle(task.id)}
                aria-label={task.done ? copy.tasks.toggleUndone : copy.tasks.toggleDone}
                className={`h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center transition ${
                  task.done
                    ? "border-honey-500 bg-honey-500 text-white"
                    : "border-honey-300 hover:border-honey-500"
                }`}
              >
                {task.done && "✓"}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.done ? "line-through text-honey-400" : "text-comb"
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => remove(task.id)}
                aria-label={copy.tasks.delete}
                className="opacity-0 group-hover:opacity-100 text-honey-400 hover:text-honey-700 transition text-lg leading-none"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
