import { useState } from "react";
import { getTodayISO } from "../utils/dates.js";

const MOODS = ["🙂", "😮‍💨", "😤", "😌", "🔥", "🫠"];

export default function HabitCard({ habit, onDelete, onCheckIn }) {
  const today = getTodayISO();
  const checkedToday = habit.lastCheckIn === today;

  const [showReflect, setShowReflect] = useState(false);
  const [mood, setMood] = useState("🙂");
  const [note, setNote] = useState("");

  function openReflect() {
    setShowReflect(true);
  }

  function submitReflect() {
    onCheckIn(habit.id, mood, note);
    setNote("");
    setMood("🙂");
    setShowReflect(false);
  }

  // show last reflection if it exists
  const lastEntry = Array.isArray(habit.checkIns) && habit.checkIns.length
    ? habit.checkIns[habit.checkIns.length - 1]
    : null;

  const lastNote = lastEntry && lastEntry.note ? lastEntry.note : "";
  const lastMood = lastEntry && lastEntry.mood ? lastEntry.mood : "";

  return (
    <div className="card">
      <div className="habitRow">
        <div>
          <div className="habitName">{habit.name}</div>
          <div className="habitMeta">
            Streak: {habit.streak} | Best: {habit.bestStreak}
            {habit.lastCheckIn ? <> | Last: {habit.lastCheckIn}</> : null}
          </div>

          {lastEntry ? (
            <div className="reflectionLine">
              <span className="moodBubble">{lastMood}</span>
              <span className="reflectionText">
                {lastNote ? lastNote : "Checked in. No note today."}
              </span>
            </div>
          ) : null}
        </div>

        <div className="actions">
          <button
            className={checkedToday ? "btn btnDisabled" : "btn btnPrimary"}
            disabled={checkedToday}
            onClick={openReflect}
          >
            {checkedToday ? "Done" : "Check in"}
          </button>

          <button className="btn" onClick={() => onDelete(habit.id)}>
            Delete
          </button>
        </div>
      </div>

      {showReflect ? (
        <div className="reflectBox">
          <div className="reflectTitle">How did it feel today?</div>

          <div className="moodRow">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                className={mood === m ? "moodBtn moodBtnActive" : "moodBtn"}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>

          <input
            className="input"
            placeholder="One line. Keep it real."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="actions">
            <button className="btn" type="button" onClick={() => setShowReflect(false)}>
              Cancel
            </button>
            <button className="btn btnPrimary" type="button" onClick={submitReflect}>
              Save check-in
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
