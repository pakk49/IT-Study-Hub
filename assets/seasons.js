// Seasonal visuals are original CSS/emoji effects. No remote tracking, images or unlicensed assets.
// Holiday windows use the Bangkok calendar day: 3 days before through the event day only.
const FESTIVALS=[
 {id:'new-year',name:'วันปีใหม่',date:'01-01',icon:'🎆',effect:'fireworks',tone:'midnight',priority:85},
 {id:'childrens-day',name:'วันเด็กแห่งชาติ',rule:'second-sat-jan',icon:'🎈',effect:'balloons',tone:'fun',priority:60},
 {id:'teachers-day',name:'วันครู',date:'01-16',icon:'📚',effect:'sparkles',tone:'amber',priority:42},
 {id:'chinese-new-year',name:'ตรุษจีน',dates:{2025:'01-29',2026:'02-17',2027:'02-06',2028:'01-26',2029:'02-13',2030:'02-03',2031:'01-23'},icon:'🏮',effect:'lanterns',tone:'lunar',priority:90},
 {id:'valentine',name:'วันวาเลนไทน์',date:'02-14',icon:'💗',effect:'hearts',tone:'rose',priority:60},
 {id:'chakri',name:'วันจักรี',date:'04-06',icon:'🌼',effect:'petals',tone:'warm',priority:40},
 {id:'songkran',name:'วันสงกรานต์',date:'04-13',icon:'💦',effect:'splash',tone:'water',priority:96},
 {id:'labour-day',name:'วันแรงงาน',date:'05-01',icon:'🛠️',effect:'sparkles',tone:'warm',priority:35},
 {id:'coronation',name:'วันฉัตรมงคล',date:'05-04',icon:'🌼',effect:'petals',tone:'gold',priority:45},
 {id:'queens-birthday',name:'วันเฉลิมพระชนมพรรษาสมเด็จพระราชินี',date:'06-03',icon:'🌷',effect:'petals',tone:'violet',priority:45},
 {id:'kings-birthday',name:'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว',date:'07-28',icon:'🌼',effect:'petals',tone:'gold',priority:45},
 {id:'mothers-day',name:'วันแม่แห่งชาติ',date:'08-12',icon:'💙',effect:'petals',tone:'mother',priority:75},
 {id:'thai-flag',name:'วันพระราชทานธงชาติไทย',date:'09-28',icon:'🇹🇭',effect:'sparkles',tone:'thai',priority:35},
 {id:'halloween',name:'Halloween',date:'10-31',icon:'👻',effect:'ghosts',tone:'halloween',priority:100},
 {id:'loy-krathong',name:'วันลอยกระทง',dates:{2025:'11-05',2026:'11-24',2027:'11-13',2028:'11-01',2029:'11-20',2030:'11-10',2031:'11-29'},icon:'🪷',effect:'lanterns',tone:'lotus',priority:85},
 {id:'fathers-day',name:'วันพ่อแห่งชาติ',date:'12-05',icon:'💛',effect:'petals',tone:'father',priority:72},
 {id:'constitution',name:'วันรัฐธรรมนูญ',date:'12-10',icon:'🇹🇭',effect:'sparkles',tone:'thai',priority:35},
 {id:'christmas',name:'Christmas',date:'12-25',icon:'🎄',effect:'snow-gifts',tone:'christmas',priority:100},
 {id:'new-year-eve',name:'วันส่งท้ายปีเก่า',date:'12-31',icon:'🎆',effect:'fireworks',tone:'midnight',priority:90}
];
export const festivalCalendar=FESTIVALS;
const padded=n=>String(n).padStart(2,'0');
const noon=(y,m,d)=>new Date(y,m-1,d,12,0,0,0); // local day and DST safe
function dateOf(year,code){const [m,d]=code.split('-').map(Number);return noon(year,m,d);}
function dateForFestival(item,year){
 if(item.rule==='second-sat-jan'){const first=noon(year,1,1);return noon(year,1,1+(6-first.getDay()+7)%7+7);}
 const md=item.dates?item.dates[year]:item.date;
 return md?dateOf(year,md):null;
}
export function seasonAt(date=new Date()){
 const marker=(date.getMonth()+1)*100+date.getDate();
 return marker>=215&&marker<515?'summer':marker>=515&&marker<1015?'rain':'winter';
}
export function activeFestival(date=new Date()){
 const localDay=noon(date.getFullYear(),date.getMonth()+1,date.getDate());
 const found=[];
 for(const year of [localDay.getFullYear()-1,localDay.getFullYear(),localDay.getFullYear()+1]){
  for(const item of FESTIVALS){
   const ending=dateForFestival(item,year);
   if(!ending)continue;
   const days=Math.round((Date.UTC(ending.getFullYear(),ending.getMonth(),ending.getDate())-
     Date.UTC(localDay.getFullYear(),localDay.getMonth(),localDay.getDate()))/86400000);
   if(days>=0&&days<=3)found.push({festival:item,daysUntil:days});
  }
 }
 found.sort((a,b)=>b.festival.priority-a.festival.priority||a.daysUntil-b.daysUntil);
 return found[0]||null;
}
export function themeAt(date=new Date()){
 const active=activeFestival(date);
 const season=seasonAt(date);
 const seasonal={summer:{name:'ฤดูร้อน',icon:'☀️',effect:'sun-birds'},rain:{name:'ฤดูฝน',icon:'🌧️',effect:'rain'},winter:{name:'ฤดูหนาว',icon:'❄️',effect:'snow-birds'}}[season];
 if(active)return {id:active.festival.id,name:active.festival.name,icon:active.festival.icon,
  effect:active.festival.effect,tone:active.festival.tone,season,daysUntil:active.daysUntil,festival:true};
 return {id:season,name:seasonal.name,icon:seasonal.icon,effect:seasonal.effect,tone:season,season,daysUntil:null,festival:false};
}
const ICONS={rain:['💧','💦'], 'snow-birds':['❄','✦','🐦'],'sun-birds':['☀️','🕊️','🐦','✨'],
 ghosts:['👻','🦇','✦'], 'snow-gifts':['❄','🎁','✨','🌟'],fireworks:['✨','🎆','✧','⭐'],
 balloons:['🎈','🎉','✦'],sparkles:['✦','✨','⭐'],lanterns:['🏮','✨','🪷'],hearts:['💗','💕','♡'],
 petals:['🌼','✿','🌸'],splash:['💦','💧','🫧']};
