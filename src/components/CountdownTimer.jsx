import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2027-06-04T08:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    finished: false,
  };
}

const TOTAL_DAYS = Math.floor((TARGET_DATE - new Date("2026-06-11")) / (1000 * 60 * 60 * 24));

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = ((TOTAL_DAYS - timeLeft.days) / TOTAL_DAYS) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (progress / 100) * circumference;

  if (timeLeft.finished) return <div className="ct-finished">🎉 حظاً موفقاً في الباكالوريا!</div>;

  return (
    <div className="ct-wrapper">
      <p className="ct-title">الامتحان الوطني للباكالوريا 2027</p>
      <div className="ct-circle-container">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#e0e0e0" strokeWidth="12" />
          <circle
            cx="100" cy="100" r={radius}
            fill="none"
            stroke="#4a90d9"
            strokeWidth="12"
            strokeDasharray={`${strokeDash} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="ct-inner-text">
          <span className="ct-label">متبقي</span>
          <span className="ct-time">
            {timeLeft.days} يوم و {String(timeLeft.hours).padStart(2,"0")}:{String(timeLeft.minutes).padStart(2,"0")}:{String(timeLeft.seconds).padStart(2,"0")}
          </span>
        </div>
      </div>
    </div>
  );
}