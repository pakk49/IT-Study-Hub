import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { finalChapters } from '../assets/final-chapters.js';
import { buildExamBank } from '../assets/exam-bank.js';
import { vocabularyHtml } from '../assets/english-quiz.js';

const subject=subjects.find(s=>s.id==='multimedia-technology');
const chapters=subject.chapters.filter(c=>(c.exam||'final')==='final');

test('คำถามศัพท์จากบท 7–12 เปลี่ยนตัวเลือกให้เป็นคำอังกฤษครบและเฉลยถูกต้อง',()=>{
  let transformed=0;
  for(const chapter of finalChapters){
    const terms=new Map(chapter.flashcards.map(f=>[f.term,f.meaning]));
    for(const q of chapter.questions){
      assert.ok(q.answer>=0&&q.answer<4,q.id);
      assert.equal(q.options.length,4,q.id);
      assert.equal(q.reasons.length,4,q.id);
      assert.ok(q.reasons.every(Boolean),q.id);
      if(q.options.every(o=>terms.has(o))){
        transformed++;
        assert.ok(q.vocabulary.length>=4,q.id);
        assert.equal(q.vocabulary.find(x=>x.term===q.options[q.answer]).meaning,terms.get(q.options[q.answer]));
        assert.ok(q.reasons[q.answer].includes(q.options[q.answer]),q.id);
      }
    }
  }
  assert.ok(transformed>=126,'ควรมีตัวเลือกศัพท์อังกฤษอย่างน้อย 126 ข้อ: '+transformed);
});

test('Final 60 ข้อมีคำศัพท์อังกฤษพร้อมความหมายในหน้าข้อสอบ',()=>{
  const bank=buildExamBank(subject,'final');
  assert.equal(bank.ready,true);
  assert.equal(bank.questions.length,60);
  for(const q of bank.questions){
    assert.ok(q.vocabulary&&q.vocabulary.length>0,'ไม่มีคำศัพท์ใน '+q.id);
    assert.ok(q.vocabulary.every(x=>x.term.trim()&&x.meaning.trim()),q.id);
    const closed=vocabularyHtml(q,String,false);
    const opened=vocabularyHtml(q,String,true);
    assert.match(closed,/English Vocabulary/);
    assert.doesNotMatch(closed,/<details[^>]* open/);
    assert.match(opened,/<details[^>]* open/);
  }
});
