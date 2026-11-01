// Chapter 0 is orientation, not part of Midterm or Final question banks.
// Course evaluation percentages and course outlines come from PC-Chapter 0.pdf.
export const physicalOrientation={
 id:'pc-chapter-0',number:0,exam:'overview',title:'Introduction to Physical Computing',
 description:'ทำความรู้จักแนวทางเรียน วิชาที่ผสม C Programming กับ Hardware Interfacing เพื่อสร้างระบบโต้ตอบโลกจริง',
 minutes:12,source:'PC-Chapter 0.pdf · หน้า 5–9',flashcards:[],questions:[],
 sections:[
  {id:'pc0-purpose',title:'Physical Computing เรียนเกี่ยวกับอะไร?',pages:'หน้า 5',
   intro:'Physical Computing คือการออกแบบและสร้างอุปกรณ์หรือระบบที่สามารถรับรู้สภาพแวดล้อมและตอบสนองต่อโลกจริง โดยผสมผสานการเขียนโปรแกรมกับอุปกรณ์อิเล็กทรอนิกส์',
   points:['ส่วน Software เริ่มจาก Algorithm และ C Programming เพื่อประมวลผลข้อมูล','ส่วน Hardware ใช้ Microcontroller และวงจรเพื่อรับข้อมูลจาก Sensors และควบคุม Outputs','ระบบที่พัฒนาอาจต่อยอดเป็น Interactive Objects, Installations และ IoT Projects'],
   table:{headers:['English Term','ความหมายภาษาไทย','ตัวอย่าง'],rows:[['Physical Computing','ระบบคอมพิวเตอร์ที่โต้ตอบกับสภาพแวดล้อมจริง','อ่านค่า Sensor แล้วเปิด LED'],['Programming','การเขียนคำสั่งควบคุมการทำงาน','เขียน C ควบคุมเงื่อนไข'],['Hardware Interfacing','การเชื่อมต่อโปรแกรมกับอุปกรณ์จริง','Arduino เชื่อมปุ่มและ LED'],['Internet of Things','เครือข่ายอุปกรณ์เชื่อมต่ออินเทอร์เน็ต','เซนเซอร์ส่งข้อมูลขึ้นเว็บไซต์']]},
   remember:'เรียนทั้งการคิดเป็นขั้นตอน เขียนโปรแกรม ตรวจวงจร และบูรณาการให้ระบบทำงานจริง'},
  {id:'pc0-outline',title:'ภาพรวมเนื้อหา Midterm / Final',pages:'หน้า 6–7',
   intro:'ช่วงแรกเน้นพื้นฐานการเขียนโปรแกรม C ส่วนช่วงหลังเชื่อมการเขียนโปรแกรมกับวงจร อุปกรณ์ และอินเทอร์เน็ตของสรรพสิ่ง',
   points:['Midterm (Chapter 1–8): Computer Programming, C Basic Structure, Expression, Selection, Loop, Array และ Function เป็นบทที่มีเอกสารในขณะนี้ ส่วนบท 8 ยังไม่มีไฟล์','Final (ตั้งแต่ Chapter 9): Pointer, Structure, Circuit Analysis, Microcontroller, Input/Output Interfacing, Sensor และ IoT จากเอกสารที่แนบ','หมวด Lab แยกจากบทบรรยาย เพื่อฝึกทำโปรแกรมและการต่อวงจรตามเอกสาร'],
   remember:'Chapter 0 มีไว้แนะนำวิชา ไม่รวมเป็นข้อสอบกลางภาคหรือปลายภาค'},
  {id:'pc0-evaluation',title:'สัดส่วนการประเมินผล',pages:'หน้า 8–9',
   intro:'โครงสร้างคะแนนตาม Course Introduction ที่แนบมาครอบคลุม Lab, Quiz, Midterm, Final และ Mini Project',
   table:{headers:['ประเภท','คะแนน','ความหมาย'],rows:[['Lab','10%','งานปฏิบัติการ'],['Quiz','20%','แบบทดสอบระหว่างภาค'],['Midterm Examination','30%','สอบกลางภาค'],['Final Examination','30%','สอบปลายภาค'],['Mini Project','10%','โปรเจกต์ขนาดเล็ก']]},
   points:['สัดส่วนอ้างอิงจากเอกสารรายวิชา ไม่ใช่คะแนนผลการเรียนของบุคคล','สำหรับการทบทวนบนเว็บไซต์นี้ ข้อสอบเป็นแบบฝึกหัดแต่งใหม่ตามหัวข้อที่เรียน ไม่ใช่ข้อสอบจริง'],
   remember:'งาน Lab ต้องทดสอบผลลัพธ์จริง และตรวจข้อกำหนดการส่งงานล่าสุดจากระบบรายวิชา'}
 ]};
