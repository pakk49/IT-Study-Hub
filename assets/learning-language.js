// Shared plain-language definitions keep summaries, flashcards and explanations consistent.
export const termMeanings = {
  "Data": "ข้อเท็จจริงที่เก็บมา เช่น คะแนนแต่ละคน ซึ่งยังไม่ได้นำมาสรุปเพื่อตอบคำถาม",
  "Information": "ข้อมูลที่นำมาจัดหรือประมวลผลจนใช้ตอบคำถามได้ เช่น ค่าเฉลี่ยคะแนนของห้อง",
  "Database": "แหล่งเก็บข้อมูลที่เกี่ยวข้องกันอย่างมีโครงสร้าง เพื่อให้ค้นหาและนำมาใช้ร่วมกันได้",
  "DBMS": "โปรแกรมที่ใช้สร้าง อ่าน แก้ไข และควบคุมการใช้ฐานข้อมูล",
  "Data Dependence": "การที่โปรแกรมผูกกับวิธีจัดเก็บข้อมูล จนเมื่อโครงสร้างจัดเก็บเปลี่ยน โปรแกรมอาจต้องเปลี่ยนตาม",
  "Data Integrity": "ความถูกต้องของข้อมูลตามกฎที่กำหนด เช่น รหัสต้องไม่ซ้ำและค่าต้องอยู่ในช่วงที่อนุญาต",
  "Candidate Key": "ชุดคอลัมน์ที่ระบุแถวได้ไม่ซ้ำ และถ้าตัดคอลัมน์ใดออกจะไม่รับประกันความไม่ซ้ำอีก",
  "Superkey": "คอลัมน์หรือชุดคอลัมน์ที่ใช้ระบุแต่ละแถวได้ไม่ซ้ำ โดยอาจมีคอลัมน์เกินความจำเป็น",
  "Composite Key": "คีย์ที่ต้องใช้ตั้งแต่สองคอลัมน์ร่วมกัน เช่น รหัสนักศึกษากับรหัสวิชา",
  "Entity Integrity": "กฎที่กำหนดให้ Primary Key ทุกส่วนต้องมีค่า ไม่เป็น NULL",
  "Referential Integrity": "กฎให้ Foreign Key ที่มีค่าอ้างถึงรายการที่มีอยู่จริงในตารางเป้าหมาย ส่วน NULL อนุญาตได้ตามข้อกำหนด",
  "Domain": "กลุ่มค่าที่อนุญาตให้คอลัมน์หนึ่งเก็บได้ เช่น คะแนนเป็นจำนวนตั้งแต่ 0 ถึง 100",
  "Determinant": "คอลัมน์หรือชุดคอลัมน์ฝั่งซ้ายของความขึ้นต่อกัน เช่น A ใน A → B ซึ่งค่า A กำหนดค่า B",
  "Functional Dependency": "ความสัมพันธ์ที่เมื่อรู้ค่าของคอลัมน์ชุดหนึ่งแล้ว จะระบุค่าอีกชุดหนึ่งได้แน่นอน เขียนเป็น A → B",
  "Partial Dependency": "การที่คอลัมน์ซึ่งไม่เป็นส่วนของคีย์ ขึ้นกับเพียงบางส่วนของคีย์ผู้สมัครแบบผสม",
  "Transitive Dependency": "การขึ้นต่อกันผ่านคอลัมน์อีกชุด เช่น A กำหนด B และ B กำหนด C จึงทำให้ A กำหนด C ผ่าน B",
  "Third Normal Form (3NF)": "รูปแบบที่ทุกความขึ้นต่อกัน X → A ที่ไม่เป็นเรื่องเดิมซ้ำตัวเอง ต้องมี X เป็น Superkey หรือ A เป็นส่วนหนึ่งของ Candidate Key; กรณีพื้นฐานมักแก้ด้วยการแยกข้อมูลที่ขึ้นต่อกันแบบส่งต่อ",
  "Boyce-Codd Normal Form (BCNF)": "รูปแบบที่ฝั่งกำหนดของทุก Functional Dependency ที่ไม่เป็นเรื่องเดิมซ้ำตัวเองต้องเป็น Superkey จึงเข้มงวดกว่า 3NF",
  "Fourth Normal Form (4NF)": "รูปแบบที่ฝั่งกำหนดของทุก Multivalued Dependency ที่ไม่เป็นเรื่องเดิมซ้ำตัวเองต้องเป็น Superkey ช่วยลดการรวมข้อมูลหลายค่าที่เป็นอิสระจากกัน",
  "Atomicity": "ทำธุรกรรมให้ครบทั้งชุด หรือย้อนกลับทั้งชุดเมื่อทำไม่สำเร็จ เพื่อไม่ให้ข้อมูลค้างอยู่ครึ่งทาง",
  "Consistency": "ธุรกรรมต้องเปลี่ยนข้อมูลจากสถานะที่ทำตามกฎ ไปสู่สถานะที่ยังทำตามกฎของฐานข้อมูล",
  "Isolation": "ควบคุมการทำงานพร้อมกันของธุรกรรมไม่ให้รบกวนกันเกินกว่าระดับการแยกที่ระบบกำหนด",
  "Durability": "เมื่อยืนยันธุรกรรมแล้ว ผลการเปลี่ยนแปลงต้องคงอยู่แม้ระบบเกิดความขัดข้องตามการรับประกันของระบบ",
  "Dimension": "มุมที่ใช้แบ่งดูข้อมูล เช่น เวลา สินค้า หรือสาขา เพื่อเปรียบเทียบค่าที่วัด",
  "Fact": "ข้อมูลเหตุการณ์หรือค่าที่นำมาวัด เช่น จำนวนขายหรือยอดขาย ซึ่งเชื่อมกับมิติที่ใช้อธิบาย",
  "Non-volatile": "ข้อมูลในคลังไม่ถูกแก้ไปมาตลอดแบบงานธุรกรรม แต่เน้นเก็บเพื่ออ่านและเพิ่มข้อมูลตามกระบวนการที่กำหนด",
  "Modulo Operation": "การหาเศษจากการหารด้วยจำนวนเต็มบวก n โดยเลือกเศษ r ที่อยู่ในช่วง 0 ≤ r < n",
  "Modular Congruence": "ความสัมพันธ์ของจำนวนที่ให้เศษเท่ากันเมื่อหารด้วย n เขียน a ≡ b (mod n) หรือ n หาร a−b ลงตัว",
  "Modular Inverse": "จำนวน x ที่ทำให้ ax ≡ 1 (mod n) จะมีได้เมื่อ a กับ n มี ห.ร.ม. เท่ากับ 1",
  "Relatively Prime": "จำนวนสองจำนวนที่มีตัวหารบวกร่วมกันเพียง 1 หรือก็คือ gcd เท่ากับ 1",
  "Euclidean Algorithm": "วิธีหา ห.ร.ม. โดยหารเอาเศษซ้ำ ใช้ตัวหารครั้งสุดท้ายก่อนเศษเป็นศูนย์เป็นคำตอบ",
  "Reflexive Relation": "ความสัมพันธ์ที่ทุกสมาชิกสัมพันธ์กับตัวเอง ต้องมีคู่ (x,x) ครบทุก x ในเซต",
  "Symmetric Relation": "ความสัมพันธ์ที่มีคู่ย้อนกลับครบ หากมี (a,b) ต้องมี (b,a) ด้วย",
  "Antisymmetric Relation": "ความสัมพันธ์ที่ห้ามมีคู่ไปกลับระหว่างสมาชิกต่างกัน ถ้ามีทั้ง (a,b) และ (b,a) ต้องเป็น a=b",
  "Transitive Relation": "ความสัมพันธ์ที่เชื่อมต่อข้ามขั้นได้ หากมี (a,b) และ (b,c) ต้องมี (a,c) ด้วย",
  "Equivalence Relation": "ความสัมพันธ์ที่เป็น Reflexive, Symmetric และ Transitive ครบทั้งสามข้อพร้อมกัน",
  "Path": "ลำดับจุดยอดที่เดินตามขอบได้ครบ ในที่นี้ใช้คำว่าเส้นทางในความหมายการเดิน ส่วนเงื่อนไขไม่ซ้ำให้ตรวจนิยามที่โจทย์ระบุ",
  "Protocol": "กติกาที่ระบบใช้สื่อสาร เช่น รูปแบบข้อความ ลำดับการส่ง และวิธีตอบกลับ",
  "Control Plane": "ส่วนที่กำหนดหรือคำนวณเส้นทางและข้อมูลในตาราง เพื่อให้งานส่งต่อข้อมูลนำไปใช้",
  "Data Plane": "ส่วนที่ใช้ตารางส่งต่อ เลือกพอร์ตขาออกให้แพ็กเก็ตที่รับเข้ามาในเราเตอร์",
  "Throughput": "อัตราข้อมูลที่รับส่งได้จริงต่อเวลา ซึ่งอาจต่ำกว่าความจุสูงสุดของลิงก์",
  "UTP (Unshielded Twisted Pair)": "สายคู่บิดเกลียวที่ไม่มีชั้นโลหะป้องกันสัญญาณรบกวน ใช้การบิดเกลียวช่วยลดผลรบกวน",
  "HTTP GET": "คำขอ HTTP สำหรับอ่านทรัพยากร เช่น ขอหน้าเว็บหรือรูปภาพจากเซิร์ฟเวอร์",
  "HTTP POST": "คำขอ HTTP ที่ส่งข้อมูลให้ทรัพยากรปลายทางประมวลผลตามหน้าที่ของบริการ",
  "Flow Control": "การปรับการส่งให้ผู้รับรับข้อมูลทัน เพื่อไม่ให้พื้นที่เก็บข้อมูลฝั่งผู้รับล้น",
  "Congestion Control": "การปรับปริมาณที่ส่งเพื่อลดความแออัดในเครือข่าย",
  "VLAN (Virtual LAN)": "การแบ่งเครือข่ายระดับลิงก์เป็นกลุ่มทางตรรกะ แต่ละ VLAN มีขอบเขต Broadcast แยกกัน",
  "Hidden Terminal Problem": "กรณีเครื่องส่งสองเครื่องไม่ได้ยินกัน แต่ต่างส่งถึงผู้รับเดียวกัน จึงอาจส่งชนกันที่ผู้รับ",
  "Increment (++)": "เครื่องหมายเพิ่มค่าทีละ 1 โดยตำแหน่งหน้าหรือหลังตัวแปรมีผลต่อค่าที่ใช้ในนิพจน์",
  "Address-of (&)": "เครื่องหมายสำหรับอ่านที่อยู่ของตัวแปร เช่น &a ให้ที่อยู่ของ a",
  "Dereference (*)": "การใช้ * กับ Pointer เพื่ออ่านหรือแก้ค่าที่ตำแหน่งซึ่ง Pointer ชี้อยู่",
  "Pass by Value": "การส่งสำเนาของค่าให้ฟังก์ชัน การแก้พารามิเตอร์ธรรมดาในฟังก์ชันจึงไม่เปลี่ยนตัวแปรเดิม",
  "Pass by Address": "การส่งค่าที่อยู่ผ่าน Pointer ให้ฟังก์ชัน เพื่อให้เข้าถึงหรือแก้ข้อมูลที่อยู่ต้นทางได้",
  "while Loop": "ลูปที่ตรวจเงื่อนไขก่อนทำคำสั่งแต่ละรอบ ถ้าเท็จตั้งแต่แรกจะไม่ทำเนื้อหาลูป",
  "Pre-test Loop": "ลูปที่ตรวจเงื่อนไขก่อนทำคำสั่งในรอบนั้น จึงอาจไม่ทำเลยแม้แต่ครั้งเดียว",
  "Post-test Loop": "ลูปที่ทำคำสั่งก่อนแล้วจึงตรวจเงื่อนไข จึงทำอย่างน้อยหนึ่งครั้ง",
  "Array Traversal": "การเข้าถึงสมาชิกของอาร์เรย์ทีละตำแหน่ง เช่น ใช้ลูปหาผลรวมของทุกค่า",
  "Function Definition": "ส่วนที่เขียนคำสั่งทำงานจริงของฟังก์ชัน พร้อมชนิดค่าที่คืน ชื่อ และพารามิเตอร์",
  "Function Prototype": "คำประกาศที่บอกชื่อฟังก์ชัน ชนิดพารามิเตอร์ และชนิดค่าที่คืน ก่อนเรียกใช้งาน",
  "MCP9700": "เซนเซอร์อุณหภูมิแบบอนาล็อกที่แรงดันเอาต์พุตเปลี่ยนตามอุณหภูมิ ต้องใช้สมการของรุ่นนี้ในการแปลงค่า",
  "Publisher": "ผู้ส่งข้อความไปยัง Topic ผ่าน MQTT Broker",
  "Subscriber": "ผู้ที่สมัครรับข้อความตาม Topic ที่สนใจจาก MQTT Broker",
  "MQTT Topic": "ชื่อที่ใช้จัดกลุ่มข้อความ เช่น desk/temperature เพื่อให้ผู้รับเลือกติดตามข้อมูลได้",
  "QoS 0": "ระดับการส่งที่ไม่มีขั้นตอนยืนยันและส่งซ้ำของ MQTT ข้อความจึงอาจสูญหายได้",
  "QoS 1": "ระดับการส่งที่มุ่งให้ข้อความถึงอย่างน้อยหนึ่งครั้ง จึงอาจได้รับซ้ำและต้องออกแบบผู้รับให้รองรับ",
  "Retained Message": "ข้อความล่าสุดที่ Broker เก็บไว้สำหรับ Topic ที่ตั้ง Retain เพื่อส่งให้ผู้สมัครรับรายใหม่ตามกติกา MQTT",
  "Little Endian": "การจัดลำดับไบต์โดยวางไบต์ที่มีน้ำหนักต่ำสุดไว้ที่ที่อยู่ต่ำสุด ไม่ได้หมายถึงไบต์ที่มีค่าตัวเลขน้อยที่สุด",
  "Font": "ชุดข้อมูลตัวพิมพ์ที่นำมาใช้งาน เช่น ไฟล์ที่เก็บรูปร่าง Glyph และข้อมูลการจัดวางของแบบอักษร",
  "Spatial Resolution": "ความละเอียดเชิงพื้นที่ของภาพ ซึ่งในภาพดิจิทัลมักระบุด้วยจำนวนพิกเซลแนวกว้างและแนวสูง",
  "Luminance / Luma (Y)": "Luminance คือความสว่างเชิงกายภาพ ส่วน Luma คือองค์ประกอบสัญญาณที่แทนความสว่าง เช่น Y ใน YCbCr; สองคำนี้เกี่ยวข้องกันแต่ไม่เหมือนกันทุกกรณี",
  "Sampling Rate": "จำนวนครั้งที่อ่านค่าสัญญาณในหนึ่งวินาที เช่น 8,000 Hz คืออ่าน 8,000 ครั้งต่อวินาที",
  "Bit Depth": "จำนวนบิตที่ใช้แทนค่าหนึ่งตัว ถ้ามี n บิตจะกำหนดค่าได้ 2^n ระดับ",
  "Nyquist Sampling Theorem": "สำหรับสัญญาณที่จำกัดย่านความถี่ ต้องอ่านตัวอย่างเร็วพอเมื่อเทียบกับความถี่สูงสุด โดยการใช้งานทั่วไปเลือกอัตราสูงกว่าสองเท่าและมีการกรองที่เหมาะสม",
  "Information Overload": "ภาวะที่ได้รับข้อมูลมากเกินกว่าจะตามหรือทำความเข้าใจทัน",
  "Digital Signal": "สัญญาณที่แทนข้อมูลด้วยค่าที่แยกเป็นระดับ เช่น ระดับที่ใช้แทนบิต 0 และ 1",
  "Chromaticity Diagram": "แผนภาพที่แสดงพิกัดด้านสีโดยแยกองค์ประกอบความสว่างออก",
  "Saturation": "ความอิ่มตัวของสี บอกว่าสีดูสดหรือเจือจางเพียงใดเมื่อเทียบในบริบทของแบบจำลองสี",
  "Codec": "วิธีหรือโปรแกรมที่ใช้เข้ารหัสและถอดรหัสข้อมูลสื่อ เช่น วิดีโอหรือเสียง",
  "Container Format": "รูปแบบไฟล์ที่รวมข้อมูลหลายส่วน เช่น ภาพ เสียง และคำบรรยาย โดยแต่ละส่วนอาจใช้ Codec ต่างกัน",
  "Bitrate": "ปริมาณบิตที่ใช้ต่อหนึ่งวินาที เช่น บิตเรตสูงขึ้นมักทำให้ข้อมูลมากขึ้นเมื่อระยะเวลาเท่ากัน",
  "G¹ Continuity": "การต่อเส้นโค้งให้ตำแหน่งต่อกันและทิศทางแนวสัมผัสสอดคล้องกัน โดยไม่บังคับขนาดอนุพันธ์ให้เท่ากัน",
  "Inverse Kinematics": "การคำนวณมุมข้อต่อจากตำแหน่งเป้าหมาย เช่น ต้องการให้มือไปถึงจุดหนึ่งแล้วหาว่าแขนต้องงออย่างไร",
  "Renderer Main Thread": "ส่วนทำงานหลักที่จัดการโครงสร้างหน้าเว็บ รัน JavaScript คำนวณตำแหน่ง และเตรียมการวาดตามงานที่เบราว์เซอร์กำหนด",
  "Gyroscope": "เซนเซอร์วัดอัตราการหมุนรอบแกน ใช้ติดตามการเคลื่อนไหวเชิงหมุน",
  "AI Upscaling": "การใช้ AI ประมาณรายละเอียดเพื่อสร้างภาพความละเอียดสูงขึ้น ไม่ได้คืนรายละเอียดต้นฉบับได้ถูกต้องเสมอไป"
};
const phrases = {
  "ไม่ตรงกับเงื่อนไขในโจทย์: ": "ตัวเลือกนี้ต่างจากที่โจทย์ต้องการ: ",
  "ไม่ตรงกับสถานการณ์: ": "ตัวเลือกนี้ต่างจากที่โจทย์ต้องการ: ",
  "ตัวเลือกนี้ใช้กับกรณีอื่น: ": "ตัวเลือกนี้อธิบายเรื่องอื่น: ",
  "จึงสอดคล้องกับสถานการณ์ที่กำหนด": "จึงตรงกับสิ่งที่โจทย์ถาม",
  "ซึ่งไม่ได้เป็นประเด็นหลักของสถานการณ์": "จึงไม่ตรงกับเงื่อนไขที่โจทย์ให้",
  "ตัวอย่างประกอบ:": "ตัวอย่าง:",
  "เชิงตรรกะ": "ในมุมมองของระบบ",
  "ประยุกต์": "นำไปใช้",
  "ส่วนตรรกะคำนวณ/กำหนด": "ส่วนที่คำนวณหรือกำหนด",
  "การทำงานของระบบโดยรวม": "การทำงานของระบบ",
  "ตามสถานการณ์ที่กำหนด": "ตามเงื่อนไขของโจทย์",
  "ในสไลด์": "ในบทเรียน",
  "ตามสไลด์": "ตามเนื้อหาในบทเรียน",
  "ตามนิยาม": "ตามความหมาย",
  "Input Port": "พอร์ตรับเข้า",
  "Output Port": "พอร์ตส่งออก",
  "End Systems": "เครื่องปลายทาง",
  "End System": "เครื่องปลายทาง",
  "End Hosts": "เครื่องปลายทาง",
  "Application Processes": "โปรเซสของแอป",
  "Communication Link": "ช่องทางสื่อสาร",
  "Destination IP": "IP ปลายทาง",
  "Source MAC": "MAC ต้นทาง",
  "Destination MAC": "MAC ปลายทาง",
  "Network Prefix": "ส่วนบิตเครือข่าย",
  "Network Core": "แกนกลางเครือข่าย",
  "Packet": "แพ็กเก็ต",
  "Datagram": "ดาตาแกรม",
  "Frame": "เฟรม",
  "Router": "เราเตอร์",
  "Switch": "สวิตช์",
  "Input": "อินพุต",
  "Output": "เอาต์พุต",
  "Hardware": "ฮาร์ดแวร์",
  "Software": "ซอฟต์แวร์",
  "Condition": "เงื่อนไข",
  "Statement": "คำสั่ง",
  "Body": "ชุดคำสั่ง",
  "Block": "บล็อกคำสั่ง",
  "Operand": "ค่าที่นำมาคำนวณ",
  "Operator": "ตัวดำเนินการ",
  "Array": "อาร์เรย์",
  "Index": "ดัชนีตำแหน่ง",
  "Record": "รายการข้อมูล",
  "Memory": "หน่วยความจำ",
  "geometric shapes": "รูปทรงทางเรขาคณิต",
  "control points": "จุดควบคุม",
  "control point": "จุดควบคุม",
  "pixels": "พิกเซล",
  "pixel": "พิกเซล",
  "polygons": "รูปหลายเหลี่ยม",
  "polygon": "รูปหลายเหลี่ยม",
  "backlight": "แสงด้านหลังจอ",
  "tangent": "แนวสัมผัส",
  "glyphs": "รูปตัวอักษร",
  "vertices": "จุดยอด",
  "vertex": "จุดยอด",
  "edges": "ขอบ",
  "edge": "ขอบ",
  "components": "ส่วนที่เชื่อมต่อกัน",
  "loop": "ลูป",
  "degree": "ดีกรี",
  "attributes": "คุณลักษณะ",
  "attribute": "คุณลักษณะ",
  "entities": "สิ่งที่เก็บข้อมูล",
  "entity": "สิ่งที่เก็บข้อมูล",
  "non-key attributes": "คุณลักษณะที่ไม่ใช่ส่วนของคีย์",
  "superkey": "ซูเปอร์คีย์",
  "candidate key": "คีย์ผู้สมัคร",
  "primary key": "คีย์หลัก",
  "foreign key": "คีย์นอก",
  "transitive dependencies": "ความขึ้นต่อกันแบบส่งต่อ",
  "partial dependencies": "ความขึ้นต่อกันเพียงบางส่วนของคีย์",
  "functional dependency": "ความขึ้นต่อกันตามค่า",
  "connected components": "ส่วนของกราฟที่เชื่อมต่อกัน",
  "all-or-nothing": "ทำครบทั้งชุดหรือไม่คงผลการทำงานไว้เลย"
};
const escapeRx = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const replacements = Object.entries(phrases).sort((a,b)=>b[0].length-a[0].length)
 .map(([from,to])=>[new RegExp('(^|[^A-Za-z0-9_])('+escapeRx(from)+')(?=$|[^A-Za-z0-9_()])','gi'),to]);
