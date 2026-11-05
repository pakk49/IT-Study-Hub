// Formatting only: uses existing lecture-derived material without adding facts.
const escapeRegex = value => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
const cleanup = [
 [/จำคำอังกฤษให้เชื่อมกับโจทย์สถานการณ์ ไม่ใช่จำแค่คำแปล/g,'อ่านความหมายพร้อมตัวอย่าง แล้วลองอธิบายการใช้ศัพท์นั้นด้วยคำของตัวเอง'],
 [/ศัพท์สำคัญ:/g,'คำศัพท์ที่ควรรู้:'],
 [/ตัวอย่างในหัวข้อนี้:/g,'ตัวอย่างให้เห็นภาพ:'],
 [/จำให้แม่น:/g,'จำง่าย ๆ:'],
 [/ตามตัวอย่างที่สไลด์ให้ไว้/g,'จากตัวอย่างในบทเรียน'],
 [/สไลด์เริ่มจากการใช้ข้อมูลดิบสร้างสารสนเทศเพื่อประกอบการตัดสินใจ และอธิบาย Database\/DBMS/g, 'ข้อมูลดิบ (Data) สามารถประมวลผลเป็นสารสนเทศ (Information) เพื่อใช้ตัดสินใจ โดย Database ใช้จัดเก็บข้อมูล ส่วน DBMS ใช้บริหารและควบคุมการใช้งาน'],
 [/จำแนกฐานข้อมูลตามผู้ใช้ ตำแหน่งข้อมูล และวัตถุประสงค์การใช้งานจากตัวอย่างในสไลด์/g,'ฐานข้อมูลแบ่งตามจำนวนผู้ใช้ ตำแหน่งจัดเก็บ และวัตถุประสงค์ในการใช้งาน เช่น ระบบที่รองรับผู้ใช้หลายคนหรือใช้บันทึกธุรกรรมประจำวัน'],
 [/สไลด์อธิบายปัญหาการจัดการข้อมูลด้วยแฟ้มข้อมูลแยกโปรแกรม ได้แก่ ความซ้ำซ้อน ความขึ้นต่อกัน และความผิดปกติ/g,'การจัดเก็บข้อมูลแยกเป็นหลายแฟ้มทำให้ข้อมูลซ้ำ ค่าขัดแย้งกัน และโปรแกรมอาจผูกกับรูปแบบแฟ้มจนแก้ไขยาก'],
 [/สไลด์ครอบคลุม log file, checkpoint, undo\/redo และ recovery หลังความล้มเหลว/g,'การกู้คืนฐานข้อมูลอาศัย Transaction Log, Checkpoint, Undo และ Redo เพื่อจัดการผลของธุรกรรมหลังระบบขัดข้อง'],
 [/คลังข้อมูลมีคุณสมบัติสำคัญสี่ด้านที่สไลด์ระบุชัดเจน/g,'Data Warehouse มีคุณสมบัติ 4 ด้าน ได้แก่ Subject-oriented, Integrated, Time-variant และ Non-volatile'],
 [/รูปแบบหลักในสไลด์:/g,'รูปแบบของ Animation ได้แก่'],
 [/องค์ประกอบหลักตามสไลด์คือ/g,'องค์ประกอบหลัก ได้แก่'],
 [/สไลด์ให้สูตร/g,'สูตรที่ใช้คือ'],
 [/ตามแนวคิดในสไลด์/g,'ตามหลักการ'],
 [/ในสไลด์ยกตัวอย่าง/g,'ตัวอย่าง ได้แก่'],
 [/ที่สไลด์ยกตัวอย่าง/g,'เช่น'],
 [/ที่สไลด์กล่าวถึง/g,'ที่เกี่ยวข้อง'],
 [/ที่สไลด์ระบุ/g,'ที่กำหนด'],
 [/สไลด์ใช้ประกอบการอธิบาย/g,'ใช้ประกอบการอธิบาย'],
 [/ในสไลด์เป็นการเปรียบเทียบ/g,'ใช้เปรียบเทียบ'],
 [/ตามตัวอย่างในสไลด์/g,'ตามตัวอย่าง'],
 [/ตามสไลด์/g,''],
 [/ในสไลด์/g,''],
 [/สไลด์กล่าวถึง/g,'เนื้อหาครอบคลุม'],
 [/สไลด์ระบุ/g,'เนื้อหาระบุ']
];
export function cleanStudyProse(value) {
 let s=String(value??'');
 for(const [pattern,replacement] of cleanup)s=s.replace(pattern,replacement);
 return s.replace(/[ \t]{2,}/g,' ').replace(/\s+([,;.!?])/g,'$1').trim();
}
export function sectionPresentation(section){
 const table=section.table;
 const glossary=Boolean(table && /^(English Term|คำศัพท์|ศัพท์เทคนิค|Term)/i.test(String(table.headers?.[0]||'')));
 const rows=table?.rows||[];
 const redundant=glossary&&rows.length>0&&(section.points||[]).length===rows.length &&
   (section.points||[]).every((point,i)=>String(point).startsWith(String(rows[i]?.[0])+' — '));
 const seen=new Set();
 const points=(redundant?[]:section.points||[]).map(cleanStudyProse).filter(text=>{
  const intro=cleanStudyProse(section.intro);
  if(!text || text===intro || (/^(ศัพท์สำคัญ|คำศัพท์ที่ควรรู้):\s*/.test(text)&&glossary))return false;
  if(seen.has(text))return false;
  seen.add(text);
  return true;
 });
 let remember=cleanStudyProse(section.remember);
 if(/^(จำคำศัพท์กลุ่ม|ให้เข้าใจการนำศัพท์แต่ละคำไปใช้)/.test(remember))remember='';
 remember=remember.replace(/^(จำตรงนี้ให้แม่น|จำให้แม่น|จำ)\s*[:：]\s*/,'');
 return {title:section.title,number:section.id,intro:cleanStudyProse(section.intro),points,table,glossary,remember,formula:section.formula||'',pages:section.pages||'',workedExample:section.workedExample||[]};
}
export function highlightStudyTerms(value,terms,escape) {
 const input=cleanStudyProse(value);
 const dictionary=[...new Set((terms||[]).map(s=>String(s||'').trim()).filter(s=>s.length>=3&&/[a-z]/i.test(s)))];
 dictionary.sort((a,b)=>b.length-a.length);
 if(!dictionary.length)return escape(input);
 const regex=new RegExp('('+dictionary.slice(0,50).map(escapeRegex).join('|')+')','gi');
 const chunks=input.split(regex);
 const names=new Set(dictionary.map(s=>s.toLowerCase()));
 return chunks.map(chunk=>names.has(chunk.toLowerCase())
  ?'<mark class="study-highlight">'+escape(chunk)+'</mark>':escape(chunk)).join('');
}
