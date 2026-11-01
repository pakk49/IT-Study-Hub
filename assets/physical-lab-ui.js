import { physicalLabs } from './physical-labs.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const base='/year/2/term/1/subject/physical-computing';
const labUrl=no=>'#'+base+'/labs/'+no;
const storageKey='it-study-hub-pc-lab-checks-v1';
function saved(){try{return JSON.parse(localStorage.getItem(storageKey)||'{}');}catch{return {};}}
function store(value){try{localStorage.setItem(storageKey,JSON.stringify(value));}catch{}}
function toolbar(){return '<nav class="breadcrumbs"><a href="#/">คลังวิชา</a> / <a href="#'+base+'">PHYSICAL COMPUTING</a> / <a href="#'+base+'/labs">Labs</a></nav>';}
export function showPhysicalLabs(root){
 const marks=saved();
 const list=period=>physicalLabs.filter(l=>l.period===period).map(l=>{
  const done=l.tasks.filter((_,i)=>marks[l.no+'-'+i]).length;
  return '<a class="pc-lab-card" href="'+labUrl(l.no)+'"><span class="pc-lab-number">LAB '+String(l.no).padStart(2,'0')+'</span><span class="pc-lab-info"><strong>'+esc(l.title)+'</strong><small>'+esc(l.summary)+'</small><span class="pc-lab-progress">'+done+' / '+l.tasks.length+' ขั้นตอนที่ทบทวนแล้ว</span></span><span aria-hidden="true">→</span></a>';
 }).join('');
 root.innerHTML=toolbar()+'<section class="pc-lab-head"><p class="eyebrow">HANDS-ON LEARNING</p><h1>Physical Computing · Lab</h1><p>ฝึกตามเอกสารที่ได้รับและ Repository อ้างอิง แยกกลางภาค/ปลายภาค พร้อมรายการตรวจความเข้าใจและศัพท์อังกฤษที่ใช้จริง</p><div class="pc-lab-counters"><span>11 Labs ที่มีแหล่งข้อมูล</span><span>Midterm 5 Labs</span><span>Final 6 Labs</span></div></section><div class="pc-lab-group"><h2>📘 Midterm Labs</h2>'+list('midterm')+'</div><div class="pc-lab-group"><h2>🟠 Final Labs</h2>'+list('final')+'</div><p class="source-note">Lab 03, 04, 12–15 เชื่อมไปยังคู่มือ GitHub ภายนอก ส่วน Lab 01, 02, 06, 09, 10 อ้างอิง PDF ที่ผู้ใช้ส่งมา ไม่มีการแต่งรายละเอียดของ Lab ที่ยังไม่มีไฟล์</p>';
}
export function showPhysicalLab(root,id){
 const lab=physicalLabs.find(l=>String(l.no)===String(id));
 if(!lab){root.innerHTML=toolbar()+'<div class="empty"><h2>ไม่พบ Lab</h2><p>มีเฉพาะ Lab ที่มีเอกสารยืนยันแล้ว</p></div>';return;}
 const marks=saved();
 root.innerHTML=toolbar()+'<section class="pc-lab-head"><p class="eyebrow">'+lab.period.toUpperCase()+' · LAB '+String(lab.no).padStart(2,'0')+'</p><h1>'+esc(lab.title)+'</h1><p>'+esc(lab.summary)+'</p><div class="pc-lab-head-actions"><a class="button secondary" href="#'+base+'/labs">← รายการ Lab ทั้งหมด</a><a class="button secondary" href="#'+base+'/chapter/pc-chapter-'+lab.chapter+'/summary">อ่านบทเรียนที่เกี่ยวข้อง</a>'+(lab.url?'<a class="button primary" href="'+esc(lab.url)+'" target="_blank" rel="noopener noreferrer">เปิด Lab ต้นฉบับใน GitHub ↗</a>':'')+'</div></section><div class="pc-lab-detail"><section class="pc-lab-exercises"><h2>รายการฝึกและทบทวน</h2><p>ติ๊กหลังจากทดลองทำหรืออธิบายขั้นตอนนั้นได้ ระบบจำความคืบหน้าเฉพาะในเครื่องของคุณ</p>'+lab.tasks.map((task,i)=>'<label class="pc-lab-task"><input type="checkbox" data-pc-task="'+i+'" '+(marks[lab.no+'-'+i]?'checked':'')+'/><span><b>'+(i+1)+'.</b> '+esc(task)+'</span></label>').join('')+'<div id="pc-lab-completion" class="pc-lab-completion" aria-live="polite"></div></section><section class="pc-lab-terms"><h2>ศัพท์สำคัญของ Lab</h2><div class="table-scroll"><table class="study-table"><thead><tr><th>English Term</th><th>ความหมายภาษาไทย</th></tr></thead><tbody>'+lab.terms.map(([term,meaning])=>'<tr><td><strong class="study-term">'+esc(term)+'</strong></td><td>'+esc(meaning)+'</td></tr>').join('')+'</tbody></table></div><p class="source-note">แหล่งข้อมูล: '+esc(lab.source)+'</p></section></div>';
 const update=()=>{
  const checked=root.querySelectorAll('[data-pc-task]:checked').length;
  const box=root.querySelector('#pc-lab-completion');
  if(box)box.textContent='ทบทวนแล้ว '+checked+' จาก '+lab.tasks.length+' ขั้นตอน'+(checked===lab.tasks.length?' · ✓ ครบแล้ว':'');
 };
 root.querySelectorAll('[data-pc-task]').forEach(cb=>cb.addEventListener('change',()=>{
  const next=saved();next[lab.no+'-'+cb.dataset.pcTask]=cb.checked;store(next);update();
 }));
 update();
}
