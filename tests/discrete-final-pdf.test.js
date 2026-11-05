import test from 'node:test';
import assert from 'node:assert/strict';
import { discretePaperQuestions, discretePaperEssays, discretePaperDiagrams } from '../assets/discrete-final-source.js';
import { isDiscreteAnswerCorrect, discreteExamScore, formatDiscreteTime } from '../assets/discrete-exam-ui.js';
import { discreteFinalChapters } from '../assets/discrete-final.js';

const byNumber=n=>discretePaperQuestions.find(q=>q.number===n);

test('Final ตรงบทเรียนยังคงปรนัย 28 ข้อ และข้อเขียน 2 ข้อ โดยมีการระบุแหล่งโจทย์ใหม่',()=>{
 assert.equal(discretePaperQuestions.length,28);
 assert.deepEqual(discretePaperQuestions.map(q=>q.number),Array.from({length:28},(_,i)=>i+1));
 assert.deepEqual(discretePaperEssays.map(q=>q.number),[3,4]);
 assert.ok(discretePaperQuestions.every(q=>(q.page>=1&&q.page<=8||q.sourceLabel)&&q.prompt&&q.options.length>=2));
 assert.ok(discretePaperEssays.every(q=>q.reference&&q.prompt&&(q.page===9||q.sourceLabel)));
});

test('ถอดโจทย์หลักการนับ Pigeonhole และ FSA ที่ไม่อยู่ในสไลด์ แล้วแทนด้วยหัวข้อที่สอน',()=>{
 const text=discretePaperQuestions.map(q=>q.prompt).join(' ')+discretePaperEssays.map(e=>e.prompt).join(' ');
 assert.doesNotMatch(text,/8000 ชิ้น|จั่วจากสำรับ|Sieve.*Pigeonhole|ออโตมาตาจำกัด|State Diagram/);
 const required=[
  [8,/DM_Week9.pdf หน้า 22/],
  [9,/DM_Week9.pdf หน้า 8/],
  [10,/DM_Week9.pdf หน้า 11/],
  [11,/DM_Week9.pdf หน้า 34/],
  [14,/DM_Week10.pdf/],
  [25,/DM_Week12.pdf/]
 ];
 for(const [num,source] of required){const q=byNumber(num);assert.match(q.sourceLabel,source);assert.ok(q.explanation);}
 assert.match(discretePaperEssays.find(q=>q.number===4).sourceLabel,/DM_Week10.pdf/);
 assert.match(discretePaperEssays.find(q=>q.number===4).prompt,/เมทริกซ์/);
 assert.equal(discretePaperEssays.find(q=>q.number===4).diagram,'relationEssay4');
});

test('เฉลยถูกต้องในข้อที่ปรับ และความสัมพันธ์ x≥y มีสมบัติ Reflexive Antisymmetric Transitive',()=>{
 assert.deepEqual(byNumber(2).answers,[0]);
 assert.deepEqual(byNumber(8).answers,[1]);
 assert.deepEqual(byNumber(9).answers,[0]);
 assert.deepEqual(byNumber(10).answers,[0]);
 assert.deepEqual(byNumber(11).answers,[2]);
 assert.deepEqual(byNumber(14).answers,[0,2,3]);
 assert.deepEqual(byNumber(25).answers,[2]);
 assert.deepEqual(byNumber(5).answers,[1]);
 assert.deepEqual(byNumber(15).answers,[0,2]);
 assert.deepEqual(byNumber(28).answers,[2]);
});

test('ทุกข้อมีตัวเลือกที่ถูกต้องและกราฟประกอบครบ',()=>{
 for(const q of discretePaperQuestions){
  assert.ok(q.answers.length>=1,q.number);
  assert.equal(new Set(q.answers).size,q.answers.length);
  assert.ok(q.answers.every(i=>Number.isInteger(i)&&i>=0&&i<q.options.length),q.number);
  assert.ok(q.explanation,q.number);
  if(q.diagram)assert.ok(discretePaperDiagrams[q.diagram],q.number);
 }
 assert.ok(discretePaperDiagrams.relationEssay4);
});

test('ตัวตรวจหลายคำตอบและคะแนนเต็ม 28 คะแนนในโหมดปรนัย',()=>{
 const all=Object.fromEntries(discretePaperQuestions.map(q=>[String(q.number),q.answers]));
 assert.deepEqual(discreteExamScore(all),{correct:28,total:28,percent:100});
 assert.deepEqual(discreteExamScore({}),{correct:0,total:28,percent:0});
 assert.equal(isDiscreteAnswerCorrect(byNumber(14),[3,0,2]),true);
 assert.equal(isDiscreteAnswerCorrect(byNumber(14),[0]),false);
 assert.equal(isDiscreteAnswerCorrect(byNumber(15),[2,0]),true);
 assert.equal(isDiscreteAnswerCorrect(byNumber(15),[1]),false);
});

test('ตัวจับเวลาและข้อสอบฝึกรายบทตรงกับคลังโจทย์ Final ฉบับปรับสไลด์',()=>{
 assert.equal(formatDiscreteTime(0),'00:00:00');
 assert.equal(formatDiscreteTime(3661),'01:01:01');
 assert.equal(formatDiscreteTime(-10),'00:00:00');
 assert.equal(discreteFinalChapters.length,6);
 const bank=discreteFinalChapters.flatMap(c=>c.questions);
 assert.equal(bank.length,28);
 assert.equal(new Set(bank.map(q=>q.id)).size,28);
 assert.ok(bank.every(q=>q.options.length>=2&&q.options.length<=4));
 assert.ok(bank.every(q=>q.reasons.length===q.options.length&&q.reasons.every(Boolean)));
 for(const n of [8,9,10,11,14,25])assert.ok(bank.find(q=>q.id==='dm-pdf-'+n).reasons.some(s=>s.includes('DM_Week')));
});
