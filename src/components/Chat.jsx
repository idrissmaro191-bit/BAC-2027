export default function Chat({ onClose }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ color: 'green' }}>Success ✅</h2>
        <p style={{ color: 'black' }}>Navbar trigger is working perfectly.</p>
        <button onClick={onClose} style={{ marginTop: '20px', padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Close
        </button>
      </div>
    </div>
  );
}