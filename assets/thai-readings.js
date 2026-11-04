import { subjects } from './content.js';
import { deepStudySteps } from './deep-study.js';
import { beginnerGuide } from './beginner-guides.js';
import { physicalLabs } from './physical-labs.js';
import { buildTechnicalVocabulary, matchTechnicalTerms, lookupTechnicalTerm } from './technical-vocabulary.js';
// แสดงคำอ่านและคำแปลเฉพาะศัพท์วิชาการ/ศัพท์เทคนิคในแต่ละวิชา ไม่แปลคำอังกฤษทั่วไป
// ไม่เปลี่ยนตัวข้อมูลคำถาม/คำตอบ จึงไม่กระทบคะแนนและเฉลย
const GLOSSARY = {"discrete mathematics":["ดิสครีต แมธเธอแมติกส์","คณิตศาสตร์ไม่ต่อเนื่อง"],"physical computing":["ฟิซิคัล คอมพิวติง","การประมวลผลเชิงกายภาพ"],"computer networks":["คอมพิวเตอร์ เน็ตเวิร์กส์","เครือข่ายคอมพิวเตอร์"],"network systems":["เน็ตเวิร์ก ซิสเท็มส์","ระบบเครือข่าย"],"database system concepts":["เดตาเบส ซิสเท็ม คอนเซปต์ส","แนวคิดระบบฐานข้อมูล"],"database":["เดตาเบส","ฐานข้อมูล"],"multimedia technology":["มัลติมีเดีย เทคโนโลยี","เทคโนโลยีสื่อประสม"],"data structures":["เดตา สตรักเชอร์ส","โครงสร้างข้อมูล"],"algorithms":["อัลกอริทึมส์","ขั้นตอนวิธี"],"number theory":["นัมเบอร์ เธียรี","ทฤษฎีจำนวน"],"greatest common divisor":["เกรเทสต์ คอมมอน ดิไวเซอร์","ตัวหารร่วมมาก"],"euclidean algorithm":["ยูคลิดเดียน อัลกอริทึม","ขั้นตอนวิธียูคลิด"],"euclidean division":["ยูคลิดเดียน ดิวิชัน","การหารแบบยูคลิด"],"modular congruence":["มอดิวลาร์ คองกรูเอินซ์","สมภาคเชิงมอดูลาร์"],"modulo operation":["มอดูโล โอเปอเรชัน","การหารเอาเศษ"],"modular inverse":["มอดิวลาร์ อินเวิร์ส","ตัวผกผันมอดูลาร์"],"linear congruence":["ลิเนียร์ คองกรูเอินซ์","สมการสมภาคเชิงเส้น"],"pairwise relatively prime":["แพร์ไวซ์ เรลละทิฟลี ไพรม์","จำนวนเฉพาะสัมพัทธ์กันทุกคู่"],"relatively prime":["เรลละทิฟลี ไพรม์","จำนวนเฉพาะสัมพัทธ์กัน"],"prime number":["ไพรม์ นัมเบอร์","จำนวนเฉพาะ"],"composite number":["คอมโพสิต นัมเบอร์","จำนวนประกอบ"],"divisibility":["ดิวิซิบิลิตี","การหารลงตัว"],"reflexive relation":["รีเฟล็กซิฟ รีเลชัน","ความสัมพันธ์สะท้อน"],"symmetric relation":["ซิมเมตริก รีเลชัน","ความสัมพันธ์สมมาตร"],"antisymmetric relation":["แอนทิซิมเมตริก รีเลชัน","ความสัมพันธ์ปฏิสมมาตร"],"transitive relation":["แทรนซิทิฟ รีเลชัน","ความสัมพันธ์ถ่ายทอด"],"equivalence relation":["อิควิวาเลนซ์ รีเลชัน","ความสัมพันธ์สมมูล"],"handshaking lemma":["แฮนด์เชกกิง เลมมา","บทตั้งการจับมือ"],"connected component":["คอนเน็กเต็ด คอมโพเนนต์","องค์ประกอบเชื่อมต่อ"],"connected graph":["คอนเน็กเต็ด กราฟ","กราฟเชื่อมต่อ"],"simple graph":["ซิมเพิล กราฟ","กราฟอย่างง่าย"],"directed multigraph":["ไดเร็กเต็ด มัลติกราฟ","กราฟหลายเส้นเชื่อมแบบมีทิศทาง"],"directed acyclic graph":["ไดเร็กเต็ด เอไซคลิก กราฟ","กราฟมีทิศทางที่ไม่มีวงจร"],"euler circuit":["ออยเลอร์ เซอร์กิต","วงรอบออยเลอร์"],"euler trail":["ออยเลอร์ เทรล","ทางเดินออยเลอร์"],"euler path":["ออยเลอร์ พาธ","เส้นทางออยเลอร์"],"hamilton circuit":["แฮมิลตัน เซอร์กิต","วงรอบแฮมิลตัน"],"hamilton path":["แฮมิลตัน พาธ","เส้นทางแฮมิลตัน"],"finite state automata":["ไฟไนต์ สเตต ออโตมาตา","ออโตมาตาสถานะจำกัด"],"minimum spanning tree":["มินิมัม สแปนนิง ทรี","ต้นไม้แผ่ทั่วน้อยที่สุด"],"cut vertex":["คัต เวอร์เท็กซ์","จุดยอดตัด"],"cut edge":["คัต เอดจ์","เส้นเชื่อมตัด"],"closed walk":["โคลสด์ วอล์ก","การเดินแบบปิด"],"simple path":["ซิมเพิล พาธ","เส้นทางอย่างง่าย"],"directed graph":["ไดเร็กเต็ด กราฟ","กราฟมีทิศทาง"],"undirected graph":["อันไดเร็กเต็ด กราฟ","กราฟไม่มีทิศทาง"],"linear congruential generator":["ลิเนียร์ คองกรูเอนเชียล เจเนอเรเตอร์","ตัวสร้างเลขสุ่มเชิงเส้น"],"handshaking":["แฮนด์เชกกิง","การจับมือ"],"information technology":["อินฟอร์เมชัน เทคโนโลยี","เทคโนโลยีสารสนเทศ"],"operating system":["โอเปอเรติง ซิสเท็ม","ระบบปฏิบัติการ"],"internet protocol":["อินเทอร์เน็ต โพรโทคอล","โพรโทคอลอินเทอร์เน็ต"],"transmission control protocol":["ทรานสมิชชัน คอนโทรล โพรโทคอล","โพรโทคอลควบคุมการส่งข้อมูล"],"user datagram protocol":["ยูสเซอร์ เดตาแกรม โพรโทคอล","โพรโทคอลดาตาแกรมผู้ใช้"],"domain name system":["โดเมน เนม ซิสเท็ม","ระบบชื่อโดเมน"],"local area network":["โลคัล แอเรีย เน็ตเวิร์ก","เครือข่ายเฉพาะที่"],"wide area network":["ไวด์ แอเรีย เน็ตเวิร์ก","เครือข่ายบริเวณกว้าง"],"media access control":["มีเดีย แอ็กเซส คอนโทรล","การควบคุมการเข้าถึงสื่อ"],"open systems interconnection":["โอเพน ซิสเท็มส์ อินเทอร์คอนเน็กชัน","แบบจำลองการเชื่อมต่อระบบเปิด"],"entity relationship diagram":["เอนทิตี รีเลชันชิป ไดอะแกรม","แผนภาพความสัมพันธ์ระหว่างเอนทิตี"],"primary key":["ไพรมารี คีย์","คีย์หลัก"],"foreign key":["ฟอริน คีย์","คีย์นอก"],"candidate key":["แคนดิเดต คีย์","คีย์ผู้สมัคร"],"composite key":["คอมโพสิต คีย์","คีย์ประกอบ"],"normalization":["นอร์มัลไลเซชัน","การทำให้เป็นบรรทัดฐาน"],"transaction":["ทรานแซกชัน","รายการธุรกรรม"],"concurrency control":["คอนเคอร์เรนซี คอนโทรล","การควบคุมการทำงานพร้อมกัน"],"deadlock":["เดดล็อก","ภาวะติดตาย"],"rollback":["โรลแบ็ก","ย้อนกลับธุรกรรม"],"commit":["คอมมิต","ยืนยันธุรกรรม"],"structured query language":["สตรักเชิร์ด คิวรี แลงกวิจ","ภาษาสอบถามข้อมูลเชิงโครงสร้าง"],"artificial intelligence":["อาร์ทิฟิเชียล อินเทลลิเจนซ์","ปัญญาประดิษฐ์"],"machine learning":["แมชชีน เลิร์นนิง","การเรียนรู้ของเครื่อง"],"computer graphics":["คอมพิวเตอร์ กราฟิกส์","คอมพิวเตอร์กราฟิก"],"vector graphics":["เวกเตอร์ กราฟิกส์","ภาพกราฟิกเวกเตอร์"],"bitmapped image":["บิตแมปต์ อิมเมจ","ภาพบิตแมป"],"bezier curve":["เบซิเยร์ เคิร์ฟ","เส้นโค้งเบซิเยร์"],"control points":["คอนโทรล พอยต์ส","จุดควบคุม"],"rasterization":["แรสเตอร์ไรเซชัน","การแปลงเป็นพิกเซล"],"rendering":["เรนเดอริง","การสร้างภาพ"],"reflection":["รีเฟล็กชัน","การสะท้อน"],"rotation":["โรเทชัน","การหมุน"],"translation":["ทรานสเลชัน","การเลื่อนตำแหน่ง"],"intersection":["อินเทอร์เซกชัน","ส่วนตัดกัน"],"union":["ยูเนียน","ส่วนรวม"],"difference":["ดิฟเฟอเรนซ์","ผลต่าง"],"surface normal":["เซอร์เฟซ นอร์มัล","เวกเตอร์ตั้งฉากพื้นผิว"],"perspective projection":["เพอร์สเปกทิฟ โพรเจกชัน","การฉายภาพแบบทัศนมิติ"],"polygon mesh":["พอลิกอน เมช","โครงข่ายรูปหลายเหลี่ยม"],"physical layer":["ฟิซิคัล เลเยอร์","ชั้นกายภาพ"],"data link layer":["เดตา ลิงก์ เลเยอร์","ชั้นเชื่อมโยงข้อมูล"],"network layer":["เน็ตเวิร์ก เลเยอร์","ชั้นเครือข่าย"],"transport layer":["ทรานสปอร์ต เลเยอร์","ชั้นขนส่ง"],"application layer":["แอปพลิเคชัน เลเยอร์","ชั้นประยุกต์"],"access point":["แอ็กเซส พอยต์","จุดเชื่อมต่อไร้สาย"],"packet switching":["แพ็กเก็ต สวิตชิง","การสลับส่งแพ็กเก็ต"],"routing table":["เราติง เทเบิล","ตารางกำหนดเส้นทาง"],"reflexive":["รีเฟล็กซิฟ","สะท้อน"],"antisymmetric":["แอนทิซิมเมตริก","ปฏิสมมาตร"],"symmetric":["ซิมเมตริก","สมมาตร"],"transitive":["แทรนซิทิฟ","ถ่ายทอด"],"congruent":["คองกรูเอินต์","สมภาค"],"congruence":["คองกรูเอินซ์","ความสมภาค"],"modulo":["มอดูโล","การหารเอาเศษ"],"mod":["มอด","เศษจากการหาร"],"gcd":["จีซีดี","ตัวหารร่วมมาก"],"lcm":["แอลซีเอ็ม","ตัวคูณร่วมน้อย"],"lcg":["แอลซีจี","ตัวสร้างเลขสุ่มเชิงเส้น"],"dfa":["ดีเอฟเอ","ออโตมาตาจำกัดเชิงกำหนด"],"fsm":["เอฟเอสเอ็ม","เครื่องจักรสถานะจำกัด"],"fsa":["เอฟเอสเอ","ออโตมาตาสถานะจำกัด"],"relations":["รีเลชันส์","ความสัมพันธ์"],"relation":["รีเลชัน","ความสัมพันธ์"],"vertices":["เวอร์ทิซีซ","จุดยอด"],"vertex":["เวอร์เท็กซ์","จุดยอด"],"edges":["เอดจิส","เส้นเชื่อม"],"edge":["เอดจ์","เส้นเชื่อม"],"degree":["ดีกรี","ระดับขั้น"],"graph":["กราฟ","แผนภาพกราฟ"],"graphs":["กราฟส์","กราฟหลายรูป"],"directed":["ไดเร็กเต็ด","มีทิศทาง"],"undirected":["อันไดเร็กเต็ด","ไม่มีทิศทาง"],"multigraph":["มัลติกราฟ","กราฟหลายเส้นเชื่อม"],"pseudograph":["ซูโดกราฟ","กราฟเทียม"],"tree":["ทรี","ต้นไม้"],"loop":["ลูป","เส้นวนกลับ"],"loops":["ลูปส์","เส้นวนกลับ"],"path":["พาธ","เส้นทาง"],"circuit":["เซอร์กิต","วงรอบ"],"cycle":["ไซเคิล","วงจร"],"bridge":["บริดจ์","สะพานกราฟ"],"connected":["คอนเน็กเต็ด","เชื่อมต่อกัน"],"disconnected":["ดิสคอนเน็กเต็ด","ไม่เชื่อมต่อ"],"component":["คอมโพเนนต์","ส่วนประกอบ"],"components":["คอมโพเนนต์ส","ส่วนประกอบ"],"matching":["แมตชิง","การจับคู่"],"euler":["ออยเลอร์","ชื่อออยเลอร์"],"hamilton":["แฮมิลตัน","ชื่อแฮมิลตัน"],"input":["อินพุต","ข้อมูลนำเข้า"],"output":["เอาต์พุต","ข้อมูลส่งออก"],"state":["สเตต","สถานะ"],"states":["สเตตส์","สถานะหลายสถานะ"],"bit":["บิต","หน่วยข้อมูลฐานสอง"],"bits":["บิตส์","หน่วยข้อมูลฐานสอง"],"strings":["สตริงส์","สายอักขระ"],"string":["สตริง","สายอักขระ"],"boolean":["บูลีน","ค่าตรรกะจริงหรือเท็จ"],"algorithm":["อัลกอริทึม","ขั้นตอนวิธี"],"recursive":["รีเคอร์ซิฟ","แบบเรียกซ้ำ"],"function":["ฟังก์ชัน","ฟังก์ชัน"],"array":["อาร์เรย์","ชุดข้อมูลอาร์เรย์"],"stack":["สแตก","กองซ้อน"],"queue":["คิว","แถวคอย"],"hashing":["แฮชชิง","การแฮช"],"sorting":["ซอร์ติง","การเรียงลำดับ"],"searching":["เสิร์ชชิง","การค้นหา"],"pixel":["พิกเซล","จุดภาพ"],"pixels":["พิกเซลส์","จุดภาพ"],"texture":["เท็กซ์เจอร์","พื้นผิว"],"camera":["แคเมอรา","กล้อง"],"shader":["เชเดอร์","ตัวคำนวณแสง"],"material":["มาเทียเรียล","วัสดุ"],"protocol":["โพรโทคอล","กติกาการสื่อสาร"],"packet":["แพ็กเก็ต","หน่วยข้อมูล"],"router":["เราเตอร์","อุปกรณ์กำหนดเส้นทาง"],"switch":["สวิตช์","อุปกรณ์สลับเครือข่าย"],"server":["เซิร์ฟเวอร์","เครื่องให้บริการ"],"client":["ไคลเอนต์","เครื่องลูกข่าย"],"subnet":["ซับเน็ต","เครือข่ายย่อย"],"mask":["แมสก์","หน้ากาก"],"gateway":["เกตเวย์","ประตูเชื่อมเครือข่าย"],"wireless":["ไวร์เลส","ไร้สาย"],"ethernet":["อีเทอร์เน็ต","เครือข่ายอีเทอร์เน็ต"],"bandwidth":["แบนด์วิดท์","ความกว้างแถบสัญญาณ"],"latency":["เลเทนซี","ความหน่วง"],"throughput":["ทรูพุต","อัตราส่งผ่านข้อมูล"],"sensor":["เซนเซอร์","ตัวตรวจจับ"],"sensors":["เซนเซอร์ส","ตัวตรวจจับ"],"temperature":["เทมเพอเรเชอร์","อุณหภูมิ"],"ultrasonic":["อัลตราโซนิก","คลื่นเหนือเสียง"],"potentiometer":["โพเทนชิโอมิเตอร์","ตัวต้านทานปรับค่าได้"],"resistor":["รีซิสเตอร์","ตัวต้านทาน"],"capacitor":["คะแพซิเตอร์","ตัวเก็บประจุ"],"microcontroller":["ไมโครคอนโทรลเลอร์","ตัวควบคุมขนาดเล็ก"],"arduino":["อาร์ดูอิโน","แพลตฟอร์มไมโครคอนโทรลเลอร์"],"mqtt":["เอ็มคิวทีที","โพรโทคอลรับส่งข้อความ"],"publish":["พับลิช","เผยแพร่ข้อมูล"],"subscribe":["ซับสไครบ์","สมัครรับข้อมูล"],"broker":["โบรเกอร์","ตัวกลางรับส่งข้อความ"],"analog":["แอนะล็อก","สัญญาณต่อเนื่อง"],"digital":["ดิจิทัล","สัญญาณดิจิทัล"],"voltage":["โวลเทจ","แรงดันไฟฟ้า"],"resistance":["รีซิสแทนซ์","ความต้านทาน"],"frequency":["ฟรีเควนซี","ความถี่"],"entity":["เอนทิตี","สิ่งที่สนใจเก็บข้อมูล"],"attribute":["แอตทริบิวต์","คุณลักษณะ"],"relationship":["รีเลชันชิป","ความสัมพันธ์"],"query":["คิวรี","คำสั่งสอบถาม"],"schema":["สคีมา","โครงสร้างฐานข้อมูล"],"index":["อินเด็กซ์","ดัชนี"],"join":["จอยน์","การเชื่อมตาราง"],"primary":["ไพรมารี","หลัก"],"foreign":["ฟอริน","ภายนอก"],"constraint":["คอนสเทรนต์","ข้อจำกัด"],"flashcard":["แฟลชการ์ด","บัตรคำ"],"solution":["โซลูชัน","วิธีแก้"]};

