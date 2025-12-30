import { useEffect, useMemo, useState } from "react";
import { getHabits } from "../utils/storage.js";
import { getTodayISO } from "../utils/dates.js";

export default function Stats() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const stats = useMemo(() => {
    const total = habits.length;
    const today = getTodayISO();

    const completedToday = habits.filter(
      (h) => h.lastCheckIn === today
    ).length;

    const bestOverall =
      habits.length === 0
        ? 0
        : Math.max(...habits.map((h) => h.bestStreak || 0));

    return {
      total,
      completedToday,
      bestOverall,
      today,
    };
  }, [habits]);

  return (
    <div>
      <h2 className="pageTitle">Stats</h2>

      <div className="grid">
        <StatCard label="Today" value={stats.today} />
        <StatCard label="Total habits" value={stats.total} />
        <StatCard label="Completed today" value={stats.completedToday} />
        <StatCard label="Best streak overall" value={stats.bestOverall} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="habitMeta">{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>
        {value}
      </div>
    </div>
  );
}
