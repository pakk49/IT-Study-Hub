import test from 'node:test';
import assert from 'node:assert/strict';
import { subjects } from '../assets/content.js';
import { finalChapters } from '../assets/final-chapters.js';
import { buildExamBank } from '../assets/exam-bank.js';
test('Final มีบท 6 ถึง 12 ครบ',()=>{const mm=subjects.find(s=>s.id==='multimedia-technology');assert.deepEqual(mm.chapters.map(c=>c.number),[6,7,8,9,10,11,12]);assert.equal(finalChapters.length,6);});
test('Final 60 ข้อไม่ซ้ำ พร้อมเฉลยและเหตุผล',()=>{const mm=subjects.find(s=>s.id==='multimedia-technology');const bank=buildExamBank(mm,'final');assert.equal(bank.ready,true);assert.equal(bank.questions.length,60);assert.equal(new Set(bank.questions.map(q=>q.id)).size,60);assert.deepEqual([6,7,8,9,10,11,12].map(n=>bank.questions.filter(q=>q.chapterNo===n).length),[9,9,9,9,8,8,8]);for(const q of bank.questions){assert.equal(q.options.length,4);assert.equal(q.reasons.length,4);assert.ok(q.reasons.every(Boolean));assert.ok(q.answer>=0&&q.answer<=3);}});
test('Midterm รอสไลด์ ไม่แต่งข้อสอบขึ้นเอง',()=>{const mm=subjects.find(s=>s.id==='multimedia-technology');const bank=buildExamBank(mm,'midterm');assert.equal(bank.ready,false);assert.equal(bank.questions.length,0);});
