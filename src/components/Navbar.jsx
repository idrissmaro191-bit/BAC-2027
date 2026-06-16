import { useState } from "react";
import Leaderboard from "./Leaderboard";
import Chat from "./Chat";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <nav className="navbar">
        <button className="navbar-menu-btn" onClick={() => setOpen(!open)}>☰</button>
        <span className="navbar-title">ملخصات 2Bac</span>
      </nav>

      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <button className="sidebar-close" onClick={() => setOpen(false)}>✕</button>
            <h3 className="sidebar-title">القائمة</h3>
            <a className="sidebar-item" href="mailto:idrissmarzoug170@gmail.com">📧 البريد الإلكتروني</a>
            <a className="sidebar-item" href="https://wa.me/212602034179" target="_blank" rel="noreferrer">💬 واتساب</a>
            <button className="sidebar-item" onClick={() => { setShowLeaderboard(true); setOpen(false); }}>🏆 لوحة المتصدرين</button>
            <button className="sidebar-item" onClick={() => { setOpen(false); }}>📢 فضاء التواصل</button>
          </div>
        </div>
      )}

      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
    </>
  );
}