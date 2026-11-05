import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { subjects } from '../assets/content.js';
import { vocabularyHtml } from '../assets/english-quiz.js';
import { detailedMeaning } from '../assets/concept-details.js';

test('ตารางศัพท์ไม่แสดงคำอ่านและความหมายใต้ชื่อ',()=>{
 const app=readFileSync(new URL('../assets/app.js',import.meta.url),'utf8');
 const styles=readFileSync(new URL('../assets/styles.css',import.meta.url),'utf8');
 assert.match(app,/data-study-term=/);
 assert.doesNotMatch(app,/getTechnicalTerm\(/);
 assert.match(styles,/\.study-term-hint\{display:none!important\}/);
});

test('รายการศัพท์ในข้อสอบแสดงเฉพาะชื่อและเปิดความหมายเมื่อ hover หรือแตะ',()=>{
 const markup=vocabularyHtml({vocabulary:[{term:'Unicast   Frame',meaning:'ส่งหาเครื่องเดียว',example:'PC A ไป PC B'}]},String,true);
 assert.match(markup,/data-study-term="unicast frame"/);
 assert.doesNotMatch(markup,/ส่งหาเครื่องเดียว|PC A ไป PC B|คำอ่าน:/);
});

test('Unicast Broadcast และ Multicast มีคำอธิบายถูกบริบท',()=>{
 const subject=subjects.find(s=>s.id==='introduction-to-network-systems');
 const find=term=>subject.chapters.flatMap(ch=>ch.flashcards).find(card=>card.term===term);
 for(const term of ['Unicast Frame','Broadcast Frame','Multicast MAC']){
  const card=find(term);
  assert.ok(card?.meaning?.length>130,term);
  assert.ok(card?.example,term);
 }
 assert.match(find('Broadcast Frame').meaning,/FF:FF:FF:FF:FF:FF/);
 assert.match(find('Multicast MAC').meaning,/01:00:5E:01:01:01/);
 assert.equal(detailedMeaning('Unicast Frame',subject.id),find('Unicast Frame').meaning);
});

test('แก้ความหมายแล้วไม่เปลี่ยนตัวเลือกและเฉลย',()=>{
 let count=0;
 for(const subject of subjects)for(const chapter of subject.chapters)for(const question of chapter.questions){
  const expectedOptions=question.id==='dm-pdf-21'?2:4; // PDF ข้อ 21 มีเพียง 2 ตัวเลือก
  assert.equal(question.options.length,expectedOptions,question.id);
  assert.ok(question.answer>=0&&question.answer<expectedOptions,question.id);
  assert.equal(question.reasons.length,expectedOptions,question.id);
  assert.ok(question.reasons.every(Boolean),question.id);
  count++;
 }
 assert.ok(count>=700);
});
