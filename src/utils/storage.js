const KEY = "habits_v1";

export function getHabits() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits) {
  localStorage.setItem(KEY, JSON.stringify(habits));
}
