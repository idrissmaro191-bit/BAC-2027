import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const subjects = [
  { id: 1, name: 'التربية الإسلامية', icon: '☪️' },
  { id: 2, name: 'الفلسفة', icon: '🧠' },
  { id: 3, name: 'اللغة العربية', icon: '📖' },
  { id: 4, name: 'اللغة الفرنسية', icon: '🇫🇷' },
  { id: 5, name: 'اللغة الإنجليزية', icon: '🇬🇧' },
  { id: 6, name: 'التاريخ والجغرافيا', icon: '🗺️' },
]

const nationals = [
  { id: 7, name: 'اللغة العربية', icon: '📖' },
  { id: 8, name: 'الفلسفة', icon: '🧠' },
  { id: 9, name: 'اللغة الإنجليزية', icon: '🇬🇧' },
  { id: 10, name: 'الاجتماعيات', icon: '🗺️' },
]

function SplashScreen() {
  return (
    <div className="splash">
      <div className="splash-title">ملخصات 2Bac</div>
    </div>
  )
}

function App() {
  const [splash, setSplash] = useState(true)
  const [selected, setSelected] = useState(null)
  const [lessons, setLessons] = useState([])
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selected) {
      supabase.from('lessons').select('*').eq('subject_id', selected).then(({ data }) => setLessons(data || []))
    }
  }, [selected])

  if (splash) return <SplashScreen />

  if (lesson) return (
    <div className="app">
      <button onClick={() => setLesson(null)}>← رجوع</button>
      <h2>{lesson.title}</h2>
      <div className="content">{lesson.content}</div>
    </div>
  )

  if (selected) return (
    <div className="app">
      <button onClick={() => setSelected(null)}>← رجوع</button>
      <h2>{[...subjects, ...nationals].find(s => s.id === selected)?.name}</h2>
      {lessons.length === 0 ? <p>لا توجد دروس بعد</p> : lessons.map(l => (
        <div key={l.id} className="card" onClick={() => setLesson(l)}>{l.title}</div>
      ))}
    </div>
  )

  return (
    <div className="app">
      <h1 className="section-title">📚 ملخصات الباكالوريا</h1>
      <p>اختر المادة</p>
      <div className="grid">
        {subjects.map(s => (
          <div key={s.id} className="card" onClick={() => setSelected(s.id)}>
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>
      <h1 className="section-title" style={{marginTop: '40px'}}>📝 وطنيات الباكالوريا</h1>
      <p>اختر المادة</p>
      <div className="grid">
        {nationals.map(s => (
          <div key={s.id} className="card" onClick={() => setSelected(s.id)}>
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App