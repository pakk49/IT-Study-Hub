import { createPhysicalChapters } from './physical-builder.js';
// Final lectures with attached slides. Number 9 follows the pointer slide title 'ครั้งที่ 9'.
// No lecture slides for separate chapters 8 or 13 were provided: do not fabricate them.
export const physicalFinalChapters = createPhysicalChapters([
  {
    "number": 9,
    "exam": "final",
    "title": "Pointer Variables",
    "description": "Memory Address, & และ *, Pointer Arithmetic, Pointer กับ Array และ Pass by Address",
    "source": "PC69-08_Pointer-rev1.pdf · หน้าปกระบุ ครั้งที่ 9",
    "groups": [
      {
        "title": "Address & Pointer",
        "intro": "RAM มีตำแหน่ง Address และ Value; Pointer เป็นตัวแปรที่เก็บ Address ของตัวแปรอื่นเพื่อเข้าถึงหรือแก้ไขค่าที่ตำแหน่งนั้น",
        "items": [
          [
            "Memory Address",
            "ตำแหน่งหน่วยความจำของตัวแปร",
            "&a ส่งตำแหน่งของ int a",
            "ฟังก์ชัน scanf ต้องได้ตำแหน่งตัวแปร a เพื่อบันทึกค่าที่รับมา สิ่งที่ส่งให้ฟังก์ชันจัดเป็นอะไร?"
          ],
          [
            "Address-of (&)",
            "Operator อ่าน Address ของ Operand",
            "p=&a;",
            "มีตัวแปร a และต้องตั้งค่า p ให้ชี้ที่ตัวแปรนี้ โดยใช้ตัวดำเนินการหน้า a ควรใช้อะไร?"
          ],
          [
            "Dereference (*)",
            "Operator อ่านหรือแก้ Value ที่ Address ซึ่ง Pointer ชี้อยู่",
            "*p=25; เปลี่ยน a เมื่อ p=&a",
            "int a=10; int *p=&a; ต้องแก้ a ผ่าน p ให้เป็น 25 ควรใช้ Operator ใด?"
          ],
          [
            "Pointer Declaration",
            "การประกาศตัวแปรที่เก็บ Address ของข้อมูลชนิดที่ระบุ",
            "int *p;",
            "โปรแกรมต้องเตรียมตัวแปร p ไว้เก็บ Address ของ int ไม่ใช่เก็บ int โดยตรง ควรประกาศแบบใด?"
          ],
          [
            "Pointer to Pointer",
            "ตัวแปร Pointer ที่ชี้ไปยัง Pointer อีกตัว",
            "int **pp=&p;",
            "มี p ชี้ a อยู่แล้ว และต้องสร้าง pp ที่เก็บ Address ของ p ควรใช้โครงสร้างใด?"
          ]
        ],
        "remember": "&a คือ Address ของ a ส่วน *p คือค่าที่ Address ซึ่ง p ชี้; อย่าสับสนกับ * ตอนประกาศตัวแปร",
        "formula": "int a=10; int *p=&a;\\n*p=25; // a กลายเป็น 25"
      },
      {
        "title": "Pointer Arithmetic & Function",
        "intro": "การเพิ่ม Pointer จะเลื่อนไปตาม sizeof ของชนิดข้อมูล และ Array สัมพันธ์กับ Address สมาชิกแรก",
        "items": [
          [
            "Pointer Arithmetic",
            "การบวก/ลบ Pointer ตามขนาดชนิดข้อมูลที่มันชี้",
            "*(p+1) เข้าถึงสมาชิก Array ถัดไป",
            "int arr[]={10,20,30}; p=arr; ต้องอ่าน 20 โดยเลื่อนจาก p หนึ่งสมาชิก ควรใช้หลักการใด?"
          ],
          [
            "Array–Pointer Relationship",
            "การใช้ Pointer เพื่อเข้าถึง Array เช่น arr[i] กับ *(arr+i)",
            "*(arr+2) อ่านสมาชิกตัวที่ 3",
            "นักศึกษาไม่ใช้วงเล็บเหลี่ยมแต่ต้องอ่าน arr[2] ด้วยการเลื่อน Address แล้ว Dereference อาศัยความสัมพันธ์ใด?"
          ],
          [
            "Pass by Address",
            "ส่ง Address ให้ฟังก์ชันเพื่อแก้ค่าของตัวแปรผู้เรียกผ่าน Pointer",
            "myFunc(&x) และในฟังก์ชัน *arg=4",
            "main มี x=5 แต่ฟังก์ชันต้องแก้ x เป็น 4 จริง ๆ โดยรับ Pointer ควรใช้การส่งข้อมูลแบบใด?"
          ],
          [
            "Stack Memory",
            "บริเวณหน่วยความจำสำหรับ Call Frames และตัวแปร Local ตามการเรียกฟังก์ชัน",
            "local int x อยู่ใน Stack Frame",
            "ฟังก์ชันหนึ่งเรียกอีกฟังก์ชันและสร้าง Local Variables ตามลำดับการเรียก โดยปกติพื้นที่นี้คืออะไร?"
          ],
          [
            "Linked Node Pointer",
            "Pointer ใน Node ที่ใช้เชื่อมไป Node ถัดไปใน Linked List",
            "node->next ชี้ไปยัง Node ถัดไป",
            "ต้องลบ Node กลางของ Linked List แล้วเชื่อม Node ก่อนหน้าไปยัง Node ถัดไปตรง ๆ ต้องแก้ส่วนใด?"
          ]
        ],
        "remember": "การบวก p+1 ขยับไปตามชนิดข้อมูล ไม่ใช่เพิ่ม Address 1 byte เสมอ"
      }
    ]
  },
  {
    "number": 10,
    "exam": "final",
    "title": "Structure Variables",
    "description": "struct, Member Access, Structure Array และ Nested Structure",
    "source": "PC69-10_Structure.pdf",
    "groups": [
      {
        "title": "Defining and Accessing Structures",
        "intro": "struct ใช้รวมข้อมูลหลายชนิดในหน่วยข้อมูลเดียว เช่น ชื่อ อายุ และคะแนนเฉลี่ยของนักศึกษา",
        "items": [
          [
            "struct",
            "ชนิดข้อมูลโครงสร้างรวม Members ที่อาจต่างชนิด",
            "struct Student {char name[30]; int age;};",
            "ข้อมูลนักศึกษาคนหนึ่งต้องเก็บชื่อ char[] และอายุ int ไว้ด้วยกันในระเบียนเดียว ควรใช้ชนิดข้อมูลใด?"
          ],
          [
            "Structure Member",
            "ตัวแปรองค์ประกอบภายใน struct",
            "name และ age อยู่ใน Student",
            "struct Student เก็บทั้ง name และ age แต่ต้องอธิบายถึง age ในฐานะองค์ประกอบภายใน struct เรียกอะไร?"
          ],
          [
            "Dot Operator (.)",
            "Operator เข้าถึง Member ของตัวแปร Structure ที่ไม่ใช่ Pointer",
            "student.age=19;",
            "มี struct Student student; ต้องแก้สมาชิก age ของ student ต้องใช้ Operator ใด?"
          ],
          [
            "Structure Initialization",
            "การกำหนดค่าเริ่มต้น Members ตอนประกาศตัวแปร",
            "struct Student s={\"Ann\",19};",
            "ต้องสร้างข้อมูล Student พร้อมชื่อและอายุเบื้องต้นใน Statement ประกาศเดียว ควรใช้การทำงานแบบใด?"
          ],
          [
            "Structure Assignment",
            "การคัดลอกค่า Structure ชนิดเข้ากันได้ให้ตัวแปรอีกตัวด้วย =",
            "s2=s1;",
            "มีตัวแปร struct Student s1 และ s2 ชนิดเดียวกัน และต้องคัดลอกข้อมูลสมาชิกทั้งชุด ควรทำอย่างไร?"
          ]
        ],
        "remember": "การเข้าถึง Member ในตัวแปร struct ใช้ . แต่ถ้าเป็น Pointer to struct มักใช้ ->"
      },
      {
        "title": "Collections & Composition",
        "intro": "Array of Structures จัดเก็บหลาย Record และ Nested Structure ให้ข้อมูลส่วนย่อยภายใน Record",
        "items": [
          [
            "Array of Structures",
            "อาร์เรย์ที่แต่ละช่องเป็นข้อมูลชนิด struct",
            "struct Student students[10];",
            "โปรแกรมต้องเก็บข้อมูลนักศึกษา 10 คน โดยแต่ละคนมีชื่อและอายุ ควรใช้ข้อมูลแบบใด?"
          ],
          [
            "Nested Structure",
            "struct ภายใน struct อีกชั้น",
            "University มี struct Address ภายใน",
            "ข้อมูลมหาวิทยาลัยต้องบรรจุข้อมูลที่อยู่ซึ่งมีถนน เขต จังหวัดไว้เป็นกลุ่มย่อย ควรใช้วิธีใด?"
          ],
          [
            "Structure Tag",
            "ชื่อกำกับชนิดโครงสร้างเพื่อใช้ประกาศตัวแปรในภายหลัง",
            "Student ใน struct Student",
            "มีคำสั่ง struct Student { ... }; แล้วต้องประกาศ struct Student x; ชื่อ Student ทำหน้าที่อะไร?"
          ],
          [
            "Pointer-to-Structure (->)",
            "Operator เข้าถึง Member ผ่าน Pointer ที่ชี้ Structure",
            "ptr->age แทน (*ptr).age",
            "ฟังก์ชันรับ struct Student *ptr และต้องอ่าน age ของข้อมูลที่ ptr ชี้ ควรใช้ Operator ใด?"
          ],
          [
            "Structure Member Array",
            "Member ภายใน struct ที่เป็น Array เช่นชื่อข้อความ",
            "char name[30] ใน struct Profile",
            "ระเบียนประวัติต้องเก็บชื่อยาวไม่เท่ากันเป็นลำดับ char ภายใน struct ส่วนนี้ควรประกาศแบบใด?"
          ]
        ],
        "remember": "Structure เหมาะกับข้อมูลหนึ่งชุดที่มีหลายชนิด; Structure Array เหมาะกับหลายชุดชนิดเดียวกัน"
      }
    ]
  },
  {
    "number": 11,
    "exam": "final",
    "title": "Basic Circuit Analysis",
    "description": "Electrical Elements, Ohm’s Law, KCL/KVL, Nodal Analysis และแหล่งจ่ายไฟฟ้า",
    "source": "PC69-11_Circuit-01-01.pdf และ PC69-11_Circuit-02.pdf",
    "groups": [
      {
        "title": "Circuit Basics & Laws",
        "intro": "วงจรไฟฟ้าต้องมีทางเดินกระแสครบรอบ กฎของโอห์มสัมพันธ์ V, I, R และ Kirchhoff ใช้ตรวจการอนุรักษ์กระแสกับแรงดัน",
        "items": [
          [
            "Electric Circuit",
            "วงจรที่อุปกรณ์และตัวนำเชื่อมต่อกันเป็นทางเดินไฟฟ้าครบรอบ",
            "แบตเตอรี่ต่อผ่านหลอดไฟกลับสู่แบตเตอรี่",
            "ต่อแบตเตอรี่และหลอดไฟเข้าด้วยกันแต่สายไม่ครบวง หลอดไม่ติด ต้องแก้รูปแบบการเชื่อมต่อให้เป็นอะไร?"
          ],
          [
            "Passive Element",
            "องค์ประกอบที่ไม่ผลิตพลังงานไฟฟ้าด้วยตนเอง เช่น Resistor",
            "ตัวต้านทานจำกัดกระแส LED",
            "วงจรใช้ตัวต้านทานลดกระแสก่อนเข้า LED องค์ประกอบนี้อยู่ในกลุ่มใด?"
          ],
          [
            "Ohm’s Law",
            "ความสัมพันธ์ V=IR ระหว่างแรงดัน กระแส และความต้านทาน",
            "R=5Ω,I=2A จึงได้ V=10V",
            "ตัวต้านทาน 5Ω มีกระแส 2A ต้องหาแรงดันตกคร่อมด้วยกฎใด?"
          ],
          [
            "KCL (Kirchhoff’s Current Law)",
            "ผลรวมกระแสที่ไหลเข้า Node เท่ากับผลรวมที่ไหลออก",
            "กระแสเข้า 5A ออก 2A และ 3A",
            "Node หนึ่งมีกระแสเข้า 5A และออก 2A อีกแขนงต้องมีกระแส 3A ใช้กฎใดพิสูจน์?"
          ],
          [
            "KVL (Kirchhoff’s Voltage Law)",
            "ผลรวมแรงดันเชิงพีชคณิตรอบ Closed Loop เป็นศูนย์",
            "แหล่งจ่าย 9V และแรงดันตกคร่อมรวม 9V",
            "วงจรมีแหล่งจ่าย 9V และ Resistor หลายตัวในลูป ต้องตั้งสมการแรงดันรอบลูปด้วยกฎใด?"
          ]
        ],
        "remember": "Ohm: V=IR, KCL: กระแสเข้า = กระแสออก, KVL: ผลรวมแรงดันรอบวงเป็นศูนย์",
        "formula": "V = I × R\\nR = V / I\\nI = V / R"
      },
      {
        "title": "Nodal Analysis & Sources",
        "intro": "การวิเคราะห์ Node เลือก Ground แล้วตั้งสมการ KCL โดยเชื่อมกับ Ohm’s Law และจัดการแหล่งจ่ายตามตำแหน่ง",
        "items": [
          [
            "Nodal Analysis",
            "การหาค่าแรงดันของ Nodes ด้วย KCL เทียบกับ Ground",
            "ตั้ง V1,V2 แล้วแก้ระบบสมการ",
            "วงจรมีหลาย Nodes และต้องหาแรงดันแต่ละจุดโดยเริ่มกำหนด Ground แล้วตั้งสมการกระแส ควรใช้การวิเคราะห์แบบใด?"
          ],
          [
            "Reference Node (Ground)",
            "Node อ้างอิงแรงดัน 0V สำหรับการคำนวณ",
            "กำหนดเส้นล่างของวงจรเป็น 0V",
            "นักศึกษาต้องตั้งแรงดันโหนดทั้งหมดเทียบกับตำแหน่ง 0V จุดนั้นมีชื่อว่าอะไร?"
          ],
          [
            "Voltage Source",
            "แหล่งจ่ายที่กำหนดแรงดันคร่อมตามแบบจำลอง",
            "แหล่งจ่ายอุดมคติ 5V",
            "เมื่อเปลี่ยน Load แต่ต้องการแบบจำลองที่แรงดันคร่อมยังคง 5V อุปกรณ์นี้เป็นแหล่งจ่ายชนิดใด?"
          ],
          [
            "Current Source",
            "แหล่งจ่ายที่กำหนดกระแสตามแบบจำลอง",
            "แหล่งจ่ายกระแสคงที่ 2A",
            "วงจรมีแหล่งจ่ายกำหนดกระแส 2A แม้ตัวต้านทานในสาขาเปลี่ยน ตามแบบจำลองควรใช้แหล่งจ่ายชนิดใด?"
          ],
          [
            "Supernode",
            "การรวม Nodes ที่เชื่อมกันด้วย Voltage Source เพื่อเขียน KCL รวมใน Nodal Analysis",
            "Voltage Source ต่อระหว่าง V1 กับ V2",
            "Voltage Source ต่อคร่อมสอง Node ที่ยังไม่ใช่ Ground ทำให้ตั้ง KCL แยกยาก ควรใช้แนววิเคราะห์ใด?"
          ]
        ],
        "remember": "ถ้า Voltage Source ต่อ Ground แรงดันของ Node อาจอ่านได้โดยตรง แต่ถ้าคั่นสอง Node ให้พิจารณา Supernode"
      }
    ]
  },
  {
    "number": 12,
    "exam": "final",
    "title": "Microcontroller & Arduino UNO R4 WiFi",
    "description": "MCU, Memory, Arduino IDE, GPIO, Digital Input/Output, PWM และ LED",
    "source": "PC69-12_Micro01.pdf",
    "groups": [
      {
        "title": "Microcontrollers & Arduino",
        "intro": "Microcontroller เป็นวงจรรวมที่รวมการประมวลผล หน่วยความจำ และระบบ I/O เพื่อควบคุมอุปกรณ์จริง",
        "items": [
          [
            "Microcontroller (MCU)",
            "วงจรรวมที่มี CPU, Memory และ I/O เพื่อทำงานควบคุม",
            "Arduino ควบคุม LED และรับค่าจากเซนเซอร์",
            "อุปกรณ์ต้องอ่านปุ่มและสั่งหลอดไฟตามโค้ดในชิปเดียว หน่วยประมวลผลกลุ่มใดเหมาะ?"
          ],
          [
            "Flash Memory",
            "หน่วยความจำแบบไม่ลบเลือนสำหรับเก็บโปรแกรม",
            "Sketch ถูกอัปโหลดเข้า Flash ของบอร์ด",
            "บอร์ดปิดไฟแล้วเปิดใหม่แต่ยังรัน Sketch เดิมได้ เพราะโค้ดเก็บในหน่วยความจำชนิดใด?"
          ],
          [
            "SRAM",
            "หน่วยความจำสำหรับข้อมูลระหว่างทำงานซึ่งต้องใช้ไฟเลี้ยง",
            "ตัวแปรขณะรันโปรแกรมอยู่ใน RAM",
            "Sketch เก็บค่าตัวแปรอุณหภูมิที่เปลี่ยนทุกครั้งที่ loop ทำงานไว้ในหน่วยความจำใด?"
          ],
          [
            "Arduino IDE",
            "เครื่องมือเขียน Compile และ Upload Sketch ไปยังบอร์ด Arduino",
            "กด Verify แล้ว Upload",
            "นักศึกษาต้องเขียน Sketch และอัปโหลดไป UNO R4 WiFi ผ่าน USB ควรใช้เครื่องมือใด?"
          ],
          [
            "setup()",
            "ฟังก์ชัน Arduino ที่รันหนึ่งครั้งตอนเริ่มหรือ Reset",
            "Serial.begin(9600) ใน setup",
            "ต้องกำหนดโหมด Pin และเปิด Serial เพียงครั้งเดียวก่อนทำงานวนซ้ำ ควรเขียนไว้ในฟังก์ชันใด?"
          ]
        ],
        "remember": "Sketch ของ Arduino ใช้ setup() ครั้งเดียว และ loop() ซ้ำตลอดตราบที่บอร์ดทำงาน"
      },
      {
        "title": "GPIO & Output",
        "intro": "Digital I/O ใช้ HIGH/LOW, Analog Input อ่านค่า Sensor และ PWM ควบคุมค่าเฉลี่ยการขับเอาต์พุต",
        "items": [
          [
            "loop()",
            "ฟังก์ชันที่ถูกเรียกซ้ำหลัง setup() ตลอดการทำงาน",
            "อ่านปุ่มและปรับไฟ LED ซ้ำ ๆ",
            "บอร์ดต้องตรวจปุ่มแล้วปรับหลอดไฟตลอดเวลา ไม่ใช่ทำครั้งเดียว ควรใส่โค้ดในฟังก์ชันใด?"
          ],
          [
            "pinMode()",
            "ฟังก์ชันกำหนด Pin เป็น INPUT หรือ OUTPUT",
            "pinMode(9, OUTPUT);",
            "ก่อนสั่งหลอด LED ที่ Pin 9 ต้องตั้งทิศทาง Pin ให้เป็นเอาต์พุต ควรใช้ฟังก์ชันใด?"
          ],
          [
            "digitalWrite()",
            "ฟังก์ชันกำหนด HIGH หรือ LOW ที่ Digital Output",
            "digitalWrite(9, HIGH);",
            "ตั้ง Pin 9 เป็น OUTPUT แล้วต้องสั่งระดับ Digital HIGH ควรใช้คำสั่งใด?"
          ],
          [
            "digitalRead()",
            "ฟังก์ชันอ่าน HIGH หรือ LOW จาก Digital Input",
            "state=digitalRead(2);",
            "ต่อปุ่มกดไว้ที่ Pin 2 และต้องอ่านสถานะกด/ไม่กดในโค้ด ควรใช้ฟังก์ชันใด?"
          ],
          [
            "analogWrite() (PWM)",
            "ฟังก์ชันสร้างสัญญาณ PWM เพื่อควบคุมระดับเฉลี่ยของ Output ที่รองรับ",
            "analogWrite(9,128) ทำ Duty Cycle ระดับกลาง",
            "ต้องควบคุมความสว่าง LED ที่ขา PWM โดยปรับค่า Duty Cycle ควรใช้ฟังก์ชันใด?"
          ]
        ],
        "remember": "Common Anode RGB มีตรรกะเปิด-ปิดต่างจาก Common Cathode; LED ต้องมี Resistor จำกัดกระแส"
      }
    ]
  },
  {
    "number": 14,
    "exam": "final",
    "title": "Sensors, Ultrasonic & LCD",
    "description": "LDR, NTC Thermistor, MCP9700, Ultrasonic, pulseIn, I2C และ LCD",
    "source": "PC69-14_Micro03.pdf",
    "groups": [
      {
        "title": "Light & Temperature Sensing",
        "intro": "Sensor แปลง Physical Quantity เป็นสัญญาณที่ MCU อ่านได้ ทั้งแบบค่าความต้านทานเปลี่ยนหรือแรงดันเปลี่ยน",
        "items": [
          [
            "Sensor",
            "อุปกรณ์ตรวจวัดค่าทางกายภาพเพื่อให้ระบบนำไปประมวลผล",
            "วัดอุณหภูมิหรือความเข้มแสง",
            "ต้องตรวจว่าห้องร้อนหรือมืดก่อนตัดสินใจเปิดอุปกรณ์ องค์ประกอบที่ใช้รับข้อมูลจากโลกจริงคืออะไร?"
          ],
          [
            "LDR (Light Dependent Resistor)",
            "ตัวต้านทานที่ค่าความต้านทานเปลี่ยนตามความเข้มแสง",
            "วงจรแบ่งแรงดันอ่านค่าแสง",
            "ต้องให้ Arduino ตรวจความสว่างด้วยอุปกรณ์ที่ค่าความต้านทานเปลี่ยนเมื่อมีแสง ควรใช้ชิ้นส่วนใด?"
          ],
          [
            "NTC Thermistor",
            "ตัวต้านทานตรวจอุณหภูมิที่ความต้านทานลดเมื่ออุณหภูมิสูงขึ้น",
            "TTC05103 10 kΩ ที่ 25°C",
            "เซนเซอร์มีค่า 10kΩ ที่ 25°C และร้อนขึ้นแล้วความต้านทานลดลง ควรเลือกชนิดใด?"
          ],
          [
            "MCP9700",
            "Analog Temperature Sensor ที่ให้แรงดัน Output เปลี่ยนตามอุณหภูมิ",
            "ต่อ Vout เข้า Analog Input แล้วแปลงเป็น °C",
            "ระบบต้องอ่านอุณหภูมิจากแรงดันเอาต์พุตแบบ Linear ของ MCP9700 ควรใช้เซนเซอร์ใด?"
          ],
          [
            "Voltage Divider",
            "วงจรตัวต้านทานแบ่งแรงดันเพื่อแปลงการเปลี่ยน R เป็น V",
            "LDR/NTC ต่อร่วมกับ Resistor คงที่",
            "MCU วัด Voltage ไม่ได้อ่าน Resistance โดยตรง ต้องต่อเซนเซอร์ต้านทานเปลี่ยนร่วมกับ Resistor คงที่ ควรใช้วงจรใด?"
          ]
        ],
        "remember": "NTC ร้อนขึ้นความต้านทานลด; MCP9700 อ่าน Voltage แล้วคำนวณอุณหภูมิ ไม่ใช่อ่านค่าเป็น °C โดยตรง"
      },
      {
        "title": "Distance & Display",
        "intro": "Ultrasonic วัดเวลาของเสียงสะท้อน ส่วน I2C เป็น Bus ใช้สื่อสารกับจอ LCD ผ่านสายสัญญาณ",
        "items": [
          [
            "Ultrasonic Sensor",
            "Sensor ระยะทางที่ใช้เวลาเดินทางของคลื่นเสียงสะท้อน",
            "HC-SR04 วัดระยะหน้าโต๊ะ",
            "ต้องตรวจว่ามีคนอยู่หน้าโต๊ะโดยปล่อยเสียงออกแล้วรอ Echo กลับมา ควรเลือก Sensor ประเภทใด?"
          ],
          [
            "Trigger Pulse",
            "พัลส์ที่ใช้เริ่มการวัดของ Ultrasonic Sensor",
            "ส่งสัญญาณ 10 µs ที่ Trig",
            "ก่อนอ่าน Echo ของ HC-SR04 โค้ดต้องส่งสัญญาณเริ่มวัดไปที่ขา Trig สิ่งนี้เรียกว่าอะไร?"
          ],
          [
            "pulseIn()",
            "ฟังก์ชัน Arduino วัดความยาวพัลส์ HIGH หรือ LOW เป็น Microseconds",
            "duration=pulseIn(echoPin,HIGH)",
            "Echo Pin มีพัลส์ HIGH อยู่ชั่วเวลาหนึ่งและต้องจับระยะเวลานั้นเพื่อหา Distance ใช้ฟังก์ชันใด?"
          ],
          [
            "I2C Bus",
            "ระบบสื่อสารอนุกรม Synchronous ระหว่าง MCU กับอุปกรณ์ภายนอกผ่าน SDA/SCL",
            "ต่อ LCD แบบ I2C ผ่าน SDA และ SCL",
            "จอ LCD และ MCU สื่อสารกันผ่านสายข้อมูลกับสาย Clock สองสายหลัก เป็น Bus ใด?"
          ],
          [
            "LiquidCrystal_I2C",
            "Library สำหรับควบคุมจอ LCD ผ่าน I2C Backpack ที่รองรับ",
            "lcd.setCursor(0,0); lcd.print(\"Temp\");",
            "ต่อ LCD 16×2 ผ่านโมดูล I2C และต้องเขียนข้อความขึ้นจอด้วย Arduino ควรใช้ Library กลุ่มใด?"
          ]
        ],
        "remember": "วัดระยะทางด้วย Ultrasonic ต้องหาร 2 เพราะเสียงเดินทางไปและกลับ",
        "formula": "distance (cm) ≈ duration (µs) × 0.034 / 2"
      }
    ]
  },
  {
    "number": 15,
    "exam": "final",
    "title": "Internet of Things & MQTT",
    "description": "IoT Architecture, Broker, Topic, QoS, Retained, LWT และการใช้ MQTT กับ Arduino",
    "source": "PC69-15_Micro04-IoT.pdf",
    "groups": [
      {
        "title": "Connected Things & Messaging",
        "intro": "IoT เชื่อมอุปกรณ์ที่ระบุตัวตนได้เข้ากับเครือข่าย และ MQTT ใช้ Publish/Subscribe ผ่าน Broker เพื่อลดการผูกอุปกรณ์เข้าหากันโดยตรง",
        "items": [
          [
            "Internet of Things (IoT)",
            "เครือข่ายอุปกรณ์ที่รับรู้/ตอบสนองและเชื่อมต่อส่งข้อมูลผ่านอินเทอร์เน็ต",
            "Smart Desk วัดอุณหภูมิแล้วแจ้งบนเว็บ",
            "ระบบโต๊ะอ่าน Sensor ส่งสถานะออนไลน์ และเปิดให้เว็บสั่งอุปกรณ์จากระยะไกล จัดเป็นระบบแบบใด?"
          ],
          [
            "MQTT Broker",
            "เซิร์ฟเวอร์ตัวกลางรับ Message จาก Publisher แล้วส่งต่อให้ Subscriber ที่เกี่ยวข้อง",
            "broker รับ /temperature แล้วส่งให้เว็บ",
            "บอร์ดและเว็บไม่ได้ต่อเข้าหากันตรง ๆ แต่ส่งข้อมูลไปยังเซิร์ฟเวอร์กลางสำหรับจัดเส้นทาง Message ควรใช้ส่วนใด?"
          ],
          [
            "Publisher",
            "Client ที่ส่ง Message ไปยัง Topic ที่ Broker",
            "บอร์ดส่ง temperature=28 ไปยัง smartdesk/temp",
            "Arduino วัดอุณหภูมิและส่งค่าผ่าน MQTT ทุก 5 วินาที ทำหน้าที่ใด?"
          ],
          [
            "Subscriber",
            "Client ที่ลงทะเบียนรับ Message ตาม Topic",
            "เว็บสมัครรับ smartdesk/temp",
            "หน้าเว็บต้องแสดงอุณหภูมิที่บอร์ดส่งมาโดยลงทะเบียนรับข่าวจาก Topic ทำหน้าที่ใด?"
          ],
          [
            "MQTT Topic",
            "ชื่อช่องทางเชิงลำดับชั้นสำหรับระบุ Message ในการ Publish/Subscribe",
            "smartdesk/desk01/temp",
            "ต้องแยกค่าของโต๊ะหลายตัวและชนิดข้อมูลไม่ให้ปะปนกัน ใช้ชื่อ smartdesk/desk01/temp เป็นองค์ประกอบใด?"
          ]
        ],
        "remember": "MQTT Topic ต้องตรงกันระหว่าง Publisher และ Subscriber เพื่อรับข้อมูลชุดที่ต้องการ"
      },
      {
        "title": "Reliability & Device State",
        "intro": "MQTT กำหนดความมั่นใจในการส่งด้วย QoS และใช้ Retain, Last Will กับ Keep Alive เพื่อช่วยจัดการสถานะ",
        "items": [
          [
            "QoS 0",
            "ระดับ MQTT ส่งมากสุดหนึ่งครั้งโดยไม่รับประกันว่าจะส่งถึง",
            "ข้อมูล Sensor อัปเดตถี่ ยอมให้บางค่าแพ็กเก็ตหาย",
            "ต้องส่งค่า Sensor ถี่มากและไม่เน้นรับประกันทุก Message เพื่อลด Overhead ควรเลือก QoS ระดับใด?"
          ],
          [
            "QoS 1",
            "ระดับ MQTT ส่งอย่างน้อยหนึ่งครั้ง จึงอาจเกิดข้อความซ้ำ",
            "Broker/Client ยืนยัน PUBACK",
            "คำสั่งสำคัญต้องมีโอกาสส่งถึงมากขึ้น ยอมรับ Message ซ้ำได้ ควรใช้ QoS ระดับใด?"
          ],
          [
            "Retained Message",
            "Message ล่าสุดที่ Broker เก็บไว้ให้ Subscriber ใหม่ได้รับทันที",
            "สถานะออนไลน์ล่าสุด retained=true",
            "เว็บเพิ่งเปิดแต่ต้องเห็นสถานะโต๊ะล่าสุดทันทีโดยไม่รอให้บอร์ดส่งซ้ำ ควรใช้ฟีเจอร์ใด?"
          ],
          [
            "LWT (Last Will and Testament)",
            "ข้อความที่ Broker ส่งแทน Client เมื่อการเชื่อมต่อหลุดผิดปกติ",
            "ส่ง offline ไป topic /online เมื่อบอร์ดหาย",
            "อุปกรณ์หลุด Wi-Fi โดยไม่ส่ง Disconnect แต่เว็บควรได้รับข้อความ OFFLINE อัตโนมัติ ต้องตั้งค่าอะไร?"
          ],
          [
            "Keep Alive",
            "ช่วงเวลาที่ใช้ตรวจว่าการเชื่อมต่อระหว่าง MQTT Client กับ Broker ยังมีชีวิต",
            "Client ส่ง Packet รักษา Connection ตามช่วงเวลา",
            "Broker ต้องตรวจจับ Client ที่ไม่ส่ง Packet มานานตามเวลาที่ตกลงไว้ ควรอาศัยกลไกใด?"
          ]
        ],
        "remember": "QoS 1 อาจรับซ้ำ; Retained ส่งสถานะล่าสุดให้ผู้มาทีหลัง; LWT จัดการการหลุดโดยไม่ปิดปกติ"
      }
    ]
  }
]);
