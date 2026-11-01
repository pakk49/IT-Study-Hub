import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { buildExamBank } from '../assets/exam-bank.js';
import { databaseMidtermChapters } from '../assets/database-midterm.js';
import { databaseFinalChapters } from '../assets/database-final.js';
const db=subjects.find(s=>s.id==='database-system-concepts');
const checkQuestion=q=>{
 assert.ok(q.prompt.length>35,q.id);
 assert.doesNotMatch(q.prompt,/^ข้อใดอธิบาย|หมายถึงอะไร|คำว่า.+คืออะไร/,q.id);
 assert.equal(q.options.length,4,q.id);
 assert.equal(new Set(q.options).size,4,q.id);
 assert.equal(q.reasons.length,4,q.id);
 assert.ok(q.reasons.every(r=>r.length>30),q.id);
 assert.ok(q.answer>=0&&q.answer<=3,q.id);
 assert.ok(q.vocabulary.length>=4,q.id);
 assert.ok(q.vocabulary.every(v=>v.term&&v.meaning&&v.example),q.id);
 assert.equal(q.vocabulary[q.answer].term,q.options[q.answer],q.id);
};
test('Database Midterm: บท 1,3,4 ครบ 60 ข้อ',()=>{
 assert.deepEqual(databaseMidtermChapters.map(x=>x.number),[1,3,4]);
 const bank=buildExamBank(db,'midterm');
 assert.equal(bank.ready,true);
 assert.equal(bank.questions.length,60);
 assert.deepEqual([1,3,4].map(n=>bank.questions.filter(q=>q.chapterNo===n).length),[20,20,20]);
 bank.questions.forEach(checkQuestion);
});
test('Database Final: ERD, Normalization, DW, Transactions ครบ 60 ข้อ',()=>{
 assert.deepEqual(databaseFinalChapters.map(x=>x.number),[7,9,20,15]);
 const bank=buildExamBank(db,'final');
 assert.equal(bank.ready,true);
 assert.equal(bank.questions.length,60);
 assert.deepEqual([7,9,15,20].map(n=>bank.questions.filter(q=>q.chapterNo===n).length),[15,15,15,15]);
 bank.questions.forEach(checkQuestion);
});
test('Database sections: ตารางศัพท์อังกฤษ-ไทยพร้อมตัวอย่างทุกบท',()=>{
 for(const chapter of db.chapters){
  assert.ok(chapter.sections.length>=4,chapter.title);
  assert.ok(chapter.flashcards.length>=20,chapter.title);
  assert.ok(chapter.questions.length>=20,chapter.title);
  for(const sec of chapter.sections){
   assert.equal(sec.table.headers.length,3);
   assert.equal(sec.table.rows.length,5);
   assert.ok(sec.table.rows.every(row=>row.length===3 && row.every(Boolean)));
  }
  for(const card of chapter.flashcards) assert.ok(card.term&&card.meaning&&card.example&&card.back.includes('ตัวอย่าง'));
 }
});
test('Database และ Multimedia แยกชุดสอบ 60 ข้อคนละวิชา',()=>{
 const mm=subjects.find(s=>s.id==='multimedia-technology');
 for(const period of ['midterm','final']){
  const a=buildExamBank(db,period),b=buildExamBank(mm,period);
  assert.equal(a.questions.length,60);assert.equal(b.questions.length,60);
  assert.ok(!a.questions.some(q=>b.questions.some(p=>p.id===q.id)));
 }
});