Object.assign(GLOSSARY,{
 "ipv4": [
  "ไอพี เวอร์ชัน โฟร์",
  "ที่อยู่ไอพีรุ่น 4 ความยาว 32 บิต"
 ],
 "ipv6": [
  "ไอพี เวอร์ชัน ซิกซ์",
  "ที่อยู่ไอพีรุ่น 6 ความยาว 128 บิต"
 ],
 "subnet mask": [
  "ซับเน็ต มาสก์",
  "ค่าที่แบ่งส่วนเครือข่ายกับส่วนโฮสต์ของที่อยู่ IPv4"
 ],
 "subnetting": [
  "ซับเน็ตติง",
  "การแบ่งเครือข่ายหนึ่งออกเป็นเครือข่ายย่อย"
 ],
 "cidr": [
  "ไซเดอร์",
  "การกำหนดจำนวนบิตส่วนเครือข่ายด้วย / ตามด้วยตัวเลข เช่น /24"
 ],
 "prefix length": [
  "พรีฟิกซ์ เลงธ์",
  "จำนวนบิตที่กำหนดเป็นส่วนเครือข่ายของ IP"
 ],
 "dhcp": [
  "ดีเอชซีพี",
  "ระบบแจกการตั้งค่า IP ให้อุปกรณ์โดยอัตโนมัติ"
 ],
 "dns": [
  "ดีเอ็นเอส",
  "ระบบค้นหาข้อมูลของชื่อโดเมน เช่น ที่อยู่ IP"
 ],
 "arp": [
  "เออาร์พี",
  "วิธีค้นหา MAC Address จาก IPv4 Address ภายในเครือข่ายเดียวกัน"
 ],
 "nat": [
  "แนต",
  "การแปลงที่อยู่ IP และอาจรวมถึงหมายเลขพอร์ต"
 ],
 "tcp": [
  "ทีซีพี",
  "โปรโตคอลขนส่งที่รับประกันการส่งข้อมูลครบถ้วนตามลำดับเมื่อเชื่อมต่อได้"
 ],
 "udp": [
  "ยูดีพี",
  "โปรโตคอลส่งดาตาแกรมที่ไม่รับประกันว่าจะส่งถึงหรือเรียงลำดับ"
 ],
 "icmp": [
  "ไอซีเอ็มพี",
  "โปรโตคอลข้อความควบคุมและรายงานข้อผิดพลาดเกี่ยวกับ IP"
 ],
 "http": [
  "เอชทีทีพี",
  "โปรโตคอลรับส่งข้อมูลเว็บ"
 ],
 "https": [
  "เอชทีทีพีเอส",
  "HTTP ที่เข้ารหัสด้วย TLS"
 ],
 "osi model": [
  "โอเอสไอ โมเดล",
  "แบบจำลองการสื่อสารเครือข่าย 7 ชั้น"
 ],
 "packet": [
  "แพ็กเก็ต",
  "หน่วยข้อมูลที่ส่งผ่านเครือข่าย"
 ],
 "datagram": [
  "ดาตาแกรม",
  "หน่วยข้อมูลที่แต่ละชุดถูกส่งไปได้โดยอิสระ"
 ],
 "forwarding": [
  "ฟอร์เวิร์ดดิง",
  "การส่งแพ็กเก็ตจากพอร์ตเข้าไปยังพอร์ตออกของเราเตอร์"
 ],
 "routing": [
  "รูตติง",
  "กระบวนการเลือกเส้นทางผ่านเครือข่ายไปยังปลายทาง"
 ],
 "data plane": [
  "เดตา เพลน",
  "ส่วนทำงานส่งต่อแพ็กเก็ตในอุปกรณ์เครือข่าย"
 ],
 "control plane": [
  "คอนโทรล เพลน",
  "ส่วนคำนวณเส้นทางและกำหนดตารางส่งต่อ"
 ],
 "dbms": [
  "ดีบีเอ็มเอส",
  "โปรแกรมบริหารจัดการฐานข้อมูล เช่น กำหนดสิทธิ์และสืบค้น"
 ],
 "entity": [
  "เอนทิตี",
  "สิ่งที่ระบบต้องจัดเก็บข้อมูล เช่น นักศึกษา"
 ],
 "attribute": [
  "แอตทริบิวต์",
  "คุณลักษณะของสิ่งที่เก็บข้อมูล เช่น รหัสนักศึกษา"
 ],
 "cardinality": [
  "คาร์ดินัลลิตี",
  "จำนวนความสัมพันธ์ระหว่างข้อมูลแต่ละฝั่ง"
 ],
 "acid": [
  "เอซิด",
  "คุณสมบัติธุรกรรมฐานข้อมูล 4 ด้าน: Atomicity, Consistency, Isolation, Durability"
 ],
 "sql": [
  "เอสคิวแอล",
  "ภาษาสำหรับสืบค้นและจัดการข้อมูลฐานข้อมูลเชิงสัมพันธ์"
 ],
 "pointer": [
  "พอยน์เตอร์",
  "ตัวแปรที่เก็บตำแหน่งหน่วยความจำของข้อมูล"
 ],
 "dereference": [
  "ดีรีเฟอเรนซ์",
  "การอ่านหรือแก้ไขค่าที่พอยน์เตอร์ชี้อยู่"
 ],
 "compiler": [
  "คอมไพเลอร์",
  "โปรแกรมแปลซอร์สโค้ดเป็นโค้ดสำหรับรัน"
 ],
 "debugger": [
  "ดีบักเกอร์",
  "เครื่องมือช่วยหยุดโปรแกรมและตรวจค่าตัวแปรเพื่อหาข้อผิดพลาด"
 ],
 "graph": [
  "กราฟ",
  "โครงสร้างที่ประกอบด้วยจุดยอดและเส้นเชื่อม"
 ],
 "vertex": [
  "เวอร์เท็กซ์",
  "จุดยอดของกราฟหรือรูปทรง"
 ],
 "edge": [
  "เอดจ์",
  "เส้นเชื่อมหรือขอบของรูปทรง"
 ],
 "gcd": [
  "จีซีดี",
  "ตัวหารร่วมมาก"
 ],
 "lcm": [
  "แอลซีเอ็ม",
  "ตัวคูณร่วมน้อย"
 ],
 "sampling rate": [
  "แซมปลิง เรต",
  "จำนวนครั้งที่สุ่มค่าจากสัญญาณในหนึ่งวินาที"
 ],
 "quantization": [
  "ควอนไทเซชัน",
  "การแปลงค่าสัญญาณให้เป็นระดับค่าดิจิทัลที่มีจำนวนจำกัด"
 ],
 "interpolation": [
  "อินเทอร์โพเลชัน",
  "การคำนวณค่าระหว่างจุดข้อมูลที่ทราบ"
 ],
 "key frame": [
  "คีย์เฟรม",
  "เฟรมกำหนดสถานะสำคัญของภาพเคลื่อนไหว"
 ]
});
const COURSE_EXAMPLES=new Map();
for(const subject of subjects)for(const chapter of subject.chapters||[])for(const card of chapter.flashcards||[]){
 const key=String(card.term||'').trim().toLowerCase().replace(/\s+/g,' ');
 if(key&&card.meaning&&!COURSE_EXAMPLES.has(key))COURSE_EXAMPLES.set(key,{meaning:card.meaning,example:card.example||''});
}
const DETAILS = {
 "reflexive":"ความสัมพันธ์ R บนเซต A เป็นแบบสะท้อน เมื่อสมาชิกทุกตัว a มีคู่ (a,a) อยู่ใน R",
 "symmetric":"ถ้า a สัมพันธ์กับ b แล้ว b ต้องสัมพันธ์กลับไปหา a ด้วย เช่น (a,b) และ (b,a)",
 "antisymmetric":"ถ้า aRb และ bRa เกิดขึ้นพร้อมกัน จะต้องมี a=b ไม่ได้หมายถึงไม่มีคู่ย้อนกลับทุกกรณี",
 "transitive":"ถ้า aRb และ bRc ต้องอนุมานได้ว่า aRc เช่น ความสัมพันธ์น้อยกว่าหรือเท่ากับ",
 "euclidean algorithm":"ใช้การหารเอาเศษซ้ำ ๆ เพื่อหาตัวหารร่วมมาก (GCD) จนเศษเป็นศูนย์",
 "modulo":"การหาค่าเศษเมื่อหารจำนวนเต็มด้วยตัวหารบวก เช่น 17 mod 5 = 2",
 "gcd":"จำนวนเต็มบวกมากที่สุดที่หารจำนวนที่กำหนดทั้งหมดลงตัว เช่น gcd(12,18)=6",
 "lcm":"จำนวนเต็มบวกน้อยที่สุดที่เป็นพหุคูณของจำนวนที่กำหนดทั้งหมด เช่น lcm(6,8)=24",
 "euler circuit":"เส้นทางเดินที่ผ่านทุกเส้นเชื่อมเพียงครั้งเดียวและกลับมาที่จุดเริ่มต้น",
 "euler path":"เส้นทางเดินที่ผ่านทุกเส้นเชื่อมเพียงครั้งเดียว โดยไม่จำเป็นต้องกลับจุดเริ่มต้น",
 "hamilton path":"เส้นทางที่ผ่านจุดยอดทุกจุดครั้งเดียว โดยไม่จำเป็นต้องกลับจุดเริ่มต้น",
 "cut vertex":"จุดยอดที่เมื่อลบจุดนั้นพร้อมเส้นที่ติดอยู่ จำนวนองค์ประกอบเชื่อมต่อจะเพิ่มขึ้น",
 "cut edge":"เส้นเชื่อมที่เมื่อลบออก จำนวนองค์ประกอบเชื่อมต่อของกราฟจะเพิ่มขึ้น",
 "primary key":"คอลัมน์หรือกลุ่มคอลัมน์ที่ใช้ระบุแต่ละแถวของตารางอย่างไม่ซ้ำและห้ามเป็น NULL",
 "foreign key":"คอลัมน์ที่ใช้อ้างอิงคีย์ของข้อมูลในอีกตาราง เพื่อรักษาความถูกต้องของความสัมพันธ์",
 "normalization":"กระบวนการจัดตารางฐานข้อมูลให้อยู่ในรูปแบบที่ลดความซ้ำซ้อนและปัญหาการแก้ไขข้อมูล",
 "bandwidth":"ความจุของช่องสื่อสารต่อหน่วยเวลา มักวัดเป็นบิตต่อวินาที (bps) ไม่เท่ากับความเร็วที่รับส่งได้จริงเสมอไป",
 "latency":"ระยะเวลาหน่วงของการส่งข้อมูลระหว่างต้นทางกับปลายทาง มักวัดเป็นมิลลิวินาที",
 "protocol":"ชุดกฎและรูปแบบข้อความที่อุปกรณ์ตกลงใช้ในการสื่อสารระหว่างกัน",
 "mqtt":"โพรโทคอลสื่อสารแบบ publish/subscribe ผ่านตัวกลางที่เรียกว่า broker นิยมใช้กับ IoT",
 "sensor":"อุปกรณ์ที่ตรวจวัดปริมาณทางกายภาพ เช่น อุณหภูมิ แสง หรือระยะทาง แล้วส่งค่าให้ระบบอ่าน",
 "rasterization":"กระบวนการแปลงรูปทรงหรือข้อมูลกราฟิกให้เป็นพิกเซลสำหรับแสดงบนหน้าจอ",
 "rendering":"กระบวนการคำนวณภาพจากโมเดล วัสดุ แสง และกล้อง เพื่อสร้างภาพที่แสดงผลได้"
};
const VOCABULARY=buildTechnicalVocabulary(subjects,GLOSSARY,physicalLabs);
const SUBJECT_VOCABULARY=new Map(subjects.map(s=>[s.id,buildTechnicalVocabulary([s],GLOSSARY,s.id==='physical-computing'?physicalLabs:[])]));
const rx=matchTechnicalTerms(VOCABULARY);
export function getStudyTerm(key,subjectId){
 const locationSubject=typeof location!=='undefined'?(location.hash.match(/\/subject\/([^/]+)/)||[])[1]:'';
 const specific=SUBJECT_VOCABULARY.get(subjectId||locationSubject);
 return (specific&&lookupTechnicalTerm(specific,key))||lookupTechnicalTerm(VOCABULARY,key);
}

