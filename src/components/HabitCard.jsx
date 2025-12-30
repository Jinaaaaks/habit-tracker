import { getTodayISO } from "../utils/dates.js";

export default function HabitCard({ habit, onDelete, onCheckIn }) {
  const today = getTodayISO();
  const checkedToday = habit.lastCheckIn === today;

  return (
    <div className="card habitRow">
      <div>
        <div className="habitName">{habit.name}</div>
        <div className="habitMeta">
          Streak: {habit.streak} | Best: {habit.bestStreak}
          {habit.lastCheckIn ? <> | Last: {habit.lastCheckIn}</> : null}
        </div>
      </div>

      <div className="actions">
        <button
          className={checkedToday ? "btn btnDisabled" : "btn btnPrimary"}
          onClick={() => onCheckIn(habit.id)}
          disabled={checkedToday}
        >
          {checkedToday ? "Done" : "Done today"}
        </button>

        <button className="btn" onClick={() => onDelete(habit.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