export function readableProse(value){
 let text=String(value??'');
 if(!/[ก-๙]/.test(text)||/https?:\/\/|#include|printf\(|scanf\(/.test(text))return text;
 for(const [pattern,to] of replacements)text=text.replace(pattern,(match,prefix,word)=>prefix+(word===word.toUpperCase()&&/[A-Z]/.test(word)?word:to));
 return text.replace(/\\n/g,'\n').replace(/\u0000/g,'\\0').trim();
}
export function termMeaning(term, fallback){return termMeanings[term]||readableProse(fallback);}
function readableExplanation(value, options){
 const terms=[...options].filter(term=>/[A-Za-z]/.test(term)&&!/[ก-๙]/.test(term)).sort((a,b)=>b.length-a.length);
 const saved=[];
 let text=String(value);
 for(const term of terms){
  text=text.split(term).join('\uE000'+saved.length+'\uE001');
  saved.push(term);
 }
 return readableProse(text).replace(/\uE000(\d+)\uE001/g,(_,index)=>saved[Number(index)]);
}
export function clarifyLearningContent(subjects){
 for(const subject of subjects){
  subject.description=readableProse(subject.description);
  for(const chapter of subject.chapters){
   chapter.description=readableProse(chapter.description);
   for(const section of chapter.sections){
    section.intro=readableProse(section.intro);
    section.points=(section.points||[]).map(readableProse);
    section.remember=readableProse(section.remember);
    section.workedExample=(section.workedExample||[]).map(readableProse);
    if(section.formula)section.formula=section.formula.replace(/\\n/g,'\n');
    if(section.table){
     const glossary=/^(English Term|ศัพท์|คำศัพท์|Term)/.test(section.table.headers[0]);
     section.table.headers=section.table.headers.map(x=>x==='English Term'?'คำศัพท์':x);
     section.table.rows=section.table.rows.map(row=>row.map((cell,i)=>glossary&&i===0?cell:glossary&&i===1?termMeaning(row[0],cell):readableProse(cell)));
    }
   }
   for(const card of chapter.flashcards){
    card.front=readableProse(card.front);
    if(card.meaning){
     card.meaning=termMeaning(card.term,card.meaning);
     card.example=readableProse(card.example);
     card.back=card.meaning+(card.example?'\nตัวอย่าง: '+card.example:'');
    }else card.back=readableProse(card.back);
   }
   for(const question of chapter.questions){
    question.prompt=readableProse(question.prompt);
    question.options=question.options.map(readableProse);
    question.reasons=question.reasons.map(reason=>readableExplanation(reason,question.options));
    for(const entry of question.vocabulary||[]){
     entry.meaning=termMeaning(entry.term,entry.meaning);
     entry.example=readableProse(entry.example);
    }
   }
  }
 }
}