const TERM_CONTEXTS=new Map();
const termKey=value=>String(value||'').normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
for(const subject of subjects)for(const chapter of subject.chapters||[])for(const section of chapter.sections||[]){
 const rows=section.table?.rows||[];
 for(const row of rows){
  if(!Array.isArray(row)||!row[0]||!/[a-z]/i.test(String(row[0])))continue;
  const term=termKey(row[0]),key=subject.id+'::'+term;
  const steps=deepStudySteps(section.title);
  // เลือกข้อความที่อธิบายศัพท์นี้จริงก่อน แล้วค่อยใช้ใจความรวมของหัวข้อ
  const short=term.split('(')[0].trim();
  const relevant=steps.find(step=>termKey(step).includes(term)||short.length>=4&&termKey(step).includes(short));
  const note=relevant||beginnerGuide(section.title)||steps[0]||section.intro||'';
  if(!TERM_CONTEXTS.has(key))TERM_CONTEXTS.set(key,{title:section.title,note});
 }
}
function termContext(term,subjectId){
 const subject=subjectId||(typeof location!=='undefined'?(location.hash.match(/\/subject\/([^/]+)/)||[])[1]:'');
 return TERM_CONTEXTS.get(subject+'::'+termKey(term))||null;
}
const excluded='script,style,code,pre,kbd,textarea,input,select,option,svg,math,[aria-hidden="true"],[data-no-translate],[data-study-term]';
function decorateText(node){
 const source=node.nodeValue;
 if(!rx||!source||!/[A-Za-z]/.test(source))return;
 // ไม่แทรกคำใน URL, ชื่อไฟล์, สมการ หรือ identifier
 if(/^\s*(?:https?:|[A-Za-z0-9_./:#?=&-]+)\s*$/.test(source)&&/[/:._=]/.test(source))return;
 rx.lastIndex=0;
 let match,last=0,fragment=null;
 while((match=rx.exec(source))){
  const start=match.index,end=start+match[0].length;
  const before=source[start-1]||'',after=source[end]||'';
  if(/[\w./:@#-]/.test(before)||/[\w./:@#-]/.test(after))continue;
  // ถ้ามีคำอ่าน/ความหมายวงเล็บอยู่แล้ว ไม่ต้องทำคำแปลซ้ำ
  if(/^\s*\([^)]*[ก-๙][^)]*\)/.test(source.slice(end)))continue;
  if(!fragment)fragment=document.createDocumentFragment();
  fragment.append(document.createTextNode(source.slice(last,start)));
  const span=document.createElement('span');
  span.className='study-term';
  span.dataset.studyTerm=match[0].toLowerCase().replace(/\s+/g,' ');
  // คำศัพท์ในลิงก์/ปุ่มใช้คีย์บอร์ดกับตัวควบคุมหลัก ไม่สร้างจุดโฟกัสซ้อน
  if(!node.parentElement.closest('a[href],button,label,summary,[role="link"]')){
   span.tabIndex=0;
   span.setAttribute('role','button');
  }
  span.setAttribute('aria-label',match[0]+' ดูคำอ่านและความหมาย');
  span.textContent=match[0];
  fragment.append(span);
  last=end;
 }
 if(fragment){
  fragment.append(document.createTextNode(source.slice(last)));
  node.replaceWith(fragment);
 }
}
function scan(root){
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
  acceptNode(n){
   return n.parentElement&&!n.parentElement.closest(excluded)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
  }
 });
 const nodes=[];
 while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(decorateText);
}
function installTooltip(root){
 const popup=document.createElement('aside');
 popup.className='study-term-tooltip';
 popup.id='study-term-tooltip';
 popup.setAttribute('role','tooltip');
 popup.hidden=true;
 popup.innerHTML='<div class="term-popup-header"><strong id="term-popup-name"></strong><button type="button" class="term-popup-close" aria-label="ปิดคำอธิบาย">×</button></div><p id="term-popup-pron"></p><div class="term-popup-section"><b>ความหมายและหน้าที่</b><p id="term-popup-meaning"></p></div><div class="term-popup-section" id="term-popup-explain-wrap"><b>ทำความเข้าใจเพิ่ม</b><p id="term-popup-detail"></p></div><div class="term-popup-section" id="term-popup-example-wrap"><b>ตัวอย่างการใช้งาน</b><p id="term-popup-example"></p></div>';
 document.body.append(popup);
 const title=popup.querySelector('#term-popup-name');
 const pron=popup.querySelector('#term-popup-pron');
 const meaning=popup.querySelector('#term-popup-meaning');
 const detail=popup.querySelector('#term-popup-detail');
 const exampleText=popup.querySelector('#term-popup-example');
 const explanationWrap=popup.querySelector('#term-popup-explain-wrap');
 const exampleWrap=popup.querySelector('#term-popup-example-wrap');
 let active=null, timer=null, sticky=false;
 const cancel=()=>{if(timer!==null){clearTimeout(timer);timer=null;}};
 function close(){
  cancel();if(active)active.removeAttribute('aria-describedby');
  active=null;sticky=false;popup.hidden=true;
 }
 function open(term,locked=false){
  if(!term||!term.isConnected)return;
  const key=term.dataset.studyTerm,entry=getStudyTerm(key);
  if(!entry)return;
  cancel();
  if(active&&active!==term)active.removeAttribute('aria-describedby');
  active=term;sticky=locked;
  title.textContent=term.textContent;
  pron.textContent=(entry.spelled?'คำอ่าน/การสะกดชื่อศัพท์: ':'คำอ่าน: ')+(entry.reading||entry.label);
  meaning.textContent='คำแปล/ความหมาย: '+entry.meaning;
  const info=COURSE_EXAMPLES.get(key);
  const context=termContext(key);
  const note=DETAILS[key]||context?.note||'';
  const explanation=note&&note.trim()!==entry.meaning.trim()?note:'';
  const example=entry.example||info?.example||'';
  detail.textContent=(context?.title?'ในหัวข้อ '+context.title+': ':'')+explanation;
  explanationWrap.hidden=!explanation;
  exampleText.textContent=example;
  exampleWrap.hidden=!example;
  term.setAttribute('aria-describedby',popup.id);
  popup.hidden=false;
  popup.style.left='0px';popup.style.top='0px';
  const rect=term.getBoundingClientRect();
  const bounds=popup.getBoundingClientRect();
  const left=Math.max(10,Math.min(rect.left,window.innerWidth-bounds.width-10));
  const top=rect.bottom+bounds.height+10>window.innerHeight&&rect.top>bounds.height+12
    ?rect.top-bounds.height-8:Math.min(rect.bottom+8,window.innerHeight-bounds.height-10);
  popup.style.left=left+'px';
  popup.style.top=Math.max(10,top)+'px';
 }
 root.addEventListener('pointerover',event=>{
  if(event.pointerType==='touch')return;
  const term=event.target.closest?.('[data-study-term]');
  if(!term||!root.contains(term))return;
  cancel();timer=setTimeout(()=>open(term),180);
 });
 root.addEventListener('pointerout',event=>{
  if(event.pointerType==='touch')return;
  const term=event.target.closest?.('[data-study-term]');
  if(!term)return;
  if(term.contains(event.relatedTarget))return;
  cancel();if(!sticky&&!popup.contains(event.relatedTarget))close();
 });
 let keyboardFocus=false,lastPointerType='mouse';
 document.addEventListener('keydown',event=>{if(event.key==='Tab')keyboardFocus=true;});
 root.addEventListener('pointerdown',event=>{keyboardFocus=false;lastPointerType=event.pointerType;});
 root.addEventListener('focusin',event=>{
  const term=event.target.closest?.('[data-study-term]');
  if(term&&keyboardFocus)open(term,true);
 });
 root.addEventListener('click',event=>{
  const term=event.target.closest?.('[data-study-term]');
  if(!term||!root.contains(term)){if(!popup.contains(event.target))close();return;}
  if(term.closest('a[href],button,label,summary,[role="link"]'))return;
  // เมาส์ใช้ชี้แล้วแสดง ไม่ให้คลิกแล้วปักหมุดค้าง; จอสัมผัสและปากกายังแตะเปิดได้
  if(lastPointerType!=='touch'&&lastPointerType!=='pen')return;
  event.preventDefault();
  event.stopPropagation();
  if(active===term&&sticky)close();else open(term,true);
 });
 root.addEventListener('keydown',event=>{
  if(event.key!=='Enter'&&event.key!==' ')return;
  const term=event.target.closest?.('[data-study-term]');
  if(!term)return;
  if(term.closest('a[href],button,label,summary,[role="link"]'))return;
  event.preventDefault();if(active===term&&sticky)close();else open(term,true);
 });
 document.addEventListener('pointerdown',event=>{
  if(!popup.hidden&&!popup.contains(event.target)&&!event.target.closest?.('[data-study-term]'))close();
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
 window.addEventListener('scroll',()=>{if(!popup.hidden)close();},{passive:true});
 window.addEventListener('resize',close);
 popup.querySelector('.term-popup-close').addEventListener('click',close);
 popup.addEventListener('pointerleave',()=>{if(!sticky)close();});
}
export function installThaiReadings(){
 const root=document.querySelector('#main');
 if(!root)return;
 scan(root);
 installTooltip(root);
 const observer=new MutationObserver(records=>{
  const added=new Set();
  for(const record of records)for(const node of record.addedNodes){
   if(node.nodeType===Node.TEXT_NODE||node.nodeType===Node.ELEMENT_NODE)added.add(node);
  }
  if(!added.size)return;
  observer.disconnect();
  try{
   for(const node of added){
    if(!node.isConnected||!root.contains(node))continue;
    if(node.nodeType===Node.TEXT_NODE){
     if(node.parentElement&&!node.parentElement.closest(excluded))decorateText(node);
    }else if(!node.matches(excluded))scan(node);
   }
  }finally{observer.observe(root,{childList:true,subtree:true});}
 });
 observer.observe(root,{childList:true,subtree:true});
}
