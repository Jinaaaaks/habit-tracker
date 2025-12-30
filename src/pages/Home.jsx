import { useEffect, useState } from "react";
import HabitCard from "../components/HabitCard.jsx";
import { getHabits, saveHabits } from "../utils/storage.js";
import { applyCheckIn } from "../utils/streaks.js";

export default function Home() {
  const [habits, setHabits] = useState([]);

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
    const next = habits.map((h) => (h.id === id ? applyCheckIn(h, mood, note) : h));
    updateHabits(next);
  }

  return (
    <div>
      <h2 className="pageTitle">Your Habits</h2>
      <p className="softText">
        Consistency beats intensity. Just show up.
      </p>


      {habits.length === 0 ? (
        <div className="card">No habits yet. Add one.</div>
      ) : (
        <div className="grid">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onDelete={handleDelete}
              onCheckIn={handleCheckIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
