import { subjects } from './content.js';
const KEY = 'it-study-hub:dashboard-v1';
const DURATION_KEY = 'it-study-hub:study-time-v1';
const $ = s => document.querySelector(s);
const esc = x => String(x ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const gradeScale = [{min:80,name:'A',point:4},{min:75,name:'B+',point:3.5},{min:70,name:'B',point:3},{min:65,name:'C+',point:2.5},{min:60,name:'C',point:2},{min:55,name:'D+',point:1.5},{min:50,name:'D',point:1},{min:0,name:'F',point:0}];
const official = {'A':4,'B+':3.5,'B':3,'C+':2.5,'C':2,'D+':1.5,'D':1,'F':0};
const read = (key,fallback) => { try {const value=JSON.parse(localStorage.getItem(key));return value && typeof value==='object' && !Array.isArray(value)?value:fallback;}catch{return fallback;} };
const save = (key,value) => {try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{return false;}};
const state = read(KEY,{name:'',courses:{}});
const minutes = read(DURATION_KEY,{});
const course = id => state.courses[id] || (state.courses[id] = {credits:3,earned:'',total:'',actual:'',note:''});
const number = x => x==='' || x===null || x===undefined ? null : Number(x);
const currentPercent = c => {const e=number(c.earned),t=number(c.total);return e!==null&&t!==null&&Number.isFinite(e)&&Number.isFinite(t)&&t>0&&e>=0&&e<=t?100*e/t:null;};
const inferred = c => {let n=currentPercent(c);return n===null?null:gradeScale.find(g=>n>=g.min);};
const fmt = x => Number(x).toLocaleString('th-TH',{maximumFractionDigits:1});
const timeLabel = m => m>=60?`${fmt(Math.floor(m/60))} ชม. ${fmt(m%60)} นาที`:`${fmt(m)} นาที`;
let activeId = null, lastTime = Date.now();
function track() {
  const now=Date.now(), delta=Math.min(60,Math.max(0,(now-lastTime)/1000));lastTime=now;
  if (!document.hidden && activeId && delta) {
    minutes[activeId] = (minutes[activeId]||0)+delta/60;
    save(DURATION_KEY,minutes);
  }
}
function resolveSubject() {
  const m=location.hash.match(/\/subject\/([^/]+)/);
  return m&&subjects.some(s=>s.id===m[1])?m[1]:null;
}
function updateActive(){track();activeId=resolveSubject();}
setInterval(track,15000);
document.addEventListener('visibilitychange',()=>{track();lastTime=Date.now();});
window.addEventListener('pagehide',track);
window.addEventListener('hashchange',updateActive);
updateActive();
const html = `<div class="dashboard-panel">
  <div class="dashboard-head"><div><p class="dashboard-kicker">MY STUDY HUB</p><h1>โปรไฟล์และผลการเรียน</h1><p>ติดตามเวลาอ่านและบันทึกคะแนนเพื่อวางแผนการเรียน</p></div><a href="#/" class="dashboard-back">← กลับคลังวิชา</a></div>
  <section class="dashboard-section"><label class="dashboard-field">ชื่อที่แสดง<input id="dash-name" type="text" maxlength="80" placeholder="ชื่อเล่นหรือชื่อของคุณ" autocomplete="nickname"></label>
  <p id="dash-identity" class="dashboard-help"></p></section>
  <div class="dashboard-stats" id="dash-stats"></div>
  <section class="dashboard-section"><h2>เวลาเรียนแยกรายวิชา</h2><div id="dash-time"></div><p class="dashboard-help">นับเวลาเฉพาะตอนเปิดหน้าเนื้อหารายวิชาและแท็บกำลังแสดงอยู่ ไม่ใช่การจับเวลาตั้งใจอ่านอย่างแม่นยำ</p></section>
  <section class="dashboard-section"><h2>คะแนนและเกรดแต่ละวิชา</h2>
  <p class="dashboard-help">กรอกคะแนนที่ได้รับจริงสะสมและคะแนนเต็มของงานที่ตรวจแล้ว ระบบจะคำนวณอัตราคะแนนปัจจุบันเพื่อประมาณแนวโน้มเกรด ไม่ใช่คะแนนรวมสุดท้ายหรือคำทำนายผลสอบ โดยเกณฑ์เริ่มต้น A≥80, B+≥75, B≥70, C+≥65, C≥60, D+≥55, D≥50, F&lt;50 และปรับใช้ตามเกณฑ์อาจารย์จริง</p>
  <div class="dashboard-table-wrap"><table class="dashboard-table"><thead><tr><th>รายวิชา</th><th>หน่วยกิต</th><th>ได้แล้ว</th><th>เต็มที่ตรวจแล้ว</th><th>คาดการณ์</th><th>เกรดจริง</th><th>ความเสี่ยง</th></tr></thead><tbody id="dash-courses"></tbody></table></div></section>
  <section class="dashboard-section"><h2>กราฟคะแนนปัจจุบัน</h2><div id="dash-scores"></div></section>
  <section class="dashboard-section"><h2>GPA และ GPS</h2><div id="dash-gpa"></div><p class="dashboard-help">GPA = ผลรวม(แต้มเกรด × หน่วยกิต) ÷ ผลรวมหน่วยกิตที่มีเกรดตัวอักษรจริง · GPS = ผลรวม(แต้มเกรด × หน่วยกิต) · วิชาที่ว่างหรือ W ไม่รวมในการคำนวณ ตัวเลขนี้เป็นเฉพาะรายวิชาที่กรอก ไม่ใช่ GPA สะสมทุกภาคเรียน</p></section>
  <section class="dashboard-section"><h2>ประเมินความเสี่ยง F / การถอนวิชา</h2><div id="dash-risk"></div><p class="dashboard-help">คำเตือนเป็นเพียงการคัดกรองจากคะแนนที่บันทึก ไม่ใช่คำแนะนำให้ถอนอัตโนมัติ ก่อนตัดสินใจให้ตรวจคะแนนคงเหลือ การเข้าชั้นเรียน เกณฑ์ผ่านขั้นต่ำ เงื่อนไข F และกำหนดถอนจากทะเบียนมหาวิทยาลัย</p></section>
  <p class="dashboard-help">ข้อมูลโปรไฟล์ คะแนนและเวลาเรียนบันทึกใน Local Storage ของเบราว์เซอร์นี้เท่านั้น ยังไม่ซิงค์ข้ามอุปกรณ์หรือบัญชี Google และไม่ได้เข้ารหัสเป็นฐานข้อมูลส่วนตัว</p>
</div>`;
const grades = ['', 'A','B+','B','C+','C','D+','D','F','W','I','S','U'];
function render() {
  track();
  const body=$('#dash-courses');
  body.innerHTML=subjects.map(s=>{
    const c=course(s.id),g=inferred(c),p=currentPercent(c);
    const risk=p===null?'ยังไม่มีคะแนน':p<50?'ควรประเมินเพิ่ม':p<60?'ควรติดตาม':'ปกติ';
    return `<tr data-course="${esc(s.id)}"><td><strong>${esc(s.thai)}</strong><small>${esc(s.code)}</small></td>
    <td><input data-key="credits" type="number" inputmode="numeric" min="0" max="30" step="1" value="${esc(c.credits)}" aria-label="หน่วยกิต ${esc(s.thai)}"></td>
    <td><input data-key="earned" type="number" inputmode="decimal" min="0" step="any" value="${esc(c.earned)}" placeholder="—" aria-label="คะแนนที่ได้ ${esc(s.thai)}"></td>
    <td><input data-key="total" type="number" inputmode="decimal" min="0" step="any" value="${esc(c.total)}" placeholder="—" aria-label="คะแนนเต็มที่ตรวจแล้ว ${esc(s.thai)}"></td>
    <td><strong>${g?g.name:'—'}</strong><small>${p===null?'':fmt(p)+'%'}</small></td>
    <td><select data-key="actual" aria-label="เกรดจริง ${esc(s.thai)}">${grades.map(v=>`<option value="${v}" ${c.actual===v?'selected':''}>${v||'ยังไม่ทราบ'}</option>`).join('')}</select></td>
    <td><span class="risk-tag ${p!==null&&p<50?'risk-high':''}">${risk}</span></td></tr>`;
  }).join('');
  const vals=subjects.map(s=>({s,c:course(s.id),time:minutes[s.id]||0}));
  const totalTime=vals.reduce((a,v)=>a+v.time,0);
  const actuals=vals.filter(v=>Object.prototype.hasOwnProperty.call(official,v.c.actual)&&Number.isInteger(Number(v.c.credits))&&Number(v.c.credits)>0);
  const totalCredits=actuals.reduce((a,v)=>a+Number(v.c.credits),0);
  const gps=actuals.reduce((a,v)=>a+official[v.c.actual]*Number(v.c.credits),0);
  const gpa=totalCredits?gps/totalCredits:null;
  $('#dash-stats').innerHTML=`<div><span>เวลาเรียนสะสม</span><strong>${timeLabel(Math.floor(totalTime))}</strong></div><div><span>รายวิชาที่บันทึกคะแนน</span><strong>${vals.filter(v=>currentPercent(v.c)!==null).length} / ${vals.length}</strong></div><div><span>GPA จากเกรดจริง</span><strong>${gpa===null?'—':gpa.toFixed(2)}</strong></div>`;
  const maxTime=Math.max(1,...vals.map(v=>v.time));
  $('#dash-time').innerHTML=vals.map(v=>`<div class="graph-line"><span>${esc(v.s.thai)}</span><div class="graph-track"><i style="width:${Math.min(100,v.time/maxTime*100)}%"></i></div><b>${timeLabel(Math.floor(v.time))}</b></div>`).join('');
  $('#dash-scores').innerHTML=vals.map(v=>{const p=currentPercent(v.c);return `<div class="graph-line"><span>${esc(v.s.thai)}</span><div class="graph-track"><i style="width:${p===null?0:Math.min(100,p)}%"></i></div><b>${p===null?'—':fmt(p)+'%'}</b></div>`;}).join('');
  $('#dash-gpa').innerHTML=`<div class="dashboard-stats"><div><span>GPA (เกรดจริง)</span><strong>${gpa===null?'—':gpa.toFixed(2)}</strong></div><div><span>GPS</span><strong>${gps.toFixed(2)}</strong></div><div><span>หน่วยกิตที่คำนวณ</span><strong>${totalCredits}</strong></div></div>`;
  const warnings=vals.filter(v=>{const p=currentPercent(v.c);return p!==null&&p<60&&(!v.c.actual||v.c.actual==='I');});
  // Removed redundant risk placeholder:'<p class="dashboard-safe">ยังไม่มีวิชาที่ถูกจัดเป็นกลุ่มต้องติดตามจากข้อมูลที่กรอก</p>';
  $('#dash-risk').innerHTML=warnings.length?warnings.map(v=>{const p=currentPercent(v.c);return `<article class="dashboard-warning"><strong>${esc(v.s.thai)} — ${fmt(p)}%</strong><p>${p<50?'คะแนนที่ตรวจแล้วต่ำกว่า 50%':'คะแนนที่ตรวจแล้วต่ำกว่า 60%'} ควรคำนวณคะแนนที่ยังเหลือและตรวจเงื่อนไขวิชาก่อนพิจารณาถอน</p></article>`;}).join(''):'<p class="dashboard-safe">ยังไม่มีวิชาที่ถูกจัดเป็นกลุ่มต้องติดตามจากข้อมูลที่กรอก</p>';
  $('#dash-name').value=state.name||'';
}
export function openDashboard() {
 const main=$('#main');
 if(!main)return;
 main.innerHTML=html;
 render();
 if (location.hostname.endsWith('.workers.dev')) {
   fetch('/cdn-cgi/access/get-identity',{credentials:'same-origin',cache:'no-store'})
     .then(r=>r.ok?r.json():null)
     .then(identity=>{const node=main.querySelector('#dash-identity');if(node&&identity?.email)node.textContent='บัญชีที่เข้าสู่ระบบ: '+identity.email;})
     .catch(()=>{});
 }
 main.querySelector('#dash-name').addEventListener('change',event=>{state.name=event.target.value.trim();save(KEY,state);});
 main.querySelector('#dash-courses').addEventListener('change',event=>{
   const row=event.target.closest('[data-course]'),field=event.target.dataset.key;
   if(!row||!['credits','earned','total','actual'].includes(field))return;
   const c=course(row.dataset.course),v=event.target.value;
   if(field==='credits' && (!Number.isInteger(Number(v)) || Number(v)<0 || Number(v)>30)) {alert('หน่วยกิตต้องเป็นจำนวนเต็ม 0–30');render();return;}
   if(['earned','total'].includes(field)&&(v!==''&&(!Number.isFinite(Number(v))||Number(v)<0))){alert('กรอกคะแนนที่ไม่ติดลบ');render();return;}
   const next={...c,[field]:v};
   if(currentPercent(next)===null && next.earned!==''&&next.total!==''&&Number(next.total)>0 && Number(next.earned)>Number(next.total)){alert('คะแนนที่ได้ห้ามเกินคะแนนเต็ม');render();return;}
   c[field]=v;save(KEY,state);render();
 });
}
export function isDashboardRoute(){return location.hash==='#/dashboard';}
