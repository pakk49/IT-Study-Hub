import { vehicleTasks } from './physical-vehicle-data.js';

const $ = id => document.getElementById(id);
const esc = text => String(text ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const taskKey = id => 'it-study-hub-phycom-vehicle-answer-'+id;
const outputKey = id => 'it-study-hub-phycom-vehicle-output-'+id;
let selectedIndex = Math.max(0, vehicleTasks.findIndex(t => '#'+t.id === location.hash));

function task() { return vehicleTasks[selectedIndex]; }
function fromStorage(key, fallback = '') {
  try { return localStorage.getItem(key) ?? fallback; }
  catch { return fallback; }
}
function store(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}
function removeStored(key) {
  try { localStorage.removeItem(key); } catch {}
}
function showMessage(message) { $('vh-message').textContent = message; }
function saveDrafts() {
  store(taskKey(task().id), $('vh-code').value);
  store(outputKey(task().id), $('vh-stdout').value);
}
function fileName() { return 'vehicle_'+task().id+'.c'; }
function fullCode() {
  return task().prefix+'\n\n'+$('vh-code').value.trim()+'\n\n'+task().main+'\n';
}
function download(name, body, type) {
  const blob = new Blob([body], {type});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = name;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
async function copyText(value) {
  try { await navigator.clipboard.writeText(value); showMessage('คัดลอกแล้ว'); }
  catch { showMessage('ไม่สามารถคัดลอกอัตโนมัติได้ ลองดาวน์โหลดไฟล์แทน'); }
}
function showTask(index) {
  if(index < 0 || index >= vehicleTasks.length)return;
  if($('vh-code').value)saveDrafts();
  selectedIndex=index;
  const t=task();
  history.replaceState(null, '', '#'+t.id);
  $('vh-tabs').innerHTML=vehicleTasks.map((item,i)=>
    '<button type="button" class="vh-tab" aria-pressed="'+(i===index)+'" data-index="'+i+'"><span><strong>'+esc(item.title)+'</strong><small>'+esc(item.subtitle)+'</small></span><span class="vh-tab-points">'+item.points+' คะแนน</span></button>'
  ).join('');
  $('vh-tabs').querySelectorAll('button').forEach(btn=>btn.onclick=()=>showTask(Number(btn.dataset.index)));
  $('vh-title').textContent=t.title;
  $('vh-points').textContent=t.points+' คะแนน';
  $('vh-prompt').textContent=t.prompt;
  $('vh-reqs').innerHTML='<strong>สิ่งที่โจทย์ต้องการ</strong><ul>'+t.requirements.map(req=>'<li>'+esc(req)+'</li>').join('')+'</ul>';
  $('vh-prefix').textContent=t.prefix;
  $('vh-code').value=fromStorage(taskKey(t.id),t.starter);
  $('vh-main').textContent=t.main;
  $('vh-expected').textContent=t.expected;
  $('vh-hints').innerHTML=t.hints.map(h=>'<li>'+esc(h)+'</li>').join('');
  $('vh-stdout').value=fromStorage(outputKey(t.id));
  $('vh-cmd').textContent='gcc -std=c11 -Wall -Wextra -pedantic '+fileName()+' -o vehicle_'+t.id+'.exe\n.\\vehicle_'+t.id+'.exe';
  $('vh-copy-cmd').onclick=()=>copyText($('vh-cmd').textContent);
  $('vh-report').hidden=true;
  $('vh-output-result').textContent='';
  $('vh-output-result').className='';
  $('vh-upload').value='';
  showMessage('');
}
function has(source, regex) { return regex.test(source); }
function stripped(code) {
  return String(code).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g,'');
}
function getFunction(source,name) {
  // Find the C function and return its declaration plus body without inspecting other functions.
  const match=new RegExp('\\b'+name+'\\s*\\(').exec(source);
  if(!match)return '';
  const open=source.indexOf('(',match.index), start=source.lastIndexOf('\n',match.index)+1;
  let parens=0, close=-1;
  for(let i=open;i<source.length;i++){
    if(source[i]==='(')parens++;
    else if(source[i]===')'&&--parens===0){close=i;break;}
  }
  if(close<0)return '';
  let bodyStart=close+1;
  while(/\s/.test(source[bodyStart]||''))bodyStart++;
  if(source[bodyStart]!=='{')return '';
  let braces=0;
  for(let i=bodyStart;i<source.length;i++){
    if(source[i]==='{')braces++;
    else if(source[i]==='}'&&--braces===0)return source.slice(start,i+1);
  }
  return source.slice(start);
}
function createCriteriaResult(t, code) {
  const c=stripped(code);
  const f=name=>getFunction(c,name);
  const a=(src,regex)=>has(src,regex);
  const p={};
  if(t.id==='score'){
    const body=f('totalScore');
    p.function=a(body,/\bint\s+totalScore\s*\(\s*(?:const\s+)?Vehicle\s*\*\s*\w+/);
    p.traverse=a(body,/\b(?:while|for)\s*\(/)&&a(body,/->\s*next/)&&!a(body,/\bp\s*\+\+/);
    p.sum=a(body,/->\s*score/)&&a(body,/\breturn\s+(?!0\s*;|NULL\s*;)[A-Za-z_]\w*\s*;/);
  } else if(t.id==='struct'){
    const body=f('insertVehicle');
    p.function=a(body,/\bint\s+insertVehicle\s*\(/)&&a(body,/Vehicle\s*\*\s*\*\s*head/);
    p.allocate=a(body,/\b(?:malloc|calloc)\s*\(/);
    p.populate=a(body,/->\s*plate/)&&a(body,/->\s*score/)&&a(body,/->\s*next\s*=\s*(?:NULL|0)/)&&a(body,/\b(?:strcpy|strncpy|snprintf|memcpy)\s*\(/);
    p.empty=a(body,/\*\s*head\s*=\s*\w+\s*;/)&&a(body,/\bif\s*\(/);
    p.last=a(body,/\b(?:while|for)\s*\(/)&&a(body,/->\s*next\s*=\s*(?!NULL\b|0\s*;)[A-Za-z_]\w*\s*;/)&&a(body,/\breturn\s+1\s*;/);
  } else {
    const create=f('createVehicle'),append=f('appendVehicle'),clean=f('freeVehicles');
    p.create=a(create,/Vehicle\s*\*\s*createVehicle\s*\(/)&&a(create,/(?:malloc|calloc)\s*\(/);
    p.name=a(create,/->\s*name\s*=\s*(?:\([^)]+\)\s*)?(?:malloc|calloc)\s*\(/)&&a(create,/\bstrlen\s*\(/)&&a(create,/\b(?:strcpy|strncpy|memcpy|snprintf)\s*\(/);
    p.scores=a(create,/->\s*scores\s*=\s*(?:\([^)]+\)\s*)?(?:malloc|calloc)\s*\(/)&&a(create,/\bcount\b/)&&a(create,/\bmemcpy\s*\(|->\s*scores\s*\[/);
    p.allocation=a(create,/\bif\s*\(/)&&a(create,/(?:==\s*NULL|!\s*[A-Za-z_(])/);
    p.cleanup=(create.match(/\bfree\s*\(/g)||[]).length>=2;
    p.append=a(append,/\bint\s+appendVehicle\s*\(/)&&a(append,/\*\s*head/)&&a(append,/->\s*next/)&&a(append,/\breturn\s+1\s*;/);
    p.free=a(clean,/\bvoid\s+freeVehicles\s*\(/)&&a(clean,/\bfree\s*\(\s*\w+->\s*name\s*\)/)&&a(clean,/\bfree\s*\(\s*\w+->\s*scores\s*\)/)&&a(clean,/\bfree\s*\(\s*\w+\s*\)/);
    p.head=a(clean,/\*\s*head\s*=\s*(?:NULL|0)\s*;/);
  }
  return t.criteria.map(item=>({...item,pass:Boolean(p[item.id])}));
}
function balanced(code) {
  // Basic lexical pairing; strings are replaced to avoid counting braces within strings.
  const source=stripped(code).replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""');
  const stack=[], pairs={')':'(',']':'[','}':'{'};
  for(const ch of source){
    if('([{'.includes(ch)) stack.push(ch);
    else if(')]}'.includes(ch)&&stack.pop()!==pairs[ch])return false;
  }
  return stack.length===0;
}
function checkCode() {
  saveDrafts();
  const t=task(),code=$('vh-code').value;
  const results=createCriteriaResult(t,code);
  const earned=results.filter(x=>x.pass).reduce((sum,x)=>sum+x.weight,0);
  const bracesOk=balanced(code);
  $('vh-report').hidden=false;
  $('vh-report-summary').textContent='ผ่าน '+earned+'/'+t.points+' เกณฑ์ตรวจรูปแบบ'+(bracesOk?'':' · ตรวจพบวงเล็บหรือปีกกาไม่สมดุล');
  $('vh-meter-fill').style.width=(earned/t.points*100)+'%';
  $('vh-checklist').innerHTML=results.map(item=>
    '<div class="vh-criterion '+(item.pass?'ok':'no')+'"><b>'+(item.pass?'✓':'✕')+'</b><span>'+esc(item.label)+(item.pass?' · พบรูปแบบที่คาดหวัง':' · ยังไม่พบรูปแบบตามเกณฑ์')+'</span></div>'
  ).join('');
  showMessage(bracesOk?'แสดงผลตรวจรูปแบบแล้ว · ต้อง Compile จริงเพื่อยืนยันความถูกต้อง':'พบวงเล็บหรือปีกกาไม่สมดุล ให้แก้ก่อน Compile');
}
function normalizeOutput(s) {
  return String(s).replace(/\r\n?/g,'\n').split('\n').map(x=>x.trimEnd()).join('\n').trim();
}
function compareOutput(){
  const output=$('vh-stdout').value;
  store(outputKey(task().id),output);
  const box=$('vh-output-result');
  if(!output.trim()){box.className='bad';box.textContent='กรุณาวางผลลัพธ์ที่รันจาก GCC ก่อน';return;}
  const expected=normalizeOutput(task().expected),actual=normalizeOutput(output);
  if(expected===actual){box.className='good';box.textContent='✓ ผลลัพธ์ตรงกับตัวอย่างที่กำหนด (1 ชุดทดสอบ)\nอย่าลืมตรวจกรณี List ว่าง ข้อมูลหลาย Node และปัญหา Memory ด้วย';}
  else {
    const a=actual.split('\n'),e=expected.split('\n');
    const index=e.findIndex((v,i)=>v!==a[i]);
    const n=index<0?Math.min(e.length,a.length):index;
    box.className='bad';
    box.textContent='✕ ผลลัพธ์ไม่ตรงกับตัวอย่าง\nบรรทัด '+(n+1)+' คาดหวัง: '+(e[n]??'(ไม่มีบรรทัดนี้)')+'\nที่ส่งมา: '+(a[n]??'(ไม่มีบรรทัดนี้)');
  }
}
function extractFunctions(source) {
  let text=String(source).replace(/\r\n?/g,'\n');
  const mainMatch=/\bint\s+main\s*\(/.exec(text);
  if(!mainMatch)return {text,hasMain:false};
  text=text.slice(0,mainMatch.index);
  const matches=[...text.matchAll(/\}\s*Vehicle\s*;/g)];
  if(matches.length){
    const match=matches[matches.length-1];
    return {text:text.slice(match.index+match[0].length).trim(),hasMain:true};
  }
  text=text.replace(/^\s*#\s*include[^\n]*$/gm,'').trim();
  return {text,hasMain:true};
}
$('vh-code').addEventListener('input',()=>{saveDrafts();$('vh-report').hidden=true;});
$('vh-stdout').addEventListener('input',()=>store(outputKey(task().id),$('vh-stdout').value));
$('vh-check').onclick=checkCode;
$('vh-compare').onclick=compareOutput;
$('vh-download').onclick=()=>{saveDrafts();download(fileName(),fullCode(),'text/x-c;charset=utf-8');showMessage('ดาวน์โหลด '+fileName()+' แล้ว สามารถเปิดด้วย VS Code และ Compile ด้วย GCC');};
$('vh-copy').onclick=()=>copyText(fullCode());
$('vh-reset').onclick=()=>{
  if(!confirm('ล้างโค้ดและผลรันของ '+task().title+' หรือไม่?'))return;
  removeStored(taskKey(task().id));
  removeStored(outputKey(task().id));
  $('vh-code').value='';
  $('vh-stdout').value='';
  selectedIndex=-1;showTask(vehicleTasks.findIndex(x=>x.id===location.hash.slice(1)));
};
$('vh-upload').addEventListener('change',async event=>{
  const file=event.target.files?.[0];
  if(!file)return;
  if(!file.name.toLowerCase().endsWith('.c')){showMessage('รองรับเฉพาะไฟล์ .c');return;}
  if(file.size>1024*1024){showMessage('ไฟล์ต้องมีขนาดไม่เกิน 1 MB');return;}
  try{
    const source=await file.text();
    const parsed=extractFunctions(source);
    if(!parsed.text.trim()){showMessage('ไม่พบฟังก์ชันที่ต้องการตรวจในไฟล์');return;}
    $('vh-code').value=parsed.text;
    saveDrafts();$('vh-report').hidden=true;
    showMessage('อ่าน '+file.name+' แล้ว'+(parsed.hasMain?' · ตัด main() ที่อัปโหลดออกและใช้ main() ตามโจทย์':'')+' · กดตรวจโครงสร้างได้เลย');
  }catch{showMessage('อ่านไฟล์ไม่สำเร็จ');}
});
showTask(selectedIndex);
