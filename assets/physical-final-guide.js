// Exam scope supplied by the user in the instructor's announcement.
const chapterBase='#/year/2/term/1/subject/physical-computing/chapter/';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const linkedListPractice=`#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int insert_last(Node **head, int value) {
    Node *node = malloc(sizeof *node);
    if (node == NULL) return 0;
    node->data = value;
    node->next = NULL;
    if (*head == NULL) {
        *head = node;
        return 1;
    }
    Node *current = *head;
    while (current->next != NULL) current = current->next;
    current->next = node;
    return 1;
}

int value_at(const Node *head, int index, int *result) {
    if (index < 0 || result == NULL) return 0;
    const Node *current = head;
    for (int i = 0; current != NULL && i < index; i++) {
        current = current->next;
    }
    if (current == NULL) return 0;
    *result = current->data;
    return 1;
}

int main(void) {
    Node *head = NULL;
    int values[] = {10, 20, 30};
    int status = 0;
    for (int i = 0; i < 3; i++) {
        if (!insert_last(&head, values[i])) {
            status = 1;
            break;
        }
    }
    int result;
    if (status == 0 && value_at(head, 1, &result)) {
        printf("%d\\n", result);
    }
    while (head != NULL) {
        Node *next = head->next;
        free(head);
        head = next;
    }
    return status;
}`;
export function physicalFinalGuide(){
 return `<section class="physical-final-guide" aria-labelledby="pc-final-scope"><p class="eyebrow">ประกาศขอบเขตสอบที่ได้รับ</p><h2 id="pc-final-scope">Final Physical Computing · พุธ 11 พฤศจิกายน 2569</h2>
 <p>ข้อสอบรวม <b>30 คะแนน</b> แบ่งเป็นสามส่วน เตรียมแต่ละส่วนตามรูปแบบด้านล่าง</p>
 <div class="table-scroll"><table class="study-table"><thead><tr><th>ส่วนสอบ</th><th>คะแนนและจำนวนข้อ</th><th>สิ่งที่ต้องเตรียม</th></tr></thead><tbody>
 <tr><td>เขียนโค้ดบน &lt;e&gt;Judge</td><td><b>15 คะแนน</b> · เลือกทำหลายข้อให้ครบคะแนน</td><td>Linked List: เพิ่มข้อมูลท้ายลิสต์ (Insert Last) และเข้าถึงตามตำแหน่ง (Traverse by Index) รวมถึง Struct และ Pointer</td></tr>
 <tr><td>ข้อเลือกตอบบน Onlearn</td><td><b>10 คะแนน · 40 ข้อ</b></td><td>ทฤษฎีเกี่ยวกับ Arduino</td></tr>
 <tr><td>ไฟฟ้าบนกระดาษ</td><td><b>5 คะแนน · 1 ข้อ</b></td><td>ตั้งสมการจากวงจรที่ได้รับ <b>ไม่ต้องแก้สมการหาคำตอบ</b> วงจรสอบจริงต่างจากรูปตัวอย่างในประกาศ</td></tr>
 </tbody></table></div>
 <p class="deadline-note"><b>กำหนดส่งแล็บ &lt;e&gt;Judge:</b> อังคาร 10 พฤศจิกายน 2569 เวลา <b>23:59 น.</b> ตามเวลาประเทศไทย</p>
 <h3>เริ่มทบทวนตามนี้</h3><ol>
 <li><b>ฝึกโค้ดก่อน:</b> วาดลิสต์และตามค่า <code>head</code>, <code>current</code>, <code>next</code> ให้ได้ ฝึกทั้งลิสต์ว่าง หนึ่งโหนด และหลายโหนด</li>
 <li><b>ทบทวน Arduino:</b> อ่านการเริ่มโปรแกรม การตั้งค่าขา การรับและส่งสัญญาณ เซนเซอร์ และการเชื่อมต่อที่มีในบทเรียน ใช้เอกสารอาจารย์เป็นขอบเขตรายละเอียดย่อย</li>
 <li><b>ฝึกตั้งสมการ:</b> เลือก Ground กำหนดแรงดันที่จุดต่อและทิศกระแส แล้วใช้กฎของโอห์มร่วมกับ KCL หรือ KVL ให้ตรงวงจร</li>
 </ol>
 <div class="actions"><a class="button secondary" href="${chapterBase}pc-chapter-9/summary">อ่าน Pointer</a><a class="button secondary" href="${chapterBase}pc-chapter-10/summary">อ่าน Struct</a><a class="button secondary" href="${chapterBase}pc-chapter-12/summary">อ่าน Arduino</a><a class="button secondary" href="${chapterBase}pc-chapter-11/summary">อ่านวงจรไฟฟ้า</a></div>
 <details><summary>ฝึก Linked List: เพิ่มท้ายลิสต์และอ่านตาม Index</summary>
 <p>โหนดหนึ่งตัวมีข้อมูล <code>data</code> และตัวชี้ <code>next</code> ไปโหนดถัดไป ส่วน <code>head</code> ชี้ตัวแรก หากลิสต์ว่าง <code>head</code> เป็น <code>NULL</code></p>
 <h4>เพิ่มท้ายลิสต์ (Insert Last)</h4><ol><li>สร้างโหนดใหม่ ใส่ข้อมูล และให้ <code>next</code> เป็น <code>NULL</code></li><li>ถ้าลิสต์ว่าง ให้ <code>head</code> ชี้โหนดใหม่นี้</li><li>ถ้าไม่ว่าง ให้เดินจนถึงโหนดที่ <code>next == NULL</code> แล้วเชื่อม <code>next</code> ไปยังโหนดใหม่</li></ol>
 <h4>อ่านตามตำแหน่ง (Traverse by Index)</h4><p>ตัวอย่างนี้เริ่ม Index ที่ 0: ลิสต์ <code>10 → 20 → 30</code> มีข้อมูล 20 ที่ Index 1 เริ่มจาก <code>head</code> แล้วเดินหนึ่งครั้ง หากเจอ <code>NULL</code> ก่อนถึงตำแหน่ง แปลว่าไม่มีข้อมูลตำแหน่งนั้น ต้องตรวจรูปแบบ Index และข้อความแสดงผลจากโจทย์จริงอีกครั้ง</p>
 <pre class="practice-code"><code>${escape(linkedListPractice)}</code></pre>
 <p><code>Node **head</code> ช่วยให้ฟังก์ชันแก้ตัวชี้หัวลิสต์ของผู้เรียกได้ จึงส่ง <code>&amp;head</code> ตอนเพิ่มข้อมูล ส่วน <code>value_at</code> คืน 1 เมื่ออ่านสำเร็จและเขียนผลผ่าน <code>result</code> โค้ดนี้เป็นตัวอย่างฝึก มีผลลัพธ์ <code>20</code></p></details>
 <details><summary>ฝึกตั้งสมการไฟฟ้าโดยไม่แก้สมการ</summary>
 <p>ตัวอย่างฝึกสมมติ: จุด A ต่อผ่าน R1 ไปยังจุดที่มีแรงดัน Vs ผ่าน R2 ลง Ground และผ่าน R3 ไปจุด B ส่วน B ต่อผ่าน R4 ลง Ground และมีแหล่งกระแส I ไหลเข้า B</p>
 <ol><li>เลือก Ground เป็น 0 V และกำหนดแรงดันที่จุด A, B เป็น VA, VB</li><li>เลือกกระแสไหลออกจากแต่ละจุดเป็นบวก กระแสผ่านตัวต้านทานใช้ผลต่างแรงดันหารความต้านทาน</li><li>ที่ A ตั้ง KCL: <code>(VA−Vs)/R1 + VA/R2 + (VA−VB)/R3 = 0</code></li><li>ที่ B ตั้ง KCL: <code>(VB−VA)/R3 + VB/R4 − I = 0</code> เครื่องหมายลบหน้า I เพราะกำหนดว่ากระแสนี้ไหลเข้าจุด</li></ol>
 <p>หยุดที่สมการตามคำสั่งสอบ ตัวอย่างนี้ใช้ฝึกวิธีตั้งสมการ ต้องอ่านรูปวงจร ค่าที่กำหนด และทิศของแหล่งจ่ายจากโจทย์สอบจริง</p></details>
 <p class="source-note">อ้างอิงขอบเขตจากข้อความประกาศที่ผู้ใช้ส่งมา ชุดฝึกเลือกตอบ 60 ข้อเดิมด้านล่างเป็นการทบทวนหลายบท ไม่ใช่รูปแบบข้อสอบจริงสามส่วนข้างต้น</p></section>`;
}
