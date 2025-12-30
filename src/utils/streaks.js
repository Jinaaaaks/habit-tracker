import { getTodayISO, getYesterdayISO } from "./dates.js";

// Returns a NEW updated habit object, does not mutate original
export function applyCheckIn(habit) {
  const today = getTodayISO();

  // Already checked in today
  if (habit.lastCheckIn === today) return habit;

  const yesterday = getYesterdayISO(today);

  let newStreak = 1;

  if (!habit.lastCheckIn) {
    newStreak = 1; // first ever check-in
  } else if (habit.lastCheckIn === yesterday) {
    newStreak = (habit.streak || 0) + 1; // continue streak
  } else {
    newStreak = 1; // missed days, restart
  }

  return {
    ...habit,
    streak: newStreak,
    bestStreak: Math.max(habit.bestStreak || 0, newStreak),
    lastCheckIn: today,
    checkIns: Array.isArray(habit.checkIns) ? [...habit.checkIns, today] : [today],
  };
}
