import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { slideHint } from '../assets/slide-hints.js';
import { physicalFinalGuide } from '../assets/physical-final-guide.js';
import { sectionPresentation } from '../assets/summary-format.js';

test('ทุกบทมีตัวอย่างเป็นขั้นที่ส่งไปแสดงในหน้าอ่านได้',()=>{
 let sections=0;
 for(const subject of subjects)for(const chapter of subject.chapters)for(const section of chapter.sections){
  const shown=sectionPresentation(section);
  assert.ok(shown.workedExample.length>=2,chapter.id+' '+section.id);
  assert.ok(shown.workedExample.every(step=>step.trim()&&!/[\u0000\uE000]|undefined/.test(step)),section.id);
  assert.ok(section.intro.length>40,section.id);
  sections++;
 }
 assert.equal(sections,160);
});

test('คำใบ้ต่างกันตามวิธีทำและไม่แสดงชื่อตัวเลือกที่ถูก',()=>{
 const lessons=subjects.flatMap(s=>s.chapters);
 const modulo=lessons.find(c=>c.id==='dm-week-9');
 const crc=lessons.find(c=>c.id==='net-week-12');
 const modHint=slideHint(modulo.questions[0],modulo);
 const crcQuestion=crc.questions.find(q=>q.topic==='net-12-topic-3');
 assert.match(modHint.tip,/เศษ|ค่าที่โจทย์|เงื่อนไข/);
 assert.ok(slideHint(crcQuestion,crc).tip!==modHint.tip);
 for(const chapter of lessons)for(const question of chapter.questions){
  const answer=question.options[question.answer].trim().toLowerCase();
  const hint=slideHint(question,chapter);
  assert.ok(hint?.summary&&hint?.tip,question.id);
  if(answer.length>2){
   assert.ok(!hint.summary.toLowerCase().includes(answer),question.id);
   assert.ok(!hint.tip.toLowerCase().includes(answer),question.id);
  }
 }
});

test('ประกาศ Final Physical แยกข้อสอบจริงออกจากชุดฝึกและแสดงกำหนดส่ง',()=>{
 const html=physicalFinalGuide();
 for(const phrase of ['11 พฤศจิกายน 2569','15 คะแนน','10 คะแนน · 45 ข้อ','5 คะแนน · 1 ข้อ','10 พฤศจิกายน 2569','23:59','ไม่ต้องแก้สมการ','Insert Last','Traverse by Index'])assert.ok(html.includes(phrase),phrase);
 assert.match(html,/ตัวอย่างฝึก|แบบฝึกเลือกตอบ Arduino/);
});
