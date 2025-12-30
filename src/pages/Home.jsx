import { useEffect, useState } from "react";
import { getHabits } from "../utils/storage.js";

export default function Home() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  return (
    <div>
      <h2 className="pageTitle">Your Habits</h2>

      <div className="card" style={{ marginBottom: 10 }}>
        Total habits: <b>{habits.length}</b>
      </div>

      {habits.length === 0 ? (
        <div className="card">No habits yet. Add one.</div>
      ) : (
        <div className="grid">
          {habits.map((h) => (
            <div className="card" key={h.id}>
              <div style={{ fontWeight: 800 }}>{h.name}</div>
              <div style={{ opacity: 0.8, marginTop: 6, fontSize: 13 }}>
                Streak: {h.streak} | Best: {h.bestStreak}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
