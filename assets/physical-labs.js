export const physicalLabs=[
  {
    "no": 1,
    "title": "Raptor Flowchart",
    "period": "midterm",
    "chapter": 1,
    "source": "Lab01 - Raptor.pdf",
    "summary": "ใช้โปรแกรม Raptor สร้างผังงานและตรวจลำดับ Input → Process → Output",
    "tasks": [
      "ติดตั้ง/เปิด Raptor และสร้าง Flowchart แบบลำดับขั้น",
      "ใช้ Input, Assignment, Output กับตัวแปร",
      "สร้าง Selection สำหรับปัญหาเงื่อนไขค่าแรง",
      "ทดลองรันผังงานและเปรียบเทียบผลกับตัวอย่าง"
    ],
    "terms": [
      [
        "Raptor",
        "โปรแกรมสำหรับออกแบบและทดสอบ Flowchart"
      ],
      [
        "Flowchart",
        "แผนภาพลำดับการทำงาน"
      ],
      [
        "Decision",
        "สัญลักษณ์แยกเงื่อนไข"
      ],
      [
        "Output",
        "แสดงผลลัพธ์จากระบบ"
      ]
    ]
  },
  {
    "no": 2,
    "title": "Cygwin, GCC and Linux Commands",
    "period": "midterm",
    "chapter": 2,
    "source": "Lab02 - Cygwin.pdf",
    "summary": "เตรียม Cygwin และใช้คำสั่งพื้นฐานเพื่อ Compile และ Run โปรแกรมภาษา C",
    "tasks": [
      "ตรวจ GCC ด้วย gcc --help",
      "ใช้ pwd, ls, cd และ mkdir เพื่อจัดการ Directory",
      "สร้างและแก้ไฟล์ C ด้วย Text Editor",
      "Compile โค้ดด้วย gcc main.c -o main และทดลอง Run"
    ],
    "terms": [
      [
        "Cygwin",
        "เครื่องมือจำลองสภาพแวดล้อม Unix/POSIX บน Windows"
      ],
      [
        "GCC",
        "Compiler ภาษา C"
      ],
      [
        "Vim",
        "โปรแกรมแก้ไขข้อความใน Terminal"
      ],
      [
        "Shell",
        "สภาพแวดล้อมรับคำสั่งระบบ"
      ]
    ]
  },
  {
    "no": 3,
    "title": "GDB Debugging Basics",
    "period": "midterm",
    "chapter": 3,
    "source": "GitHub · labs03-gdb/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs03-gdb",
    "summary": "เริ่ม Debug โปรแกรม C ด้วย GDB ผ่าน Cygwin ตรวจ Breakpoint และค่าตัวแปร",
    "tasks": [
      "ตรวจว่า GDB ใช้งานได้ด้วย gdb --version",
      "Compile พร้อม Debug Symbols ด้วย gcc -g main.c -o main",
      "เริ่ม gdb main แล้วกำหนด break main",
      "ใช้ run, next, step, print และ continue เพื่อหาค่าและบรรทัดที่ผิด"
    ],
    "terms": [
      [
        "GDB",
        "GNU Debugger ใช้ตรวจการรันโปรแกรม"
      ],
      [
        "Breakpoint",
        "จุดหยุดชั่วคราว"
      ],
      [
        "Debug Symbols",
        "ข้อมูลประกอบการดีบัก"
      ],
      [
        "Step",
        "เข้าไปทำงานในฟังก์ชันทีละขั้น"
      ]
    ]
  },
  {
    "no": 4,
    "title": "GDB Debugging Expressions",
    "period": "midterm",
    "chapter": 3,
    "source": "GitHub · labs04-gdb02/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs04-gdb02",
    "summary": "Debug Expressions, Watchpoints และการอ่านค่าตัวแปรในโปรแกรม C",
    "tasks": [
      "ใช้ gcc -g แล้วเปิด gdb main",
      "ตั้ง break, run และ print เพื่อดูค่า Expression",
      "เปรียบเทียบ next กับ step",
      "ใช้ watch expression และ info locals ตรวจค่าที่เปลี่ยน"
    ],
    "terms": [
      [
        "Watchpoint",
        "หยุดเมื่อค่า Expression เปลี่ยน"
      ],
      [
        "Expression",
        "นิพจน์ที่ถูกประเมินเป็นค่า"
      ],
      [
        "Operator Precedence",
        "ลำดับคำนวณ Operator"
      ],
      [
        "Call Stack",
        "ลำดับการเรียกฟังก์ชัน"
      ]
    ]
  },
  {
    "no": 6,
    "title": "Array and Integer Representation",
    "period": "midterm",
    "chapter": 6,
    "source": "Lab06 - Array.pdf",
    "summary": "ทำความเข้าใจ Signed/Unsigned Integer, Two’s Complement และ Array ใน C",
    "tasks": [
      "วิเคราะห์รูปแบบ Signed กับ Unsigned Integer ตามตัวอย่าง",
      "แปลงค่าตัวเลขและอ่าน Sign Bit",
      "เขียนโปรแกรม Array 1 มิติและเดินข้อมูลด้วย Loop",
      "ทดสอบการกำหนดค่า Array และขอบเขต Index"
    ],
    "terms": [
      [
        "Signed Integer",
        "จำนวนเต็มที่แทนค่าบวกและลบได้"
      ],
      [
        "Unsigned Integer",
        "จำนวนเต็มไม่ติดลบ"
      ],
      [
        "Two’s Complement",
        "วิธีแทนจำนวนเต็มติดลบใน Binary"
      ],
      [
        "Array",
        "ชุดข้อมูลที่เข้าถึงตาม Index"
      ]
    ]
  },
  {
    "no": 9,
    "title": "Pointer, Dynamic Memory and Stack",
    "period": "final",
    "chapter": 9,
    "source": "Lab09 - Pointer and Stack.pdf",
    "summary": "ทดลอง Pointer, String, Heap Allocation และ Stack แบบ LIFO",
    "tasks": [
      "ประกาศ int *ptr และใช้ & กับ * อ่าน/แก้ค่า",
      "เปรียบเทียบ arr[i] กับ *(arr+i)",
      "ทดลอง Dynamic Memory Allocation และ free",
      "ฝึก Push/Pop Stack และวิเคราะห์ Underflow"
    ],
    "terms": [
      [
        "Pointer",
        "ตัวแปรเก็บ Address"
      ],
      [
        "malloc",
        "จองพื้นที่ Memory แบบ Dynamic"
      ],
      [
        "Stack",
        "โครงสร้างข้อมูล Last In First Out"
      ],
      [
        "Pop",
        "นำสมาชิก Top ออกจาก Stack"
      ]
    ]
  },
  {
    "no": 10,
    "title": "Singly Linked List",
    "period": "final",
    "chapter": 10,
    "source": "Lab 10 - Linked List.pdf",
    "summary": "เปรียบเทียบ Array กับ Linked List และสร้าง Node ที่มี Data/Next",
    "tasks": [
      "วาดภาพ Linked List ที่มี Head และ Next Pointer",
      "สร้าง struct DataNode สำหรับเก็บข้อมูลและ Next",
      "ทดลอง Insert Front และ Append",
      "ทดลอง Delete Node และอัปเดต Link ให้ถูกต้อง"
    ],
    "terms": [
      [
        "Node",
        "หน่วยข้อมูลของ Linked List"
      ],
      [
        "Head",
        "Pointer ไปยัง Node ตัวแรก"
      ],
      [
        "Next Pointer",
        "Link ไปยัง Node ถัดไป"
      ],
      [
        "Dynamic Allocation",
        "จองหน่วยความจำตามความต้องการขณะรัน"
      ]
    ]
  },
  {
    "no": 12,
    "title": "Arduino R4 WiFi, RGB LED and 7-Segment",
    "period": "final",
    "chapter": 12,
    "source": "GitHub · labs12-IntroToMicrocontroller/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs12-IntroToMicrocontroller",
    "summary": "ฝึก Arduino UNO R4 WiFi, LED Blink, RGB Common Anode และ 7-Segment หนึ่ง/สองหลัก",
    "tasks": [
      "สร้าง LED Blink และกำหนดความถี่การกระพริบ",
      "สร้าง RGB LED แสดง 7 สี สลับทุก 1 วินาที โดยคำนึงถึง Common Anode",
      "แสดงตัวเลข 0–9 บน 7-Segment 1 หลัก",
      "ใช้ Multiplexing แสดงข้อมูลบน 7-Segment 2 หลักตามโจทย์"
    ],
    "terms": [
      [
        "Common Anode",
        "ขาร่วมฝั่งขั้วบวกของ LED"
      ],
      [
        "Multiplexing",
        "สลับเปิดแต่ละหลักอย่างรวดเร็ว"
      ],
      [
        "7-Segment",
        "อุปกรณ์แสดงตัวเลขจาก 7 ส่วน"
      ],
      [
        "digitalWrite",
        "กำหนดสถานะ Digital Output"
      ]
    ]
  },
  {
    "no": 13,
    "title": "Digital Read and Analog Signal",
    "period": "final",
    "chapter": 12,
    "source": "GitHub · labs13-Digital_Read_and_Analog_Signal/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs13-Digital_Read_and_Analog_Signal",
    "summary": "ควบคุม LED ด้วย Potentiometer และ PWM พร้อมฝึก LED Fading หลายขา",
    "tasks": [
      "อ่านค่าจาก Potentiometer ผ่าน Analog Input",
      "นำค่า Analog ไปควบคุมความสว่าง LED",
      "ออกแบบ LED Fading 4 ขา โดยแต่ละขามีรูปแบบต่างกัน",
      "ทดสอบการเปลี่ยนแปลง Output เทียบกับค่า Analog"
    ],
    "terms": [
      [
        "Potentiometer",
        "ตัวต้านทานปรับค่าได้"
      ],
      [
        "Analog Input",
        "อินพุตที่อ่านระดับแรงดันเป็นค่าตัวเลข"
      ],
      [
        "PWM",
        "การควบคุมอัตราส่วนช่วงเปิด-ปิดของสัญญาณ"
      ],
      [
        "LED Fading",
        "การค่อย ๆ ปรับความสว่าง LED"
      ]
    ]
  },
  {
    "no": 14,
    "title": "Sensor and LCD",
    "period": "final",
    "chapter": 14,
    "source": "GitHub · labs14-Sensor_and_LCD/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs14-Sensor_and_LCD",
    "summary": "ทดสอบ Ultrasonic, MCP9700 และ Thermistor พร้อมการแสดงผลผ่าน Serial Monitor",
    "tasks": [
      "วัดระยะด้วย Ultrasonic และแสดงค่าบน Serial Monitor",
      "อ่าน MCP9700 แล้วแปลง Voltage เป็นอุณหภูมิ",
      "ต่อ Thermistor แล้วคำนวณอุณหภูมิจากค่าที่อ่านได้",
      "เชื่อมโยงแนวคิดการแสดงผลบน LCD กับเนื้อหา Lecture"
    ],
    "terms": [
      [
        "Ultrasonic",
        "Sensor ใช้คลื่นเสียงวัดระยะ"
      ],
      [
        "MCP9700",
        "Sensor อุณหภูมิ Analog"
      ],
      [
        "Thermistor",
        "ตัวต้านทานไวต่ออุณหภูมิ"
      ],
      [
        "Serial Monitor",
        "หน้าต่างอ่านข้อมูล Serial จากบอร์ด"
      ]
    ]
  },
  {
    "no": 15,
    "title": "Internet of Things and MQTT",
    "period": "final",
    "chapter": 15,
    "source": "GitHub · labs15-internet_of_things/readme.md",
    "url": "https://github.com/TaeTanakrit0089/PhysicalComputing-167/tree/main/labs/labs15-internet_of_things",
    "summary": "ฝึกส่ง/รับข้อมูลผ่าน MQTT เพื่อควบคุม RGB LED, ส่ง Keypad และ Potentiometer",
    "tasks": [
      "ปรับเว็บ MQTT ให้สั่งผสมสี RGB LED เช่น R/B ติดเพื่อแสดงสีม่วง",
      "จับคู่ Publisher ส่งค่าจาก Keypad ให้ Subscriber แสดงที่ LCD",
      "จับคู่ Publisher ส่งค่า Potentiometer ให้ Subscriber ใช้หรี่ LED",
      "ตรวจ Topic และ Message Format ว่าตรงกันทั้งสองฝั่ง"
    ],
    "terms": [
      [
        "Publisher",
        "ผู้ส่งข้อมูลเข้า Topic"
      ],
      [
        "Subscriber",
        "ผู้รับข้อมูลจาก Topic"
      ],
      [
        "Broker",
        "ศูนย์กลางรับ/กระจาย MQTT Message"
      ],
      [
        "Topic",
        "ชื่อช่องทางจำแนกข้อมูลใน MQTT"
      ]
    ]
  }
];
