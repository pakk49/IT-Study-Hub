// Hints are assembled exclusively from the uploaded slide summaries stored for a chapter.
// No external facts, web lookups or answer keys are used to generate a hint.
import { cleanStudyProse } from './summary-format.js';
const HINT_METHODS=[["gcd|euclid|ตัวหารร่วมมาก|หารเอาเศษ","เขียนการหารแบบ a = bq + r แล้วนำ b กับ r ไปหารต่อจนเศษเป็นศูนย์ จากนั้นดูค่าตัวหารรอบสุดท้าย"],["lcm|ตัวคูณร่วมน้อย","ลองแยกตัวประกอบเป็นจำนวนเฉพาะก่อน แล้วหาจำนวนที่เป็นพหุคูณของทุกตัว"],["modulo|สมภาค|เศษเมื่อหาร|หารด้วย","เขียนจำนวนในรูป ตัวหาร × ผลหาร + เศษ โดยตรวจว่าเศษอยู่ระหว่าง 0 ถึงตัวหารลบหนึ่ง"],["pairwise|relatively prime|เฉพาะสัมพัทธ์","คำว่า “ทุกคู่” หมายถึงต้องตรวจแต่ละคู่ ไม่ใช่ดูแค่ตัวหารร่วมของตัวเลขทั้งชุด"],["euler|ออยเลอร์","ดูว่าโจทย์ต้องการผ่านทุกเส้นเชื่อมหรือไม่ แล้วตรวจว่าต้องกลับจุดเริ่มต้นด้วยหรือเปล่า"],["hamilton|แฮมิลตัน","สังเกตว่าต้องผ่านทุกจุดยอดเพียงครั้งเดียวหรือไม่ และต้องกลับจุดเริ่มต้นด้วยหรือเปล่า"],["reflexive|symmetric|antisymmetric|transitive|สมมาตร|สะท้อน|ถ่ายทอด","ตรวจคู่ลำดับทีละเงื่อนไข ได้แก่ สัมพันธ์กับตัวเอง คู่ย้อนกลับ และความสัมพันธ์ผ่านตัวกลาง"],["vertex|edge|กราฟ|graph|degree|ดีกรี","ลองวาดจุดยอดกับเส้นเชื่อมให้ครบก่อนนับ อย่าสับสนจำนวนจุดกับจำนวนเส้น"],["subnet|cidr|prefix|ipv4|ซับเน็ต","เริ่มจาก IPv4 มี 32 บิต แยกส่วนเครือข่ายกับส่วนโฮสต์ แล้วค่อยคำนวณช่วงที่อยู่"],["tcp|udp|handshake|ขนส่งข้อมูล","สังเกตว่าต้องการความน่าเชื่อถือ การเรียงลำดับ หรือการส่งที่มีขั้นตอนน้อย"],["forwarding|routing|router|data plane|control plane","แยกงานส่งต่อข้อมูลภายในเราเตอร์หนึ่งเครื่อง ออกจากงานเลือกเส้นทางผ่านหลายเครือข่าย"],["normalization|functional dependency|1nf|2nf|3nf|คีย์","หาคีย์ของตารางก่อน แล้วดูว่าข้อมูลแต่ละฟิลด์ขึ้นต่อกันอย่างไรและมีความซ้ำซ้อนหรือไม่"],["er diagram|entity|relationship|cardinality","ขีดเส้นใต้สิ่งที่ต้องเก็บข้อมูลเป็นเอนทิตี แยกคุณลักษณะและจำนวนความสัมพันธ์แต่ละฝั่ง"],["transaction|acid|rollback|commit|deadlock","ลองสมมติว่าการทำงานผิดพลาดกลางทาง แล้วตรวจว่าระบบต้องย้อนคืนหรือรักษาข้อมูลด้านใด"],["pointer|address|dereference|scanf","แยกค่าของตัวแปรกับตำแหน่งหน่วยความจำให้ชัด แล้วพิจารณาบทบาทของ & และ *"],["sensor|analog|adc|voltage|temperature|อุณหภูมิ|แรงดัน","ดูว่าเซนเซอร์อ่านค่าอะไรโดยตรง เช่น แรงดันหรือความต้านทาน แล้วค่อยใช้สูตรแปลงหน่วย"],["sampling|quantization|sample rate|bit depth","แยกจำนวนตัวอย่างต่อวินาทีออกจากจำนวนระดับค่าที่แทนได้ในแต่ละตัวอย่าง"],["interpolation|key frame|tweening|animation","หาค่าเริ่มต้น ค่าสุดท้าย และค่าระหว่างกลาง แล้วแยกเฟรมหลักออกจากเฟรมที่คำนวณเพิ่ม"],["shading|reflection|normal|polygon","สังเกตว่าแสงคำนวณหนึ่งค่าต่อผิว ต่อจุดยอด หรือทุกพิกเซล"]];
const norm = value => String(value ?? '').toLocaleLowerCase().trim();
export function slideHint(question, chapter) {
  const section=chapter?.sections?.find(s=>s.id===question?.topic);
  if(!section) return null;
  const answer=norm(question?.options?.[question?.answer]);
  // Do not reveal the correct multiple-choice option in the hint.
  const intro=cleanStudyProse(section.intro);
  const safeIntro=intro && !(answer.length>2 && norm(intro).includes(answer))
    ? intro
    : 'เปรียบเทียบเงื่อนไขในโจทย์กับหลักการและตัวอย่างของหัวข้อนี้ แล้วตัดตัวเลือกที่ทำหน้าที่ต่างกันออก';
  const wantsNumbers=/คำนวณ|ค่าเท่าไร|จำนวน|บิต|bits|\d+\s*(?:ms|Mbps|kbps|bytes|bit|host)|\/\d{1,2}/i.test(question.prompt||'');
  const related=String(question.prompt||'')+' '+String(section.title||'');
  const found=HINT_METHODS.find(([pattern])=>new RegExp(pattern,'i').test(related));
  const defaultTip=wantsNumbers
    ? 'จดตัวเลขและหน่วยที่โจทย์ให้ เขียนสูตรก่อนแทนค่า แล้วตรวจผลลัพธ์กับเงื่อนไข'
    : 'ลองเล่าโจทย์ด้วยภาษาตัวเอง แล้วเทียบความหมายและตัวอย่างของแต่ละตัวเลือก';
  const suggested=found?.[1]||defaultTip;
  const technique=answer.length>2&&norm(suggested).includes(answer)?defaultTip:suggested;
  return {heading:'คำใบ้ · '+section.title,summary:safeIntro,tip:technique,source:chapter.source||('บท '+chapter.number+' · '+chapter.title)};
}
export function slideHintHtml(question,chapter,escape) {
  const h=slideHint(question,chapter);
  if(!h)return '<div class="slide-hint" role="note">ลองอ่านความหมายและตัวอย่างในหน้าสรุปก่อน แล้วกลับมาเทียบกับโจทย์</div>';
  return '<div class="slide-hint" role="note"><strong>'+escape(h.heading)+'</strong><p>'+escape(h.summary)+'</p><p>'+escape(h.tip)+'</p><small>อ้างอิง: '+escape(h.source)+'</small></div>';
}
