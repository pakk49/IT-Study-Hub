import { getStudyTerm } from './thai-readings.js';
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ใช้ความหมายชุดเดียวกับ tooltip และเลือกความหมายตามวิชาที่กำลังอ่าน
export function getTechnicalTerm(key,subjectId){
 const word=getStudyTerm(key,subjectId);
 if(!word)return '';
 return '<span class="study-term-hint"><span class="pronunciation">อ่านว่า '+escape(word.reading)+'</span><span>ความหมาย: '+escape(word.meaning)+'</span></span>';
}
