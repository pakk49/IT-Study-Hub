// PHYSICAL COMPUTING — learning content derived from the user's lecture PDFs.
// Each four-field item is: technical term, Thai explanation, concrete example, applied question.
// Applied practice questions are newly written and are not copied exam questions.
export function createPhysicalChapters(raw){
 return raw.map(ch=>{
  const sections=[],flashcards=[],questions=[];
  for(let groupIndex=0;groupIndex<ch.groups.length;groupIndex++){
   const group=ch.groups[groupIndex],terms=group.items,topic='pc-'+ch.number+'-s'+(groupIndex+1);
   if(terms.length<4)throw Error('Need four terms per group in chapter '+ch.number);
   sections.push({
    id:topic,title:group.title,pages:group.pages||'',
    intro:group.intro,points:group.points||[],
    table:{headers:['English Term','ความหมายภาษาไทย','ตัวอย่าง / การใช้งาน'],rows:terms.map(t=>t.slice(0,3))},
    remember:group.remember||'',formula:group.formula||''
   });
   for(let i=0;i<terms.length;i++){
    const [term,meaning,example,prompt]=terms[i];
    if(!term||!meaning||!example||!prompt)throw Error('Missing concept for '+ch.number+' '+groupIndex+' '+i);
    const id='pc-'+ch.number+'-q'+(questions.length+1);
    flashcards.push({id:'pc-'+ch.number+'-f'+(flashcards.length+1),term,meaning,example,front:term+' ใช้งานอย่างไร?',back:meaning+'\nตัวอย่าง: '+example});
    const distractorIndexes=terms.map((_,j)=>j).filter(j=>j!==i);
    const alternatives=[i,...[0,1,2].map(k=>distractorIndexes[(i+k)%distractorIndexes.length])];
    const shift=(i+groupIndex)%4;
    const order=alternatives.slice(shift).concat(alternatives.slice(0,shift));
    const options=order.map(j=>terms[j][0]),answer=order.indexOf(i);
    questions.push({id,topic,level:'วิเคราะห์ / ประยุกต์',prompt,options,answer,
     reasons:order.map(j=>j===i?'ถูกต้อง: '+term+' — '+meaning+' ตัวอย่าง: '+example:
      'ตัวเลือกนี้ใช้กับกรณีอื่น: '+terms[j][0]+' — '+terms[j][1]+' แต่โจทย์นี้ต้องใช้ '+term+' เพราะ '+meaning),
     vocabulary:order.map(j=>({term:terms[j][0],meaning:terms[j][1],example:terms[j][2]}))
    });
   }
  }
  return {id:'pc-chapter-'+ch.number,number:ch.number,exam:ch.exam,title:ch.title,
   description:ch.description,minutes:ch.minutes||30,source:ch.source,sections,flashcards,questions};
 });
}
