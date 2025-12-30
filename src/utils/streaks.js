import { getTodayISO, getYesterdayISO } from "./dates.js";

// mood and note are optional
export function applyCheckIn(habit, mood = "🙂", note = "") {
  const today = getTodayISO();

  if (habit.lastCheckIn === today) return habit;

  const yesterday = getYesterdayISO(today);

  let newStreak = 1;

  if (!habit.lastCheckIn) newStreak = 1;
  else if (habit.lastCheckIn === yesterday) newStreak = (habit.streak || 0) + 1;
  else newStreak = 1;

  const newEntry = {
    date: today,
    mood,
    note: note.trim(),
  };

  const previous = Array.isArray(habit.checkIns) ? habit.checkIns : [];

  return {
    ...habit,
    streak: newStreak,
    bestStreak: Math.max(habit.bestStreak || 0, newStreak),
    lastCheckIn: today,
    checkIns: [...previous, newEntry],
  };
}

export function getMilestone(streak) {
  const milestones = [3, 7, 14, 30];
  return milestones.includes(streak) ? streak : null;
}
