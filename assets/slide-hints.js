// Hints are assembled exclusively from the uploaded slide summaries stored for a chapter.
// No external facts, web lookups or answer keys are used to generate a hint.
import { cleanStudyProse } from './summary-format.js';
const norm = value => String(value ?? '').toLocaleLowerCase().trim();
export function slideHint(question, chapter) {
  const section=chapter?.sections?.find(s=>s.id===question?.topic);
  if(!section) return null;
  const answer=norm(question?.options?.[question?.answer]);
  // Do not reveal the correct multiple-choice option in the hint.
  const intro=cleanStudyProse(section.intro);
  const safeIntro=intro && !(answer.length>2 && norm(intro).includes(answer))
    ? intro
    : 'เปรียบเทียบเงื่อนไขในโจทย์กับหลักการและตัวอย่างของหัวข้อนี้ แล้วตัดตัวเลือกที่ทำหน้าที่ต่างกันออก';
  const wantsNumbers=/คำนวณ|ค่าเท่าไร|จำนวน|บิต|bits|\d+\s*(?:ms|Mbps|kbps|bytes|bit|host)|\/\d{1,2}/i.test(question.prompt||'');
  const technique=wantsNumbers
    ? 'แยกค่าที่โจทย์ให้ ตรวจหน่วยและเงื่อนไข แล้วใช้สูตรหรือขั้นตอนที่เรียนในหัวข้อนี้'
    : 'จับคำสำคัญในสถานการณ์ว่าใครทำอะไร แล้วเลือกหลักการที่มีหน้าที่ตรงกับเงื่อนไขนั้น';
  return {heading:'คำใบ้ · '+section.title,summary:safeIntro,tip:technique,source:chapter.source||('บท '+chapter.number+' · '+chapter.title)};
}
export function slideHintHtml(question,chapter,escape) {
  const h=slideHint(question,chapter);
  if(!h)return '<div class="slide-hint" role="note">ลองย้อนอ่านสรุปของบทนี้ก่อนเลือกคำตอบ</div>';
  return '<div class="slide-hint" role="note"><strong>'+escape(h.heading)+'</strong><p>'+escape(h.summary)+'</p><p>'+escape(h.tip)+'</p><small>อ้างอิง: '+escape(h.source)+'</small></div>';
}
