import { buildExamBank } from './exam-bank.js';
import { vocabularyHtml } from './english-quiz.js';
import { slideHintHtml } from './slide-hints.js';
const htmlSafe=function htmlSafe(text) {
 return String(text??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
};
const randomized=function randomized(items) {
 const a=items.slice();
 for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
 return a;
};
export function showExam(subject,period,root) {
 const bank=buildExamBank(subject,period);
 const label=period==="midterm"?"กลางภาค (Midterm)":"ปลายภาค (Final)";
 const isPhysicalFinal=subject.id==='physical-computing'&&period==='final';
 const totalQuestions=bank.total||bank.questions.length||60;
 const physicalNotice=isPhysicalFinal?'<section class="exam-format"><h2>รูปแบบสอบตามประกาศ · 30 คะแนน</h2><div class="exam-format-grid"><article><b>1. eJudge · 15 คะแนน</b><p>เลือกทำหลายข้อให้ครบคะแนน: Linked List (Insert Last, Traverse by Index), Struct และ Pointer</p></article><article><b>2. Onlearn · 10 คะแนน</b><p>ข้อเลือกตอบทฤษฎี Arduino 45 ข้อ แบบฝึกด้านล่างจำลองเฉพาะส่วนนี้</p></article><article><b>3. ไฟฟ้า · 5 คะแนน</b><p>1 ข้อ เขียนสมการของแต่ละ Node จากวงจรที่กำหนด ไม่ต้องแก้สมการ</p></article></div><details><summary>แนวโจทย์ฝึก eJudge และไฟฟ้าตามภาพ</summary><p><b>eJudge:</b> ฝึกสร้าง DataNode ด้วย Struct/Pointer, เพิ่มโหนดท้าย Singly Linked List และเดินตาม Index</p><p><b>ไฟฟ้า:</b> จากวงจรตัวอย่างในประกาศ กำหนดแรงดัน Node แล้วเขียน KCL และเงื่อนไขของแหล่งจ่ายแรงดัน หยุดเมื่อได้สมการ ไม่ต้องหาค่าตัวแปร</p><p>ทบทวนได้ที่ <a href="#/year/2/term/1/subject/physical-computing/chapter/pc-chapter-9/summary">Pointer</a>, <a href="#/year/2/term/1/subject/physical-computing/chapter/pc-chapter-10/summary">Struct</a> และ <a href="#/year/2/term/1/subject/physical-computing/chapter/pc-chapter-11/summary">วงจรไฟฟ้า</a></p></details></section>':'';
 const path='#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'/'+period;
 const prefix='<nav class="breadcrumbs"><a href="#/">คลังวิชา</a> / <a href="#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'">'+htmlSafe(subject.title)+'</a> / '+label+'</nav>';
 root.innerHTML=prefix+physicalNotice+'<div class="exam-hub"><header class="exam-heading"><span>'+htmlSafe(subject.title)+' · '+label.toUpperCase()+'</span><h1>'+(isPhysicalFinal?'แนวข้อสอบตามประกาศ':'ข้อสอบ '+label+' 60 ข้อ')+'</h1><p>'+(isPhysicalFinal?'แบบฝึกส่วนเลือกตอบ Arduino 45 ข้อ พร้อมเฉลยและเหตุผล ส่วน eJudge และไฟฟ้าแสดงรูปแบบฝึกไว้ด้านบน':'ฝึกอ่านโจทย์สถานการณ์และศัพท์เทคนิค มีคำแปล คำใบ้ และเหตุผลประกอบทุกข้อ ชุดนี้เป็นแบบฝึกหัด ไม่ใช่ข้อสอบจริง')+'</p></header><div id="exam-stage" aria-live="polite"></div></div>';\n const target=root.querySelector("#exam-stage");
 if(!bank.ready){
  target.innerHTML='<div class="exam-panel exam-pending"><h2>📚 รอเนื้อหา '+label+'</h2><p>เตรียมระบบไว้สำหรับข้อสอบ 60 ข้อแล้ว แต่ยังไม่มีสไลด์'+(period==="midterm"?"กลางภาค":"หรือข้อสอบจากบท 6–12 ที่ครบถ้วน")+' จึงยังไม่เปิดให้ทำชุดสอบ เพื่อป้องกันคำถามที่ไม่ตรงกับเนื้อหาจริง</p><a class="button secondary" href="'+path+'">กลับไปหน้าบทเรียน</a></div>';
  return;
 }
 const storageKey="it-study-hub-"+subject.id+"-"+period+"-exam-"+totalQuestions+"-v3";
 const savedBest=()=>{try{return JSON.parse(localStorage.getItem(storageKey)||"{}").best??null;}catch{return null;}};
 const persist=(score)=>{try{localStorage.setItem(storageKey,JSON.stringify({best:Math.max(savedBest()??0,score),last:score}));}catch{}};
 let state=null;
 function start(items=bank.questions,mode="full"){
  state={questions:randomized(items),mode,index:0,selected:null,checked:false,answers:{},finished:false,vocabOpen:false,hintOpen:false,drafts:{}};
  render();
 }
 function renderHome(){\n  const best=savedBest();\n  const countText=isPhysicalFinal?'ข้อเลือกตอบ Arduino 45 ข้อ':'คำถาม 60 ข้อ';\n  const startText=isPhysicalFinal?'เริ่มฝึก Arduino 45 ข้อ':'เริ่มทำข้อสอบ 60 ข้อ';\n  target.innerHTML='<div class="exam-panel exam-welcome"><h2>พร้อมทดสอบความเข้าใจ '+label+'</h2><p>'+countText+' จากบท '+bank.chapters.map(c=>c.number).join(", ")+' · 4 ตัวเลือก · สุ่มคำถาม · เฉลยและเหตุผลทันทีหลังตอบ</p><div class="exam-counts"><span><b>'+totalQuestions+'</b> ข้อ</span><span><b>'+bank.chapters.length+'</b> บท</span><span><b>'+(best===null?"—":best+"%")+'</b> คะแนนสูงสุด</span></div><button class="button primary" id="exam-start">'+startText+'</button></div>';\n  target.querySelector("#exam-start").onclick=()=>start();\n }\n function renderResult(){
  const wrong=state.questions.filter(q=>state.answers[q.id]!==q.answer),correct=state.questions.length-wrong.length;
  const percent=Math.round(correct/state.questions.length*100);
  if(state.mode==="full"&&!state.saved){persist(percent);state.saved=true;}
  target.innerHTML='<div class="exam-panel exam-result"><p class="exam-eyebrow">ทำข้อสอบครบแล้ว</p><h2>ผลคะแนน '+label+'</h2><strong class="exam-percent">'+percent+'%</strong><p>ตอบถูก '+correct+' / '+state.questions.length+' ข้อ · ตอบผิด '+wrong.length+' ข้อ</p><div class="exam-actions">'+(wrong.length?'<button class="button primary" id="exam-wrong">ฝึกเฉพาะข้อที่ผิด</button>':'')+'<button class="button secondary" id="exam-restart">ทำข้อสอบใหม่</button><a href="'+path+'" class="button secondary">กลับไปหน้า '+label+'</a></div></div>'
   +(wrong.length?'<section class="exam-review"><h2>เฉลยข้อที่ตอบผิด ('+wrong.length+')</h2>'+wrong.map((q,i)=>'<article class="exam-panel"><small>บท '+q.chapterNo+' · ข้อ '+(i+1)+'</small><h3>'+htmlSafe(q.prompt)+'</h3><p>คุณตอบ: '+htmlSafe(q.options[state.answers[q.id]]??"")+'</p><p><b>เฉลย: '+htmlSafe(q.options[q.answer])+'</b></p><p>เหตุผล: '+htmlSafe(q.reasons[q.answer])+'</p>'+vocabularyHtml(q,htmlSafe,true)+'</article>').join("")+'</section>':"");
  if(wrong.length)target.querySelector("#exam-wrong").onclick=()=>start(wrong,"wrong");
  target.querySelector("#exam-restart").onclick=()=>start();
 }
 function render(){
  if(!state){renderHome();return;}
  if(state.finished){renderResult();return;}
  const q=state.questions[state.index],checked=state.checked,ok=state.selected===q.answer;
   const questionChapter=bank.chapters.find(c=>c.id===q.chapterId);
  const choices=q.options.map((option,i)=>'<label class="exam-option '+(state.selected===i?"chosen ":"")+(checked&&i===q.answer?"right ":"")+(checked&&i===state.selected&&!ok?"wrong ":"")+'"><input type="radio" name="exam-choice" value="'+i+'" '+(state.selected===i?"checked ":"")+(checked?"disabled ":"")+'><b>'+String.fromCharCode(65+i)+'</b><span>'+htmlSafe(option)+'</span></label>').join("");
  const explanation=checked?'<section class="exam-explanation"><h3>'+(ok?"✓ ตอบถูก":"✕ คำตอบยังไม่ถูก")+'</h3><p><b>เฉลย: '+htmlSafe(q.options[q.answer])+'</b></p>'+(!ok?'<p>เหตุผลที่เลือกผิด: '+htmlSafe(q.reasons[state.selected])+'</p>':"")+'<p>เหตุผลที่ถูก: '+htmlSafe(q.reasons[q.answer])+'</p><details><summary>ดูเหตุผลของทุกตัวเลือก</summary>'+q.options.map((o,i)=>'<p><b>'+String.fromCharCode(65+i)+'. '+htmlSafe(o)+'</b> — '+htmlSafe(q.reasons[i])+'</p>').join("")+'</details><a href="#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'/chapter/'+q.chapterId+'/summary">ทบทวนบท '+q.chapterNo+'</a></section>':"";
  target.innerHTML='<div class="exam-progress"><span>'+(state.mode==="wrong"?"ทบทวนข้อที่ผิด":(isPhysicalFinal?"ข้อเลือกตอบ Arduino 45 ข้อ":"ข้อสอบรวม 60 ข้อ"))+'</span><b>ข้อ '+(state.index+1)+' / '+state.questions.length+'</b></div><div class="exam-progress-track"><div style="width:'+(100*(state.index+(checked?1:0))/state.questions.length)+'%"></div></div><article class="exam-panel exam-question"><small>บท '+q.chapterNo+' · '+htmlSafe(q.chapterTitle)+' · '+htmlSafe(q.sectionTitle)+'</small><h2>'+htmlSafe(q.prompt)+'</h2><div class="hint-area"><button class="hint-toggle" id="exam-hint" type="button" aria-expanded="'+(state.hintOpen?'true':'false')+'" '+(checked?'disabled':'')+'>💡 '+(state.hintOpen?'ซ่อนคำใบ้':'ขอคำใบ้เพื่อเริ่มคิด')+'</button>'+(state.hintOpen&&!checked?slideHintHtml(q,questionChapter,htmlSafe):'')+'</div>'+vocabularyHtml(q,htmlSafe,checked||state.vocabOpen)+'<fieldset class="exam-options" '+(checked?"disabled":"")+'><legend class="sr-only">เลือกคำตอบหนึ่งข้อ</legend>'+choices+'</fieldset>'+explanation+'<div class="exam-actions"><button class="button secondary" id="exam-prev" type="button" '+(state.index===0?'disabled':'')+'>← ข้อก่อนหน้า</button><button class="button primary" id="exam-next" '+(!checked&&state.selected===null?"disabled":"")+'>'+(checked?(state.index===state.questions.length-1?"ดูคะแนน":"ข้อถัดไป →"):"ตรวจคำตอบ")+'</button><button class="button secondary" id="exam-new">เริ่มใหม่</button></div></article>';
  const hintButton=target.querySelector('#exam-hint');
   if(hintButton)hintButton.onclick=()=>{state.hintOpen=!state.hintOpen;render();target.querySelector('#exam-hint')?.focus();};
   const prevButton=target.querySelector('#exam-prev');
   if(prevButton)prevButton.onclick=()=>{if(state.index===0)return;state.index--;const previous=state.questions[state.index];state.checked=Object.prototype.hasOwnProperty.call(state.answers,previous.id);state.selected=state.checked?state.answers[previous.id]:(state.drafts[previous.id]??null);state.hintOpen=false;state.vocabOpen=false;render();};
   const vocabDetails=target.querySelector('.quiz-vocabulary');if(vocabDetails&&!checked)vocabDetails.addEventListener('toggle',()=>{state.vocabOpen=vocabDetails.open;});
  target.querySelectorAll('input[name="exam-choice"]').forEach(el=>el.onchange=()=>{state.selected=Number(el.value);state.drafts[q.id]=state.selected;render();});
  target.querySelector("#exam-next").onclick=()=>{
   if(!state.checked){if(state.selected===null)return;state.answers[q.id]=state.selected;state.checked=true;render();return;}
   if(state.index===state.questions.length-1){state.finished=true;render();return;}
   state.index++;const next=state.questions[state.index];state.checked=Object.prototype.hasOwnProperty.call(state.answers,next.id);state.selected=state.checked?state.answers[next.id]:(state.drafts[next.id]??null);state.vocabOpen=false;state.hintOpen=false;render();
  };
  target.querySelector("#exam-new").onclick=()=>start(state.questions,state.mode);
 }
 render();
}
