import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

test('JavaScript ทุกหน้าที่ใช้ Hint และย้อนกลับต้องผ่าน Syntax Check',()=>{
 for(const file of ['assets/app.js','assets/exam.js','assets/slide-hints.js']){
  assert.doesNotThrow(()=>execFileSync(process.execPath,['--check',file],{encoding:'utf8'}),file);
 }
});
test('ลบคำคมและดาวจาก Sidebar ออกจริงโดยรักษาเมนูเดิม',()=>{
 const html=readFileSync('index.html','utf8');
 assert.doesNotMatch(html,/sidebar-note|note-spark|ค่อย ๆ อ่าน/);
 assert.match(html,/id="year-nav"/);
 assert.match(html,/id="nav-back"/);
});
test('ทั้งสองระบบข้อสอบมี Hint, ปุ่มข้อก่อนหน้า และรักษาคำตอบเดิม',()=>{
 for(const file of ['assets/app.js','assets/exam.js']){
  const src=readFileSync(file,'utf8');
  assert.match(src,/slideHintHtml/);
  assert.match(src,/hintOpen/);
  assert.match(src,/drafts:/);
  assert.match(src,/ข้อก่อนหน้า/);
  assert.match(src,/Object\.prototype\.hasOwnProperty\.call/);
 }
});
