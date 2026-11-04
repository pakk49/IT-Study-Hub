// คำอ่านจากศัพท์เฉพาะและความหมายจากเนื้อหารายวิชาโดยตรง
const READINGS={"model":"โมเดล","data":"เดตา","database":"เดตาเบส","network":"เน็ตเวิร์ก","system":"ซิสเท็ม","software":"ซอฟต์แวร์","file":"ไฟล์","design":"ดีไซน์","table":"เทเบิล","entity":"เอนทิตี","attribute":"แอตทริบิวต์","relationship":"รีเลชันชิป","diagram":"ไดอะแกรม","normal":"นอร์มัล","form":"ฟอร์ม","first":"เฟิร์สต์","second":"เซคันด์","third":"เธิร์ด","fourth":"โฟร์ธ","key":"คีย์","one":"วัน","many":"เมนี","two":"ทู","to":"ทู","of":"ออฟ","and":"แอนด์","for":"ฟอร์","by":"บาย","in":"อิน","on":"ออน","with":"วิธ","not":"น็อต","part":"พาร์ต","prefix":"พรีฟิกซ์","address":"แอดเดรส","host":"โฮสต์","hosts":"โฮสต์ส","subnet":"ซับเน็ต","mask":"มาสก์","ethernet":"อีเทอร์เน็ต","broadcast":"บรอดแคสต์","default":"ดีฟอลต์","gateway":"เกตเวย์","port":"พอร์ต","protocol":"โพรโทคอล","source":"ซอร์ส","destination":"เดสทิเนชัน","application":"แอปพลิเคชัน","transport":"ทรานสปอร์ต","layer":"เลเยอร์","physical":"ฟิซิคัล","memory":"เมมโมรี","pointer":"พอยน์เตอร์","array":"อาร์เรย์","function":"ฟังก์ชัน","stack":"สแตก","queue":"คิว","loop":"ลูป","value":"แวลู","return":"รีเทิร์น","type":"ไทป์","operator":"โอเปอเรเตอร์","logical":"ลอจิคัล","control":"คอนโทรล","selection":"ซีเล็กชัน","statement":"สเตตเมนต์","boolean":"บูลีน","condition":"คอนดิชัน","int":"อินต์","float":"โฟลต","class":"คลาส","read":"รีด","write":"ไรต์","input":"อินพุต","output":"เอาต์พุต","digital":"ดิจิทัล","analog":"แอนะล็อก","current":"เคอร์เรนต์","voltage":"โวลเทจ","resistance":"รีซิสแทนซ์","signal":"ซิกแนล","sensor":"เซนเซอร์","arduino":"อาร์ดูอิโน","broker":"โบรเกอร์","topic":"ท็อปปิก","publisher":"พับลิชเชอร์","subscriber":"ซับสไครบ์เบอร์","networking":"เน็ตเวิร์กกิง","internet":"อินเทอร์เน็ต","switch":"สวิตช์","router":"เราเตอร์","throughput":"ทรูพุต","bandwidth":"แบนด์วิดท์","latency":"เลเทนซี","packet":"แพ็กเก็ต","message":"เมสเสจ","number":"นัมเบอร์","bit":"บิต","byte":"ไบต์","frame":"เฟรม","flag":"แฟล็ก","sequence":"ซีเควนซ์","window":"วินโดว์","rate":"เรต","time":"ไทม์","connection":"คอนเน็กชัน","flow":"โฟลว์","stop":"สต็อป","go":"โก","back":"แบ็ก","repeat":"รีพีต","hop":"ฮ็อป","cache":"แคช","check":"เช็ก","error":"เออร์เรอร์","generator":"เจเนอเรเตอร์","polynomial":"พอลิโนเมียล","learning":"เลิร์นนิง","algorithm":"อัลกอริทึม","graph":"กราฟ","path":"พาธ","cycle":"ไซเคิล","circuit":"เซอร์กิต","degree":"ดีกรี","bridge":"บริดจ์","vertex":"เวอร์เท็กซ์","edge":"เอดจ์","euler":"ออยเลอร์","hamilton":"แฮมิลตัน","media":"มีเดีย","multimedia":"มัลติมีเดีย","graphics":"กราฟิกส์","vector":"เวกเตอร์","image":"อิมเมจ","pixel":"พิกเซล","pixels":"พิกเซลส์","color":"คัลเลอร์","modeling":"โมเดลลิง","rendering":"เรนเดอริง","shading":"เชดิง","curve":"เคิร์ฟ","point":"พอยต์","points":"พอยต์ส","animation":"แอนิเมชัน","interpolation":"อินเทอร์โพเลชัน","sampling":"แซมปลิง","audio":"ออดิโอ","video":"วิดีโอ","compression":"คอมเพรสชัน","format":"ฟอร์แมต","filter":"ฟิลเตอร์","noise":"นอยส์","frequency":"ฟรีเควนซี","font":"ฟอนต์","code":"โค้ด","information":"อินฟอร์เมชัน","metadata":"เมทาดาตา","single":"ซิงเกิล","multiuser":"มัลติยูสเซอร์","centralized":"เซ็นทรัลไลซ์ด","distributed":"ดิสทริบิวเท็ด","operational":"โอเปอเรชันนัล","redundancy":"รีดันแดนซี","inconsistency":"อินคอนซิสเทนซี","structural":"สตรักเชอรัล","dependence":"ดีเพนเดนซ์","dependency":"ดีเพนเดนซี","dictionary":"ดิกชันนารี","security":"ซีเคียวริตี","integrity":"อินเทกริตี","backup":"แบ็กอัป","recovery":"รีคัฟเวอรี","business":"บิซิเนส","constraint":"คอนสเตรนต์","abstraction":"แอบสแตรกชัน","hierarchical":"ไฮเออราร์คิคัล","relational":"รีเลชันนัล","object":"อ็อบเจ็กต์","oriented":"โอเรียนเต็ด","external":"เอ็กซ์เทอร์นัล","conceptual":"คอนเซ็ปชวล","internal":"อินเทอร์นัล","tuple":"ทูเพิล","domain":"โดเมน","functional":"ฟังก์ชันนัล","superkey":"ซูเปอร์คีย์","referential":"เรฟเฟอเรนเชียล","project":"โพรเจ็กต์","join":"จอยน์","associative":"อะโซซิเอทีฟ","identifier":"ไอเดนติไฟเออร์","existence":"เอ็กซิสเทนซ์","independence":"อินดิเพนเดนซ์","mandatory":"แมนดาทอรี","participation":"พาร์ทิซิเพชัน","identifying":"ไอเดนติไฟอิง","notation":"โนเทชัน","normalization":"นอร์มัลไลเซชัน","insertion":"อินเซอร์ชัน","deletion":"ดีลีชัน","anomaly":"อะนอมาลี","repeating":"รีพีติง","partial":"พาร์เชียล","determinant":"ดีเทอร์มิแนนต์","boyce":"บอยซ์","codd":"คอดด์","bcnf":"บีซีเอ็นเอฟ","surrogate":"เซอร์โรเกต","denormalization":"ดีนอร์มัลไลเซชัน","nonprime":"นอนไพรม์","atomicity":"อะตอมมิซิตี","consistency":"คอนซิสเทนซี","isolation":"ไอโซเลชัน","durability":"ดูราบิลิตี","uncommitted":"อันคอมมิตเต็ด","serializability":"ซีเรียลไลซะบิลิตี","exclusive":"เอ็กซ์คลูซีฟ","locking":"ล็อกกิง","rollback":"โรลแบ็ก","checkpoint":"เช็กพอยต์","warehouse":"แวร์เฮาส์","extraction":"เอ็กซ์แทรกชัน","filtering":"ฟิลเทอริง","integrated":"อินทิเกรเต็ด","variant":"แวเรียนต์","volatile":"วอละไทล์","olap":"โอแลป","dimension":"ไดเมนชัน","fact":"แฟ็กต์","slice":"สไลซ์","dice":"ไดซ์","schema":"สคีมา","rolap":"โรแลป","molap":"โมแลป","eulerian":"ออยเลอเรียน","communication":"คอมมิวนิเคชัน","isp":"ไอเอสพี","provider":"โพรไวเดอร์","transmission":"ทรานสมิชชัน","propagation":"พรอพาเกชัน","delay":"ดีเลย์","encapsulation":"เอนแคปซูเลชัน","twisted":"ทวิสเต็ด","fiber":"ไฟเบอร์","optic":"ออปติก","coaxial":"โคแอกเชียล","utp":"ยูทีพี","stp":"เอสทีพี","emi":"อีเอ็มไอ","rj":"อาร์เจ","connector":"คอนเน็กเตอร์","traceroute":"เทรซรูต","loopback":"ลูปแบ็ก","interoperability":"อินเทอรอปเปอร์อะบิลิตี","fcs":"เอฟซีเอส","distribution":"ดิสทริบิวชัน","containment":"คอนเทนเมนต์","architecture":"อาร์คิเทกเชอร์","hypertext":"ไฮเปอร์เท็กซ์","smtp":"เอสเอ็มทีพี","imap":"ไอแมป","pop3":"ป๊อปทรี","ftp":"เอฟทีพี","ssh":"เอสเอสเอช","p2p":"พีทูพี","cdn":"ซีดีเอ็น","multiplexing":"มัลติเพล็กซิง","demultiplexing":"ดีมัลติเพล็กซิง","connectionless":"คอนเน็กชันเลส","checksum":"เช็กซัม","congestion":"คอนเจสชัน","ack":"แอ็ก","acknowledgment":"แอกนอลเลจเมนต์","nak":"แน็ก","retransmission":"รีทรานสมิชชัน","pipelining":"ไพป์ไลนิง","handshake":"แฮนด์เชก","syn":"ซิน","rtt":"อาร์ทีที","rto":"อาร์ทีโอ","quic":"ควิก","aimd":"เอไอเอ็มดี","fabric":"แฟบริก","cidr":"ไซเดอร์","fragmentation":"แฟรกเมนเทชัน","sdn":"เอสดีเอ็น","subnetting":"ซับเน็ตติง","unicast":"ยูนิแคสต์","multicast":"มัลติแคสต์","arp":"เออาร์พี","framing":"เฟรมมิง","stuffing":"สตัฟฟิง","preamble":"พรีแอมเบิล","parity":"พาริตี","crc":"ซีอาร์ซี","remainder":"รีเมนเดอร์","csma":"ซีเอสเอ็มเอ","collision":"คอลลิชัน","aloha":"อะโลฮา","hardware":"ฮาร์ดแวร์","firmware":"เฟิร์มแวร์","peopleware":"พีเพิลแวร์","flowchart":"โฟลว์ชาร์ต","include":"อินคลูด","main":"เมน","printf":"พรินต์เอฟ","scanf":"สแกนเอฟ","sizeof":"ไซซ์ออฟ","associativity":"อะโซซิเอทิวิตี","initialization":"อินิชิอะไลเซชัน","traversal":"ทราเวอร์ซัล","prototype":"โพรโทไทป์","dereference":"ดีรีเฟอเรนซ์","kirchhoff":"เคียร์ชฮอฟฟ์","nodal":"โนดัล","supernode":"ซูเปอร์โหนด","kcl":"เคซีแอล","kvl":"เควีแอล","pwm":"พีดับเบิลยูเอ็ม","ldr":"แอลดีอาร์","ntc":"เอ็นทีซี","thermistor":"เทอร์มิสเตอร์","mcp9700":"เอ็มซีพีเก้าเจ็ดศูนย์ศูนย์","pulsein":"พัลส์อิน","i2c":"ไอทูซี","liquidcrystal":"ลิควิดคริสตัล","qos":"คิวโอเอส","retained":"รีเทนด์","stimuli":"สติมิวไล","modality":"โมดาลิตี","interactivity":"อินเทอร์แอ็กทิวิตี","quantization":"ควอนไทเซชัน","bitrate":"บิตเรต","bezier":"เบซิเยร์","affine":"อะไฟน์","gouraud":"กูโร","phong":"ฟอง","tweening":"ทวีนิง","unicode":"ยูนิโคด","utf":"ยูทีเอฟ","synthesis":"ซินธิซิส","waveform":"เวฟฟอร์ม","resonance":"เรโซแนนซ์","decibel":"เดซิเบล","amplitude":"แอมพลิจูด","gpu":"จีพียู"};
const ABC={a:'เอ',b:'บี',c:'ซี',d:'ดี',e:'อี',f:'เอฟ',g:'จี',h:'เอช',i:'ไอ',j:'เจ',k:'เค',l:'แอล',m:'เอ็ม',n:'เอ็น',o:'โอ',p:'พี',q:'คิว',r:'อาร์',s:'เอส',t:'ที',u:'ยู',v:'วี',w:'ดับเบิลยู',x:'เอ็กซ์',y:'วาย',z:'แซด'};
const THAI_DIGITS=['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า'];
export const normalizeTechnicalTerm=word=>String(word??'').normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
const fold=word=>normalizeTechnicalTerm(word).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const thai=word=>/[ก-๙]/.test(String(word));
function wordReadings(overrides){
 const words={...READINGS};
 // ใช้คำอ่านเดิมที่จับคู่ตามลำดับคำในศัพท์ได้ โดยไม่เดาความหมายเพิ่ม
 for(const [english,entry] of Object.entries(overrides)){
  const parts=english.match(/[a-z]+/g)||[],sounds=String(entry?.[0]||'').split(/\s+/).filter(Boolean);
  if(parts.length===sounds.length)parts.forEach((part,i)=>{if(!words[part]&&thai(sounds[i]))words[part]=sounds[i];});
 }
 return words;
}
function pronunciation(text,words){
 const pieces=String(text).normalize('NFKC').match(/[A-Za-z]+(?:\d+)?|\d+(?:\.\d+)*|[&#*+]/g)||[];
 let spelled=false;
 const result=pieces.map(part=>{
  const key=part.toLowerCase();
  if(words[key])return words[key];
  if(/^\d/.test(key))return [...key].map(c=>/\d/.test(c)?THAI_DIGITS[Number(c)]:(c==='.'?'จุด':c)).join(' ');
  if(part==='#')return 'แฮช';
  if(part==='&')return 'แอนด์';
  if(part==='*')return 'ดอกจัน';
  if(part==='+')return 'บวก';
  spelled=true;
  return [...key].map(c=>ABC[c]||c).join('-');
 });
 return {reading:result.join(' ').trim(),spelled};
}
export function buildTechnicalVocabulary(subjects,overrides={},labs=[]){
 const words=wordReadings(overrides),dictionary=new Map();
 const add=(term,meaning,example='',preferLesson=false)=>{
  const label=String(term||'').trim(),meaningText=String(meaning||'').trim(),key=normalizeTechnicalTerm(label);
  if(!/[a-z]/i.test(label)||!thai(meaningText)||label.length<=1)return;
  const old=dictionary.get(key);
  if(old){if(preferLesson&&meaningText)old.meaning=meaningText;if(!old.example&&example)old.example=String(example).trim();return;}
  const manual=Array.isArray(overrides[key])?String(overrides[key][0]||'').trim():'';
  const result=manual?{reading:manual,spelled:false}:pronunciation(label,words);
  dictionary.set(key,{label,reading:result.reading||label,meaning:meaningText,example:String(example||'').trim(),spelled:result.spelled});
 };
 for(const [term,entry] of Object.entries(overrides))if(Array.isArray(entry)&&entry[1])add(term,entry[1]);
 for(const subject of subjects||[])for(const chapter of subject.chapters||[]){
  for(const term of chapter.flashcards||[])add(term.term,term.meaning,term.example,true);
  for(const q of chapter.questions||[])for(const term of q.vocabulary||[])add(term.term,term.meaning,term.example,false);
  for(const sec of chapter.sections||[]){
   const tab=sec.table,header=String(tab?.headers?.[0]||'');
   if(!/ศัพท์|english term|technical term|term|เทคนิค|องค์ประกอบ/i.test(header))continue;
   for(const row of tab.rows||[])if(Array.isArray(row))add(row[0],row[1],row[2]);
  }
 }
 for(const lab of labs||[])for(const row of lab.terms||[])if(Array.isArray(row))add(row[0],row[1]);
 // รองรับชื่อที่พิมพ์ Bézier และ Bezier สลับกัน
 for(const [key,entry] of [...dictionary])if(fold(key)!==key&&!dictionary.has(fold(key)))dictionary.set(fold(key),entry);
 return dictionary;
}
export function matchTechnicalTerms(dictionary){
 const escape=s=>s.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&');
 const words=[...dictionary.keys()].sort((a,b)=>b.length-a.length);
 return words.length?new RegExp(words.map(w=>w.split(/\s+/).map(escape).join('\\s+')).join('|'),'gi'):null;
}
export function lookupTechnicalTerm(dictionary,term){
 return dictionary.get(normalizeTechnicalTerm(term))||dictionary.get(fold(term))||null;
}
