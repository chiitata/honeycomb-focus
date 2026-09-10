/**
 * Centralized UI copy. Owned in the "lib" lane so wording can be revised
 * in one place. Honey may send revisions; apply them here.
 */
export const copy = {
  appTitle: "🐝 Honeycomb Focus",
  tagline: "25分集中して、タスクを巣に運ぼう。ひと仕事終えるたびに蜜がたまります🍯",

  // layout.tsx の metadata.description に使用
  metaDescription:
    "ミツバチテーマのポモドーロ・タイマー＆タスクボード。集中してタスクを終えるたびに🍯が溜まります。",

  timer: {
    focusTab: "🐝 集中 25分",
    breakTab: "🍯 休憩 5分",
    focusLabel: "集中タイム",
    breakLabel: "ひと休み",
    start: "スタート",
    pause: "一時停止",
    reset: "リセット",
  },

  tasks: {
    heading: "🐝 今日のタスク",
    remaining: (n: number) => `残り ${n} 件`,
    placeholder: "やることを追加…",
    add: "追加",
    empty: "まだタスクがありません。最初のひと花を巣に運びましょう 🍯",
    // ↓ 追加（TaskBoard の aria-label 用）
    toggleDone: "完了にする",
    toggleUndone: "未完了に戻す",
    delete: "削除",
  },

  honey: {
    label: "今日ためた蜜",
    unit: "ポモドーロ",
  },

  footer: "データはこの端末のブラウザ内（localStorage）にのみ保存されます 🐝",
} as const;
