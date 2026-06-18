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
    supabase.from('messages').select('*').order('created_at').then(({ data }) => {
      if (data) setMessages(data);
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

  if (!username) return (
    <div className="chat-overlay">
      <div className="chat-box">
        <button className="chat-close" onClick={onClose}>✕</button>
        <h3>📢 فضاء التواصل</h3>
        <p>اكتب اسمك باش تدخل</p>
        <input className="chat-input" placeholder="اسمك..." value={nameInput} onChange={e => setNameInput(e.target.value)} />
        <button className="chat-send" onClick={saveName}>دخول ✓</button>
      </div>
    </div>
  );

  return (
    <div className="chat-overlay">
      <div className="chat-box">
        <button className="chat-close" onClick={onClose}>✕</button>
        <h3>📢 فضاء التواصل</h3>
        <div className="chat-messages">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.username === username ? 'mine' : 'theirs'}`}>
              <span className="chat-user">{m.username}</span>
              <span className="chat-text">{m.message}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-footer">
          <input className="chat-input" placeholder="اكتب رسالة..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
          <button className="chat-send" onClick={sendMessage}>إرسال</button>
        </div>
      </div>
    </div>
  );
}