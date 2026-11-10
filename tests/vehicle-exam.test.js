import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { vehicleTasks } from '../assets/physical-vehicle-data.js';

test('Vehicle exam มีครบสามข้อ 3 / 5 / 8 คะแนน และ main กำหนดให้', () => {
  assert.deepEqual(vehicleTasks.map(x => x.id), ['score','struct','dynamic']);
  assert.deepEqual(vehicleTasks.map(x => x.points), [3,5,8]);
  for (const t of vehicleTasks) {
    assert.match(t.prefix, /typedef struct Vehicle/);
    assert.match(t.main, /\bint main\s*\(/);
    assert.doesNotMatch(t.starter, /\bint main\s*\(/);
    assert.equal(t.criteria.reduce((sum,c) => sum + c.weight, 0),t.points);
    assert.ok(t.expected.length > 3);
    assert.ok(t.requirements.length >= t.points-1);
    assert.ok(t.hints.length >= 3);
    assert.ok(t.prompt.length > 65);
  }
});

test('หน้า Vehicle ตรวจ C และเปรียบเทียบ stdout โดยไม่อ้างว่าคอมไพล์ในเว็บ', () => {
  const html=readFileSync('physical-vehicle-exam.html','utf8');
  const js=readFileSync('assets/physical-vehicle-exam.js','utf8');
  const css=readFileSync('assets/physical-vehicle-exam.css','utf8');
  const build=readFileSync('scripts/build-site.mjs','utf8');
  for(const id of ['vh-code','vh-check','vh-upload','vh-report','vh-main','vh-stdout','vh-compare']){
    assert.ok(html.includes('id="'+id+'"'),id);
  }
  assert.ok(js.includes('function createCriteriaResult'));
  assert.ok(js.includes('function compareOutput'));
  assert.ok(js.includes('function extractFunctions'));
  assert.ok(html.includes('ไม่ได้คอมไพล์'));
  assert.ok(css.includes('@media(max-width:580px)'));
  assert.ok(build.includes("'physical-vehicle-exam.html'"));
  execFileSync(process.execPath,['--check','assets/physical-vehicle-exam.js']);
  execFileSync(process.execPath,['--check','assets/physical-vehicle-data.js']);
});
