import test from 'node:test';
import assert from 'node:assert/strict';
import { discretePaperQuestions,discretePaperEssays,discretePaperDiagrams } from '../assets/discrete-final-source.js';
import { isDiscreteAnswerCorrect,discreteExamScore,formatDiscreteTime } from '../assets/discrete-exam-ui.js';
import { discreteFinalChapters } from '../assets/discrete-final.js';

test('ข้อสอบจาก PDF มีปรนัย 1–28 และข้อเขียน 3–4 โดยไม่เติมข้อที่หาย',()=>{
 assert.equal(discretePaperQuestions.length,28);
 assert.deepEqual(discretePaperQuestions.map(q=>q.number),Array.from({length:28},(_,i)=>i+1));
 assert.deepEqual(discretePaperEssays.map(q=>q.number),[3,4]);
 assert.ok(discretePaperQuestions.every(q=>q.page>=1&&q.page<=8&&q.prompt&&q.options.length>=2));
 assert.ok(discretePaperEssays.every(q=>q.page===9&&q.prompt&&q.reference));
});
test('ปรนัยมีเฉลยอ้างอิงวง/ลายมือ พร้อมตัวเลือกครบและไม่เปิดคำตอบในโจทย์',()=>{
 for(const q of discretePaperQuestions){
  assert.ok(q.answers.length>=1,q.number);
  assert.equal(new Set(q.answers).size,q.answers.length);
  assert.ok(q.answers.every(i=>Number.isInteger(i)&&i>=0&&i<q.options.length),q.number);
  assert.ok(q.explanation);
 }
 assert.deepEqual(discretePaperQuestions.find(q=>q.number===5).answers,[1]);
 assert.deepEqual(discretePaperQuestions.find(q=>q.number===15).answers,[0,2]);
 assert.deepEqual(discretePaperQuestions.find(q=>q.number===28).answers,[2]);
 assert.ok(discretePaperQuestions.find(q=>q.number===14).sourceWarning);
 assert.ok(discretePaperQuestions.find(q=>q.number===25).sourceWarning);
});
test('ข้อสอบมีกราฟสำหรับโจทย์ที่อ้างภาพ',()=>{
 for(const q of discretePaperQuestions.filter(q=>q.diagram))assert.ok(discretePaperDiagrams[q.diagram],q.number);
});
test('ตรวจแบบหลายคำตอบและคะแนนรวม 28 ข้อ',()=>{
 const all=Object.fromEntries(discretePaperQuestions.map(q=>[String(q.number),q.answers]));
 assert.deepEqual(discreteExamScore(all),{correct:28,total:28,percent:100});
 assert.deepEqual(discreteExamScore({}),{correct:0,total:28,percent:0});
 assert.equal(isDiscreteAnswerCorrect(discretePaperQuestions[14],[2,0]),true);
 assert.equal(isDiscreteAnswerCorrect(discretePaperQuestions[14],[0]),false);
 assert.equal(isDiscreteAnswerCorrect(discretePaperQuestions[14],[0,1,2]),false);
});
test('ตัวนับเวลาและชุดฝึกรายบทใช้ PDF ชุดเดียวกัน',()=>{
 assert.equal(formatDiscreteTime(0),'00:00:00');
 assert.equal(formatDiscreteTime(3661),'01:01:01');
 assert.equal(formatDiscreteTime(-10),'00:00:00');
 assert.equal(discreteFinalChapters.length,6);
 const bank=discreteFinalChapters.flatMap(c=>c.questions);
 assert.equal(bank.length,28);
 assert.equal(new Set(bank.map(q=>q.id)).size,28);
 assert.ok(bank.every(q=>q.options.length>=2&&q.options.length<=4));
 assert.ok(bank.every(q=>q.reasons.length===q.options.length&&q.reasons.every(Boolean)));
});
