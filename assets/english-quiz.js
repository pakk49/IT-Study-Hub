// คำศัพท์อ้างอิงจากแฟลชการ์ดในสไลด์ Multimedia Technology และบทกราฟิก 6
// เปลี่ยนตัวเลือกที่เป็นคำอธิบายล้วนให้เป็นศัพท์อังกฤษ โดยไม่แก้เฉลย/คะแนน
const supplemental = {
  'chapter-6': [
    ['Vector Graphics','ภาพที่กำหนดด้วยรูปทรงและสมการ จึงขยายแล้วขอบยังคม'],
    ['Bitmapped Image','ภาพที่จัดเก็บด้วยพิกเซลเป็นตาราง'],
    ['Point','ตำแหน่งบนระบบพิกัด'],
    ['Vector','ปริมาณที่มีทั้งทิศทางและขนาด'],
    ['Rasterization','การเปลี่ยนรูปทรงหรือเส้นเป็นพิกเซลบนจอ'],
    ['Bézier Curve','เส้นโค้งที่ควบคุมรูปร่างด้วย control points'],
    ['Linear Bézier','เส้นตรงที่หาค่าระหว่างจุดปลายด้วย interpolation'],
    ['Cubic Bézier','เส้นโค้งดีกรีสาม ใช้ control points สี่จุด'],
    ['C¹ Continuity','การเชื่อมเส้นโค้งที่อนุพันธ์อันดับหนึ่งเท่ากันทั้งขนาดและทิศ'],
    ['Affine Transform','การแปลงรูปทรงที่รักษาความขนานของเส้น เช่น ย้าย หมุน ย่อขยาย'],
    ['Stroke','คุณสมบัติเส้นขอบของรูปทรง'],
    ['Fill','คุณสมบัติสีหรือพื้นที่ภายในรูปทรง'],
    ['AND','ส่วนร่วมพื้นที่ของรูปทรง'],
    ['OR','พื้นที่รวมของรูปทรง'],
    ['XOR','พื้นที่ของสองรูปทรงที่ไม่ทับซ้อนกัน'],
    ['Difference','การตัดพื้นที่รูปทรงหนึ่งออกจากอีกรูปทรง'],
    ['Extrusion','สร้างรูปทรง 3D ด้วยการยืดหน้าตัด 2D'],
    ['Lathe','สร้างรูปทรง 3D ด้วยการหมุนเส้นหน้าตัดรอบแกน'],
    ['Vertex','จุดยอดในเรขาคณิตสามมิติ'],
    ['Edge','ขอบหรือเส้นเชื่อมจุดยอด'],
    ['Face','ผิวหน้าของรูปหลายเหลี่ยม'],
    ['Polygon Mesh','ผิวสามมิติที่ประกอบด้วยหลาย polygon เชื่อมกัน'],
    ['Modeling','การสร้างรูปทรงหรือแบบจำลอง 3D'],
    ['Rendering','การสร้างภาพจากแบบจำลอง กล้อง และแสง'],
    ['Perspective Projection','การฉายภาพที่ทำให้วัตถุไกลดูเล็กกว่า'],
    ['Visibility Check','การตรวจว่าส่วนใดถูกวัตถุอื่นบัง'],
    ['Flat Shading','การคำนวณความสว่างแบบคงค่าทั้งหน้า polygon'],
    ['Gouraud Shading','การไล่ความสว่างด้วยการคั่นค่าจากจุดยอด'],
    ['Phong Shading','การไล่ normal ภายในผิวแล้วคำนวณความสว่างต่อจุด'],
    ['Specular Reflection','การสะท้อนเด่นตามทิศทางของแสง'],
    ['Diffuse Reflection','การสะท้อนแสงกระจายหลายทิศทาง']
  ]
};
const fallbacks = {
  'chapter-7::ch7-q21':['G¹ Continuity','C¹ Continuity'],
  'chapter-7::ch7-q27':['Interpolation'],
  'chapter-7::ch7-q29':['Arc Length Table','Speed Control'],
  'chapter-8::ch8-q34':['dBFS','Amplitude'],
  'chapter-8::ch8-q38':['Additive Synthesis','FM Synthesis'],
  'chapter-12::ch12-q18':['Multimedia Computing Pipeline']
};
const norm = value => String(value ?? '').trim().replace(/\\s+/g,' ').toLowerCase();
const escapeRegex = value => value.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&');
const containsTerm = (text,term) => new RegExp('(^|[^A-Za-z0-9])' + escapeRegex(term) + '(?=$|[^A-Za-z0-9])','i').test(text);

