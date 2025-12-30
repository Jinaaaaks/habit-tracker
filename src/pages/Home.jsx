import { useEffect, useState } from "react";
import { getHabits } from "../utils/storage.js";

export default function Home() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  return (
    <div>
      <h2 className="pageTitle">Home</h2>

      <div className="card">
        <div>Total habits: <b>{habits.length}</b></div>
      </div>
    </div>
  );
}
