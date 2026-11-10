import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { slideHint,slideHintHtml } from '../assets/slide-hints.js';
import { buildExamBank } from '../assets/exam-bank.js';
const studySubjects=subjects.filter(s=>s.chapters.length>0);
const escape=value=>String(value).replace(/[&<>"]/g,'');
test('ทุกข้อสอบอิงหัวข้อที่มีในสไลด์ของบทเรียน ไม่ใส่เรื่องใหม่',()=>{
 assert.ok(studySubjects.length>=3);
 for(const s of studySubjects)for(const c of s.chapters){
   assert.ok(c.source||c.sections.every(sec=>sec.pages),s.title+' '+c.title);
   for(const q of c.questions){
     const sec=c.sections.find(x=>x.id===q.topic);
     assert.ok(sec,'ไม่พบหัวข้อสไลด์สำหรับ '+s.id+' '+c.id+' '+q.id);
     assert.ok(sec.intro?.trim(),c.id+' '+q.id);
     assert.ok(sec.points?.length||sec.table?.rows?.length,c.id+' '+q.id);
     assert.ok(q.options.every(o=>typeof o==='string'&&o.trim()),q.id);
     assert.ok(q.reasons.length===q.options.length,q.id);
   }
 }
});
test('Hint ทุกข้อดึงเฉพาะข้อความสรุปในบทที่ตรงกัน ไม่เปิดเผยเฉลย',()=>{
 for(const s of studySubjects)for(const c of s.chapters)for(const q of c.questions){
  const h=slideHint(q,c);
  assert.ok(h&&h.heading&&h.summary&&h.tip,q.id);
  const answer=String(q.options[q.answer]).trim().toLowerCase();
  if(answer.length>2)assert.ok(!h.summary.toLowerCase().includes(answer),'hint เฉลยทันที: '+q.id);
  assert.ok(slideHintHtml(q,c,escape).includes('slide-hint'));
 }
});
test('ข้อสอบรวม 60 ข้อ หรือ PHYCOM Arduino 45 ข้อ ต้องตรงกับเนื้อหาสไลด์',()=>{
 for(const s of studySubjects)for(const period of ['midterm','final']){
  const bank=buildExamBank(s,period);
  if(!bank.ready)continue;
  assert.equal(bank.questions.length,s.id==='physical-computing'&&period==='final'?45:60);
  for(const q of bank.questions){
   const c=bank.chapters.find(c=>c.id===q.chapterId);
   assert.ok(c && (c.sections.some(sec=>sec.id===q.topic)||(s.id==='physical-computing'&&period==='final'&&q.sectionTitle==='ทฤษฎี Arduino')),s.id+' '+q.id);
   assert.ok(slideHint(q,c),q.id);
  }
 }
});
