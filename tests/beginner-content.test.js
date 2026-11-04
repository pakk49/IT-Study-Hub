import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { physicalLabs } from '../assets/physical-labs.js';
import { beginnerGuide } from '../assets/beginner-guides.js';
import { buildTechnicalVocabulary,lookupTechnicalTerm,matchTechnicalTerms,readTechnicalTerm } from '../assets/technical-vocabulary.js';
import { readableExample } from '../assets/beginner-examples.js';
import { vocabularyHtml } from '../assets/english-quiz.js';

test('ทุกหัวข้อที่มีบทเรียนมีตัวอย่างอธิบายสำหรับผู้เริ่มต้น',()=>{
 let count=0;
 for(const subject of subjects)for(const chapter of subject.chapters)for(const section of chapter.sections){
  assert.ok(beginnerGuide(section.title),subject.id+' '+chapter.id+' '+section.title);
  count++;
 }
 assert.ok(count>=150);
});

test('แฟลชการ์ดแต่ละคำมีความหมายและคำอ่านไทย ไม่ปล่อยช่องว่าง',()=>{
 const vocab=buildTechnicalVocabulary(subjects,{},physicalLabs);
 let total=0;
 for(const subject of subjects)for(const chapter of subject.chapters)for(const flashcard of chapter.flashcards){
  const term=lookupTechnicalTerm(vocab,flashcard.term);
  assert.ok(term,flashcard.term);
  assert.ok(/[ก-๙]/.test(term.meaning),flashcard.term);
  assert.ok(/[ก-๙]/.test(term.reading),flashcard.term);
  assert.ok(flashcard.example?.trim(),flashcard.term);
  total++;
 }
 assert.ok(total>=680);
});

test('ศัพท์มีเครื่องหมายและอักษรเน้นเสียงยังเปิดคำศัพท์ได้',()=>{
 const list=buildTechnicalVocabulary([{chapters:[{flashcards:[{term:'Bezier Curve',meaning:'เส้นโค้งเบซิเยร์'}]}]}],{});
 assert.match('Bézier Curve',matchTechnicalTerms(list));
 assert.equal(readTechnicalTerm('Bézier Curve'),'เบซิเยร์ เคิร์ฟ');
 assert.equal(readTechnicalTerm('Primary Key'),'ไพรมารี คีย์');
});

test('ตัวอย่างมีขั้นตอนและคำอ่านอยู่ในรายการข้อสอบ',()=>{
 assert.match(readableExample('Network Address',''),/192\.168\.1\.128/);
 assert.match(readableExample('Atomicity',''),/โอน 100 บาท/);
 assert.match(readableExample('Dereference (*)',''),/\*p=25/);
 const markup=vocabularyHtml({vocabulary:[{term:'Primary Key',meaning:'คีย์หลัก',example:'รหัสนักศึกษาไม่ซ้ำ'}]},String,true);
 assert.match(markup,/คำอ่าน:/);
 assert.match(markup,/ไพรมารี คีย์/);
 assert.match(markup,/รหัสนักศึกษาไม่ซ้ำ/);
});
