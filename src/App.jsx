import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import CountdownTimer from "./components/CountdownTimer";
import Navbar from "./components/Navbar";
import WelcomeMessage from "./components/WelcomeMessage";

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
const methodologies = [
  { id: 11, name: 'اللغة العربية', icon: '📖' },
  { id: 12, name: 'الفلسفة', icon: '🧠' },
]

const lessonsBySubject = {
  1: [
    { id: 101, title: 'سورة يس: الجزء الأول (من الآية 1 إلى الآية 11)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 102, title: 'سورة يس: الجزء الثاني (من الآية 12 إلى الآية 28)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 103, title: 'سورة يس: الجزء الثالث (من الآية 29 إلى الآية 43)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 104, title: 'سورة يس: الجزء الرابع (من الآية 44 إلى الآية 53)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 105, title: 'سورة يس: الجزء الخامس (من الآية 54 إلى الآية 67)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 106, title: 'سورة يس: الجزء السادس (من الآية 68 إلى الآية 82)', section: 'محور التزكية (القرآن الكريم)', module: 'محور التزكية (القرآن الكريم)' },
    { id: 107, title: 'التوحيد والحرية', section: 'محور التزكية (العقيدة)', module: 'محور التزكية (العقيدة)' },
    { id: 108, title: 'الإلحاد بين الوهم والحقيقة', section: 'محور التزكية (العقيدة)', module: 'محور التزكية (العقيدة)' },
    { id: 109, title: 'النظر والتفكر سبيل العلم والإيمان', section: 'محور التزكية (العقيدة)', module: 'محور التزكية (العقيدة)' },
    { id: 110, title: 'القرآن الكريم منهج حياة', section: 'محور التزكية (العقيدة)', module: 'محور التزكية (العقيدة)' },
    { id: 111, title: 'إكمال الدين ووفاة الرسول صلى الله عليه وسلم', section: 'محور الإقتداء', module: 'محور الإقتداء' },
    { id: 112, title: 'الرسول صلى الله عليه وسلم نموذج الكمال البشري', section: 'محور الإقتداء', module: 'محور الإقتداء' },
    { id: 113, title: 'نماذج للتأسي: علي كرم الله وجهه وزينة القوة والعلم', section: 'محور الإقتداء', module: 'محور الإقتداء' },
    { id: 114, title: 'واجبنا نحو الرسول صلى الله عليه وسلم', section: 'محور الإقتداء', module: 'محور الإقتداء' },
    { id: 115, title: 'الخصائص العامة للشريعة الإسلامية', section: 'محور الإستجابة', module: 'محور الإستجابة' },
    { id: 116, title: 'مقاصد الشريعة الإسلامية', section: 'محور الإستجابة', module: 'محور الإستجابة' },
    { id: 117, title: 'ضوابط فهم النص الشرعي (القرآن والسنة)', section: 'محور الإستجابة', module: 'محور الإستجابة' },
    { id: 118, title: 'الإجتهاد والتجديد', section: 'محور الإستجابة', module: 'محور الإستجابة' },
    { id: 119, title: 'حق الله: الاعتزاز بالإسلام', section: 'محور القسط', module: 'محور القسط' },
    { id: 120, title: 'حق النفس: التوسط والاعتدال', section: 'محور القسط', module: 'محور القسط' },
    { id: 121, title: 'حق الغير: خطبة الوداع وحقوق الإنسان', section: 'محور القسط', module: 'محور القسط' },
    { id: 122, title: 'حق البيئة: إن الله جميل يحب الجمال', section: 'محور القسط', module: 'محور القسط' },
    { id: 123, title: 'التصور الإسلامي للحرية', section: 'محور الحكمة', module: 'محور الحكمة' },
    { id: 124, title: 'الإسلام وبناء الحضارة الإنسانية', section: 'محور الحكمة', module: 'محور الحكمة' },
    { id: 125, title: 'الرحمة والرفق', section: 'محور الحكمة', module: 'محور الحكمة' },
    { id: 126, title: 'صفات عباد الرحمان', section: 'محور الحكمة', module: 'محور الحكمة' },
  ],
  2: [
  { id: 201, title: 'مفهوم الشخص (المحور الأول : الشخص والهوية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alshkhs-almhor-alaol-alshkhs-oalhoia.pdf', section: 'مفهوم الشخص', module: 'مفهوم الشخص' },
  { id: 202, title: 'مفهوم الشخص (المحور الثاني : الشخص بوصفه قيمة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alshkhs-almhor-althani-alshkhs-bosfh-qima (2).pdf', section: 'مفهوم الشخص', module: 'مفهوم الشخص' },
  { id: 203, title: 'مفهوم الشخص (المحور الثالث : الشخص بين الضرورة والحرية)', pdf_url: null, section: 'مفهوم الشخص', module: 'مفهوم الشخص' },
  { id: 204, title: 'مفهوم الغير (المحور الأول : وجود الغير)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alghir-almhor-alaol-ojod-alghir (1).pdf', section: 'مفهوم الغير', module: 'مفهوم الغير' },
  { id: 205, title: 'مفهوم الغير (المحور الثاني : معرفة الغير)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/alghir-7 (1).pdf', section: 'مفهوم الغير', module: 'مفهوم الغير' },
  { id: 206, title: 'مفهوم الغير (المحور الثالث : العلاقة مع الغير)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alghir-almhor-althalth-alalaqa-ma-alghir.pdf', section: 'مفهوم الغير', module: 'مفهوم الغير' },
  { id: 207, title: 'مفهوم التاريخ (المحور الأول : المعرفة التاريخية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-altarikh-almhor-alaol-almarfa-altarikhia-4.pdf', section: 'مفهوم التاريخ', module: 'مفهوم التاريخ' },
  { id: 208, title: 'مفهوم التاريخ (المحور الثاني : التاريخ وفكرة التقدم)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/cours-falsafa-2bac-29.pdf', section: 'مفهوم التاريخ', module: 'مفهوم التاريخ' },
  { id: 209, title: 'مفهوم التاريخ (المحور الثالث : دور الإنسان في التاريخ)', pdf_url: null, section: 'مفهوم التاريخ', module: 'مفهوم التاريخ' },
  { id: 210, title: 'مفهوم النظرية والتجربة (المحور الأول : التجربة والتجريب)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alnthria-oaltjrba-almhor-alaol-altjrba-oaltjrib (1).pdf', section: 'مفهوم النظرية والتجربة', module: 'مفهوم النظرية والتجربة' },
  { id: 211, title: 'مفهوم النظرية والتجربة (المحور الثاني : العقلانية العلمية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alnthria-oaltjrba-almhor-althani-alaqlania-alalmia (2).pdf', section: 'مفهوم النظرية والتجربة', module: 'مفهوم النظرية والتجربة' },
  { id: 212, title: 'مفهوم النظرية والتجربة (المحور الثالث : معايير علمية النظريات العلمية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alnthria-oaltjrba-almhor-althalth-maaiir-almia-alnthriat-alalmia (1).pdf', section: 'مفهوم النظرية والتجربة', module: 'مفهوم النظرية والتجربة' },
  { id: 213, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الأول : موضعة العلوم الإنسانية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-almsala-alalmia-fi-alalom-alinsania-almhor-alaol-modhaa-alalom-alinsania-4.pdf', section: 'مفهوم المسألة العلمية', module: 'مفهوم المسألة العلمية' },
  { id: 214, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الثاني : التفسير والفهم في العلوم الإنسانية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-almsala-alalmia-fi-alalom-alinsania-almhor-althani-altfsir-oalfhm-fi-alalom-alinsania-4.pdf', section: 'مفهوم المسألة العلمية', module: 'مفهوم المسألة العلمية' },
  { id: 215, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الثالث : نموذجية العلوم التجريبية)', pdf_url: null, section: 'مفهوم المسألة العلمية', module: 'مفهوم المسألة العلمية' },
  { id: 216, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الرابع : نموذج السوسيولوجيا)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-almsala-alalmia-fi-alalom-alinsania-almhor-alraba-nmothj-alsosiolojia-4 (1).pdf', section: 'مفهوم المسألة العلمية', module: 'مفهوم المسألة العلمية' },
  { id: 217, title: 'مفهوم الحقيقة (المحور الأول : الرأي والحقيقة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhqiqa-almhor-alaol-alrai-oalhqiqa-8 (1).pdf', section: 'مفهوم الحقيقة', module: 'مفهوم الحقيقة' },
  { id: 218, title: 'مفهوم الحقيقة (المحور الثاني : معايير الحقيقة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhqiqa-almhor-althani-maaiir-alhqiqa-23.pdf', section: 'مفهوم الحقيقة', module: 'مفهوم الحقيقة' },
  { id: 219, title: 'مفهوم الحقيقة (المحور الثالث : الحقيقة بوصفها قيمة)', pdf_url: null, section: 'مفهوم الحقيقة', module: 'مفهوم الحقيقة' },
  { id: 220, title: 'مفهوم الدولة (المحور الأول : مشروعية الدولة وغاياتها)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-aldola-almhor-alaol-mshroaia-aldola-oghaiatha-23.pdf', section: 'مفهوم الدولة', module: 'مفهوم الدولة' },
  { id: 221, title: 'مفهوم الدولة (المحور الثاني : طبيعة السلطة السياسية)', pdf_url: null, section: 'مفهوم الدولة', module: 'مفهوم الدولة' },
  { id: 222, title: 'مفهوم الدولة (المحور الثالث : الدولة بين الحق والعنف)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-aldola-almhor-althalth-aldola-bin-alhq-oalanf-23.pdf', section: 'مفهوم الدولة', module: 'مفهوم الدولة' },
  { id: 223, title: 'مفهوم العنف (المحور الأول : أشكال العنف)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alanf-almhor-alaol-ashkal-alanf-4.pdf', section: 'مفهوم العنف', module: 'مفهوم العنف' },
  { id: 224, title: 'مفهوم العنف (المحور الثاني : العنف في التاريخ)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alanf-almhor-althani-alanf-fi-altarikh-4.pdf', section: 'مفهوم العنف', module: 'مفهوم العنف' },
  { id: 225, title: 'مفهوم العنف (المحور الثالث : العنف والمشروعية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alanf-almhor-althalth-alanf-oalmshroaia-4.pdf', section: 'مفهوم العنف', module: 'مفهوم العنف' },
  { id: 226, title: 'مفهوم الحق والعدالة (المحور الأول : الحق بين الطبيعي والوضعي)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhq-oaladala-almhor-alaol-alhq-bin-altbiai-oalodhai-23.pdf', section: 'مفهوم الحق والعدالة', module: 'مفهوم الحق والعدالة' },
  { id: 227, title: 'مفهوم الحق والعدالة (المحور الثاني : العدالة أساس الحق)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhq-oaladala-almhor-althani-aladala-asas-alhq-23 (1).pdf', section: 'مفهوم الحق والعدالة', module: 'مفهوم الحق والعدالة' },
  { id: 228, title: 'مفهوم الحق والعدالة (المحور الثالث : العدالة بين المساواة والإنصاف)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhq-oaladala-almhor-althalth-aladala-bin-almsaoaa-oalinsaf-23.pdf', section: 'مفهوم الحق والعدالة', module: 'مفهوم الحق والعدالة' },
  { id: 229, title: 'مفهوم الواجب (المحور الأول : الواجب والإكراه)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-aloajb-almhor-alaol-aloajb-oalikrah-19.pdf', section: 'مفهوم الواجب', module: 'مفهوم الواجب' },
  { id: 230, title: 'مفهوم الواجب (المحور الثاني : الوعي الأخلاقي)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-aloajb-almhor-althani-aloai-alakhlaqi-19 (1).pdf', section: 'مفهوم الواجب', module: 'مفهوم الواجب' },
  { id: 231, title: 'مفهوم الواجب (المحور الثالث : الواجب والمجتمع)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-aloajb-almhor-althalth-aloajb-oalmjtma-19.pdf', section: 'مفهوم الواجب', module: 'مفهوم الواجب' },
  { id: 232, title: 'مفهوم السعادة (المحور الأول : تمثلات السعادة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alsaada-almhor-alaol-tmthlat-alsaada-4.pdf', section: 'مفهوم السعادة', module: 'مفهوم السعادة' },
  { id: 233, title: 'مفهوم السعادة (المحور الثاني : البحث عن السعادة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alsaada-almhor-althani-albhth-an-alsaada-2.pdf', section: 'مفهوم السعادة', module: 'مفهوم السعادة' },
  { id: 234, title: 'مفهوم السعادة (المحور الثالث : السعادة والواجب)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alsaada-almhor-althalth-alsaada-oaloajb-4.pdf', section: 'مفهوم السعادة', module: 'مفهوم السعادة' },
  { id: 235, title: 'مفهوم الحرية (المحور الأول : الحرية والحتمية)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhria-almhor-alaol-alhria-oalhtmia-19.pdf', section: 'مفهوم الحرية', module: 'مفهوم الحرية' },
  { id: 236, title: 'مفهوم الحرية (المحور الثاني : الحرية والإرادة)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhria-almhor-althani-alhria-oalirada-21.pdf', section: 'مفهوم الحرية', module: 'مفهوم الحرية' },
  { id: 237, title: 'مفهوم الحرية (المحور الثالث : الحرية والقانون)', pdf_url: 'https://qvfehptlemzefylficvp.supabase.co/storage/v1/object/public/falsafa/mfhom-alhria-almhor-althalth-alhria-oalqanon-21.pdf', section: 'مفهوم الحرية', module: 'مفهوم الحرية' },
],
  3: [
    { id: 301, title: 'إحياء النموذج - نص نظري 1-1 : انبعاث الشعر العربي (محمد الكتاني)', section: 'إحياء النموذج', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 302, title: 'إحياء النموذج - نموذج شعري 1-1 : لي في من مضى مثل (محمود سامي البارودي)', section: 'إحياء النموذج', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 303, title: 'سؤال الذات - نص نظري 1-2 : الشعر الرومانسي (عبد المحسن طه بدر)', section: 'سؤال الذات', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 304, title: 'سؤال الذات - نموذج شعري 1-2 : إلى دودة (ميخائيل نعيمة)', section: 'سؤال الذات', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 305, title: 'الدرس اللغوي 1-1 : التكرار', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 306, title: 'الدرس اللغوي 1-2 : التوازي', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 307, title: 'الدرس اللغوي 1-3 : الصورة الشعرية (مكوناتها ووظائفها)', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 308, title: 'درس التعبير والإنشاء 1-1 : مهارة كتابة إنشاء أدبي حول نص شعري', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الأولى: الشعر العربي الحديث (إحياء النموذج وسؤال الذات)' },
    { id: 309, title: 'تكسير البنية - نص نظري 2-1 : قضايا الإطار الموسيقي الجديد للقصيدة (عز الدين إسماعيل)', section: 'تكسير البنية', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 310, title: 'تكسير البنية - نموذج شعري 2-1 : لنكن أصدقاء (نازك الملائكة)', section: 'تكسير البنية', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 311, title: 'تجديد الرؤيا - نص نظري 2-2 : قصيدة الرؤيا (أحمد علي سعيد أدونيس)', section: 'تجديد الرؤيا', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 312, title: 'تجديد الرؤيا - نموذج شعري 2-2 : سربروس في بابل (بدر شاكر السياب)', section: 'تجديد الرؤيا', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 313, title: 'الدرس اللغوي 2-1 : السطر الشعري', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 314, title: 'الدرس اللغوي 2-2 : المقطع الشعري', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 315, title: 'الدرس اللغوي 2-3 : الرمز', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 316, title: 'الدرس اللغوي 2-4 : الأسطورة', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 317, title: 'درس التعبير والإنشاء 2-1 : مهارة كتابة إنشاء أدبي حول قضية أدبية', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثانية: الشعر العربي الحديث (تكسير البنية وتجديد الرؤيا)' },
    { id: 318, title: 'القصة - نص نظري 3-1 : مميزات القصة القصيرة واتجاهاتها (محمد عزام)', section: 'القصة', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 319, title: 'القصة - نص قصصي 3-1 : دم ودخان (مبارك ربيع)', section: 'القصة', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 320, title: 'المسرحية - نص نظري 3-2 : سمات النص المسرحي (فرحان بلبل)', section: 'المسرحية', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 321, title: 'المسرحية - نص مسرحي 3-2 : امرؤ القيس في باريس (عبد الكريم برشيد)', section: 'المسرحية', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 322, title: 'الدرس اللغوي 3-1 : الخطاطة السردية', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 323, title: 'الدرس اللغوي 3-2 : النموذج العاملي', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 324, title: 'درس التعبير والإنشاء 3-1 : مهارة كتابة إنشاء أدبي حول نص نثري إبداعي', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الثالثة: أشكال نثرية حديثة (القصة والمسرحية)' },
    { id: 325, title: 'المنهج الاجتماعي - نص نظري: المنهج الاجتماعي (نبيل راغب)', section: 'المنهج الاجتماعي', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 326, title: 'المنهج الاجتماعي - نص تطبيقي: سوسيولوجية القصيدة العربية (نجيب العوفي)', section: 'المنهج الاجتماعي', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 327, title: 'المنهج البنيوي - نص نظري: المنهج البنيوي (صلاح فضل)', section: 'المنهج البنيوي', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 328, title: 'المنهج البنيوي - نص تطبيقي: من البنية إلى الدلالة (حسين الواد)', section: 'المنهج البنيوي', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 329, title: 'الدرس اللغوي: الإتساق', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 330, title: 'الدرس اللغوي: الإنسجام', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 331, title: 'الدرس اللغوي: أساليب الحجاج', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 332, title: 'درس التعبير والإنشاء: مهارة كتابة إنشاء أدبي حول قضية نقدية', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 333, title: 'درس التعبير والإنشاء: مهارة كتابة إنشاء أدبي حول قولة نقدية', section: 'الدروس اللغوية والتعبير', module: 'المجزوءة الرابعة: مناهج نقدية حديثة (المنهج الاجتماعي والمنهج البنيوي)' },
    { id: 334, title: 'ظاهرة الشعر الحديث لأحمد المعداوي المجاطي (قراءة توجيهية)', section: 'المحور الأول: ظاهرة الشعر العربي الحديث', module: 'مجزوءة المؤلفات' },
    { id: 335, title: 'ظاهرة الشعر الحديث لأحمد المعداوي المجاطي (الفصل الأول - التطور التدريجي في الشعر الحديث)', section: 'المحور الأول: ظاهرة الشعر العربي الحديث', module: 'مجزوءة المؤلفات' },
    { id: 336, title: 'ظاهرة الشعر الحديث لأحمد المعداوي المجاطي (الفصل الثاني - تجربة الغربة والضياع)', section: 'المحور الأول: ظاهرة الشعر العربي الحديث', module: 'مجزوءة المؤلفات' },
    { id: 337, title: 'ظاهرة الشعر الحديث لأحمد المعداوي المجاطي (الفصل الثالث - تجربة الموت والحياة)', section: 'المحور الأول: ظاهرة الشعر العربي الحديث', module: 'مجزوءة المؤلفات' },
    { id: 338, title: 'ظاهرة الشعر الحديث لأحمد المعداوي المجاطي (الفصل الرابع - الشكل الجديد)', section: 'المحور الأول: ظاهرة الشعر العربي الحديث', module: 'مجزوءة المؤلفات' },
    { id: 339, title: 'اللص والكلاب لنجيب محفوظ (قراءة توجيهية)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 340, title: 'اللص والكلاب لنجيب محفوظ (المنظور الأول - تتبع الحدث)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 341, title: 'اللص والكلاب لنجيب محفوظ (المنظور الثاني - تقويم القوى الفاعلة)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 342, title: 'اللص والكلاب لنجيب محفوظ (المنظور الثالث - الكشف عن البعد النفسي)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 343, title: 'اللص والكلاب لنجيب محفوظ (المنظور الرابع - المنظور الاجتماعي)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 344, title: 'اللص والكلاب لنجيب محفوظ (المنظور الخامس - منظور الأسلوب)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
    { id: 345, title: 'اللص والكلاب لنجيب محفوظ (القراءة التركيبية)', section: 'المحور الثاني: اللص والكلاب', module: 'مجزوءة المؤلفات' },
  ],
  4: [
    { id: 401, title: 'Le schéma actantiel', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 402, title: "Les types d'arguments", section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 403, title: 'Les tonalités', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 404, title: 'Discours direct et discours indirect', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 405, title: 'Les valeurs des temps verbaux', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 406, title: 'La caractérisation', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 407, title: 'La focalisation', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 408, title: 'Les Figures de style', section: 'Vocabulaire', module: 'Le programme pédagogique' },
    { id: 409, title: "Candide ou l'optimisme - La biographie de Voltaire", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 410, title: "Candide ou l'optimisme - Fiche de lecture", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 411, title: "Candide ou l'optimisme - Résumé", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 412, title: "Candide ou l'optimisme - Résumé chapitre par chapitre", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 413, title: "Candide ou l'optimisme - Les thémes", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 414, title: "Candide ou l'optimisme - Etude des personnages", section: "Candide ou l'optimisme", module: "Module 1 : Candide ou l'optimisme (Conte philosophique)" },
    { id: 415, title: "Il était une fois un vieux couple heureux - Biographie de Mohammed Khair-Eddine", section: "Il était une fois un vieux couple heureux", module: "Module 2 : Il était une fois un vieux couple heureux (Roman maghrébin contemporain)" },
    { id: 416, title: "Il était une fois un vieux couple heureux - Fiche de lecture", section: "Il était une fois un vieux couple heureux", module: "Module 2 : Il était une fois un vieux couple heureux (Roman maghrébin contemporain)" },
    { id: 417, title: "Il était une fois un vieux couple heureux - Résumé", section: "Il était une fois un vieux couple heureux", module: "Module 2 : Il était une fois un vieux couple heureux (Roman maghrébin contemporain)" },
    { id: 418, title: "Il était une fois un vieux couple heureux - Personnages principaux", section: "Il était une fois un vieux couple heureux", module: "Module 2 : Il était une fois un vieux couple heureux (Roman maghrébin contemporain)" },
    { id: 419, title: 'Le Père Goriot - Biographie de Balzac', section: 'Le Père Goriot', module: 'Module 3 : Le Père Goriot (Roman réaliste)' },
    { id: 420, title: 'Le Père Goriot - Fiche de lecture', section: 'Le Père Goriot', module: 'Module 3 : Le Père Goriot (Roman réaliste)' },
    { id: 421, title: 'Le Père Goriot - Résumé', section: 'Le Père Goriot', module: 'Module 3 : Le Père Goriot (Roman réaliste)' },
    { id: 422, title: 'Le Père Goriot - Personnages principaux', section: 'Le Père Goriot', module: 'Module 3 : Le Père Goriot (Roman réaliste)' },
  ],
  5: [
    { id: 501, title: 'Vocabulary 1', section: 'Vocabulary & Functions', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 502, title: 'Functions 1: Expressing opinions, agreeing and disagreeing', section: 'Vocabulary & Functions', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 503, title: 'Grammar 1: Gerund or infinitive', section: 'Grammar & Skills', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 504, title: 'Comprehension 1: A football legend', section: 'Grammar & Skills', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 505, title: 'Writing 1: Describing a person', section: 'Grammar & Skills', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 506, title: 'Language Quiz 1', section: 'Grammar & Skills', module: 'Unit 1 (Youth: Potential and Challenges)' },
    { id: 507, title: 'Vocabulary 2', section: 'Vocabulary & Functions', module: 'Unit 2 (Humour)' },
    { id: 508, title: 'Functions 2: Expressing lack of understanding and asking for clarification', section: 'Vocabulary & Functions', module: 'Unit 2 (Humour)' },
    { id: 509, title: 'Grammar 2: Modals', section: 'Grammar & Skills', module: 'Unit 2 (Humour)' },
    { id: 510, title: 'Comprehension 2: A talented humorist', section: 'Grammar & Skills', module: 'Unit 2 (Humour)' },
    { id: 511, title: 'Writing 2: A funny story', section: 'Grammar & Skills', module: 'Unit 2 (Humour)' },
    { id: 512, title: 'Language Quiz 2', section: 'Grammar & Skills', module: 'Unit 2 (Humour)' },
    { id: 513, title: 'Vocabulary 3', section: 'Vocabulary & Functions', module: 'Unit 3 (Education)' },
    { id: 514, title: 'Functions 3: Expressing purpose', section: 'Vocabulary & Functions', module: 'Unit 3 (Education)' },
    { id: 515, title: 'Grammar 3: Past Perfect', section: 'Grammar & Skills', module: 'Unit 3 (Education)' },
    { id: 516, title: 'Comprehension 3: A new beginning', section: 'Grammar & Skills', module: 'Unit 3 (Education)' },
    { id: 517, title: 'Writing 3: Report', section: 'Grammar & Skills', module: 'Unit 3 (Education)' },
    { id: 518, title: 'Language Quiz 3', section: 'Grammar & Skills', module: 'Unit 3 (Education)' },
    { id: 519, title: 'Vocabulary 4', section: 'Vocabulary & Functions', module: 'Unit 4 (Sustainable developement)' },
    { id: 520, title: 'Functions 4: Expressing cause and effect', section: 'Vocabulary & Functions', module: 'Unit 4 (Sustainable developement)' },
    { id: 521, title: 'Grammar 4: Future simple / perfect', section: 'Grammar & Skills', module: 'Unit 4 (Sustainable developement)' },
    { id: 522, title: 'Comprehension 4: Civil society in Morocco', section: 'Grammar & Skills', module: 'Unit 4 (Sustainable developement)' },
    { id: 523, title: 'Writing 4: A formal letter', section: 'Grammar & Skills', module: 'Unit 4 (Sustainable developement)' },
    { id: 524, title: 'Language Quiz 4', section: 'Grammar & Skills', module: 'Unit 4 (Sustainable developement)' },
    { id: 525, title: 'Vocabulary 5', section: 'Vocabulary & Functions', module: 'Unit 5 (Woman and Power)' },
    { id: 526, title: 'Functions 5: Expressing addition and concession', section: 'Vocabulary & Functions', module: 'Unit 5 (Woman and Power)' },
    { id: 527, title: 'Grammar 5: Passive voice', section: 'Grammar & Skills', module: 'Unit 5 (Woman and Power)' },
    { id: 528, title: 'Comprehension 5: The woman behind Harry Potter', section: 'Grammar & Skills', module: 'Unit 5 (Woman and Power)' },
    { id: 529, title: 'Writing 5: A book / film review', section: 'Grammar & Skills', module: 'Unit 5 (Woman and Power)' },
    { id: 530, title: 'Language Quiz 5', section: 'Grammar & Skills', module: 'Unit 5 (Woman and Power)' },
    { id: 531, title: 'Vocabulary 6', section: 'Vocabulary & Functions', module: 'Unit 6 (Culture)' },
    { id: 532, title: 'Functions 6: Defining, apologizing and complaining', section: 'Vocabulary & Functions', module: 'Unit 6 (Culture)' },
    { id: 533, title: 'Grammar 6: Phrasal verbs', section: 'Grammar & Skills', module: 'Unit 6 (Culture)' },
    { id: 534, title: 'Comprehension 6: A mixed marriage', section: 'Grammar & Skills', module: 'Unit 6 (Culture)' },
    { id: 535, title: 'Writing 6: An informal letter', section: 'Grammar & Skills', module: 'Unit 6 (Culture)' },
    { id: 536, title: 'Language Quiz 6', section: 'Grammar & Skills', module: 'Unit 6 (Culture)' },
    { id: 537, title: 'Vocabulary 7', section: 'Vocabulary & Functions', module: 'Unit 7 (Citizenship)' },
    { id: 538, title: 'Functions 7: Expressing advice', section: 'Vocabulary & Functions', module: 'Unit 7 (Citizenship)' },
    { id: 539, title: 'Grammar 7: Reported speech', section: 'Grammar & Skills', module: 'Unit 7 (Citizenship)' },
    { id: 540, title: 'Comprehension 7: Active citizenship', section: 'Grammar & Skills', module: 'Unit 7 (Citizenship)' },
    { id: 541, title: 'Writing 7: Causes, effects and solutions', section: 'Grammar & Skills', module: 'Unit 7 (Citizenship)' },
    { id: 542, title: 'Language Quiz 7', section: 'Grammar & Skills', module: 'Unit 7 (Citizenship)' },
    { id: 543, title: 'Vocabulary 8', section: 'Vocabulary & Functions', module: 'Unit 8 (International Organizations)' },
    { id: 544, title: 'Functions 8: Responding to good news / bad news', section: 'Vocabulary & Functions', module: 'Unit 8 (International Organizations)' },
    { id: 545, title: 'Grammar 8: Prefixes and suffixes', section: 'Grammar & Skills', module: 'Unit 8 (International Organizations)' },
    { id: 546, title: 'Comprehension 8: A boy and UNICEF', section: 'Grammar & Skills', module: 'Unit 8 (International Organizations)' },
    { id: 547, title: 'Writing 8: A formal email', section: 'Grammar & Skills', module: 'Unit 8 (International Organizations)' },
    { id: 548, title: 'Language Quiz 8', section: 'Grammar & Skills', module: 'Unit 8 (International Organizations)' },
    { id: 549, title: 'Vocabulary 9', section: 'Vocabulary & Functions', module: 'Unit 9 (Science and Technology)' },
    { id: 550, title: 'Functions 9: Expressing certainty / uncertainty', section: 'Vocabulary & Functions', module: 'Unit 9 (Science and Technology)' },
    { id: 551, title: 'Grammar 9: Conditional and wish', section: 'Grammar & Skills', module: 'Unit 9 (Science and Technology)' },
    { id: 552, title: 'Comprehension 9: The mobile phone', section: 'Grammar & Skills', module: 'Unit 9 (Science and Technology)' },
    { id: 553, title: 'Writing 9: Advantages and disadvantages', section: 'Grammar & Skills', module: 'Unit 9 (Science and Technology)' },
    { id: 554, title: 'Language Quiz 9', section: 'Grammar & Skills', module: 'Unit 9 (Science and Technology)' },
    { id: 555, title: 'Vocabulary 10', section: 'Vocabulary & Functions', module: 'Unit 10 (Brain Drain)' },
    { id: 556, title: 'Functions 10: Expressing Regret', section: 'Vocabulary & Functions', module: 'Unit 10 (Brain Drain)' },
    { id: 557, title: 'Grammar 10: Relative Pronouns', section: 'Grammar & Skills', module: 'Unit 10 (Brain Drain)' },
    { id: 558, title: 'Comprehension 10: Africa immigration', section: 'Grammar & Skills', module: 'Unit 10 (Brain Drain)' },
    { id: 559, title: 'Writing 10: Argumentative essay (For or against)', section: 'Grammar & Skills', module: 'Unit 10 (Brain Drain)' },
    { id: 560, title: 'Language Quiz 10', section: 'Grammar & Skills', module: 'Unit 10 (Brain Drain)' },
  ],
  6: [
    { id: 601, title: 'العالم غداة الحرب العالمية الأولى', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 602, title: 'الثورة الروسية وأزمات الديمقراطيات الليبرالية', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 603, title: 'أزمة العالم الرأسمالي الكبرى لسنة 1929م', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 604, title: 'الحرب العالمية الثانية 1939 – 1945م', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 605, title: 'ملف: مساهمة المغاربة في الحرب العالمية الثانية', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 606, title: 'المغرب تحت نظام الحماية', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 607, title: 'المغرب: الاستغلال الاستعماري في عهد الحماية', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 608, title: 'سقوط الإمبراطورية العثمانية وتوغل الاستعمار بالمشرق العربي', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 609, title: 'القضية الفلسطينية: جذور القضية وأشكال التمركز الصهيوني', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 610, title: 'الوضع الدولي لمدينة طنجة في عهد الحماية', section: 'التاريخ: الدورة الأولى', module: 'التاريخ: الدورة الأولى' },
    { id: 611, title: 'نظام القطبية الثنائية والحرب الباردة', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 612, title: 'تصفية الاستعمار وبروز العالم الثالث', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 613, title: 'النظام العالمي الجديد والقطبية الواحدة', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 614, title: 'ملف: الثورة العلمية والتكنولوجية', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 615, title: 'المغرب: الكفاح من أجل الاستقلال واستكمال الوحدة الترابية', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 616, title: 'الحركات الاستقلالية بالجزائر وتونس وليبيا', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 617, title: 'الحركات الاستقلالية بالمشرق العربي', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 618, title: 'القضية الفلسطينية والصراع العربي الإسرائيلي', section: 'التاريخ: الدورة الثانية', module: 'التاريخ: الدورة الثانية' },
    { id: 619, title: 'العولمة: المفهوم، الآليات والفاعلون', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 620, title: 'تنظيم المجال العالمي في إطار العولمة', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 621, title: 'تفاوت النمو بين الشمال والجنوب: المجال المتوسطي نموذجا', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 622, title: 'المجال العالمي والتحديات الكبرى: التحدي السكاني والتحدي البيئي', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 623, title: 'العولمة والهوية الثقافية', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 624, title: 'الاتحاد الأوربي: نحو اندماج شامل', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 625, title: 'مجموعة أمريكا الشمالية: التبادل الحر والاندماج الجهوي', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 626, title: 'دول جنوب شرق آسيا: قطب اقتصادي في تطور متصاعد', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 627, title: 'ملف: المنظمة العالمية للتجارة', section: 'الجغرافيا: الدورة الأولى', module: 'الجغرافيا: الدورة الأولى' },
    { id: 628, title: 'الولايات المتحدة الأمريكية: قوة اقتصادية عظمى', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 629, title: 'فرنسا: قوة فلاحية وصناعية كبرى في الاتحاد الأوربي', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 630, title: 'اليابان: قوة تجارية كبرى', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 631, title: 'الصين: قوة اقتصادية صاعدة', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 632, title: 'البرازيل: نمو اقتصادي واستمرار التفاوتات في التنمية البشرية', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 633, title: 'كوريا الجنوبية: نموذج لبلد حديث النمو الإقتصادي', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
    { id: 634, title: 'الهند: أوجه متعددة للتنمية', section: 'الجغرافيا: الدورة الثانية', module: 'الجغرافيا: الدورة الثانية' },
  ],
  7: [
    { id: 701, title: 'جميع الامتحانات الوطنية', section: 'جميع الامتحانات الوطنية', module: 'جميع الامتحانات الوطنية' },
    { id: 702, title: 'الامتحان الوطني في اللغة العربية 2023', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 703, title: 'الامتحان الوطني في اللغة العربية 2022', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 704, title: 'الامتحان الوطني في اللغة العربية 2021', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 705, title: 'الامتحان الوطني في اللغة العربية 2020', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 706, title: 'الامتحان الوطني في اللغة العربية 2019', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 707, title: 'الامتحان الوطني في اللغة العربية 2018', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 708, title: 'الامتحان الوطني في اللغة العربية 2017', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 709, title: 'الامتحان الوطني في اللغة العربية 2016', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 710, title: 'الامتحان الوطني في اللغة العربية 2015', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 711, title: 'الامتحان الوطني في اللغة العربية 2014', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 712, title: 'الامتحان الوطني في اللغة العربية 2013', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 713, title: 'الامتحان الوطني في اللغة العربية 2012', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 714, title: 'الامتحان الوطني في اللغة العربية 2011', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 715, title: 'الامتحان الوطني في اللغة العربية 2010', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 716, title: 'الامتحان الوطني في اللغة العربية 2009', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 717, title: 'الامتحان الوطني في اللغة العربية 2008', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
  ],
  8: [
    { id: 801, title: 'جميع الامتحانات الوطنية', section: 'جميع الامتحانات الوطنية', module: 'جميع الامتحانات الوطنية' },
    { id: 802, title: 'الامتحان الوطني في الفلسفة 2025', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 803, title: 'الامتحان الوطني في الفلسفة 2024', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 804, title: 'الامتحان الوطني في الفلسفة 2023', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 805, title: 'الامتحان الوطني في الفلسفة 2022', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 806, title: 'الامتحان الوطني في الفلسفة 2021', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 807, title: 'الامتحان الوطني في الفلسفة 2020', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 808, title: 'الامتحان الوطني في الفلسفة 2018', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 809, title: 'الامتحان الوطني في الفلسفة 2017', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 810, title: 'الامتحان الوطني في الفلسفة 2016', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 811, title: 'الامتحان الوطني في الفلسفة 2015', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 812, title: 'الامتحان الوطني في الفلسفة 2014', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 813, title: 'الامتحان الوطني في الفلسفة 2013', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 814, title: 'الامتحان الوطني في الفلسفة 2012', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 815, title: 'الامتحان الوطني في الفلسفة 2011', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 816, title: 'الامتحان الوطني في الفلسفة 2010', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 817, title: 'الامتحان الوطني في الفلسفة 2009', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 818, title: 'الامتحان الوطني في الفلسفة 2008', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
  ],
  9: [
    { id: 901, title: 'جميع الامتحانات الوطنية', section: 'جميع الامتحانات الوطنية', module: 'جميع الامتحانات الوطنية' },
    { id: 902, title: 'الامتحان الوطني في الإنجليزية 2024', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 903, title: 'الامتحان الوطني في الإنجليزية 2023', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 904, title: 'الامتحان الوطني في الإنجليزية 2022', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 905, title: 'الامتحان الوطني في الإنجليزية 2021', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 906, title: 'الامتحان الوطني في الإنجليزية 2020', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 907, title: 'الامتحان الوطني في الإنجليزية 2019', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 908, title: 'الامتحان الوطني في الإنجليزية 2018', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 909, title: 'الامتحان الوطني في الإنجليزية 2017', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 910, title: 'الامتحان الوطني في الإنجليزية 2016', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 911, title: 'الامتحان الوطني في الإنجليزية 2015', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 912, title: 'الامتحان الوطني في الإنجليزية 2014', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 913, title: 'الامتحان الوطني في الإنجليزية 2013', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 914, title: 'الامتحان الوطني في الإنجليزية 2012', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 915, title: 'الامتحان الوطني في الإنجليزية 2011', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 916, title: 'الامتحان الوطني في الإنجليزية 2010', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 917, title: 'الامتحان الوطني في الإنجليزية 2009', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 918, title: 'الامتحان الوطني في الإنجليزية 2008', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
  ],
  10: [
    { id: 1001, title: 'جميع الامتحانات الوطنية', section: 'جميع الامتحانات الوطنية', module: 'جميع الامتحانات الوطنية' },
    { id: 1002, title: 'الامتحان الوطني في الاجتماعيات 2024', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1003, title: 'الامتحان الوطني في الاجتماعيات 2023', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1004, title: 'الامتحان الوطني في الاجتماعيات 2022', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1005, title: 'الامتحان الوطني في الاجتماعيات 2021', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1006, title: 'الامتحان الوطني في الاجتماعيات 2020', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1007, title: 'الامتحان الوطني في الاجتماعيات 2019', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1008, title: 'الامتحان الوطني في الاجتماعيات 2018', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1009, title: 'الامتحان الوطني في الاجتماعيات 2017', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1010, title: 'الامتحان الوطني في الاجتماعيات 2016', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1011, title: 'الامتحان الوطني في الاجتماعيات 2015', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1012, title: 'الامتحان الوطني في الاجتماعيات 2014', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1013, title: 'الامتحان الوطني في الاجتماعيات 2013', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1014, title: 'الامتحان الوطني في الاجتماعيات 2011', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1015, title: 'الامتحان الوطني في الاجتماعيات 2010', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1016, title: 'الامتحان الوطني في الاجتماعيات 2009', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1017, title: 'الامتحان الوطني في الاجتماعيات 2008', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
    { id: 1018, title: 'الامتحان الوطني في الاجتماعيات 2007', section: 'الامتحانات الوطنية', module: 'الامتحانات الوطنية' },
  ],
  11: [
    { id: 1101, title: 'منهجية النص النظري في كل المجزوءات', section: 'منهجيات اللغة العربية', module: 'منهجيات اللغة العربية' },
    { id: 1102, title: 'منهجية النص التطبيقي في كل المجزوءات', section: 'منهجيات اللغة العربية', module: 'منهجيات اللغة العربية' },
    { id: 1103, title: 'منهجية مؤلف ظاهرة الشعر العربي الحديث', section: 'منهجيات اللغة العربية', module: 'منهجيات اللغة العربية' },
    { id: 1104, title: 'منهجية مؤلف رواية اللص والكلاب', section: 'منهجيات اللغة العربية', module: 'منهجيات اللغة العربية' },
  ],
  12: [
    { id: 1201, title: 'منهجية السؤال', section: 'منهجيات الفلسفة', module: 'منهجيات الفلسفة' },
    { id: 1202, title: 'منهجية القولة', section: 'منهجيات الفلسفة', module: 'منهجيات الفلسفة' },
    { id: 1203, title: 'منهجية النص', section: 'منهجيات الفلسفة', module: 'منهجيات الفلسفة' },
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
  const [splash, setSplash] = useState(() => !localStorage.getItem('splashShown'))
  const [selected, setSelected] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const examDate = new Date('2027-06-04')
const today = new Date()
const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))

  useEffect(() => {
    const timer = setTimeout(() => { setSplash(false); localStorage.setItem('splashShown', 'true') }, 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])
  useEffect(() => {
  if (!lesson) return;
supabase.from('lessons').select('pdf_url').eq('title', lesson.title.trim()).maybeSingle()
    .then(({ data }) => { if (data?.pdf_url) setLesson(l => ({...l, ...data})); });
}, [lesson?.id]);

  if (splash) return <SplashScreen />

  if (lesson) return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="topbar">
        <button onClick={() => setLesson(null)}>← رجوع</button>
        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
      </div>
      <h2>{lesson.title}</h2>
      {lesson.pdf_url && (
  <a href={lesson.pdf_url} target="_blank" rel="noreferrer" className="pdf-btn">
  📄 فتح PDF
</a>
)}
    </div>
  )

  if (selected) {
    const lessons = lessonsBySubject[selected] || []
    const modules = [...new Set(lessons.map(l => l.module))]
    return (
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        
        <div className="topbar">
          <button onClick={() => setSelected(null)}>← رجوع</button>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>
        </div>
        <h2>{[...subjects, ...nationals].find(s => s.id === selected)?.name}</h2>
        {lessons.length === 0 ? <p>لا توجد دروس بعد</p> : modules.map(mod => {
          const modLessons = lessons.filter(l => l.module === mod)
          const sections = [...new Set(modLessons.map(l => l.section))]
          return (
            <div key={mod}>
              <div className="module-header">{mod}</div>
              {sections.map(section => (
                <div key={section}>
                  <div className="section-header">{section}</div>
                  {modLessons.filter(l => l.section === section).map(l => (
                    <div key={l.id} className="card" onClick={() => setLesson(l)}>{l.title}</div>
                  ))}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <WelcomeMessage />
      <div className="topbar">
        <Navbar />
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
      

      <h1 className="section-title" style={{marginTop: '40px'}}>📝 منهجيات الباكالوريا</h1>
      <p>اختر المادة</p>
      <div className="grid">
        {methodologies.map(s => (
          <div key={s.id} className="card" onClick={() => setSelected(s.id)}>
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </div>
        ))}
      </div>
      <CountdownTimer />
    </div>
  )
}

export default App