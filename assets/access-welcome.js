/* Cloudflare Access is the security boundary. This page is only a post-login welcome UI. */
const isProtectedHost = location.hostname.endsWith('.workers.dev');
if (isProtectedHost) {
  const overlay = document.getElementById('access-welcome');
  const status = document.getElementById('access-description');
  const email = document.getElementById('access-email');
  const enter = document.getElementById('access-enter');
  const logout = document.getElementById('access-logout');
  document.body.classList.add('access-pending');
  overlay.hidden = false;
  const reveal = () => {
    overlay.hidden = true;
    document.body.classList.remove('access-pending');
    document.getElementById('main')?.focus({preventScroll:true});
  };
  enter.addEventListener('click', reveal);
  logout.addEventListener('click', () => {
    location.assign('/cdn-cgi/access/logout');
  });
  // These details are informational only; Cloudflare enforces the Allow policy server-side.
  fetch('/cdn-cgi/access/get-identity', {credentials:'same-origin',cache:'no-store'})
    .then(response => { if (!response.ok) throw new Error('Identity unavailable'); return response.json(); })
    .then(identity => {
      if (identity && typeof identity.email === 'string') {
        email.textContent = identity.email;
        email.hidden = false;
        status.textContent = 'ยืนยันตัวตนผ่าน Cloudflare Access แล้ว พร้อมเข้าสู่พื้นที่ทบทวนของคุณ';
      } else {
        status.textContent = 'ผ่านการป้องกันของ Cloudflare Access แล้ว กดเข้าสู่เว็บเพื่อดำเนินการต่อ';
      }
    })
    .catch(() => {
      status.textContent = 'ไม่สามารถแสดงข้อมูลบัญชีได้ หากยังไม่ได้ล็อกอิน ให้เข้าสู่ระบบผ่าน Cloudflare Access';
      enter.textContent = 'เข้าสู่เว็บ';
    });
}
