
// IT Study Hub · self-managed exam calendar and study sessions (client-side storage).
// Existing year 2 schedule remains the default. Editing a schedule never overwrites it in GitHub.
'use strict';
const base='./index.html#';
const K={exams:'ith-custom-exams-v2',examEdits:'ith-exam-edits-v2',examHidden:'ith-exam-hidden-v2',sessions:'ith-custom-sessions-v2',sessionEdits:'ith-session-edits-v2',sessionHidden:'ith-session-hidden-v2',done:'it-study-hub-exam-plan-2026-v1',oldTimes:'it-study-hub-custom-times-v1',timer:'it-study-hub-study-timer-v1',year:'it-study-hub-exam-year-v1'};
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch{alert('ไม่สามารถบันทึกในเบราว์เซอร์นี้ได้');return false}};
const pad=n=>String(n).padStart(2,'0');
const fmt=t=>t ? t.slice(8,10)+'/'+t.slice(5,7)+'/'+t.slice(0,4) : 'ยังไม่ระบุ';
const dateValid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(new Date(d+'T12:00:00').getTime())&&new Date(d+'T12:00:00').toISOString().slice(0,10)===d;
const minutes=t=>/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?Number(t.slice(0,2))*60+Number(t.slice(3)):NaN;
const elapsed=(a,b)=>minutes(b)-minutes(a);
const idGen=()=> 'u'+Date.now().toString(36)+Math.random().toString(36).slice(2,9);
const initialExams=[
['2026-08-17','13:30','16:30','MULTIMEDIA TECHNOLOGY','IT-L207 C5','Midterm','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['2026-08-18','13:30','16:30','DATABASE SYSTEM CONCEPTS','IT-Project Base ชั้น 3 F5','Midterm','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['2026-08-19','09:30','12:30','PHYSICAL COMPUTING','IT-L207 C4','Midterm','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['2026-08-20','09:30','12:30','INTRODUCTION TO NETWORK SYSTEMS','IT-L207 C4','Midterm','กลุ่ม 2 ทฤษฎี'],
['2026-08-21','13:30','16:30','DISCRETE MATHEMATICS','IT-Project Base ชั้น 3 F2','Midterm','กลุ่ม 2 ทฤษฎี'],
['2026-11-02','09:30','12:30','MULTIMEDIA TECHNOLOGY','IT-L207 C3','Final','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['2026-11-03','09:30','12:30','DATABASE SYSTEM CONCEPTS','IT-M04 C5','Final','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['2026-11-05','09:30','12:30','INTRODUCTION TO NETWORK SYSTEMS','IT-L207 C4','Final','กลุ่ม 2 ทฤษฎี'],
['2026-11-06','13:30','16:30','DISCRETE MATHEMATICS','IT-Project Base ชั้น 3 F2','Final','กลุ่ม 2 ทฤษฎี'],
['2026-11-10','09:30','12:30','INFORMATION SYSTEM ANALYSIS AND DESIGN','IT-L207 C1','Final','กลุ่ม 2 ทฤษฎี'],
['2026-11-11','09:30','12:30','PHYSICAL COMPUTING','IT-L207 C4','Final','กลุ่ม 2 ทฤษฎี / กลุ่ม 5 ปฏิบัติ'],
['','', '', 'CODING WITH PYTHON','ไม่ระบุ','Final','กลุ่ม 901 · อัตสอบเอง']
].map((a,i)=>({id:'original-'+i,year:2,date:a[0],start:a[1],end:a[2],subject:a[3],room:a[4],period:a[5],note:a[6]}));
let customExams=load(K.exams,[]), examEdits=load(K.examEdits,{}),examHidden=load(K.examHidden,{});
let customSessions=load(K.sessions,[]),sessionEdits=load(K.sessionEdits,{}),sessionHidden=load(K.sessionHidden,{});
let done=load(K.done,{}),oldTimes=load(K.oldTimes,{});
let year=Number(load(K.year,2));if(![1,2,3,4].includes(year))year=2;
let selected=days[0].date, examEditing=null, sessionEditing=null;
let clock=load(K.timer,{mode:'idle',key:null,left:0,total:0,running:false,deadline:null,previous:null});
if(!clock||typeof clock!=='object'||!['idle','study','break','done','break-done'].includes(clock.mode))clock={mode:'idle',key:null,left:0,total:0,running:false,deadline:null,previous:null};
const baseDays=days;
const allExams=()=>initialExams.concat(customExams).filter(e=>!examHidden[e.id]).map(e=>({...e,...(examEdits[e.id]||{})}));
const yearExams=()=>allExams().filter(e=>e.year===year).sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999')||a.start.localeCompare(b.start));
function allStudy(){
 const original=baseDays.flatMap(d=>d.entries.filter(e=>e[2]!=='Exam').map((e,i)=>({date:d.date,year:2,start:e[0],end:e[1],subject:e[2],title:e[3],url:e[4],_i:d.entries.indexOf(e)})));
 // Stable original IDs: preserve old done/time keys based on the position in the original daily entries.
 const originalItems=original.map(e=>({...e,id:'b:'+e.date+'-'+e._i,oldKey:e.date+'-'+e._i}));
 return originalItems.concat(customSessions).filter(e=>!sessionHidden[e.id]).map(e=>{
  const out={...e,...(sessionEdits[e.id]||{})};
  const times=e.oldKey&&oldTimes[e.oldKey];
  if(times&&!sessionEdits[e.id]?.start)out.start=times[0];
  if(times&&!sessionEdits[e.id]?.end)out.end=times[1];
  return out;
 });
}
function yearStudy(){return allStudy().filter(e=>e.year===year).sort((a,b)=>a.date.localeCompare(b.date)||a.start.localeCompare(b.start)||a.id.localeCompare(b.id))}
function allDates(){
 const set=new Set(yearStudy().map(e=>e.date));
 // The built-in year 2 calendar stays 4–11 November. Other years are populated only from user-created sessions.
 if(year===2)baseDays.forEach(d=>set.add(d.date));
 return [...set].sort();
}
function findStudy(id){return allStudy().find(e=>e.id===id)||null}
function sessionDuration(e){return Math.max(1,elapsed(e.start,e.end)||30)}
function runningLeft(){return clock.running&&Number.isFinite(clock.deadline)?Math.max(0,clock.deadline-Date.now()):Math.max(0,clock.left||0)}
function persistClock(){save(K.timer,clock)}
function normalizeClock(){if(clock.running&&runningLeft()<=0){clock.running=false;clock.left=0;clock.deadline=null;clock.mode=clock.mode==='break'?'break-done':'done';persistClock()}}
function clockText(ms){const sec=Math.ceil(ms/1000);return [Math.floor(sec/3600),Math.floor(sec%3600/60),sec%60].map(pad).join(':')}
function beginSession(id){
 const e=findStudy(id);if(!e)return;
 year=e.year;selected=e.date;save(K.year,year);
 const time=sessionDuration(e)*60000;
 clock={mode:'study',key:id,left:time,total:time,running:true,deadline:Date.now()+time,previous:null};
 persistClock();render();
}
function pauseClock(){if(!clock.running)return;clock.left=runningLeft();clock.running=false;clock.deadline=null;persistClock();renderClock()}
function restoreStudy(){
 const p=clock.previous;
 if(p&&findStudy(p.key))clock={mode:'study',key:p.key,left:p.left,total:p.total,running:false,deadline:null,previous:null};
 else clock={mode:'idle',key:null,left:0,total:0,running:false,deadline:null,previous:null};
 persistClock();renderClock()
}
function resumeClock(){
 normalizeClock();
 if(clock.mode==='break-done'){restoreStudy();return}
 if(clock.mode==='idle'){const first=yearStudy().find(e=>e.date===selected);if(first)beginSession(first.id);return}
 if(clock.mode==='done'||clock.running)return;
 clock.running=true;clock.deadline=Date.now()+clock.left;persistClock();renderClock()
}
function extendClock(n){
 if(clock.mode==='idle')return;
 clock.left=runningLeft()+n*60000;clock.total=Math.max(clock.total,clock.left);
 if(clock.mode==='done')clock.mode='study';
 if(clock.mode==='break-done')clock.mode='break';
 if(clock.running)clock.deadline=Date.now()+clock.left;
 persistClock();renderClock()
}
function setClock(){
 const n=Number($('timer-minutes').value);
 if(!Number.isInteger(n)||n<1||n>600){alert('ตั้งเวลาระหว่าง 1–600 นาที');return}
 if(clock.mode==='idle'){const first=yearStudy().find(e=>e.date===selected);if(!first){alert('กรุณาเพิ่มช่วงอ่านหรือกดเริ่มอ่านก่อน');return}beginSession(first.id);pauseClock()}
 clock.left=n*60000;clock.total=clock.left;
 if(clock.running)clock.deadline=Date.now()+clock.left;
 if(clock.mode==='done')clock.mode='study';
 if(clock.mode==='break-done')clock.mode='break';
 persistClock();renderClock()
}
function breakClock(){
 if(clock.mode==='break'||clock.mode==='break-done'){restoreStudy();return}
 const n=Number($('timer-break-minutes').value);
 if(!Number.isInteger(n)||n<1||n>120){alert('เวลาพักต้องอยู่ระหว่าง 1–120 นาที');return}
 const previous=clock.mode==='idle'?null:{key:clock.key,left:runningLeft(),total:clock.total};
 clock={mode:'break',key:clock.key,left:n*60000,total:n*60000,running:true,deadline:Date.now()+n*60000,previous};
 persistClock();renderClock()
}
function nextClock(){
 const list=yearStudy(),idx=list.findIndex(e=>e.id===clock.key);
 const next=list[idx+1]||list[0];
 if(!next){alert('ยังไม่มีช่วงอ่านในชั้นปีนี้');return}
 beginSession(next.id)
}
function stopClock(){clock={mode:'idle',key:null,left:0,total:0,running:false,deadline:null,previous:null};persistClock();renderClock()}
function renderClock(){
 normalizeClock();
 const e=findStudy(clock.key),isBreak=clock.mode==='break'||clock.mode==='break-done',finished=clock.mode==='done'||clock.mode==='break-done';
 $('timer-topic').textContent=isBreak?'กำลังพัก':e?e.title:'เลือกช่วงอ่านแล้วกดเริ่ม';
 $('timer-state').textContent=e?'ปี '+e.year+' · '+fmt(e.date)+' · '+e.subject:'จับเวลาได้ในทุกชั้นปี';
 $('timer-clock').textContent=clockText(runningLeft());
 $('timer-clock').className='clock'+(finished?' done':'');
 $('timer-progress').style.width=(clock.total?Math.max(0,Math.min(100,(clock.total-runningLeft())/clock.total*100)):0)+'%';
 $('timer-message').textContent=finished?(isBreak?'หมดเวลาพัก — กดกลับไปอ่านต่อ':'หมดเวลา — ต่อเวลาหรือเปลี่ยนบทได้'):clock.running?(isBreak?'เวลาพักกำลังนับถอยหลัง':'กำลังอ่าน'):clock.mode==='idle'?'ยังไม่ได้เริ่ม':'หยุดชั่วคราว';
 $('timer-play').textContent=clock.mode==='break-done'?'↩ กลับไปอ่านต่อ':clock.mode==='done'?'หมดเวลา':clock.running?'▶ กำลังนับ':'▶ เริ่ม / อ่านต่อ';
 $('timer-play').disabled=clock.running||clock.mode==='done';
 $('timer-pause').disabled=!clock.running;
 $('timer-panel').hidden=false;
}
function updateProgress(){
 const list=yearStudy(),n=list.filter(e=>done[e.id]||done[e.oldKey]).length;
 $('day-count').textContent=allDates().length;
 $('exam-count').textContent=yearExams().length;
 $('completed').textContent=n+'/'+list.length;
 $('bar').style.width=(list.length?100*n/list.length:0)+'%';
}
function renderExams(){
 const list=yearExams();
 $('exam-panel').hidden=false;
 $('exam-panel').querySelector('h2').textContent='ตารางสอบปี '+year+' · สร้างและแก้ไขได้';
 $('exam-list').innerHTML=list.length?['Midterm','Final','อื่น ๆ'].map(period=>{
  const filtered=list.filter(e=>e.period===period);if(!filtered.length)return '';
  return '<section class="exam-period"><h3>'+esc(period)+'</h3><div class="examlist">'+filtered.map(e=>
   '<article class="exam"><b>'+esc(e.date?fmt(e.date):'ไม่ระบุวัน')+' · '+esc(e.start&&e.end?e.start+'–'+e.end:'ไม่ระบุเวลา')+'</b><div class="exam-subject">'+esc(e.subject)+'</div><small>'+esc(e.room||'ไม่ระบุห้อง')+'</small><small>'+esc(e.note||'')+'</small><div class="session-controls"><button type="button" class="session-edit" data-exam-edit="'+esc(e.id)+'">✎ แก้ไข</button><button type="button" class="session-edit" data-exam-delete="'+esc(e.id)+'">ลบ</button><button type="button" class="session-start" data-exam-study="'+esc(e.id)+'" '+(e.date?'':'disabled')+'>+ วางแผนอ่าน</button></div></article>'
  ).join('')+'</div></section>';
 }).join(''):'<div class="empty-year"><p>ยังไม่มีตารางสอบสำหรับชั้นปีนี้ กด “เพิ่มวันสอบ” เพื่อเริ่มจัดตาราง</p></div>';
 document.querySelectorAll('[data-exam-edit]').forEach(b=>b.onclick=()=>openExam(b.dataset.examEdit));
 document.querySelectorAll('[data-exam-delete]').forEach(b=>b.onclick=()=>removeExam(b.dataset.examDelete));
 document.querySelectorAll('[data-exam-study]').forEach(b=>b.onclick=()=>fromExam(b.dataset.examStudy));
}
function renderSessions(){
 const dates=allDates();if(!dates.includes(selected))selected=dates[0]||'';
 $('tabs').innerHTML=dates.map(d=>'<button type="button" class="tab" data-day="'+esc(d)+'" aria-selected="'+(selected===d)+'">'+esc(fmt(d))+'</button>').join('');
 document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{selected=b.dataset.day;renderSessions()});
 const current=yearStudy().filter(e=>e.date===selected);
 if(!selected){$('detail').innerHTML='<div class="empty-year"><h2>ยังไม่มีตารางอ่านปี '+year+'</h2><p>กด “เพิ่มช่วงอ่าน” เพื่อกำหนดวัน เวลา และบทเรียนเอง</p></div>';return}
 const legacy=baseDays.find(d=>d.date===selected);
 $('detail').innerHTML='<section class="dayblock"><div class="dayhead"><div><h2>'+esc(fmt(selected))+'</h2><p>'+esc(legacy&&year===2?legacy.focus:'ตารางอ่านที่กำหนดเอง')+'</p></div><span class="tag">'+current.length+' ช่วงอ่าน</span></div>'+
 current.map(e=>'<div class="session '+(clock.key===e.id?'active':'')+'"><div class="hours">'+esc(e.start)+'<br>– '+esc(e.end)+'</div><div><span class="subj '+esc(['Network','Discrete','Physical','ISAD'].includes(e.subject)?e.subject:'Study')+'">'+esc(e.subject)+'</span><strong>'+esc(e.title)+'</strong>'+(e.url?'<div><a class="task-link" href="'+base+encodeURI(e.url)+'">เปิดบทเรียน ↗</a></div>':'')+'<div class="session-controls"><button class="session-start" data-read="'+esc(e.id)+'">▶ เริ่มอ่าน</button><button class="session-edit" data-study-edit="'+esc(e.id)+'">✎ แก้ไข</button><button class="session-edit" data-study-delete="'+esc(e.id)+'">ลบ</button></div></div><input class="check" aria-label="อ่านเสร็จ '+esc(e.title)+'" type="checkbox" data-done="'+esc(e.id)+'" '+(done[e.id]||done[e.oldKey]?'checked':'')+'></div>').join('')+'</section>';
 document.querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>beginSession(b.dataset.read));
 document.querySelectorAll('[data-study-edit]').forEach(b=>b.onclick=()=>openSession(b.dataset.studyEdit));
 document.querySelectorAll('[data-study-delete]').forEach(b=>b.onclick=()=>removeSession(b.dataset.studyDelete));
 document.querySelectorAll('[data-done]').forEach(c=>c.onchange=()=>{done[c.dataset.done]=c.checked;save(K.done,done);updateProgress()});
}
function render(){
 $('year-picker').innerHTML=[1,2,3,4].map(y=>'<button class="year-button '+(year===y?'active':'')+'" data-year="'+y+'">ปี '+y+'</button>').join('');
 document.querySelectorAll('[data-year]').forEach(b=>b.onclick=()=>{year=Number(b.dataset.year);save(K.year,year);selected=allDates()[0]||'';render()});
 $('year-description').textContent='ปี '+year+' · ตารางสอบ '+yearExams().length+' รายการ · จัดตารางอ่านและจับเวลาได้';
 renderExams();renderSessions();updateProgress();renderClock();
}
function openExam(id=null){
 examEditing=id;
 const e=allExams().find(x=>x.id===id)||{period:'Final',subject:'',date:'',start:'09:00',end:'12:00',room:'',note:''};
 $('exam-form-title').textContent=id?'แก้ไขวันสอบ':'เพิ่มวันสอบใหม่ · ปี '+year;
 ['period','subject','date','start','end','room','note'].forEach(k=>$('exam-'+k).value=e[k]||'');
 $('exam-form').hidden=false;$('exam-form').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function removeExam(id){
 if(!confirm('ยืนยันลบวันสอบรายการนี้?'))return;
 if(id.startsWith('original-')){examHidden[id]=true;save(K.examHidden,examHidden)}
 else{customExams=customExams.filter(e=>e.id!==id);save(K.exams,customExams)}
 render()
}
function submitExam(ev){
 ev.preventDefault();
 const data=Object.fromEntries(['period','subject','date','start','end','room','note'].map(k=>[k,$('exam-'+k).value.trim()]));
 if(!data.subject){alert('กรุณาระบุชื่อวิชา');return}
 // Self-scheduled exams normally require an exact date and valid times; independent/external exams may omit both.
 if(data.date&&!dateValid(data.date)){alert('วันที่สอบไม่ถูกต้อง');return}
 if((data.start||data.end)&&(!Number.isFinite(minutes(data.start))||!Number.isFinite(minutes(data.end))||elapsed(data.start,data.end)<=0)){alert('เวลาเริ่ม–สิ้นสุดไม่ถูกต้อง');return}
 if(examEditing){if(examEditing.startsWith('original-')){examEdits[examEditing]={...data,year};save(K.examEdits,examEdits)}
 else{customExams=customExams.map(e=>e.id===examEditing?{...e,...data}:e);save(K.exams,customExams)}}
 else{customExams.push({id:idGen(),year,...data});save(K.exams,customExams)}
 $('exam-form').hidden=true;examEditing=null;render()
}
function fromExam(id){
 const e=allExams().find(x=>x.id===id);
 if(!e||!e.date)return;
 selected=e.date;
 const d=new Date(e.date+'T12:00:00');d.setDate(d.getDate()-1);
 const prior=[d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('-');
 openSession(null,{date:prior,title:'ทบทวนก่อนสอบ '+e.subject,subject:e.subject,start:'19:00',end:'20:00'})
}
function openSession(id=null,preset={}){
 sessionEditing=id;
 const e=findStudy(id)||{date:selected||'',subject:'',title:'',start:'09:00',end:'10:00',url:'',...preset};
 $('session-form-title').textContent=id?'แก้ไขช่วงอ่าน':'เพิ่มช่วงอ่าน · ปี '+year;
 ['date','start','end','subject','title','url'].forEach(k=>$('session-'+k).value=e[k]||'');
 $('session-form').hidden=false;$('session-form').scrollIntoView({behavior:'smooth',block:'nearest'})
}
function removeSession(id){
 if(!confirm('ยืนยันลบช่วงอ่านนี้?'))return;
 if(id.startsWith('b:')){sessionHidden[id]=true;save(K.sessionHidden,sessionHidden)}
 else{customSessions=customSessions.filter(e=>e.id!==id);save(K.sessions,customSessions)}
 if(clock.key===id)stopClock();
 render()
}
function submitSession(ev){
 ev.preventDefault();
 const data=Object.fromEntries(['date','start','end','subject','title','url'].map(k=>[k,$('session-'+k).value.trim()]));
 if(!dateValid(data.date)||!Number.isFinite(minutes(data.start))||!Number.isFinite(minutes(data.end))||elapsed(data.start,data.end)<=0){alert('กรุณาระบุวันและช่วงเวลาให้ถูกต้อง');return}
 if(!data.title||!data.subject){alert('กรุณาระบุวิชาและหัวข้อที่จะอ่าน');return}
 if(data.url&&!/^\/year\/[1-4]\/term\/[12]\/subject\//.test(data.url)){alert('ลิงก์บทเรียนควรเป็นเส้นทางภายใน IT Study Hub หรือเว้นว่าง');return}
 if(sessionEditing){if(sessionEditing.startsWith('b:')){sessionEdits[sessionEditing]={...data,year};save(K.sessionEdits,sessionEdits)}
 else{customSessions=customSessions.map(e=>e.id===sessionEditing?{...e,...data}:e);save(K.sessions,customSessions)}}
 else{customSessions.push({id:idGen(),year,...data});save(K.sessions,customSessions)}
 selected=data.date;$('session-form').hidden=true;sessionEditing=null;render()
}
$('add-exam').onclick=()=>openExam();
$('add-session').onclick=()=>openSession();
$('cancel-exam').onclick=()=>{$('exam-form').hidden=true;examEditing=null};
$('cancel-session').onclick=()=>{$('session-form').hidden=true;sessionEditing=null};
$('exam-form').onsubmit=submitExam;
$('session-form').onsubmit=submitSession;
$('timer-play').onclick=resumeClock;
$('timer-pause').onclick=pauseClock;
$('timer-break').onclick=breakClock;
$('timer-plus5').onclick=()=>extendClock(5);
$('timer-plus15').onclick=()=>extendClock(15);
$('timer-next').onclick=nextClock;
$('timer-stop').onclick=stopClock;
$('timer-set').onclick=setClock;
$('today').onclick=()=>{const dates=allDates();selected=dates[0]||'';render()};
$('print').onclick=()=>window.print();
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderClock()});
setInterval(()=>{if(clock.running)renderClock()},1000);
render();
