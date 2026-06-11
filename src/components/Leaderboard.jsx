import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Leaderboard({ onClose }) {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data } = await supabase
      .from("leaderboard")
      .select("*")
      .order("score", { ascending: false })
      .limit(10);
    if (data) setPlayers(data);
  }

  async function addPlayer() {
    if (!name.trim()) return;
    setLoading(true);
    await supabase.from("leaderboard").insert({ name: name.trim(), score: 0 });
    setName("");
    await fetchPlayers();
    setLoading(false);
  }

  return (
    <div className="lb-overlay">
      <div className="lb-card">
        <button className="lb-close" onClick={onClose}>✕</button>
        <h2 className="lb-title">🏆 لوحة المتصدرين</h2>
        <div className="lb-input-row">
          <input
            className="lb-input"
            placeholder="اكتب اسمك..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="lb-btn" onClick={addPlayer} disabled={loading}>
            {loading ? "..." : "دخول"}
          </button>
        </div>
        <div className="lb-list">
          {players.map((p, i) => (
            <div key={p.id} className="lb-item">
              <span className="lb-rank">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
              </span>
              <span className="lb-name">{p.name}</span>
              <span className="lb-score">{p.score} درس</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}