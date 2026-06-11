import { useState } from "react";

export default function WelcomeMessage() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <button className="welcome-close" onClick={() => setVisible(false)}>✕</button>
        <div className="welcome-icon">🌟</div>
        <h2 className="welcome-title">أيها الطالب المجتهد!</h2>
        <p className="welcome-text">
          الباكالوريا ليست نهاية الطريق، بل بداية مستقبل مشرق.
          <br /><br />
          كل درس تقرأه اليوم هو خطوة نحو حلمك.
          <br /><br />
          لا تستسلم، فالنجاح يحب المثابرين! 💪
        </p>
      </div>
    </div>
  );
}