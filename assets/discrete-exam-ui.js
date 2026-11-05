import { discretePaperQuestions as questions, discretePaperEssays as essays, discretePaperDiagrams as diagrams } from './discrete-final-source.js';

const SESSION_KEY = 'it-study-hub-discrete-syllabus-final-v2';
const LETTERS = 'abcde';
const MULTIPLE = new Set([12,13,14,15,16,17,18,19,20,22,23,25,26,27,28]);
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let timerHandle = null;

export function isDiscreteAnswerCorrect(question, selected) {
  const expected = question.answers.slice().sort((a,b) => a-b);
  const actual = (Array.isArray(selected) ? selected : []).slice().sort((a,b) => a-b);
  return expected.length === actual.length && expected.every((item,index) => item === actual[index]);
}
export function discreteExamScore(answerMap) {
  const correct = questions.filter(q => isDiscreteAnswerCorrect(q, answerMap[String(q.number)] || [])).length;
  return { correct, total:questions.length, percent:Math.round(correct / questions.length * 100) };
}
export function formatDiscreteTime(value) {
  const seconds = Math.max(0,Math.floor(Number(value)||0));
  return String(Math.floor(seconds/3600)).padStart(2,'0')+':'+String(Math.floor(seconds%3600/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
}
function drawDiagram(name) {
  const d=diagrams[name]; if(!d)return '';
  if(d.type==='matrix')return '<div class="dm-matrix" role="img" aria-label="เมทริกซ์ '+d.rows.length+' คูณ '+d.rows.length+'"><span>⎡</span><pre>'+d.rows.map(escapeHtml).join('\n')+'</pre><span>⎤</span></div>';
  const marker=d.directed?'<defs><marker id="dm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#2c79ac"/></marker></defs>':'';
  const edges=d.edges.map(edge=>{
    const a=d.vertices[edge[0]],b=d.vertices[edge[1]],bend=edge[2]||0;
    const dx=b[0]-a[0],dy=b[1]-a[1],dist=Math.hypot(dx,dy)||1;
    const ux=dx/dist,uy=dy/dist;
    const x1=a[0]+ux*13,y1=a[1]+uy*13,x2=b[0]-ux*14,y2=b[1]-uy*14;
    const path=bend?'M '+x1+' '+y1+' Q '+((x1+x2)/2-uy*bend)+' '+((y1+y2)/2+ux*bend)+' '+x2+' '+y2:'M '+x1+' '+y1+' L '+x2+' '+y2;
    return '<path d="'+path+'" fill="none" stroke="#2c79ac" stroke-width="2.6" '+(d.directed?'marker-end="url(#dm-arrow)"':'')+'/>';
  }).join('');
  const loops=(d.loops||[]).map(id=>{const p=d.vertices[id];return '<path d="M '+(p[0]-9)+' '+(p[1]-10)+' C '+(p[0]-54)+' '+(p[1]-62)+', '+(p[0]+54)+' '+(p[1]-62)+', '+(p[0]+9)+' '+(p[1]-10)+'" fill="none" stroke="#2c79ac" stroke-width="2.5" '+(d.directed?'marker-end="url(#dm-arrow)"':'')+'/>';}).join('');
  const dots=Object.entries(d.vertices).map(([id,p])=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="7.5" fill="#214c71"/><text x="'+p[0]+'" y="'+(p[1]-16)+'" fill="#173d59" font-size="16" font-style="italic" text-anchor="middle">'+escapeHtml(id)+'</text>').join('');
  return '<figure class="dm-figure"><svg viewBox="0 0 500 260" role="img" aria-label="กราฟประกอบข้อสอบ ข้อมูลจุดยอดและเส้นเชื่อมตามเอกสาร">'+marker+edges+loops+dots+'</svg><figcaption>กราฟประกอบข้อสอบ วาดใหม่ตาม PDF หน้า '+(name==='matrix15'?3:name==='graph28'?8: '')+'</figcaption></figure>';
}
function drawBridge() {
  return '<figure class="dm-figure"><svg viewBox="0 0 540 195" role="img" aria-label="แผนภาพพื้นที่และสะพานหลายแห่งจากข้อเขียน"><g fill="none" stroke="#668398" stroke-width="3"><path d="M15 70 C115 10 126 80 212 52 S338 33 412 56 S490 72 525 60"/><path d="M15 86 C115 25 126 95 212 66 S338 48 412 70 S490 87 525 74"/><path d="M15 103 C115 162 126 92 212 122 S338 147 412 120 S490 95 525 108"/><path d="M15 117 C115 177 126 106 212 137 S338 162 412 135 S490 110 525 123"/></g><g stroke="#33a2c8" stroke-width="12" stroke-linecap="round"><path d="M112 39 l-8 37"/><path d="M75 125 l21 -24"/><path d="M179 122 l13 31"/><path d="M259 75 l33 0"/><path d="M377 132 l16 27"/><path d="M468 65 l5 42"/></g><g stroke="#b9e9f4" stroke-width="3" fill="none"><path d="M112 39 l-8 37"/><path d="M75 125 l21 -24"/><path d="M179 122 l13 31"/><path d="M259 75 l33 0"/><path d="M377 132 l16 27"/><path d="M468 65 l5 42"/></g></svg><figcaption>ภาพประกอบตำแหน่งสะพานวาดใหม่เพื่อฝึกทำข้อเขียน · ตรวจต้นฉบับหน้า 9 เมื่อจะวาดเส้นทางละเอียด</figcaption></figure>';
}
function answerLabel(question) {
  return question.answers.map(x=>LETTERS[x]+'. '+question.options[x]).join(' • ');
}
function stored() {
  try {const data=JSON.parse(localStorage.getItem(SESSION_KEY)||'null');if(data&&Array.isArray(data.order)&&data.order.length===30&&data.answers&&data.checked&&data.drafts)return data;}catch{}
  return null;
}
function persist(state) {
  try {localStorage.setItem(SESSION_KEY,JSON.stringify(state));}catch{}
}
function remaining(state) {
  if(state.finished||state.paused||!state.deadline)return Math.max(0,state.seconds||0);
  return Math.max(0,Math.ceil((state.deadline-Date.now())/1000));
}
function itemId(item) {return (item.options?'q':'essay')+String(item.number);}
const allItems=[...questions,...essays];
export function showDiscreteFinalExam(subject,period,root) {
  if(timerHandle)clearInterval(timerHandle);
  const base='#/year/'+subject.year+'/term/'+subject.term+'/subject/'+subject.id;
  root.innerHTML='<nav class="breadcrumbs"><a href="#/">คลังวิชา</a> / <a href="'+base+'">Discrete Mathematics</a> / Final ตามสไลด์</nav><div class="exam-hub dm-hub"><header class="exam-heading"><span>DISCRETE MATHEMATICS · FINAL</span><h1>ข้อสอบ Final ตามสไลด์ Week 8–13</h1><p>ปรนัย 28 ข้อ + ข้อเขียน 2 ข้อ · คัดข้อที่ตรงบทเรียนจาก PDF และเพิ่มโจทย์จากสไลด์แทนข้อที่อยู่นอกเนื้อหา · เฉลยจะแสดงหลังตรวจเท่านั้น</p></header><div id="dm-exam-stage"></div></div>';
  const target=root.querySelector('#dm-exam-stage');
  let state=stored();
  function stopTimer() {if(timerHandle){clearInterval(timerHandle);timerHandle=null;}}
  function showTimer(){
    const timer=target.querySelector('#dm-timer');
    if(timer){timer.textContent=formatDiscreteTime(remaining(state));timer.classList.toggle('dm-time-low',remaining(state)<300);}
  }
  function runTimer(){
    stopTimer();
    if(!state||state.finished)return;
    timerHandle=setInterval(()=>{
      if(!target.isConnected){stopTimer();return;}
      if(!state.paused && remaining(state)<=0){state.seconds=0;state.deadline=null;state.finished=true;state.expired=true;persist(state);stopTimer();render();return;}
      showTimer();
    },500);
  }
  function begin(minutes) {
    const seconds=Number(minutes)*60;
    state={order:allItems.map(itemId),index:0,answers:{},checked:{},drafts:{},seconds,deadline:Date.now()+seconds*1000,paused:false,finished:false,expired:false,startedAt:Date.now()};
    persist(state);render();runTimer();
  }
  function pause() {
    if(state.finished)return;
    if(state.paused){state.paused=false;state.deadline=Date.now()+state.seconds*1000;}
    else {state.seconds=remaining(state);state.deadline=null;state.paused=true;}
    persist(state);render();runTimer();
  }
  function renderHome() {
    target.innerHTML='<section class="exam-panel exam-welcome"><h2>พร้อมเริ่มฝึกทำข้อสอบ</h2><p>โจทย์ที่ตรงสไลด์คงจาก PDF ส่วนข้อที่อยู่นอกสไลด์ปรับใหม่โดยอิงบทเรียนจริง · ข้อเขียนตรวจเทียบแนวคำตอบด้วยตนเอง</p><div class="exam-counts"><span><b>28</b> ปรนัย</span><span><b>2</b> ข้อเขียน</span><span><b>6</b> ชุดสไลด์</span></div><div class="dm-duration"><label for="dm-minutes">กำหนดเวลา</label><select id="dm-minutes"><option value="30">30 นาที</option><option value="60" selected>60 นาที</option><option value="90">90 นาที</option><option value="120">120 นาที</option></select><button class="button primary" id="dm-start">เริ่มทำข้อสอบ</button></div><p class="dm-source-note">ชุดฝึกนี้ไม่ใช่สำเนาข้อสอบ PDF ทั้งหมด: ข้อที่อยู่นอกหัวข้อ Week 8–13 ถูกเปลี่ยนเป็นโจทย์ฝึกที่อิงสไลด์ พร้อมระบุแหล่งที่มา</p></section>';
    target.querySelector('#dm-start').onclick=()=>begin(target.querySelector('#dm-minutes').value);
  }
  function finish() {
    state.seconds=remaining(state);
    state.deadline=null;state.finished=true;persist(state);render();
  }
  function renderResult() {
    stopTimer();
    const qAnswers={};
    for(const q of questions)qAnswers[String(q.number)]=state.answers['q'+q.number]||[];
    const score=discreteExamScore(qAnswers);
    const warnings=questions.filter(q=>q.sourceWarning);
    const wrong=questions.filter(q=>!isDiscreteAnswerCorrect(q,qAnswers[String(q.number)]));
    target.innerHTML='<div class="exam-panel exam-result"><p class="exam-eyebrow">'+(state.expired?'หมดเวลาที่กำหนด':'ตรวจครบแล้ว')+'</p><h2>ผลข้อสอบ Discrete Math Final</h2><strong class="exam-percent">'+score.percent+'%</strong><p>ปรนัยถูก '+score.correct+' / '+score.total+' ข้อ · ข้อเขียน '+essays.length+' ข้อ ตรวจเทียบแนวคำตอบด้วยตนเอง</p><p>เวลาคงเหลือ '+formatDiscreteTime(state.seconds)+'</p><div class="exam-actions"><button class="button primary" id="dm-restart">เริ่มทำใหม่</button><a class="button secondary" href="'+base+'/final">กลับหน้าวิชา</a></div></div>'+
      (wrong.length?'<section class="exam-review"><h2>ทบทวนข้อที่ยังไม่ถูก ('+wrong.length+')</h2>'+wrong.map(q=>'<article class="exam-panel"><small>ข้อ '+q.number+' · '+escapeHtml(q.sourceLabel||('PDF หน้า '+q.page))+'</small><h3>'+escapeHtml(q.prompt)+'</h3><p>คุณตอบ: '+escapeHtml((qAnswers[String(q.number)]||[]).map(i=>LETTERS[i]).join(', ')||'ไม่ได้ตอบ')+'</p><p><b>เฉลยพร้อมเหตุผล: '+escapeHtml(answerLabel(q))+'</b></p><p>'+escapeHtml(q.explanation)+'</p>'+(q.sourceWarning?'<p class="dm-warning">'+escapeHtml(q.sourceWarning)+'</p>':'')+'</article>').join('')+'</section>':'')+
      '<section class="exam-review"><h2>ทบทวนข้อเขียน</h2>'+essays.map(e=>'<article class="exam-panel"><h3>ข้อเขียน '+e.number+'</h3><p><b>คำตอบของคุณ:</b> '+escapeHtml(state.answers['essay'+e.number]||'ยังไม่ได้ตอบ')+'</p><p><b>แนวเฉลย:</b> '+escapeHtml(e.reference)+'</p>'+(e.diagram?drawDiagram(e.diagram):'')+'</article>').join('')+'</section>'+
      (warnings.length?'<p class="dm-warning">หมายเหตุ: เฉลยลายมือของข้อ '+warnings.map(q=>q.number).join(', ')+' มีข้อขัดแย้งที่ควรตรวจทานกับผู้สอน คะแนนที่แสดงนับตามวง/ลายมือในเอกสาร</p>':'');
    target.querySelector('#dm-restart').onclick=()=>{try{localStorage.removeItem(SESSION_KEY);}catch{}state=null;renderHome();};
  }
  function render() {
    if(!state){renderHome();return;}
    if(state.finished){renderResult();return;}
    if(!state.paused&&remaining(state)<=0){state.seconds=0;state.deadline=null;state.finished=true;state.expired=true;persist(state);renderResult();return;}
    const item=allItems[state.index],id=itemId(item),isEssay=!item.options,checked=Boolean(state.checked[id]);
    const answered=Object.keys(state.checked).length;
    const draft=state.drafts[id]??(isEssay?'':[]);
    const selected=checked?state.answers[id]:draft;
    const currentNumber=isEssay?'ข้อเขียน '+item.number:'ปรนัยข้อ '+item.number;
    let options='';
    if(isEssay)options='<label class="dm-essay-label" for="dm-essay-answer">พิมพ์คำตอบและอธิบายวิธีคิดของคุณ</label><textarea id="dm-essay-answer" class="dm-essay-input" rows="8" placeholder="พิมพ์คำตอบ วิธีคิด หรืออธิบายการตรวจสมบัติของความสัมพันธ์…" '+(checked?'disabled':'')+'>'+escapeHtml(selected)+'</textarea>';
    else {
      const multi=MULTIPLE.has(item.number)||item.answers.length>1;
      options='<fieldset class="exam-options" '+(checked?'disabled':'')+'><legend class="sr-only">เลือกคำตอบ</legend>'+item.options.map((option,i)=>'<label class="exam-option '+((selected||[]).includes(i)?'chosen ':'')+(checked&&item.answers.includes(i)?'right ':'')+(checked&&(selected||[]).includes(i)&&!item.answers.includes(i)?'wrong ':'')+'"><input type="'+(multi?'checkbox':'radio')+'" name="dm-choice" value="'+i+'" '+((selected||[]).includes(i)?'checked ':'')+'><b>'+LETTERS[i].toUpperCase()+'</b><span>'+escapeHtml(option)+'</span></label>').join('')+'</fieldset>';
    }
    let detail='';
    if(checked){
      if(isEssay)detail='<section class="exam-explanation"><h3>แนวคำตอบพร้อมเหตุผล</h3><p>'+escapeHtml(item.reference)+'</p>'+'<p class="dm-source-note">ข้อเขียนตรวจเทียบด้วยตนเอง ไม่ให้คะแนนอัตโนมัติเพื่อไม่ตัดคำตอบที่อธิบายด้วยสำนวนอื่น</p></section>';
      else detail='<section class="exam-explanation"><h3>'+(isDiscreteAnswerCorrect(item,selected)?'✓ ตรงกับเฉลยที่บันทึก':'✕ ยังไม่ตรงกับเฉลย')+'</h3><p><b>เฉลย: '+escapeHtml(answerLabel(item))+'</b></p><p>'+escapeHtml(item.explanation)+'</p>'+(item.sourceWarning?'<p class="dm-warning">'+escapeHtml(item.sourceWarning)+'</p>':'')+'</section>';
    }
    const done=answered===allItems.length;
    target.innerHTML='<div class="dm-toolbar"><div class="dm-timebox"><span>เวลาที่เหลือ</span><strong id="dm-timer" aria-live="off">'+formatDiscreteTime(remaining(state))+'</strong></div><div><button class="button secondary" id="dm-pause">'+(state.paused?'เล่นต่อ':'หยุดเวลา')+'</button><button class="button secondary" id="dm-add">+5 นาที</button></div></div><div class="exam-progress"><span>ตรวจแล้ว '+answered+' / '+allItems.length+' ข้อ '+(state.paused?'· หยุดเวลาอยู่':'')+'</span><b>'+currentNumber+' · '+(state.index+1)+' / 30</b></div><div class="exam-progress-track"><div style="width:'+(100*answered/allItems.length)+'%"></div></div><article class="exam-panel exam-question"><small>'+escapeHtml(item.sourceLabel||('PDF ต้นฉบับ หน้า '+item.page))+' · '+(isEssay?'ข้อเขียน 4 คะแนน':'เลือก'+(MULTIPLE.has(item.number)||item.answers?.length>1?'ได้มากกว่า 1 ข้อ':'คำตอบที่ถูกต้อง'))+'</small><h2>'+escapeHtml(item.prompt)+'</h2>'+(!isEssay&&item.diagram?drawDiagram(item.diagram):'')+(isEssay&&item.number===3?drawBridge():'')+(isEssay&&item.diagram?drawDiagram(item.diagram):'')+options+detail+'<div class="exam-actions"><button class="button secondary" id="dm-prev" '+(state.index===0?'disabled':'')+'>← ข้อก่อนหน้า</button><button class="button primary" id="dm-next">'+(checked?(state.index===allItems.length-1?'ดูผลคะแนน':'ข้อถัดไป →'):'ตรวจคำตอบ')+'</button><button class="button secondary" id="dm-finish">ส่งข้อสอบ</button></div></article><p class="dm-source-note">สามารถย้อนกลับไปดูข้อที่ตรวจแล้วได้ · ไม่แสดงเฉลยก่อนกดตรวจคำตอบ</p>';
    target.querySelector('#dm-pause').onclick=pause;
    target.querySelector('#dm-add').onclick=()=>{state.seconds=remaining(state)+300;if(!state.paused)state.deadline=Date.now()+state.seconds*1000;persist(state);showTimer();};
    target.querySelector('#dm-prev').onclick=()=>{if(state.index>0){state.index--;persist(state);render();}};
    target.querySelector('#dm-finish').onclick=()=>{if(confirm('ส่งข้อสอบตอนนี้หรือไม่? ข้อที่ยังไม่ตอบจะถือว่าไม่ได้คะแนน'))finish();};
    if(isEssay){const t=target.querySelector('#dm-essay-answer');t.oninput=()=>{state.drafts[id]=t.value;persist(state);};}
    else target.querySelectorAll('[name="dm-choice"]').forEach(input=>{
      input.onchange=()=>{
        if(checked)return;
        const selectedNow=Array.from(target.querySelectorAll('[name="dm-choice"]:checked')).map(el=>Number(el.value));
        state.drafts[id]=selectedNow;persist(state);
        target.querySelectorAll('.exam-option').forEach(label=>label.classList.toggle('chosen',label.querySelector('input').checked));
      };
    });
    target.querySelector('#dm-next').onclick=()=>{
      if(!checked){
        const selectedNow=isEssay?String(state.drafts[id]||'').trim():state.drafts[id]||[];
        if(isEssay?!selectedNow:selectedNow.length===0){alert('กรุณาตอบคำถามก่อนกดตรวจ');return;}
        state.answers[id]=selectedNow;state.checked[id]=true;persist(state);render();return;
      }
      if(state.index===allItems.length-1){finish();return;}
      state.index++;persist(state);render();
    };
    showTimer();
  }
  if(state&&state.finished)renderResult();
  else if(state){render();runTimer();}
  else renderHome();
}
