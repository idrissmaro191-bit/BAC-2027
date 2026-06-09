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
    { id: 201, title: 'مفهوم الشخص (المحور الأول : الشخص والهوية)', section: 'المحور الأول: الشخص', module: 'مجزوءة الوضع البشري' },
    { id: 202, title: 'مفهوم الشخص (المحور الثاني : الشخص بوصفه قيمة)', section: 'المحور الأول: الشخص', module: 'مجزوءة الوضع البشري' },
    { id: 203, title: 'مفهوم الشخص (المحور الثالث : الشخص بين الضرورة والحرية)', section: 'المحور الأول: الشخص', module: 'مجزوءة الوضع البشري' },
    { id: 204, title: 'مفهوم الغير (المحور الأول : وجود الغير)', section: 'المحور الثاني: الغير', module: 'مجزوءة الوضع البشري' },
    { id: 205, title: 'مفهوم الغير (المحور الثاني : معرفة الغير)', section: 'المحور الثاني: الغير', module: 'مجزوءة الوضع البشري' },
    { id: 206, title: 'مفهوم الغير (المحور الثالث : العلاقة مع الغير)', section: 'المحور الثاني: الغير', module: 'مجزوءة الوضع البشري' },
    { id: 207, title: 'مفهوم التاريخ (المحور الأول : المعرفة التاريخية)', section: 'المحور الثالث: التاريخ', module: 'مجزوءة الوضع البشري' },
    { id: 208, title: 'مفهوم التاريخ (المحور الثاني : التاريخ وفكرة التقدم)', section: 'المحور الثالث: التاريخ', module: 'مجزوءة الوضع البشري' },
    { id: 209, title: 'مفهوم التاريخ (المحور الثالث : دور الإنسان في التاريخ)', section: 'المحور الثالث: التاريخ', module: 'مجزوءة الوضع البشري' },
    { id: 210, title: 'مفهوم النظرية والتجربة (المحور الأول : التجربة والتجريب)', section: 'المحور الأول: النظرية والتجريب', module: 'مجزوءة المعرفة' },
    { id: 211, title: 'مفهوم النظرية والتجربة (المحور الثاني : العقلانية العلمية)', section: 'المحور الأول: النظرية والتجريب', module: 'مجزوءة المعرفة' },
    { id: 212, title: 'مفهوم النظرية والتجربة (المحور الثالث : معايير علمية النظريات العلمية)', section: 'المحور الأول: النظرية والتجريب', module: 'مجزوءة المعرفة' },
    { id: 213, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الأول : موضعة العلوم الإنسانية)', section: 'المحور الثاني: المسألة العلمية في العلوم الإنسانية', module: 'مجزوءة المعرفة' },
    { id: 214, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الثاني : التفسير والفهم في العلوم الإنسانية)', section: 'المحور الثاني: المسألة العلمية في العلوم الإنسانية', module: 'مجزوءة المعرفة' },
    { id: 215, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الثالث : نموذجية العلوم التجريبية)', section: 'المحور الثاني: المسألة العلمية في العلوم الإنسانية', module: 'مجزوءة المعرفة' },
    { id: 216, title: 'مفهوم المسألة العلمية في العلوم الإنسانية (المحور الرابع : نموذج السوسيولوجيا)', section: 'المحور الثاني: المسألة العلمية في العلوم الإنسانية', module: 'مجزوءة المعرفة' },
    { id: 217, title: 'مفهوم الحقيقة (المحور الأول : الرأي والحقيقة)', section: 'المحور الثالث: مفهوم الحقيقة', module: 'مجزوءة المعرفة' },
    { id: 218, title: 'مفهوم الحقيقة (المحور الثاني : معايير الحقيقة)', section: 'المحور الثالث: مفهوم الحقيقة', module: 'مجزوءة المعرفة' },
    { id: 219, title: 'مفهوم الحقيقة (المحور الثالث : الحقيقة بوصفها قيمة)', section: 'المحور الثالث: مفهوم الحقيقة', module: 'مجزوءة المعرفة' },
    { id: 220, title: 'مفهوم الدولة (المحور الأول : مشروعية الدولة وغاياتها)', section: 'المحور الأول: مفهوم الدولة', module: 'مجزوءة السياسة' },
    { id: 221, title: 'مفهوم الدولة (المحور الثاني : طبيعة السلطة السياسية)', section: 'المحور الأول: مفهوم الدولة', module: 'مجزوءة السياسة' },
    { id: 222, title: 'مفهوم الدولة (المحور الثالث : الدولة بين الحق والعنف)', section: 'المحور الأول: مفهوم الدولة', module: 'مجزوءة السياسة' },
    { id: 223, title: 'مفهوم العنف (المحور الأول : أشكال العنف)', section: 'المحور الثاني: مفهوم العنف', module: 'مجزوءة السياسة' },
    { id: 224, title: 'مفهوم العنف (المحور الثاني : العنف في التاريخ)', section: 'المحور الثاني: مفهوم العنف', module: 'مجزوءة السياسة' },
    { id: 225, title: 'مفهوم العنف (المحور الثالث : العنف والمشروعية)', section: 'المحور الثاني: مفهوم العنف', module: 'مجزوءة السياسة' },
    { id: 226, title: 'مفهوم الحق والعدالة (المحور الأول : الحق بين الطبيعي والوضعي)', section: 'المحور الثالث: مفهوم الحق والعدالة', module: 'مجزوءة السياسة' },
    { id: 227, title: 'مفهوم الحق والعدالة (المحور الثاني : العدالة أساس الحق)', section: 'المحور الثالث: مفهوم الحق والعدالة', module: 'مجزوءة السياسة' },
    { id: 228, title: 'مفهوم الحق والعدالة (المحور الثالث : العدالة بين المساواة والإنصاف)', section: 'المحور الثالث: مفهوم الحق والعدالة', module: 'مجزوءة السياسة' },
    { id: 229, title: 'مفهوم الواجب (المحور الأول : الواجب والإكراه)', section: 'المحور الأول: مفهوم الواجب', module: 'مجزوءة الأخلاق' },
    { id: 230, title: 'مفهوم الواجب (المحور الثاني : الوعي الأخلاقي)', section: 'المحور الأول: مفهوم الواجب', module: 'مجزوءة الأخلاق' },
    { id: 231, title: 'مفهوم الواجب (المحور الثالث : الواجب والمجتمع)', section: 'المحور الأول: مفهوم الواجب', module: 'مجزوءة الأخلاق' },
    { id: 232, title: 'مفهوم السعادة (المحور الأول : تمثلات السعادة)', section: 'المحور الثاني: مفهوم السعادة', module: 'مجزوءة الأخلاق' },
    { id: 233, title: 'مفهوم السعادة (المحور الثاني : البحث عن السعادة)', section: 'المحور الثاني: مفهوم السعادة', module: 'مجزوءة الأخلاق' },
    { id: 234, title: 'مفهوم السعادة (المحور الثالث : السعادة والواجب)', section: 'المحور الثاني: مفهوم السعادة', module: 'مجزوءة الأخلاق' },
    { id: 235, title: 'مفهوم الحرية (المحور الأول : الحرية والحتمية)', section: 'المحور الثالث: مفهوم الحرية', module: 'مجزوءة الأخلاق' },
    { id: 236, title: 'مفهوم الحرية (المحور الثاني : الحرية والإرادة)', section: 'المحور الثالث: مفهوم الحرية', module: 'مجزوءة الأخلاق' },
    { id: 237, title: 'مفهوم الحرية (المحور الثالث : الحرية والقانون)', section: 'المحور الثالث: مفهوم الحرية', module: 'مجزوءة الأخلاق' },
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