import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHabits, saveHabits } from "../utils/storage.js";

export default function AddHabit() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    const habits = getHabits();

    const newHabit = {
      id: crypto.randomUUID(),
      name: trimmed,
      createdAt: new Date().toISOString(),
      checkIns: [],
      streak: 0,
      bestStreak: 0,
      lastCheckIn: null,
    };

    saveHabits([newHabit, ...habits]);
    navigate("/");
  }

  return (
    <div>
      <h2 className="pageTitle">Add Habit</h2>

      <form className="grid" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Example: Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btnPrimary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
