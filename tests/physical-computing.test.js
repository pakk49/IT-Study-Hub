import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { subjects } from '../assets/content.js';
import { buildExamBank } from '../assets/exam-bank.js';
import { physicalLabs } from '../assets/physical-labs.js';
const physical=subjects.find(s=>s.id==='physical-computing');
test('Physical Computing Chapter 0 = Overview only; Midterm = 1–7; Final = supplied later slides',()=>{
 assert.ok(physical,'Physical Computing subject must exist');
 assert.equal(physical.code,'06016409');
 assert.equal(physical.chapters.find(c=>c.number===0)?.exam,'overview');
 assert.equal(physical.chapters.find(c=>c.number===0)?.questions.length,0);
 assert.deepEqual(physical.chapters.filter(c=>c.exam==='midterm').map(c=>c.number),[1,2,3,4,5,6,7]);
 assert.deepEqual(physical.chapters.filter(c=>c.exam==='final').map(c=>c.number),[9,10,11,12,14,15]);
 assert.ok(!physical.chapters.some(c=>c.number===8||c.number===13),'Do not fabricate unsupported lecture chapters');
});
test('Midterm / Final 60 real, distinct chapter-based applied questions each',()=>{
 for(const period of ['midterm','final']){
  const exam=buildExamBank(physical,period);
  assert.equal(exam.ready,true,period);
  assert.equal(exam.questions.length,60,period);
  assert.equal(new Set(exam.questions.map(q=>q.id)).size,60,period);
  for(const q of exam.questions){
   assert.ok(q.prompt.length>40,q.id);
   assert.doesNotMatch(q.prompt,/หมายถึงอะไร|คำว่า.+คืออะไร|ข้อใดอธิบาย/,q.id);
   assert.equal(q.options.length,4,q.id);
   assert.equal(new Set(q.options).size,4,q.id);
   assert.equal(q.reasons.length,4,q.id);
   assert.ok(q.vocabulary?.every(v=>v.term&&v.meaning&&v.example),q.id);
   const ch=physical.chapters.find(c=>c.id===q.chapterId);
   assert.equal(ch.exam,period,q.id);
   assert.ok(ch.sections.some(s=>s.id===q.topic),q.id);
  }
 }
});
test('All confirmed Physical labs present; requested GitHub lab folders link correctly',()=>{
 assert.deepEqual(physicalLabs.map(l=>l.no),[1,2,3,4,6,9,10,12,13,14,15]);
 const prefix='https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/';
 for(const no of [3,4,12,13,14,15]){
  const lab=physicalLabs.find(l=>l.no===no);
  assert.ok(lab.url?.startsWith(prefix),'Missing GitHub link for Lab '+no);
  assert.ok(lab.tasks.length>=3&&lab.terms.length>=3,'Lab content not ready '+no);
 }
 for(const no of [1,2,6,9,10])assert.ok(physicalLabs.find(l=>l.no===no).source.includes('.pdf'));
});
test('Original chapter summaries: English vocabulary, Thai meanings, concrete examples',()=>{
 for(const c of physical.chapters.filter(c=>c.number!==0)){
  assert.equal(c.sections.length,2,c.title);
  assert.equal(c.flashcards.length,10,c.title);
  assert.equal(c.questions.length,10,c.title);
  assert.ok(c.source.includes('.pdf'),c.title);
  for(const section of c.sections){
   assert.equal(section.table.rows.length,5);
   assert.ok(section.intro.length>45);
   for(const row of section.table.rows) assert.ok(row.length===3&&row.every(v=>typeof v==='string'&&v.length>1));
  }
 }
});
test('Physical Lab UI and navigation module syntax are valid',()=>{
 for(const path of ['assets/physical-builder.js','assets/physical-midterm.js','assets/physical-final.js','assets/physical-overview.js','assets/physical-labs.js','assets/physical-lab-ui.js','assets/app.js']){
  assert.doesNotThrow(()=>execFileSync(process.execPath,['--check',path],{encoding:'utf8'}),path);
 }
});
