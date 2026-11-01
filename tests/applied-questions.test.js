import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { buildExamBank } from '../assets/exam-bank.js';

const mm = subjects.find(s=>s.id==='multimedia-technology');
const final = mm.chapters.filter(c=>(c.exam||'final')==='final');
const definition = /^ข้อใดอธิบาย\s*[“\"']/;

test('บท 6–12 ไม่มีคำถามนิยามตรงแบบข้อใดอธิบายคำศัพท์',()=>{
  assert.deepEqual(final.map(c=>c.number),[6,7,8,9,10,11,12]);
  assert.equal(final.reduce((n,c)=>n+c.questions.length,0),186);
  for(const c of final)for(const q of c.questions){
    assert.doesNotMatch(q.prompt,definition,c.title+' '+q.id);
    assert.ok(q.prompt.length>=20,c.title+' '+q.id);
    assert.equal(q.options.length,4,c.title+' '+q.id);
    assert.equal(q.reasons.length,4,c.title+' '+q.id);
    assert.ok(q.reasons.every(x=>typeof x==='string'&&x.trim().length>0),c.title+' '+q.id);
    assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
  }
});

test('Final 60 ข้อใช้คำถามสถานการณ์จากธนาคารรายบทเดียวกัน',()=>{
  const bank=buildExamBank(mm,'final');
  assert.equal(bank.ready,true);
  assert.equal(bank.questions.length,60);
  assert.equal(new Set(bank.questions.map(q=>q.id)).size,60);
  assert.deepEqual([6,7,8,9,10,11,12].map(n=>bank.questions.filter(q=>q.chapterNo===n).length),[9,9,9,9,8,8,8]);
  for(const q of bank.questions)assert.doesNotMatch(q.prompt,definition,q.id);
});
