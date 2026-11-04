// Convert curriculum-specific concepts into review sections, flashcards and applied quizzes.
// Definitions are grounded in the supplied PDF lecture slides. Scenarios are original practice examples.
const tidy = value => String(value||'').trim();
export function createDatabaseChapters(raw) {
 return raw.map(ch => {
  const sections=[],flashcards=[],questions=[];
  for(let si=0;si<ch.groups.length;si++){
   const group=ch.groups[si],topic=`db-${ch.number}-${si+1}`,terms=group.items;
   sections.push({
    id:topic,title:group.title,pages:group.pages||'',
    intro:group.intro,
    points:group.points||[], // definitions and examples appear once in the vocabulary table
    table:{headers:['ศัพท์เทคนิค (ภาษาอังกฤษ)','ความหมายแบบเข้าใจง่าย','ตัวอย่างการใช้งาน'],rows:terms.map(t=>t.slice(0,3))},
    remember:group.remember||''
   });
   for(let i=0;i<terms.length;i++){
    const [term,meaning,example,prompt]=terms[i];
    const gidx=flashcards.length+1;
    flashcards.push({id:`db-${ch.number}-f${gidx}`,term,meaning,example,front:`${term} คืออะไร และใช้กับงานแบบไหน?`,back:`${meaning}\nตัวอย่างจริง: ${example}`});
    // Three alternatives from the same topic wherever possible.
    const pool=terms.map((x,j)=>j).filter(j=>j!==i);
    let choices=[i,...pool.slice(0,3)];
    // Change distractors deterministically; do not vary answer when shuffled by UI.
    if(pool.length>3){
      const start=i%pool.length;
      choices=[i,pool[start],pool[(start+1)%pool.length],pool[(start+2)%pool.length]];
    }
    if(new Set(choices).size!==4) throw Error(`Need at least 4 unique terms: ${ch.number} ${si}`);
    const shift=(i+si)%4;
    const order=choices.slice(shift).concat(choices.slice(0,shift));
    const correct=order.indexOf(i);
    const options=order.map(j=>terms[j][0]);
    const reasons=order.map(j=>j===i
     ? `ถูกต้อง: ${term} หมายถึง ${meaning} เช่น ${example}`
     : `ยังไม่ใช่: ${terms[j][0]} หมายถึง ${terms[j][1]} แต่โจทย์ต้องการ ${term} ซึ่งหมายถึง ${meaning}`);
    questions.push({id:`db-${ch.number}-q${gidx}`,topic,level:'วิเคราะห์ / ประยุกต์',prompt,options,answer:correct,reasons,
      vocabulary:order.map(j=>({term:terms[j][0],meaning:terms[j][1],example:terms[j][2]}))});
   }
  }
  return {id:`db-chapter-${ch.number}`,number:ch.number,exam:ch.period,title:ch.title,
    description:ch.description,minutes:ch.minutes||30,source:ch.source,sections,flashcards,questions};
 });
}
