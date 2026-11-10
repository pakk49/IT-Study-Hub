// ข้อสอบรวมของวิชาต่าง ๆ และแนวสอบ PHYCOM ที่จัดตามประกาศ
export const EXAM_SIZE = 60;
const PHYSICAL_ARDUINO_SIZE = 45;
const QUOTAS = new Map([[6,9],[7,9],[8,9],[9,9],[10,8],[11,8],[12,8]]);
function balanceQuestions(c,count) {
  const groups=new Map();
  for(const q of c.questions){if(!groups.has(q.topic))groups.set(q.topic,[]);groups.get(q.topic).push(q);}
  const lists=[...groups.values()];
  const out=[];
  while(out.length<count && lists.some(x=>x.length))for(const group of lists)if(group.length && out.length<count)out.push(group.shift());
  return out;
}
const extraArduinoQuestions=[
  ["p12-setup","Arduino เริ่มทำงานแล้วต้องกำหนดโหมดขาเพียงครั้งเดียว ก่อนเข้าสู่การทำงานซ้ำ ควรเขียนคำสั่งไว้ที่ใด?",["setup()","loop()","main()","analogRead()"],0,"setup() ทำงานหนึ่งครั้งตอนเริ่มโปรแกรม จึงเหมาะกับการตั้งค่าเริ่มต้น"],
  ["p12-serial","ต้องการเริ่มสื่อสารกับคอมพิวเตอร์ที่ความเร็ว 9600 baud ควรใช้คำสั่งใด?",["Serial.begin(9600)","Serial.print(9600)","pinMode(9600, OUTPUT)","digitalWrite(9600, HIGH)"],0,"Serial.begin(9600) เปิด Serial communication ด้วยความเร็วที่ระบุ"],
  ["p12-input","ต่อปุ่มกดระหว่างขาดิจิทัลกับ GND และต้องการใช้ตัวต้านทาน Pull-up ภายในบอร์ด ควรกำหนดโหมดใด?",["INPUT_PULLUP","OUTPUT","INPUT_ANALOG","PWM"],0,"INPUT_PULLUP เปิดตัวต้านทาน Pull-up ภายใน ทำให้สถานะปกติเป็น HIGH และเมื่อกดลง GND จะเป็น LOW"],
  ["p12-output","ต้องการให้ LED ที่ต่อกับขาดิจิทัลทำงานเป็นเอาต์พุต ก่อนสั่งเปิดไฟควรใช้คำสั่งใด?",["pinMode(ledPin, OUTPUT)","digitalRead(ledPin)","analogRead(ledPin)","Serial.begin(ledPin)"],0,"pinMode(..., OUTPUT) กำหนดให้ขาทำหน้าที่ส่งสัญญาณออก"],
  ["p12-digital","ถ้าต้องการสั่งให้ขาดิจิทัลที่ตั้งเป็น OUTPUT ส่งสถานะ LOW ควรใช้คำสั่งใด?",["digitalWrite(pin, LOW)","digitalRead(pin, LOW)","analogRead(pin, LOW)","pinMode(pin, LOW)"],0,"digitalWrite() ใช้ส่ง HIGH หรือ LOW ออกทางขาดิจิทัล"],
  ["p12-loop","ต้องการอ่านปุ่มและอัปเดต LED ซ้ำตลอดระหว่างที่บอร์ดเปิดอยู่ ควรวางโค้ดไว้ที่ใด?",["loop()","setup()","struct","#include"],0,"loop() ถูกเรียกซ้ำไปเรื่อย ๆ หลังจาก setup() ทำงานเสร็จ"],
  ["p12-analog","เซนเซอร์ส่งแรงดันที่เปลี่ยนตามค่าที่วัด และต่อเข้าขา Analog Input ควรอ่านค่าด้วยคำสั่งใด?",["analogRead(pin)","digitalWrite(pin, HIGH)","pinMode(pin, OUTPUT)","Serial.begin(pin)"],0,"analogRead() ใช้อ่านค่าจากขา Analog Input"],
  ["p12-pwm","การปรับความสว่าง LED ด้วย analogWrite() บนขาที่รองรับ โดยทั่วไปอาศัยสัญญาณชนิดใด?",["PWM","I2C","UART","KCL"],0,"analogWrite() สร้างสัญญาณ PWM เพื่อปรับ Duty Cycle และกำลังเฉลี่ย"],
  ["p14-ntc","เมื่ออุณหภูมิสูงขึ้น ความต้านทานของ NTC Thermistor มีแนวโน้มเปลี่ยนอย่างไร?",["ลดลง","เพิ่มขึ้น","คงที่เสมอ","กลายเป็นศูนย์ทันที"],0,"NTC มีความต้านทานลดลงเมื่ออุณหภูมิสูงขึ้น"],
  ["p14-ldr","ต้องการให้ Arduino วัดความสว่างด้วย LDR ซึ่งเป็นอุปกรณ์เปลี่ยนความต้านทาน ควรต่อร่วมกับอะไรเพื่อให้วัดแรงดันได้?",["ตัวต้านทานเป็นวงจรแบ่งแรงดัน","แหล่งกระแสอย่างเดียว","ขา PWM โดยตรง","ขา Echo ของ HC-SR04"],0,"วงจรแบ่งแรงดันแปลงการเปลี่ยนความต้านทานให้เป็นแรงดันที่ Analog Input อ่านได้"],
  ["p14-ultrasonic","HC-SR04 วัดระยะจากเวลาที่คลื่นเสียงเดินทางไปและสะท้อนกลับ สูตรระยะทางจึงต้องทำอย่างไรกับระยะที่เสียงเดินทางรวม?",["หารสอง","คูณสอง","บวก 10","ลบความถี่เสียง"],0,"เวลาที่วัดได้ครอบคลุมทั้งขาไปและขากลับ จึงหารสองเพื่อหาระยะทางขาเดียว"],
  ["p14-pulse","ต้องการวัดช่วงเวลาที่ขา Echo เป็น HIGH ในไมโครวินาที ควรใช้ฟังก์ชันใด?",["pulseIn(echoPin, HIGH)","digitalWrite(echoPin, HIGH)","analogWrite(echoPin, 1)","pinMode(echoPin, HIGH)"],0,"pulseIn() วัดระยะเวลาของพัลส์ HIGH หรือ LOW"],
  ["p14-i2c","จอ LCD ที่ต่อผ่าน I2C ใช้สายสัญญาณหลักใดในการสื่อสาร?",["SDA และ SCL","TX และ RX เท่านั้น","MISO และ MOSI เท่านั้น","TRIG และ ECHO"],0,"I2C ใช้ SDA สำหรับข้อมูล และ SCL สำหรับสัญญาณนาฬิกา"],
  ["p15-publish","บอร์ด Arduino ส่งค่าอุณหภูมิไปยัง MQTT Broker ตาม Topic บอร์ดทำหน้าที่ใด?",["Publisher","Subscriber","Ground","Resistor"],0,"Publisher คือผู้ส่งข้อความไปยัง Broker ใน Topic ที่กำหนด"],
  ["p15-retain","เว็บเพิ่งสมัครรับ Topic และต้องการเห็นสถานะล่าสุดที่ Broker เก็บไว้ทันที ควรใช้คุณสมบัติใด?",["Retained Message","PWM","Pointer Arithmetic","INPUT_PULLUP"],0,"Retained Message เก็บข้อความล่าสุดของ Topic และส่งให้ Subscriber ใหม่ทันที"]
];
function makeExtraArduinoQuestions(chapters){
  const byNo=new Map(chapters.map(c=>[c.number,c]));
  const chapterFor=id=>id.startsWith("p15")?15:(id.startsWith("p14")?14:12);
  return extraArduinoQuestions.map(([id,prompt,options,answer,reason])=>{
    const chapterNo=chapterFor(id),chapter=byNo.get(chapterNo);
    return {id,topic:chapter.sections[0].id,level:"ทฤษฎี Arduino",prompt,options,answer,
      reasons:options.map((_,i)=>i===answer?"ถูกต้อง: "+reason:"ยังไม่ใช่: ตัวเลือกนี้ไม่ใช่หลักการที่โจทย์ถาม — "+reason),
      vocabulary:[],chapterId:chapter.id,chapterNo,chapterTitle:chapter.title,sectionTitle:"ทฤษฎี Arduino"};
  });
}
export function buildExamBank(subject,period) {
  const chapters=(subject.chapters||[]).filter(c=>(c.exam||'final')===period).slice().sort((a,b)=>a.number-b.number);
  if(subject.id==='physical-computing'&&period==='final'){
    const arduinoChapters=chapters.filter(c=>[12,14,15].includes(c.number));
    const questions=arduinoChapters.flatMap(c=>c.questions.map(q=>({...q,chapterId:c.id,chapterNo:c.number,chapterTitle:c.title,sectionTitle:c.sections.find(s=>s.id===q.topic)?.title||'Arduino'}))).concat(makeExtraArduinoQuestions(arduinoChapters));
    const ready=arduinoChapters.length===3&&questions.length===PHYSICAL_ARDUINO_SIZE&&new Set(questions.map(q=>q.id)).size===PHYSICAL_ARDUINO_SIZE;
    return {ready,total:PHYSICAL_ARDUINO_SIZE,questions,chapters:arduinoChapters};
  }
  const multimediaFinal=subject.id==='multimedia-technology' && period==='final';
  const want=multimediaFinal?chapters.map(c=>QUOTAS.get(c.number)||0):chapters.map(()=>0);
  if(!multimediaFinal){
    let remaining=EXAM_SIZE;
    while(remaining){let took=false;for(let i=0;i<chapters.length&&remaining;i++)if(want[i]<(chapters[i].questions||[]).length){want[i]++;remaining--;took=true;}if(!took)break;}
  }
  const total=want.reduce((a,b)=>a+b,0);
  const valid=total===EXAM_SIZE && (!multimediaFinal||chapters.length===7) && chapters.every((c,i)=>c.questions?.length>=want[i]);
  if(!valid)return {ready:false,total:EXAM_SIZE,questions:[],chapters};
  const questions=chapters.flatMap((c,i)=>balanceQuestions(c,want[i]).map(q=>({...q,id:c.id+'::'+q.id,chapterId:c.id,chapterNo:c.number,chapterTitle:c.title,sectionTitle:c.sections.find(s=>s.id===q.topic)?.title||'ทบทวน'})));
  if(questions.length!==EXAM_SIZE||new Set(questions.map(q=>q.id)).size!==EXAM_SIZE)throw Error('ข้อสอบรวมไม่ครบ 60 ข้อหรือมี ID ซ้ำ');
  return {ready:true,total:EXAM_SIZE,questions,chapters};
}
