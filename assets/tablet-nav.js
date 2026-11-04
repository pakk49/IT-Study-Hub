// Tablet/iPad navigation: accessible off-canvas sidebar with Escape and outside-tap closing.
const toggle=document.getElementById('tablet-menu-button');
const backdrop=document.getElementById('tablet-nav-backdrop');
const sidebar=document.getElementById('site-sidebar');
let lastFocused=null;
function setOpen(open){
 document.body.classList.toggle('tablet-nav-open',open);
 toggle.setAttribute('aria-expanded',String(open));
 toggle.setAttribute('aria-label',open?'ปิดเมนูเลือกวิชา':'เปิดเมนูเลือกวิชา');
 if(open){lastFocused=document.activeElement;sidebar.querySelector('a')?.focus({preventScroll:true})}
 else if(sidebar.contains(document.activeElement)){(lastFocused||toggle).focus({preventScroll:true})}
}
toggle?.addEventListener('click',()=>setOpen(!document.body.classList.contains('tablet-nav-open')));
backdrop?.addEventListener('click',()=>setOpen(false));
sidebar?.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('tablet-nav-open'))setOpen(false)});
window.addEventListener('resize',()=>{if(window.innerWidth>1100&&document.body.classList.contains('tablet-nav-open'))setOpen(false)});
