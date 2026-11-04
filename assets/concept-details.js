import { NETWORK_CONCEPT_DETAILS } from './concepts-network.js';
import { DATABASE_CONCEPT_DETAILS } from './concepts-database.js';
import { PHYSICAL_CONCEPT_DETAILS } from './concepts-physical.js';

// เลือกคำอธิบายให้ตรงกับบริบทของวิชา ไม่เดาความหมายศัพท์ข้ามวิชา
const BY_SUBJECT={
 'introduction-to-network-systems':NETWORK_CONCEPT_DETAILS,
 'database-system-concepts':DATABASE_CONCEPT_DETAILS,
 'physical-computing':PHYSICAL_CONCEPT_DETAILS
};
const normal=value=>String(value??'').normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
export function detailedMeaning(term,subjectId){
 return BY_SUBJECT[subjectId]?.[normal(term)]||null;
}
export function expandDetailedDefinitions(subjects){
 let changes=0;
 for(const subject of subjects||[])for(const chapter of subject.chapters||[]){
  const updated=new Map();
  for(const card of chapter.flashcards||[]){
   const detailed=detailedMeaning(card.term,subject.id);
   if(!detailed||!card.meaning||card.meaning===detailed)continue;
   const previous=card.meaning;
   card.meaning=detailed;
   if(card.back)card.back=card.back.replace(previous,detailed);
   updated.set(normal(card.term),detailed);
   changes++;
  }
  for(const section of chapter.sections||[]){
   for(const row of section.table?.rows||[]){
    if(!Array.isArray(row)||row.length<2)continue;
    const detailed=detailedMeaning(row[0],subject.id);
    if(detailed&&/[ก-๙]/.test(String(row[1]))&&row[1]!==detailed)row[1]=detailed;
   }
  }
  for(const question of chapter.questions||[]){
   for(const item of question.vocabulary||[]){
    const detailed=detailedMeaning(item.term,subject.id);
    if(detailed)item.meaning=detailed;
   }
   if(!updated.size||!Array.isArray(question.reasons))continue;
   question.reasons=question.reasons.map((reason,i)=>{
    // เติมเฉพาะคำอธิบายตัวเลือกที่เป็นคำตอบจริง ไม่เปลี่ยน index หรือความถูกผิด
    if(i!==question.answer)return reason;
    const detailed=updated.get(normal(question.options?.[i]));
    return detailed&&!reason.includes(detailed)?reason+'\nทำไมจึงใช่: '+detailed:reason;
   });
  }
 }
 return changes;
}
