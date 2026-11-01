import { buildExamBank } from './exam-bank.js';
import { vocabularyHtml } from './english-quiz.js';
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
 const label=period==="midterm"?"Midterm":"Final";
 const path='#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'/'+period;
 const prefix='<nav class="breadcrumbs"><a href="#/">คลังวิชา</a> / <a href="#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'">'+htmlSafe(subject.title)+'</a> / '+label+'</nav>';
 root.innerHTML=prefix+'<div class="exam-hub"><header class="exam-heading"><span>'+htmlSafe(subject.title)+' · '+label.toUpperCase()+'</span><h1>ข้อสอบ '+label+' 60 ข้อ</h1><p>ฝึกวิเคราะห์สถานการณ์ด้วยศัพท์อังกฤษจากสไลด์ กดดูความหมายไทยได้ พร้อมเฉลย ไม่ใช่ข้อสอบจริง</p></header><div id="exam-stage" aria-live="polite"></div></div>';
 const target=root.querySelector("#exam-stage");
 if(!bank.ready){
  target.innerHTML='<div class="exam-panel exam-pending"><h2>📚 รอเนื้อหา '+label+'</h2><p>เตรียมระบบไว้สำหรับข้อสอบ 60 ข้อแล้ว แต่ยังไม่มีสไลด์'+(period==="midterm"?"กลางภาค":"หรือข้อสอบจากบท 6–12 ที่ครบถ้วน")+' จึงยังไม่เปิดให้ทำชุดสอบ เพื่อป้องกันคำถามที่ไม่ตรงกับเนื้อหาจริง</p><a class="button secondary" href="'+path+'">กลับไปหน้าบทเรียน</a></div>';
  return;
 }
 const storageKey="it-study-hub-"+period+"-exam-60-v1";
 const savedBest=()=>{try{return JSON.parse(localStorage.getItem(storageKey)||"{}").best??null;}catch{return null;}};
 const persist=(score)=>{try{localStorage.setItem(storageKey,JSON.stringify({best:Math.max(savedBest()??0,score),last:score}));}catch{}};
 let state=null;
 function start(items=bank.questions,mode="full"){
  state={questions:randomized(items),mode,index:0,selected:null,checked:false,answers:{},finished:false,vocabOpen:false};
  render();
 }
 function renderHome(){
  const best=savedBest();
  target.innerHTML='<div class="exam-panel exam-welcome"><h2>พร้อมทดสอบความเข้าใจ '+label+'</h2><p>คำถาม 60 ข้อ จากบท '+bank.chapters.map(c=>c.number).join(", ")+' · 4 ตัวเลือก · สุ่มคำถาม · ใช้ศัพท์อังกฤษพร้อมคำแปลไทย · เฉลยและเหตุผลทันทีหลังตอบ</p><div class="exam-counts"><span><b>60</b> ข้อสอบ</span><span><b>'+bank.chapters.length+'</b> บท</span><span><b>'+(best===null?"—":best+"%")+'</b> คะแนนสูงสุด</span></div><button class="button primary" id="exam-start">เริ่มทำข้อสอบ 60 ข้อ</button></div>';
  target.querySelector("#exam-start").onclick=()=>start();
 }
 function renderResult(){
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
  const choices=q.options.map((option,i)=>'<label class="exam-option '+(state.selected===i?"chosen ":"")+(checked&&i===q.answer?"right ":"")+(checked&&i===state.selected&&!ok?"wrong ":"")+'"><input type="radio" name="exam-choice" value="'+i+'" '+(state.selected===i?"checked ":"")+(checked?"disabled ":"")+'><b>'+String.fromCharCode(65+i)+'</b><span>'+htmlSafe(option)+'</span></label>').join("");
  const explanation=checked?'<section class="exam-explanation"><h3>'+(ok?"✓ ตอบถูก":"✕ คำตอบยังไม่ถูก")+'</h3><p><b>เฉลย: '+htmlSafe(q.options[q.answer])+'</b></p>'+(!ok?'<p>เหตุผลที่เลือกผิด: '+htmlSafe(q.reasons[state.selected])+'</p>':"")+'<p>เหตุผลที่ถูก: '+htmlSafe(q.reasons[q.answer])+'</p><details><summary>ดูเหตุผลของทุกตัวเลือก</summary>'+q.options.map((o,i)=>'<p><b>'+String.fromCharCode(65+i)+'. '+htmlSafe(o)+'</b> — '+htmlSafe(q.reasons[i])+'</p>').join("")+'</details><a href="#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id+'/chapter/'+q.chapterId+'/summary">ทบทวนบท '+q.chapterNo+'</a></section>':"";
  target.innerHTML='<div class="exam-progress"><span>'+(state.mode==="wrong"?"ทบทวนข้อที่ผิด":"ข้อสอบรวม 60 ข้อ")+'</span><b>ข้อ '+(state.index+1)+' / '+state.questions.length+'</b></div><div class="exam-progress-track"><div style="width:'+(100*(state.index+(checked?1:0))/state.questions.length)+'%"></div></div><article class="exam-panel exam-question"><small>บท '+q.chapterNo+' · '+htmlSafe(q.chapterTitle)+' · '+htmlSafe(q.sectionTitle)+'</small><h2>'+htmlSafe(q.prompt)+'</h2>'+vocabularyHtml(q,htmlSafe,checked||state.vocabOpen)+'<fieldset class="exam-options" '+(checked?"disabled":"")+'><legend class="sr-only">เลือกคำตอบหนึ่งข้อ</legend>'+choices+'</fieldset>'+explanation+'<div class="exam-actions"><button class="button primary" id="exam-next" '+(!checked&&state.selected===null?"disabled":"")+'>'+(checked?(state.index===state.questions.length-1?"ดูคะแนน":"ข้อถัดไป →"):"ตรวจคำตอบ")+'</button><button class="button secondary" id="exam-new">เริ่มใหม่</button></div></article>';
  const vocabDetails=target.querySelector('.quiz-vocabulary');if(vocabDetails&&!checked)vocabDetails.addEventListener('toggle',()=>{state.vocabOpen=vocabDetails.open;});
  target.querySelectorAll('input[name="exam-choice"]').forEach(el=>el.onchange=()=>{state.selected=Number(el.value);render();});
  target.querySelector("#exam-next").onclick=()=>{
   if(!state.checked){if(state.selected===null)return;state.answers[q.id]=state.selected;state.checked=true;render();return;}
   if(state.index===state.questions.length-1){state.finished=true;render();return;}
   state.index++;state.selected=null;state.checked=false;state.vocabOpen=false;render();
  };
  target.querySelector("#exam-new").onclick=()=>start(state.questions,state.mode);
 }
 render();
}
