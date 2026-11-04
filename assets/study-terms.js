import { subjects } from './content.js';
import { physicalLabs } from './physical-labs.js';
import { buildTechnicalVocabulary,lookupTechnicalTerm } from './technical-vocabulary.js';
// ข้อมูลศัพท์ใช้ร่วมกับ tooltip ในหน้าอ่าน จึงมีคำอ่าน/ความหมายสอดคล้องกัน
const defaultTerms=new Map();
for(const subject of subjects)for(const chapter of subject.chapters||[])
 for(const f of chapter.flashcards||[])if(f.term&&!defaultTerms.has(f.term.toLowerCase()))defaultTerms.set(f.term.toLowerCase(),f);
const glossary=buildTechnicalVocabulary(subjects,{},physicalLabs);
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
export function getTechnicalTerm(key){
 const word=lookupTechnicalTerm(glossary,key);
 if(!word)return '';
 const reading=escape(word.reading),meaning=escape(word.meaning);
 return '<span class="study-term-hint"><span class="pronunciation">อ่านว่า '+reading+'</span><span>ความหมาย: '+meaning+'</span></span>';
}
