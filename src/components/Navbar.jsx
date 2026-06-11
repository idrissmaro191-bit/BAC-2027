export default function Navbar({ onSearch }) {
  return (
    <nav className="navbar">
      <a
        className="navbar-menu"
        href="https://wa.me/212602034179"
        target="_blank"
        rel="noreferrer"
      >
        ☰
      </a>
      <span className="navbar-title">ملخصات 2Bac</span>
      <input
        className="navbar-search"
        type="text"
        placeholder="🔍 بحث..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </nav>
  );
}