import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

const bannedWords = ['شتيمة1', 'شتيمة2'];

export default function Chat({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState(() => localStorage.getItem('chat_username') || '');
  const [nameInput, setNameInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    supabase.from('messages').select('*').order('created_at').then(({ data, error }) => {
      if (data) setMessages(data);
      if (error) console.log("Supabase Error:", error.message);
    });

    const channel = supabase.channel('messages').on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => setMessages(prev => [...prev, payload.new])
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const hasBanned = bannedWords.some(w => input.includes(w));
    if (hasBanned) { alert('⚠️ رسالتك تحتوي على كلمات غير لائقة!'); return; }
    await supabase.from('messages').insert([{ username, message: input.trim() }]);
    setInput('');
  };

  const saveName = () => {
    if (!nameInput.trim()) return;
    localStorage.setItem('chat_username', nameInput.trim());
    setUsername(nameInput.trim());
  };

  // الستايلات المدمجة لضمان ظهور النافذة فوق كل شيء بوضوح
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  };

  const boxStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '450px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '85vh',
    color: '#333'
  };

  if (!username) return (
    <div style={overlayStyle} className="chat-overlay">
      <div style={boxStyle} className="chat-box">
        <button className="chat-close" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#333' }}>✕</button>
        <h3 style={{ marginTop: 0, textAlign: 'center' }}>📢 فضاء التواصل</h3>
        <p style={{ textAlign: 'center' }}>اكتب اسمك باش تدخل</p>
        <input className="chat-input" placeholder="اسمك..." value={nameInput} onChange={e => setNameInput(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px', width: '100%', boxSizing: 'border-box' }} />
        <button className="chat-send" onClick={saveName} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', width: '100%' }}>دخول ✓</button>
      </div>
    </div>
  );

  return (
    <div style={overlayStyle} className="chat-overlay">
      <div style={boxStyle} className="chat-box">
        <button className="chat-close" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#333' }}>✕</button>
        <h3 style={{ marginTop: 0, textAlign: 'center' }}>📢 فضاء التواصل</h3>
        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '6px', minHeight: '200px' }}>
          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.username === username ? 'mine' : 'theirs'}`} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: m.username === username ? 'flex-end' : 'flex-start' }}>
              <span className="chat-user" style={{ fontSize: '12px', color: '#777', fontWeight: 'bold' }}>{m.username}</span>
              <span className="chat-text" style={{ backgroundColor: m.username === username ? '#007bff' : '#e9ecef', color: m.username === username ? '#fff' : '#333', padding: '8px 12px', borderRadius: '12px', marginTop: '2px', display: 'inline-block' }}>{m.message}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-footer" style={{ display: 'flex', gap: '5px' }}>
          <input className="chat-input" placeholder="اكتب رسالة..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
          <button className="chat-send" onClick={sendMessage} style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>إرسال</button>
        </div>
      </div>
    </div>
  );
}