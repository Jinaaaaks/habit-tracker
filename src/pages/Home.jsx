import { useEffect, useMemo, useState } from "react";
import HabitCard from "../components/HabitCard.jsx";
import { getHabits, saveHabits } from "../utils/storage.js";
import { applyCheckIn } from "../utils/streaks.js";
import { getTodayISO } from "../utils/dates.js";

export default function Home() {
  const [habits, setHabits] = useState([]);
  const today = getTodayISO();

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  function updateHabits(next) {
    setHabits(next);
    saveHabits(next);
  }

  function handleDelete(id) {
    const next = habits.filter((h) => h.id !== id);
    updateHabits(next);
  }

  function handleCheckIn(id, mood, note) {
    const next = habits.map((h) =>
      h.id === id ? applyCheckIn(h, mood, note) : h
    );
    updateHabits(next);
  }

  const { pending, completed } = useMemo(() => {
    const pending = [];
    const completed = [];

    for (const h of habits) {
      if (h.lastCheckIn === today) completed.push(h);
      else pending.push(h);
    }

    return { pending, completed };
  }, [habits, today]);

  return (
    <div>
      <h2 className="pageTitle">Today</h2>
      <p className="softText">
        Show up once. That’s enough.
      </p>

      {pending.length === 0 ? (
        <div className="card successCard">
          Everything done for today. You can rest.
        </div>
      ) : (
        <>
          <h3 className="sectionTitle">Still waiting for you</h3>
          <div className="grid">
            {pending.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onDelete={handleDelete}
                onCheckIn={handleCheckIn}
              />
            ))}
          </div>
        </>
      )}

      {completed.length > 0 ? (
        <>
          <h3 className="sectionTitle">Done today</h3>
          <div className="grid">
            {completed.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onDelete={handleDelete}
                onCheckIn={handleCheckIn}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
