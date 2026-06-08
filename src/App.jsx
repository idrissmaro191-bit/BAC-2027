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

const lessonsBySubject = {
  1: [
    { id: 101, title: 'سورة يس: الجزء الأول (من الآية 1 إلى الآية 11)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 102, title: 'سورة يس: الجزء الثاني (من الآية 12 إلى الآية 28)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 103, title: 'سورة يس: الجزء الثالث (من الآية 29 إلى الآية 43)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 104, title: 'سورة يس: الجزء الرابع (من الآية 44 إلى الآية 53)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 105, title: 'سورة يس: الجزء الخامس (من الآية 54 إلى الآية 67)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 106, title: 'سورة يس: الجزء السادس (من الآية 68 إلى الآية 82)', section: 'محور التزكية (القرآن الكريم)' },
    { id: 107, title: 'التوحيد والحرية', section: 'محور التزكية (العقيدة)' },
    { id: 108, title: 'الإلحاد بين الوهم والحقيقة', section: 'محور التزكية (العقيدة)' },
    { id: 109, title: 'النظر والتفكر سبيل العلم والإيمان', section: 'محور التزكية (العقيدة)' },
    { id: 110, title: 'القرآن الكريم منهج حياة', section: 'محور التزكية (العقيدة)' },
    { id: 111, title: 'إكمال الدين ووفاة الرسول صلى الله عليه وسلم', section: 'محور الإقتداء' },
    { id: 112, title: 'الرسول صلى الله عليه وسلم نموذج الكمال البشري', section: 'محور الإقتداء' },
    { id: 113, title: 'نماذج للتأسي: علي كرم الله وجهه وزينة القوة والعلم', section: 'محور الإقتداء' },
    { id: 114, title: 'واجبنا نحو الرسول صلى الله عليه وسلم', section: 'محور الإقتداء' },
    { id: 115, title: 'الخصائص العامة للشريعة الإسلامية', section: 'محور الإستجابة' },
    { id: 116, title: 'مقاصد الشريعة الإسلامية', section: 'محور الإستجابة' },
    { id: 117, title: 'ضوابط فهم النص الشرعي (القرآن والسنة)', section: 'محور الإستجابة' },
    { id: 118, title: 'الإجتهاد والتجديد', section: 'محور الإستجابة' },
    { id: 119, title: 'حق الله: الاعتزاز بالإسلام', section: 'محور القسط' },
    { id: 120, title: 'حق النفس: التوسط والاعتدال', section: 'محور القسط' },
    { id: 121, title: 'حق الغير: خطبة الوداع وحقوق الإنسان', section: 'محور القسط' },
    { id: 122, title: 'حق البيئة: إن الله جميل يحب الجمال', section: 'محور القسط' },
    { id: 123, title: 'التصور الإسلامي للحرية', section: 'محور الحكمة' },
    { id: 124, title: 'الإسلام وبناء الحضارة الإنسانية', section: 'محور الحكمة' },
    { id: 125, title: 'الرحمة والرفق', section: 'محور الحكمة' },
    { id: 126, title: 'صفات عباد الرحمان', section: 'محور الحكمة' },
  ],
}

function SplashScreen() {
  return (
    <div className="splash">
      <div className="splash-title">
        ملخصات
        <br/>
        2Bac
      </div>
    </div>
  )
}

function App() {
  const [splash, setSplash] = useState(true)
  const [selected, setSelected] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  if (splash) return <SplashScreen />

  if (lesson) return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="topbar">
        <button onClick={() => setLesson(null)}>← رجوع</button>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
      </div>
      <h2>{lesson.title}</h2>
      <div className="content">PDF قريباً</div>
    </div>
  )

  if (selected) {
    const lessons = lessonsBySubject[selected] || []
    const sections = [...new Set(lessons.map(l => l.section))]
    return (
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <div className="topbar">
          <button onClick={() => setSelected(null)}>← رجوع</button>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
        </div>
        <h2>{[...subjects, ...nationals].find(s => s.id === selected)?.name}</h2>
        {lessons.length === 0 ? <p>لا توجد دروس بعد</p> : sections.map(section => (
          <div key={section}>
            <h3 className="section-header">{section}</h3>
            {lessons.filter(l => l.section === section).map(l => (
              <div key={l.id} className="card" onClick={() => setLesson(l)}>{l.title}</div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="topbar">
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
      </div>
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