// แนวข้อสอบ PHYCOM แบบฝึก 3 ระดับ พร้อม main() ที่กำหนดให้ (ไม่ใช่โจทย์จริง)
export const vehicleTasks = [
  {
    "id": "score",
    "title": "1. Vehicle Score",
    "points": 3,
    "subtitle": "รวมคะแนนของ Vehicle ทุก Node",
    "prompt": "กำหนด Singly Linked List ของ Vehicle ซึ่งเก็บ score เป็นจำนวนเต็ม เขียนฟังก์ชัน totalScore() ให้เดินจาก head ไปจนถึง NULL และคืนผลรวมคะแนน หาก List ว่างให้คืน 0 ห้ามแก้ main() ที่กำหนดมา",
    "requirements": [
      "เดินผ่าน Node ด้วย Pointer",
      "อ่าน score ของทุก Node และรวมค่า",
      "คืน 0 เมื่อ List ว่าง"
    ],
    "prefix": "#include <stdio.h>\n\ntypedef struct Vehicle {\n    int score;\n    struct Vehicle *next;\n} Vehicle;",
    "starter": "int totalScore(const Vehicle *head) {\n    // TODO: รวม score ของทุก Node\n    return 0;\n}",
    "main": "int main(void) {\n    Vehicle c = {7, NULL};\n    Vehicle b = {5, &c};\n    Vehicle a = {3, &b};\n    printf(\"Total: %d\\n\", totalScore(&a));\n    printf(\"Empty: %d\\n\", totalScore(NULL));\n    return 0;\n}",
    "expected": "Total: 15\nEmpty: 0",
    "hints": [
      "เริ่มจาก head แล้วตรวจว่าตัวชี้ไม่ใช่ NULL",
      "ตัวแปรผลรวมควรเริ่มต้นที่ 0",
      "หลังอ่าน score ต้องเลื่อนไป next มิฉะนั้นอาจวนไม่สิ้นสุด"
    ],
    "criteria": [
      {
        "id": "function",
        "label": "มีฟังก์ชัน totalScore() และคืนค่าเป็น int",
        "weight": 1
      },
      {
        "id": "traverse",
        "label": "วนเดิน Node ผ่าน next โดยไม่ใช้ p++",
        "weight": 1
      },
      {
        "id": "sum",
        "label": "อ่าน score และคืนค่าผลรวม",
        "weight": 1
      }
    ]
  },
  {
    "id": "struct",
    "title": "2. Vehicle Struct",
    "points": 5,
    "subtitle": "สร้าง Struct และ Insert Last",
    "prompt": "กำหนดโครงสร้าง Vehicle ที่เก็บ plate และ score แล้วเขียนฟังก์ชัน insertVehicle() ให้จอง Node ใหม่ ใส่ข้อมูล และเพิ่มต่อท้าย Linked List ผ่าน Vehicle** head โดยรักษาลำดับการเพิ่มข้อมูล คืน 1 เมื่อสำเร็จ และ 0 เมื่อจองหน่วยความจำไม่สำเร็จ ห้ามแก้ main()",
    "requirements": [
      "จองหน่วยความจำ Node แบบ Dynamic",
      "บันทึก plate และ score ตามพารามิเตอร์",
      "รองรับ List ว่างด้วย *head",
      "เดินไป Node สุดท้ายเพื่อเชื่อมต่อ",
      "ตรวจ malloc ล้มเหลวและคืนสถานะ"
    ],
    "prefix": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct Vehicle {\n    char plate[16];\n    int score;\n    struct Vehicle *next;\n} Vehicle;",
    "starter": "int insertVehicle(Vehicle **head, const char *plate, int score) {\n    // TODO: malloc และเพิ่มต่อท้าย List\n    return 0;\n}",
    "main": "int main(void) {\n    Vehicle *head = NULL;\n    if (!insertVehicle(&head, \"CAR-01\", 7) ||\n        !insertVehicle(&head, \"BUS-02\", 9) ||\n        !insertVehicle(&head, \"VAN-03\", 4)) {\n        puts(\"Allocation failed\");\n        return 1;\n    }\n    for (Vehicle *p = head; p != NULL; p = p->next) {\n        printf(\"%s %d\\n\", p->plate, p->score);\n    }\n    while (head != NULL) {\n        Vehicle *next = head->next;\n        free(head);\n        head = next;\n    }\n    return 0;\n}",
    "expected": "CAR-01 7\nBUS-02 9\nVAN-03 4",
    "hints": [
      "malloc(sizeof *node) จองพื้นที่สำหรับ Vehicle",
      "กำหนด next = NULL และคัดลอก plate ไม่เกินความจุบัฟเฟอร์",
      "เมื่อ *head == NULL ต้องให้ head ชี้ Node ใหม่",
      "เมื่อ List ไม่ว่าง ให้หา Node ที่ next == NULL แล้วเชื่อม"
    ],
    "criteria": [
      {
        "id": "function",
        "label": "ฟังก์ชัน insertVehicle() รับ Vehicle** head",
        "weight": 1
      },
      {
        "id": "allocate",
        "label": "จอง Node ด้วย malloc",
        "weight": 1
      },
      {
        "id": "populate",
        "label": "กำหนด plate, score และ next",
        "weight": 1
      },
      {
        "id": "empty",
        "label": "รองรับกรณี head ว่าง",
        "weight": 1
      },
      {
        "id": "last",
        "label": "เดินไปท้ายและเชื่อม Node พร้อมคืนสถานะ",
        "weight": 1
      }
    ]
  },
  {
    "id": "dynamic",
    "title": "3. Vehicle Dynamic",
    "points": 8,
    "subtitle": "Dynamic Memory และคืนหน่วยความจำ",
    "prompt": "กำหนด Vehicle ที่มีชื่อและอาร์เรย์คะแนนเป็น Pointer ให้เขียน createVehicle() เพื่อจอง Node และคัดลอก name กับ scores ลง Heap จริง (Deep Copy), appendVehicle() เพื่อเชื่อมท้าย List และ freeVehicles() เพื่อคืนหน่วยความจำทุกส่วนพร้อมตั้ง *head = NULL กรณีจองไม่สำเร็จต้องคืนส่วนที่จองไปแล้ว ห้ามแก้ main()",
    "requirements": [
      "สร้าง Vehicle บน Heap",
      "คัดลอก name ลงพื้นที่ใหม่",
      "จองและคัดลอกคะแนนโดยอาศัย count",
      "ตรวจ malloc ล้มเหลวและ Cleanup",
      "เพิ่ม Node ต่อท้าย",
      "วนคืนแต่ละ Node",
      "free name และ scores ก่อน free Node",
      "ตั้ง head เป็น NULL เมื่อเสร็จ"
    ],
    "prefix": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct Vehicle {\n    char *name;\n    int *scores;\n    size_t count;\n    struct Vehicle *next;\n} Vehicle;",
    "starter": "Vehicle *createVehicle(const char *name, const int *scores, size_t count) {\n    // TODO: malloc Node, name, scores และคัดลอกข้อมูล\n    return NULL;\n}\n\nint appendVehicle(Vehicle **head, Vehicle *node) {\n    // TODO: เพิ่ม node ที่สร้างแล้วต่อท้าย\n    return 0;\n}\n\nvoid freeVehicles(Vehicle **head) {\n    // TODO: free scores, name และ Node ทุกตัว\n}",
    "main": "int main(void) {\n    int a[] = {8, 9, 7};\n    int b[] = {5, 6};\n    Vehicle *head = NULL;\n    Vehicle *car = createVehicle(\"Car\", a, 3);\n    Vehicle *bus = createVehicle(\"Bus\", b, 2);\n    if (car == NULL || bus == NULL) {\n        puts(\"Allocation failed\");\n        freeVehicles(&car);\n        freeVehicles(&bus);\n        return 1;\n    }\n    if (!appendVehicle(&head, car) || !appendVehicle(&head, bus)) {\n        puts(\"Append failed\");\n        freeVehicles(&head);\n        return 1;\n    }\n    for (Vehicle *p = head; p != NULL; p = p->next) {\n        int sum = 0;\n        for (size_t i = 0; i < p->count; ++i) {\n            sum += p->scores[i];\n        }\n        printf(\"%s: %d\\n\", p->name, sum);\n    }\n    freeVehicles(&head);\n    printf(\"Empty: %s\\n\", head == NULL ? \"YES\" : \"NO\");\n    return 0;\n}",
    "expected": "Car: 24\nBus: 11\nEmpty: YES",
    "hints": [
      "จอง Node ด้วย malloc(sizeof *node)",
      "จอง name ให้รองรับ strlen(name) + 1 และจอง scores ด้วย count * sizeof(int)",
      "คัดลอกข้อมูลทั้งสองส่วน ไม่เก็บที่อยู่ของพารามิเตอร์โดยตรง",
      "หากจองส่วนใดล้มเหลว ต้อง free ส่วนที่จองไว้แล้ว",
      "freeVehicles() ใช้ Pointer สองชั้นเพื่อปรับค่า head ของผู้เรียก"
    ],
    "criteria": [
      {
        "id": "create",
        "label": "มี createVehicle() และใช้ malloc สำหรับ Node",
        "weight": 1
      },
      {
        "id": "name",
        "label": "จองและคัดลอก name แบบ Deep Copy",
        "weight": 1
      },
      {
        "id": "scores",
        "label": "จองและคัดลอก scores ตาม count",
        "weight": 1
      },
      {
        "id": "allocation",
        "label": "ตรวจความล้มเหลวในการจองหน่วยความจำ",
        "weight": 1
      },
      {
        "id": "cleanup",
        "label": "จัดการคืนหน่วยความจำเมื่อสร้างไม่สำเร็จ",
        "weight": 1
      },
      {
        "id": "append",
        "label": "appendVehicle() รองรับ head ว่างและเพิ่มท้าย",
        "weight": 1
      },
      {
        "id": "free",
        "label": "freeVehicles() คืน name, scores และ Node",
        "weight": 1
      },
      {
        "id": "head",
        "label": "หลัง free ตั้ง *head กลับเป็น NULL",
        "weight": 1
      }
    ]
  }
];
