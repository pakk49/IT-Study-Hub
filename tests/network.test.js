import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { buildExamBank } from '../assets/exam-bank.js';
const subject=subjects.find(s=>s.id==='introduction-to-network-systems');

test('Network ก่อน Week 9 อยู่ Midterm และตั้งแต่ Week 9 อยู่ Final',()=>{
 assert.ok(subject);
 assert.deepEqual(subject.chapters.filter(c=>c.exam==='midterm').map(c=>c.week),[1,2,3,4,5,6,7,8]);
 assert.deepEqual(subject.chapters.filter(c=>c.exam==='final').map(c=>c.week),[9,10,11,12,13]);
});
test('Network Midterm และ Final มีข้อสอบรวม 60 ข้อแต่ละชุด',()=>{
 for(const period of ['midterm','final']){
  const bank=buildExamBank(subject,period);
  assert.equal(bank.ready,true,period);
  assert.equal(bank.questions.length,60,period);
  assert.equal(new Set(bank.questions.map(q=>q.id)).size,60);
  assert.ok(bank.questions.every(q=>q.options.length===4&&q.reasons.length===4));
  assert.ok(bank.questions.every(q=>q.vocabulary?.length===4 && q.vocabulary.every(v=>v.term&&v.meaning&&v.example)));
  assert.ok(bank.questions.every(q=>!/^ข้อใดอธิบาย/.test(q.prompt)));
 }
});
test('Network ทุกบทมีสรุปภาษาไทย ศัพท์อังกฤษและตัวอย่าง',()=>{
 assert.equal(subject.chapters.length,13);
 for(const c of subject.chapters){
  assert.ok(c.sections.length>=3,c.title);
  assert.equal(c.flashcards.length,12,c.title);
  assert.equal(c.questions.length,12,c.title);
  assert.ok(c.sections.every(s=>s.table?.rows.length===4),c.title);
  for(const f of c.flashcards){
   assert.ok(f.term&&f.meaning&&f.example,c.title);
   assert.match(f.back,/ตัวอย่าง/);
  }
  for(const q of c.questions){
   assert.equal(new Set(q.options).size,4,q.id);
   assert.equal(q.vocabulary[q.answer].term,q.options[q.answer],q.id);
   assert.ok(c.sections.some(s=>s.id===q.topic));
  }
 }
});
test('Network, Database และ Multimedia แยกธนาคารข้อสอบจากกัน',()=>{
 for(const period of ['midterm','final']){
  const ids=subjects.filter(s=>['introduction-to-network-systems','multimedia-technology','database-system-concepts'].includes(s.id))
   .map(s=>new Set(buildExamBank(s,period).questions.map(q=>q.id)));
  for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++)for(const id of ids[i])assert.equal(ids[j].has(id),false);
 }
});