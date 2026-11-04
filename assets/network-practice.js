// เครื่องคำนวณและโจทย์กรอกคำตอบสำหรับวิชา Network
export function parseIPv4(value){
 const parts=String(value??'').trim().split('.');
 if(parts.length!==4||parts.some(x=>!/^(0|[1-9]\d{0,2})$/.test(x)||Number(x)>255))throw Error('กรอก IPv4 ให้ครบ 4 ชุด เช่น 192.168.1.10');
 return parts.reduce((acc,x)=>acc*256+Number(x),0);
}
export function formatIPv4(value){
 if(!Number.isInteger(value)||value<0||value>4294967295)throw Error('IPv4 ไม่ถูกต้อง');
 return [24,16,8,0].map(s=>(value>>>s)&255).join('.');
}
export function subnetIPv4(address,prefixValue){
 const ip=parseIPv4(address),p=Number(prefixValue);
 if(!Number.isInteger(p)||p<0||p>32)throw Error('CIDR ต้องอยู่ระหว่าง /0 ถึง /32');
 const mask=p===0?0:(0xffffffff << (32-p))>>>0;
 const network=(ip&mask)>>>0,size=2**(32-p),last=network+size-1;
 return {
  ip:formatIPv4(ip),prefix:p,mask:formatIPv4(mask),wildcard:formatIPv4((~mask)>>>0),
  network:formatIPv4(network),broadcast:p>=31?null:formatIPv4(last),
  firstHost:formatIPv4(p<=30?network+1:network),lastHost:formatIPv4(p<=30?last-1:last),
  total:size,usable:p<=30?size-2:p===31?2:1,
  note:p===31?'สำหรับลิงก์แบบ Point-to-Point: /31 ใช้ได้ 2 ที่อยู่ และไม่มี Broadcast แบบทั่วไป':
    p===32?'สำหรับเครื่องเดียว: /32 ใช้ระบุ IPv4 หนึ่งที่อยู่':
    'จำนวนโฮสต์แบบทั่วไป = 2^(32 − Prefix) − 2'
 };
}
export function prefixForHosts(value){
 const hosts=Number(value);
 if(!Number.isInteger(hosts)||hosts<1||hosts>4294967294)throw Error('โฮสต์ต้องเป็นจำนวนเต็ม 1 ถึง 4,294,967,294');
 for(let p=30;p>=0;p--)if(2**(32-p)-2>=hosts)return {prefix:p,usable:2**(32-p)-2,mask:subnetIPv4('0.0.0.0',p).mask};
 throw Error('ไม่พบ Prefix');
}
function positive(value,label){
 const n=Number(value);
 if(!Number.isFinite(n)||n<=0)throw Error(label+' ต้องมากกว่า 0');
 return n;
}
export function transmissionMs(bytes,mbps){
 return positive(bytes,'ขนาดข้อมูล')*8/(positive(mbps,'อัตราส่ง')*1e6)*1000;
}
export function propagationMs(km,speed){
 return positive(km,'ระยะทาง')/positive(speed,'ความเร็วสัญญาณ')*1000;
}
export function totalMs(bytes,mbps,km,speed){
 return transmissionMs(bytes,mbps)+propagationMs(km,speed);
}
export function bdpKbits(mbps,rttMs){
 return positive(mbps,'อัตราส่ง')*positive(rttMs,'RTT');
}
export const NETWORK_PRACTICE_TOPICS=[
 {id:'network',name:'Network Address',period:'final',week:'Week 10 · Subnetting',kind:'ip'},
 {id:'mask',name:'CIDR → Subnet Mask',period:'final',week:'Week 10 · Subnetting',kind:'ip'},
 {id:'broadcast',name:'Broadcast Address',period:'final',week:'Week 10 · Subnetting',kind:'ip'},
 {id:'usable',name:'Usable Hosts',period:'final',week:'Week 10 · Subnetting',kind:'number'},
 {id:'prefix',name:'คำนวณ Prefix จากจำนวนโฮสต์',period:'final',week:'Week 10 · Subnetting',kind:'number'},
 {id:'transmission',name:'Transmission Delay',period:'midterm',week:'Week 1 · Performance',kind:'number'},
 {id:'propagation',name:'Propagation Delay',period:'midterm',week:'Week 1 · Performance',kind:'number'},
 {id:'total',name:'Total Delay',period:'midterm',week:'Week 1 · Performance',kind:'number'},
 {id:'bdp',name:'Bandwidth–Delay Product',period:'midterm',week:'Week 8 · RTT',kind:'number'}
];
const randomInt=(min,max,rng)=>min+Math.floor(Math.max(0,Math.min(0.999999999,rng()))*(max-min+1));
const pick=(items,rng)=>items[randomInt(0,items.length-1,rng)];
const two=n=>Number(n.toFixed(2));
export function generateNetworkQuestion(id,rng=Math.random){
 const type=NETWORK_PRACTICE_TOPICS.find(t=>t.id===id);
 if(!type)throw Error('ไม่พบหัวข้อคำนวณ');
 const finish=(question,answer,unit,hint,steps,formula)=>({
  id,type,question,answer:String(answer),unit,hint,steps,formula,kind:type.kind
 });
 if(['network','mask','broadcast','usable'].includes(id)){
  const first=pick([10,172,192],rng);
  const second=first===192?168:first===172?randomInt(16,31,rng):randomInt(0,255,rng);
  const ip=[first,second,randomInt(0,255,rng),randomInt(0,255,rng)].join('.');
  const p=pick([16,20,22,23,24,25,26,27,28,29,30],rng);
  const s=subnetIPv4(ip,p),bits=32-p;
  const steps=['IPv4 มี 32 บิต; /'+p+' ใช้ '+p+' บิตเป็นส่วน Network',
   'เหลือบิตสำหรับ Host = 32 − '+p+' = '+bits+' บิต',
   'Subnet Mask ของ /'+p+' คือ '+s.mask];
  if(id==='network')return finish('กำหนด IP '+ip+'/'+p+' จงหา Network Address',s.network,'',
   'ทำ Bitwise AND ระหว่าง IP กับ Subnet Mask เพื่อทำบิตส่วน Host ให้เป็น 0',
   steps.concat(['IP AND Mask จะได้ Network Address = '+s.network]),'Network = IP AND Subnet Mask');
  if(id==='mask')return finish('CIDR /'+p+' ตรงกับ Subnet Mask อะไร?',s.mask,'',
   'เขียนบิต 1 ทางซ้าย '+p+' บิต แล้วเติมบิต 0 ให้ครบ 32 บิต',
   steps.concat(['แปลงบิตทีละ 8 บิตกลับเป็นเลขฐานสิบ จะได้ '+s.mask]),'/p คือจำนวนบิต 1 ใน Mask');
  if(id==='broadcast')return finish('กำหนด IP '+ip+'/'+p+' จงหา Broadcast Address',s.broadcast,'',
   'หาส่วน Network ก่อน แล้วตั้งบิตส่วน Host ให้เป็น 1 ทั้งหมด',
   steps.concat(['Network Address = '+s.network,'เปลี่ยนบิต Host '+bits+' บิตให้เป็น 1','Broadcast = '+s.broadcast]),'Broadcast = Network OR Wildcard Mask');
  return finish('เครือข่าย '+s.network+'/'+p+' มี Usable Host Addresses ได้กี่เครื่อง?',s.usable,'เครื่อง',
   'จำนวนที่อยู่ทั้งหมดเท่ากับ 2 ยกกำลังจำนวนบิต Host จากนั้นลบ 2',
   steps.concat(['จำนวน IP = 2^'+bits+' = '+s.total,'ลบ Network และ Broadcast อย่างละ 1 จึงเหลือ '+s.usable+' เครื่อง']),
   'Usable Hosts = 2^(32 − Prefix) − 2');
 }
 if(id==='prefix'){
  const hosts=pick([2,5,10,14,20,30,50,60,100,200,500],rng),result=prefixForHosts(hosts),bits=32-result.prefix;
  return finish('ต้องการรองรับ IPv4 อย่างน้อย '+hosts+' โฮสต์ ต้องใช้ CIDR ยาวที่สุดเท่าไร? (ตอบเฉพาะเลขหลัง /)',result.prefix,'',
   'หา h ที่น้อยที่สุดซึ่งทำให้ 2^h − 2 มากกว่าหรือเท่ากับจำนวนโฮสต์ แล้วนำ 32 ลบ h',
   ['ต้องการ 2^h − 2 ≥ '+hosts,'ค่า h ต่ำสุดคือ '+bits+' บิต',
    'Prefix = 32 − '+bits+' = /'+result.prefix,'Mask = '+result.mask+' รองรับได้ '+result.usable+' เครื่อง'],
   '2^h − 2 ≥ Hosts; Prefix = 32 − h');
 }
 if(id==='transmission'){
  const bytes=pick([1000,1250,1500,2500,5000,10000],rng),mbps=pick([1,2,4,5,10,20,100],rng),n=transmissionMs(bytes,mbps);
  return finish('แพ็กเก็ต '+bytes+' Bytes ส่งผ่านลิงก์ '+mbps+' Mbps ใช้ Transmission Delay กี่ ms? (ทศนิยม 2 ตำแหน่ง)',two(n),'ms',
   'แปลง Bytes เป็น bits ก่อน แล้วหารด้วยอัตราส่งหน่วย bit/s',
   ['ขนาดข้อมูล = '+bytes+' × 8 = '+(bytes*8)+' bits',
    'อัตราส่ง = '+mbps+' × 1,000,000 bit/s',
    'Transmission = bits ÷ bit/s × 1,000 = '+n.toFixed(2)+' ms'],
   'Transmission (ms) = Bytes × 8 / (Mbps × 1,000,000) × 1,000');
 }
 if(id==='propagation'){
  const km=pick([100,200,400,800,1000,1600,2000],rng),speed=pick([200000,250000],rng),n=propagationMs(km,speed);
  return finish('ระยะทาง '+km+' km และความเร็วสัญญาณ '+speed+' km/s มี Propagation Delay กี่ ms?',two(n),'ms',
   'เวลา = ระยะทาง ÷ ความเร็วสัญญาณ แล้วแปลงจากวินาทีเป็น ms',
   ['เวลา = '+km+' ÷ '+speed+' วินาที','แปลง ms: × 1,000',
    'Propagation Delay = '+n.toFixed(2)+' ms'],
   'Propagation (ms) = Distance (km) / Speed (km/s) × 1,000');
 }
 if(id==='total'){
  const bytes=pick([1000,1250,2500,5000],rng),mbps=pick([1,2,5,10],rng),km=pick([200,400,1000,2000],rng),speed=200000;
  const tx=transmissionMs(bytes,mbps),prop=propagationMs(km,speed);
  return finish('ส่ง '+bytes+' Bytes ที่ '+mbps+' Mbps ผ่านลิงก์ยาว '+km+' km (สัญญาณ '+speed+' km/s) คิดเฉพาะ Transmission + Propagation จะได้ Delay รวมกี่ ms?',two(tx+prop),'ms',
   'คำนวณเวลาส่งบิตและเวลาเดินทางของสัญญาณแยกกัน แล้วบวกผลลัพธ์',
   ['Transmission = '+bytes+' × 8 ÷ ('+mbps+' × 1,000,000) × 1,000 = '+tx.toFixed(2)+' ms',
    'Propagation = '+km+' ÷ '+speed+' × 1,000 = '+prop.toFixed(2)+' ms',
    'รวม = '+tx.toFixed(2)+' + '+prop.toFixed(2)+' = '+(tx+prop).toFixed(2)+' ms',
    'ข้อนี้ไม่คิด Processing Delay และ Queueing Delay'],
   'Total (เฉพาะสองส่วน) = Transmission + Propagation');
 }
 const mbps=pick([2,5,10,20,50],rng),rtt=pick([10,20,40,50,100],rng),n=bdpKbits(mbps,rtt);
 return finish('แบนด์วิดท์ '+mbps+' Mbps และ RTT '+rtt+' ms ได้ Bandwidth–Delay Product กี่ kbit? (1 kbit = 1,000 bits)',n,'kbit',
  'แปลง Mbps เป็น bit/s และ RTT เป็นวินาที นำมาคูณแล้วหาร 1,000',
  ['Bandwidth = '+mbps+' × 1,000,000 bit/s','RTT = '+rtt+' ÷ 1,000 s',
   'BDP = '+mbps+' × 1,000,000 × '+rtt+' ÷ 1,000 = '+(n*1000)+' bits',
   'แปลง kbit: '+(n*1000)+' ÷ 1,000 = '+n+' kbit'],
  'BDP (kbit) = Mbps × RTT (ms)');
}
export function checkNetworkAnswer(q,input){
 const value=String(input??'').trim();
 if(!value)return {valid:false,correct:false,message:'กรอกคำตอบก่อนกดตรวจ'};
 if(q.kind==='ip'){
  try{return {valid:true,correct:parseIPv4(value)===parseIPv4(q.answer)};}
  catch{return {valid:false,correct:false,message:'กรอก IPv4 รูปแบบ 192.168.1.0'};}
 }
 if(!/^\d+(?:[.,]\d+)?$/.test(value))return {valid:false,correct:false,message:'กรอกเป็นตัวเลขเท่านั้น ไม่ต้องใส่หน่วย'};
 const n=Number(value.replace(',','.')),target=Number(q.answer);
 return {valid:true,correct:Number.isInteger(target)?n===target:Math.abs(n-target)<=0.005001};
}
const html=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const format=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:2});
function calcInputs(mode,vals){
 const defs={
  subnet:[['ip','IPv4 Address','192.168.1.130'],['prefix','CIDR Prefix (0–32)','26']],
  hosts:[['hosts','จำนวนโฮสต์ที่ต้องการ','50']],
  delay:[['bytes','ขนาดแพ็กเก็ต (Bytes)','1500'],['mbps','อัตราส่ง (Mbps)','10'],['km','ระยะทาง (km)','1000'],['speed','ความเร็วสัญญาณ (km/s)','200000']],
  bdp:[['mbps','Bandwidth (Mbps)','10'],['rtt','RTT (ms)','20']]
 };
 return defs[mode].map(x=>'<label class="np-field"><span>'+html(x[1])+'</span><input name="'+x[0]+'" value="'+html(vals[x[0]]??x[2])+'" required inputmode="'+(x[0]==='ip'?'text':'decimal')+'" autocomplete="off"></label>').join('');
}
function runCalculator(mode,values){
 if(mode==='subnet'){
  const s=subnetIPv4(values.ip,values.prefix);
  const rows=[['Subnet Mask',s.mask],['Network Address',s.network],['Broadcast Address',s.broadcast??'ไม่มีสำหรับ /31 หรือ /32'],
   ['Wildcard Mask',s.wildcard],['First Host',s.firstHost],['Last Host',s.lastHost],
   ['IPv4 ทั้งหมด',format(s.total)],['Usable Hosts',format(s.usable)]];
  return {rows,note:s.note};
 }
 if(mode==='hosts'){
  const s=prefixForHosts(values.hosts);
  return {rows:[['Prefix','/'+s.prefix],['Subnet Mask',s.mask],['Usable Hosts',format(s.usable)]],
   note:'ใช้ Prefix ที่ยาวที่สุดซึ่ง 2^(32−Prefix) − 2 ยังมากกว่าหรือเท่ากับ '+values.hosts};
 }
 if(mode==='delay'){
  const tx=transmissionMs(values.bytes,values.mbps),prop=propagationMs(values.km,values.speed);
  return {rows:[['Transmission Delay',tx.toFixed(2)+' ms'],['Propagation Delay',prop.toFixed(2)+' ms'],
   ['รวมสองส่วน',(tx+prop).toFixed(2)+' ms']],
   note:'Transmission = Bytes×8/(Mbps×10⁶)×1000; Propagation = km/(km/s)×1000 ไม่รวม Processing และ Queueing'};
 }
 const result=bdpKbits(values.mbps,values.rtt);
 return {rows:[['Bandwidth–Delay Product',format(result)+' kbit'],['เทียบเป็น',format(result*1000)+' bits'],['เทียบเป็น',format(result*125)+' Bytes']],
  note:'BDP = Bandwidth (bit/s) × RTT (s)'};
}
export function showNetworkPractice(root,period='final'){
 const chosen=period==='midterm'?'midterm':'final';
 const section=NETWORK_PRACTICE_TOPICS.filter(x=>x.period===chosen);
 const route='#/year/2/term/1/subject/introduction-to-network-systems';
 const statsKey='it-study-hub-network-practice-v1-'+chosen;
 let stats={attempts:0,correct:0};
 try{const saved=JSON.parse(localStorage.getItem(statsKey)||'null');if(saved&&Number.isInteger(saved.attempts)&&Number.isInteger(saved.correct)&&saved.attempts>=saved.correct&&saved.correct>=0)stats=saved;}catch{}
 let state={mode:'quiz',type:'all',q:null,hint:false,checked:false,draft:'',warning:'',outcome:null,calcMode:'subnet',calcValues:{},calcResult:null,calcError:''};
 const save=()=>{try{localStorage.setItem(statsKey,JSON.stringify(stats));}catch{}};
 const newQuestion=()=>{
  const topic=state.type==='all'?section[Math.floor(Math.random()*section.length)]:section.find(x=>x.id===state.type);
  state.q=generateNetworkQuestion(topic.id);
  state.hint=false;state.checked=false;state.draft='';state.warning='';state.outcome=null;
 };
 newQuestion();
 function render(){
  const rate=stats.attempts?Math.round(stats.correct/stats.attempts*100):0;
  root.innerHTML='<nav class="breadcrumbs"><a href="#/">คลังวิชา</a> / <a href="'+route+'">'+
   'INTRODUCTION TO NETWORK SYSTEMS</a> / <a href="'+route+'/'+chosen+'">'+(chosen==='final'?'Final':'Midterm')+
   '</a> / ฝึกคำนวณ</nav>'+
   '<section class="np-head"><span class="eyebrow">NETWORK CALCULATION LAB</span><h1>ฝึกคำนวณ Network</h1>'+
   '<p>สุ่มโจทย์แล้วกรอกคำตอบด้วยตัวเอง ตรวจผลได้ทันที พร้อมคำใบ้ สูตร และเฉลยทีละขั้น ลองทำจนคล่องก่อนสอบ</p>'+
   '<div class="np-period"><a class="'+(chosen==='midterm'?'active':'')+'" href="'+route+'/midterm/network-practice">กลางภาค · Delay</a>'+
   '<a class="'+(chosen==='final'?'active':'')+'" href="'+route+'/final/network-practice">ปลายภาค · Subnetting</a></div></section>'+
   '<div class="np-mode"><button data-mode="quiz" class="'+(state.mode==='quiz'?'active':'')+'" type="button">✍️ ฝึกกรอกคำตอบ</button>'+
   '<button data-mode="calculator" class="'+(state.mode==='calculator'?'active':'')+'" type="button">🧮 เครื่องคำนวณตรวจคำตอบ</button></div>'+
   (state.mode==='quiz'?practiceMarkup():calculatorMarkup())+
   '<p class="np-footer">สูตรคำนวณใช้หน่วยฐานสิบ: 1 Mbps = 1,000,000 bit/s · โจทย์สุ่มสำหรับฝึก ไม่ใช่ข้อสอบจริง</p>';
  root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.mode=b.dataset.mode;render();});
  if(state.mode==='quiz')bindPractice();else bindCalculator();
 }
 function practiceMarkup(){
  const q=state.q;
  let result='';
  if(state.checked){
   result='<section class="np-result '+(state.outcome?'correct':'incorrect')+'" role="status">'+
    '<h3>'+(state.outcome?'✓ ตอบถูกแล้ว':'✕ คำตอบยังไม่ถูก')+'</h3><p>คำตอบที่ถูกต้องคือ <strong>'+html(q.answer)+' '+html(q.unit)+'</strong></p>'+
    '<h4>วิธีคิดทีละขั้น</h4><ol>'+q.steps.map(step=>'<li>'+html(step)+'</li>').join('')+'</ol>'+
    '<p class="np-formula"><b>สูตร:</b> '+html(q.formula)+'</p></section>';
  }
  return '<section class="np-panel"><div class="np-toolbar"><label class="np-field"><span>เลือกประเภทโจทย์</span><select id="np-topic"><option value="all">สุ่มทุกหัวข้อใน'+(chosen==='final'?'ปลายภาค':'กลางภาค')+'</option>'+
   section.map(item=>'<option value="'+item.id+'" '+(state.type===item.id?'selected':'')+'>'+html(item.name)+'</option>').join('')+
   '</select></label><div class="np-score"><strong>'+stats.correct+' / '+stats.attempts+'</strong><small>ตอบถูก / ทำทั้งหมด · '+rateString()+'</small></div></div>'+
   '<div class="np-question"><p class="np-week">'+html(q.type.week)+' · '+html(q.type.name)+'</p><h2>'+html(q.question)+'</h2>'+
   '<form id="np-answer-form"><label class="np-field" for="np-answer"><span>พิมพ์คำตอบของคุณ '+(q.kind==='ip'?'(เช่น 192.168.1.0)':'(ไม่ต้องใส่หน่วย)')+'</span></label>'+
   '<div class="np-answer-row"><input id="np-answer" name="answer" inputmode="'+(q.kind==='ip'?'text':'decimal')+'" autocomplete="off" placeholder="'+(q.kind==='ip'?'192.168.1.0':'เช่น 12.50')+'" value="'+html(state.draft)+'" '+(state.checked?'disabled':'')+' aria-describedby="np-warning">'+
   '<button class="button primary" type="submit" '+(state.checked?'disabled':'')+'>ตรวจคำตอบ</button></div></form>'+
   '<div class="np-actions"><button class="button secondary" id="np-hint" type="button" '+(state.checked?'disabled':'')+'>'+(state.hint?'ซ่อนคำใบ้':'💡 ขอคำใบ้')+'</button>'+
   '<button class="button secondary" id="np-next" type="button">↻ สุ่มข้อใหม่ / ข้อถัดไป</button></div>'+
   '<p id="np-warning" class="np-warning" role="alert">'+html(state.warning)+'</p>'+
   (state.hint&&!state.checked?'<div class="np-hint"><strong>แนวทางคิด</strong><p>'+html(q.hint)+'</p></div>':'')+
   result+'</div></section>';
 }
 function rateString(){
  return stats.attempts?Math.round(stats.correct/stats.attempts*100)+'%':'ยังไม่มีคะแนน';
 }
 function bindPractice(){
  const select=root.querySelector('#np-topic');
  select.onchange=()=>{state.type=select.value;newQuestion();render();};
  root.querySelector('#np-hint').onclick=()=>{state.draft=root.querySelector('#np-answer').value;state.hint=!state.hint;render();root.querySelector('#np-answer')?.focus();};
  root.querySelector('#np-next').onclick=()=>{newQuestion();render();root.querySelector('#np-answer')?.focus();};
  root.querySelector('#np-answer-form').onsubmit=e=>{
   e.preventDefault();if(state.checked)return;
   state.draft=root.querySelector('#np-answer').value;
   const check=checkNetworkAnswer(state.q,state.draft);
   if(!check.valid){state.warning=check.message;render();root.querySelector('#np-answer')?.focus();return;}
   state.outcome=check.correct;state.checked=true;
   stats.attempts++;if(check.correct)stats.correct++;
   save();render();
  };
 }
 function calculatorMarkup(){
  const modes=[['subnet','IPv4 / CIDR'],['hosts','หา Prefix จากโฮสต์'],['delay','คำนวณ Delay'],['bdp','Bandwidth–Delay Product']];
  return '<section class="np-panel"><h2>เครื่องคำนวณและตรวจคำตอบ</h2><p>ลองทำโจทย์เองก่อน แล้วกรอกข้อมูลที่นี่เพื่อตรวจวิธีคิดได้ทุกเวลา</p>'+
   '<form id="np-calculator-form"><label class="np-field"><span>เลือกสูตรที่ต้องการ</span><select id="np-calc-mode">'+
   modes.map(x=>'<option value="'+x[0]+'" '+(state.calcMode===x[0]?'selected':'')+'>'+x[1]+'</option>').join('')+
   '</select></label><div class="np-calc-grid">'+calcInputs(state.calcMode,state.calcValues)+'</div>'+
   '<button class="button primary" type="submit">คำนวณ</button></form><p class="np-warning" role="alert">'+html(state.calcError)+'</p>'+
   (state.calcResult?'<div class="np-result correct"><h3>ผลการคำนวณ</h3><div class="np-result-grid">'+state.calcResult.rows.map(row=>
    '<div><span>'+html(row[0])+'</span><strong>'+html(row[1])+'</strong></div>').join('')+
    '</div><p class="np-formula">'+html(state.calcResult.note)+'</p></div>':'')+'</section>';
 }
 function bindCalculator(){
  root.querySelector('#np-calc-mode').onchange=e=>{
   state.calcMode=e.target.value;state.calcResult=null;state.calcError='';state.calcValues={};render();
  };
  root.querySelector('#np-calculator-form').onsubmit=e=>{
   e.preventDefault();
   state.calcValues=Object.fromEntries(new FormData(e.currentTarget).entries());
   try{state.calcResult=runCalculator(state.calcMode,state.calcValues);state.calcError='';}
   catch(err){state.calcResult=null;state.calcError=err.message;}
   render();
  };
 }
 render();
}