export function prepareEnglishQuizVocabulary(chapters) {
 for (const chapter of chapters) {
   const entries = [
     ...chapter.flashcards.filter(f=>f.term&&f.meaning).map(f=>({term:f.term.trim(),meaning:f.meaning.trim()})),
     ...(supplemental[chapter.id]||[]).map(([term,meaning])=>({term,meaning}))
   ];
   const dict = new Map(entries.map(entry=>[norm(entry.meaning),entry]));
   for (const q of chapter.questions) {
     const matched = q.options.map(option=>dict.get(norm(option)));
     // โจทย์วิเคราะห์เดิมจากคำอธิบายศัพท์ 4 ตัวเลือก เปลี่ยนมาเป็นชื่อศัพท์อังกฤษทั้งหมด
     if (matched.length===4 && matched.every(Boolean)) {
       q.options=matched.map(entry=>entry.term);
       q.reasons=matched.map((entry,i)=>i===q.answer
         ? 'ถูกต้อง: '+entry.term+' คือ '+entry.meaning+' จึงสอดคล้องกับสถานการณ์ในโจทย์'
         : 'ยังไม่ตรง: '+entry.term+' คือ '+entry.meaning+' ซึ่งเป็นหลักการอีกอย่างหนึ่งที่ไม่ใช่กรณีนี้');
       q.level='วิเคราะห์ / ประยุกต์';
     }
     // เก็บศัพท์ตามที่ปรากฏจริงในคำถามและตัวเลือก เพื่อให้เรียนศัพท์ระหว่างทำโจทย์ได้
     const visible = q.prompt+' '+q.options.join(' ');
     const found = entries.filter(entry=>containsTerm(visible,entry.term));
     for(const term of fallbacks[chapter.id+'::'+q.id]||[]) {
       const matchedTerm=entries.find(e=>norm(e.term)===norm(term));
       if(matchedTerm && !found.some(e=>norm(e.term)===norm(term)))found.push(matchedTerm);
     }
     // คัดศัพท์ที่ยาวก่อนเพื่อไม่ให้ศัพท์สั้นกลืนศัพท์ที่เจาะจง
     found.sort((a,b)=>b.term.length-a.term.length);
     const unique=[];
     for(const entry of found)if(!unique.some(x=>norm(x.term)===norm(entry.term)))unique.push(entry);
     q.vocabulary=unique.slice(0,8);
   }
 }
}

// ผู้เรียนกดเปิดคำศัพท์ก่อนได้ และเมื่อเฉลยจะแสดงความหมายทันที
export function vocabularyHtml(question,escape,checked=false) {
 const terms=question.vocabulary||[];
 if (!terms.length) return '';
 return '<details class="quiz-vocabulary"'+(checked?' open':'')+'>'+
   '<summary>English Vocabulary · คำศัพท์ในข้อนี้ ('+terms.length+' คำ)'+(checked?' — ความหมายประกอบเฉลย':' — กดดูความหมาย')+'</summary>'+
   '<dl>'+terms.map(({term,meaning})=>'<div><dt>'+escape(term)+'</dt><dd>'+escape(meaning)+'</dd></div>').join('')+'</dl>'+
   (!checked?'<p>เปิดดูศัพท์ก่อนตอบได้หากต้องการฝึกแบบเปิดตำรา หรือค่อยเปิดหลังตรวจคำตอบ</p>':'')+
   '</details>';
}
