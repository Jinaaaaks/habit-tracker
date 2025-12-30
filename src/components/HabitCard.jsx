export default function HabitCard({ habit, onDelete }) {
  return (
    <div className="card habitRow">
      <div>
        <div className="habitName">{habit.name}</div>
        <div className="habitMeta">
          Streak: {habit.streak} | Best: {habit.bestStreak}
        </div>
      </div>

      <button className="btn" onClick={() => onDelete(habit.id)}>
        Delete
      </button>
    </div>
  );
}
