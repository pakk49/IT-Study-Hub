// Study summaries paraphrased from user-supplied lecture material.
// Each concept preserves the technical term in English and has Thai meaning, example and applied prompt.
export function createNetworkChapters(raw) {
 return raw.map((ch) => {
  const sections=[],flashcards=[],questions=[];
  for (let si=0;si<ch.groups.length;si++){
   const group=ch.groups[si],topic='net-'+ch.week+'-topic-'+(si+1),terms=group.items;
   if(terms.length<4) throw Error('Network topic needs at least 4 distinct concepts: '+ch.week);
   sections.push({
    id:topic,title:group.title,pages:group.pages||'',
    intro:group.intro,
    points:group.points||[], // vocabulary and examples stay in the table, not duplicated below
    table:{headers:['English Term','ความหมายภาษาไทย','ตัวอย่างใช้งาน'],rows:terms.map(t=>t.slice(0,3))},
    remember:group.remember||''
   });
   for(let i=0;i<terms.length;i++){
    const [term,meaning,example,prompt]=terms[i];
    if(!term||!meaning||!example||!prompt)throw Error('Incomplete glossary item '+ch.week+': '+i);
    const index=flashcards.length+1;
    flashcards.push({id:'net-'+ch.week+'-f'+index,term,meaning,example,
      front:term+' เกี่ยวข้องกับการทำงานเครือข่ายอย่างไร?',
      back:meaning+'\nตัวอย่าง: '+example});
    const others=terms.map((t,j)=>j).filter(j=>j!==i);
    const start=i%others.length;
    const indices=[i,...[0,1,2].map(n=>others[(start+n)%others.length])];
    const shift=(i+si)%4,order=indices.slice(shift).concat(indices.slice(0,shift));
    const answer=order.indexOf(i);
    questions.push({
      id:'net-'+ch.week+'-q'+index,topic,level:'วิเคราะห์ / ประยุกต์',prompt,
      options:order.map(j=>terms[j][0]),answer,
      reasons:order.map(j=>j===i?'ถูกต้อง: '+term+' — '+meaning+' ตัวอย่าง: '+example:
        'ไม่ตรงกับเงื่อนไขในโจทย์: '+terms[j][0]+' คือ '+terms[j][1]+' ส่วนกรณีนี้ต้องใช้ '+term),
      vocabulary:order.map(j=>({term:terms[j][0],meaning:terms[j][1],example:terms[j][2]}))
    });
   }
  }
  return {
   id:'net-week-'+ch.week,number:ch.week,week:ch.week,exam:ch.week>=9?'final':'midterm',
   title:ch.title,description:ch.description,minutes:ch.minutes||25,source:ch.source,
   sections,flashcards,questions
  };
 });
}
