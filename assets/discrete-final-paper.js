// ชุดฝึกรายบทใช้คำถามจาก PDF ชุดเดียวกับข้อสอบ Final ฉบับเต็ม
// ข้อที่ต้องเลือกหลายคำตอบ แปลงเป็นตัวเลือก "ชุดคำตอบ" เฉพาะโหมดรายบท (ข้อสอบเต็มใช้ checkbox ตามต้นฉบับ)
import { discretePaperQuestions } from './discrete-final-source.js';

const groups=[[1,2,3,4,5,6],[7,8,9,10,11],[12,13,14,15,16,17,18],[19,20,21],[22,23,24,25,26,27],[28]];
const diagramDescriptions={
15:'เมทริกซ์ความสัมพันธ์คือ [1 1 1 0; 0 1 0 0; 0 0 1 1; 1 0 0 1]',
16:'กราฟมี loop ที่ a,b,c และลูกศร b→a, a→c, b→c',
17:'กราฟมีลูกศรไปกลับระหว่าง a,b,c มี loop ที่ a,b,d แต่ไม่มี loop ที่ c',
18:'กราฟแบ่งเป็นคู่ a,b และ c,d ต่างมี loop ทุกจุดและลูกศรไปกลับภายในคู่',
19:'กราฟมีทิศทาง พร้อม loop ที่ c,e และลูกศรระหว่างจุด a,b,c,d,e',
20:'กราฟไม่มีทิศทาง มีขอบคู่ขนานระหว่าง a,c และ b,d พร้อมจุดโดดเดี่ยว e',
22:'กราฟมีลูกศร a↔b, a↔d, b→e, e→d, e→c, c→b',
23:'กราฟมีลูกศร a↔b, a↔d, b→e, e→d, e→c, c→b',
24:'กราฟเป็นสามเหลี่ยมสองรูปซ้อนกัน โดยจุดตัดของเส้นไม่มีจุดยอด',
26:'กราฟมีจุดยอด a ถึง h: ขอบ a−b, b−c, b−d, c−d, c−e, e−f, f−g, g−h, h−e, e−g',
27:'กราฟมีขอบ a−b,b−c,c−d,c−e,e−f,f−g,e−g,e−i,i−h',
28:'กราฟห้าจุดยอดที่ a,b,c,e มีดีกรี 3 และ d มีดีกรี 2'
};
function chapterChoice(question){
 const labels=question.options.map((option,index)=>String.fromCharCode(97+index)+'. '+option);
 const basePrompt=question.prompt+(question.diagram?' | '+(diagramDescriptions[question.number]||'กราฟประกอบตามเอกสาร'):'');
 const correct=question.answers.slice().sort((a,b)=>a-b).map(i=>String.fromCharCode(97+i)).join(', ');
 // โหมดฝึกรายบทเลือกหนึ่ง "ชุดคำตอบ" ได้ แต่โหมด Final แท้ให้เลือกหลาย checkbox
 if(question.answers.length>1 || question.options.length>4){
  const all=[[],[0],[1],[2],[3],[0,1],[0,2],[0,3],[1,2],[1,3],[2,3],[0,1,2],[0,2,3],[0,1,3],[1,2,3],[0,1,2,3]];
  const wrong=all.map(items=>items.map(i=>String.fromCharCode(97+i)).join(', ')).filter(s=>s && s!==correct && s.split(', ').every(x=>x.charCodeAt(0)-97<question.options.length));
  const options=[correct,...wrong.slice(0,3)];
  const shift=question.number%4;
  const rotated=options.slice(shift).concat(options.slice(0,shift));
  return {prompt:basePrompt+' | คำตอบหลายข้อ เลือกชุดอักษรที่ถูกต้อง: '+labels.join(' / '),options:rotated,answer:rotated.indexOf(correct)};
 }
 return {prompt:basePrompt,options:question.options.slice(),answer:question.answers[0]};
}
export function applyDiscreteFinalPaper(chapters){
 chapters.forEach((chapter,index)=>{
  const ids=groups[index]||[];
  const sectionIds=chapter.sections.map(s=>s.id);
  chapter.questions=ids.map((num,j)=>{
   const q=discretePaperQuestions.find(x=>x.number===num);
   if(!q)return null;
   const adapted=chapterChoice(q);
   const why='เฉลยตามวงและลายมือใน PDF หน้า '+q.page+': '+q.explanation+(q.sourceWarning?' หมายเหตุ: '+q.sourceWarning:'');
   return {id:'dm-pdf-'+num,topic:sectionIds[j%sectionIds.length],level:'ตามข้อสอบ Final PDF',
    prompt:adapted.prompt,options:adapted.options,answer:adapted.answer,
    reasons:adapted.options.map((option,i)=>i===adapted.answer?'ถูกต้อง: '+why:'ตัวเลือกนี้ไม่ตรงกับเฉลยที่บันทึกไว้: '+why),
    vocabulary:[],source:'discreteFinalExam-1.pdf หน้า '+q.page};
  }).filter(Boolean);
  chapter.source='โจทย์ฝึกรายบทดึงจาก discreteFinalExam-1.pdf; ข้อสอบ Final ฉบับเต็ม 28 ปรนัยและ 2 ข้อเขียน';
 });
 return chapters;
}