const MAX=24;
function seeded(i,n){const s=Math.sin((i+1)*17.135+n*2.741)*43758.545;return s-Math.floor(s);}
function localDayNumber(date){return date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();}
export function initSeasonalUi(){
 const stage=document.querySelector('#season-fx');
 const text=document.querySelector('#season-name');
 const sticker=document.querySelector('#season-sticker');
 const button=document.querySelector('#effects-toggle');
 if(!stage||!text||!sticker||!button)return ()=>{};
 let enabled=true;
 try{enabled=localStorage.getItem('it-study-hub-effects')!=='off';}catch{}
 let lastKey='';
 const update=(route=[])=>{
  const theme=themeAt(new Date());
  const quiet=route.includes('chapter')||route.includes('exam')||route.includes('quiz')||route.includes('flashcards');
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
  const key=theme.id+'|'+quiet+'|'+enabled+'|'+reduced+'|'+localDayNumber(new Date());
  document.documentElement.dataset.season=theme.season;
  document.documentElement.dataset.festival=theme.festival?theme.id:'none';
  document.documentElement.dataset.tone=theme.tone;
  document.documentElement.dataset.quiet=quiet?'true':'false';
  text.textContent=theme.name;
  sticker.textContent=theme.icon;
  sticker.title=theme.festival?'เทศกาล '+theme.name:'ธีม '+theme.name;
  button.setAttribute('aria-pressed',String(enabled));
  button.textContent=enabled?'ปิดเอฟเฟกต์':'เปิดเอฟเฟกต์';
  if(key===lastKey)return;
  lastKey=key;stage.replaceChildren();
  if(!enabled||quiet||reduced)return;
  const symbols=ICONS[theme.effect]||ICONS.sparkles;
  const seed=localDayNumber(new Date());
  const count=theme.effect==='rain'?MAX:theme.effect==='sun-birds'?11:16;
  const fragment=document.createDocumentFragment();
  for(let i=0;i<count;i++){
   const item=document.createElement('span');
   const x=seeded(i,seed)*100;
   const duration=theme.effect==='rain'?2.4+seeded(i+13,seed)*2.4:6+seeded(i+7,seed)*8;
   item.className='season-particle fx-'+theme.effect+' variation-'+(i%3);
   item.textContent=symbols[(i+Math.floor(seeded(i+21,seed)*symbols.length))%symbols.length];
   item.style.cssText='--x:'+x.toFixed(2)+'%;--delay:'+(-seeded(i+8,seed)*16).toFixed(2)+'s;--duration:'+duration.toFixed(1)+'s;--size:'+(14+Math.round(seeded(i+4,seed)*17))+'px';
   item.setAttribute('aria-hidden','true');fragment.append(item);
  }
  stage.append(fragment);
 };
 button.addEventListener('click',()=>{
  enabled=!enabled;
  try{localStorage.setItem('it-study-hub-effects',enabled?'on':'off');}catch{}
  lastKey='';update(window.location.hash.split('/').filter(Boolean));
 });
 const interval=setInterval(()=>update(window.location.hash.split('/').filter(Boolean)),600000);
 update(window.location.hash.split('/').filter(Boolean));
 return (route)=>update(route);
}
