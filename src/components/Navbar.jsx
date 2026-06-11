import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-menu-wrapper">
        <button className="navbar-menu-btn" onClick={() => setOpen(!open)}>☰</button>
        {open && (
          <div className="navbar-dropdown">
            <a href="mailto:idrissmarzoug170@gmail.com">📧 idrissmarzoug170@gmail.com</a>
            <a href="https://wa.me/212602034179" target="_blank" rel="noreferrer">💬 واتساب: 0602034179</a>
          </div>
        )}
      </div>
      <span className="navbar-title">ملخصات 2Bac</span>
    </nav>
  );
}