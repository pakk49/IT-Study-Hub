// ข้อสอบรวม 60 ข้อ ใช้คำถามและเฉลยเดิมที่สร้างจากสไลด์เท่านั้น
export const EXAM_SIZE = 60;
const QUOTAS = new Map([[6,9],[7,9],[8,9],[9,9],[10,8],[11,8],[12,8]]);
function balanceQuestions(c,count) {
  const groups=new Map();
  for(const q of c.questions){if(!groups.has(q.topic))groups.set(q.topic,[]);groups.get(q.topic).push(q);}
  const lists=[...groups.values()];
  const out=[];
  while(out.length<count && lists.some(x=>x.length))for(const group of lists)if(group.length && out.length<count)out.push(group.shift());
  return out;
}
export function buildExamBank(subject,period) {
  const chapters=(subject.chapters||[]).filter(c=>(c.exam||'final')===period).slice().sort((a,b)=>a.number-b.number);
  const want=period==='final'?chapters.map(c=>QUOTAS.get(c.number)||0):chapters.map(()=>0);
  if(period==='midterm'){
    let remaining=EXAM_SIZE;
    while(remaining){let took=false;for(let i=0;i<chapters.length&&remaining;i++)if(want[i]<(chapters[i].questions||[]).length){want[i]++;remaining--;took=true;}if(!took)break;}
  }
  const total=want.reduce((a,b)=>a+b,0);
  const valid=total===EXAM_SIZE && (period!=='final'||chapters.length===7) && chapters.every((c,i)=>c.questions?.length>=want[i]);
  if(!valid)return {ready:false,total:EXAM_SIZE,questions:[],chapters};
  const questions=chapters.flatMap((c,i)=>balanceQuestions(c,want[i]).map(q=>({...q,id:c.id+'::'+q.id,chapterId:c.id,chapterNo:c.number,chapterTitle:c.title,sectionTitle:c.sections.find(s=>s.id===q.topic)?.title||'ทบทวน'})));
  if(questions.length!==EXAM_SIZE||new Set(questions.map(q=>q.id)).size!==EXAM_SIZE)throw Error('ข้อสอบรวมไม่ครบ 60 ข้อหรือมี ID ซ้ำ');
  return {ready:true,total:EXAM_SIZE,questions,chapters};
}
