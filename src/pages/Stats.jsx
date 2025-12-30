import { useEffect, useMemo, useState } from "react";
import { getHabits } from "../utils/storage.js";
import { getTodayISO } from "../utils/dates.js";

function getLastNDatesISO(n) {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);

  for (let i = 0; i < n; i++) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    out.push(`${yyyy}-${mm}-${dd}`);
    d.setDate(d.getDate() - 1);
  }
  return out;
}

function normalizeCheckIns(checkIns) {
  // supports old format ["YYYY-MM-DD"] and new format [{date,mood,note}]
  if (!Array.isArray(checkIns)) return [];
  if (checkIns.length === 0) return [];

  if (typeof checkIns[0] === "string") {
    return checkIns.map((date) => ({ date }));
  }

  return checkIns
    .map((x) => (x && typeof x === "object" ? x : null))
    .filter(Boolean);
}

export default function Stats() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const stats = useMemo(() => {
    const today = getTodayISO();
    const total = habits.length;

    const completedToday = habits.filter((h) => h.lastCheckIn === today).length;

    const bestOverall =
      total === 0 ? 0 : Math.max(...habits.map((h) => h.bestStreak || 0));

    const last7 = new Set(getLastNDatesISO(7));
    const last30 = new Set(getLastNDatesISO(30));

    let weeklyCheckIns = 0;
    let monthlyCheckIns = 0;

    for (const h of habits) {
      const entries = normalizeCheckIns(h.checkIns);

      for (const e of entries) {
        if (!e.date) continue;
        if (last7.has(e.date)) weeklyCheckIns += 1;
        if (last30.has(e.date)) monthlyCheckIns += 1;
      }
    }

    const weeklyAvgPerHabit = total === 0 ? 0 : (weeklyCheckIns / total);

    return {
      today,
      total,
      completedToday,
      bestOverall,
      weeklyCheckIns,
      monthlyCheckIns,
      weeklyAvgPerHabit,
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

        <StatCard label="Check-ins last 7 days" value={stats.weeklyCheckIns} />
        <StatCard label="Check-ins last 30 days" value={stats.monthlyCheckIns} />
        <StatCard
          label="Weekly average per habit"
          value={stats.weeklyAvgPerHabit.toFixed(1)}
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="habitMeta">{label}</div>
      <div className="statValue">{value}</div>
    </div>
  );
}
