(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
  new MutationObserver((t) => {
    for (const e of t)
      if (e.type === 'childList')
        for (const n of e.addedNodes) n.tagName === 'LINK' && n.rel === 'modulepreload' && i(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(t) {
    const e = {};
    return (
      t.integrity && (e.integrity = t.integrity),
      t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (e.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (e.credentials = 'omit')
        : (e.credentials = 'same-origin'),
      e
    );
  }
  function i(t) {
    if (t.ep) return;
    t.ep = !0;
    const e = o(t);
    fetch(t.href, e);
  }
})();
const d = (r, s) => {
    if (r) {
      const o = gsap.timeline({ delay: s, defaults: { duration: 1, ease: 'power1.inOut' } }),
        i = r.querySelectorAll('.gsap'),
        t = gsap.getTweensOf(i);
      if (t.length > 0) return t.forEach((e) => e.kill()), !0;
      i.forEach((e) => {
        e.classList.contains('left') && o.from(e, { x: '-=10%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
          e.classList.contains('right') && o.from(e, { x: '+=10%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
          e.classList.contains('top') && o.from(e, { y: '-=50%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
          e.classList.contains('bottom') && o.from(e, { y: '+=50%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
          e.classList.contains('zoom') && gsap.to(e, { scale: '+=0.1', duration: 20 });
      });
    }
  },
  m = {
    success: ({
      text: r = '',
      title: s = 'Success',
      cancelButtonText: o = 'Close',
      showCloseButton: i = !0,
      showCancelButton: t = !1,
      showConfirmButton: e = !1,
      confirmButtonColor: n = '#3b82f6',
      cancelButtonColor: l = '#ef4444',
      padding: c = 0,
    }) =>
      Swal.fire({
        icon: 'success',
        timer: 3e3,
        title: s,
        text: r,
        cancelButtonText: o,
        showCloseButton: i,
        showCancelButton: t,
        showConfirmButton: e,
        confirmButtonColor: n,
        cancelButtonColor: l,
        padding: c,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    warning: ({
      text: r = '',
      title: s = 'Warning',
      cancelButtonText: o = 'Close',
      confirmButtonText: i = 'Ok',
      showCloseButton: t = !0,
      showCancelButton: e = !0,
      showConfirmButton: n = !0,
      padding: l = 0,
    }) =>
      Swal.fire({
        icon: 'warning',
        title: s,
        text: r,
        cancelButtonText: o,
        confirmButtonText: i,
        showCloseButton: t,
        showCancelButton: e,
        showConfirmButton: n,
        padding: l,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    error: ({
      text: r = '',
      title: s = 'Fail',
      cancelButtonText: o = 'Close',
      showCloseButton: i = !0,
      showCancelButton: t = !0,
      showConfirmButton: e = !1,
      padding: n = 0,
    }) =>
      Swal.fire({
        icon: 'error',
        title: s,
        text: r,
        cancelButtonText: o,
        showCloseButton: i,
        showCancelButton: t,
        showConfirmButton: e,
        padding: n,
        focusCancel: t,
        timer: 6e3,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    confirm: ({
      text: r = '',
      title: s = '',
      cancelButtonText: o = 'Close',
      confirmButtonText: i = 'Ok',
      onConfirm: t = () => null,
      onDenied: e = () => null,
      confirmButtonColor: n = '#3b82f6',
      cancelButtonColor: l = '#ef4444',
      showCloseButton: c = !0,
      showCancelButton: f = !0,
      showConfirmButton: p = !0,
      padding: g = 0,
    }) =>
      Swal.fire({
        icon: 'warning',
        text: r,
        title: s,
        cancelButtonText: o,
        confirmButtonText: i,
        confirmButtonColor: n,
        cancelButtonColor: l,
        showCancelButton: f,
        showConfirmButton: p,
        showCloseButton: c,
        padding: g,
      }).then((u) => {
        u.isConfirmed ? t() : u.isDismissed && e();
      }),
    html: (r) => Swal.fire({ html: r, showConfirmButton: !1, padding: 0 }),
  },
  y = () => {
    const r = {
      loop: !0,
      autoHeight: !0,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: !0 },
      on: {
        init: (s) => d(s.slides[s.activeIndex], 0),
        slideChangeTransitionStart: (s) => d(s.slides[s.activeIndex], 0),
      },
      autoplay: { delay: 5e3 },
    };
    new Swiper('.mySwiper', { ...r, slidesPerView: 1 }),
      new Swiper('.swiperSectionContact', {
        ...r,
        slidesPerView: 2,
        breakpoints: {
          1366: { slidesPerView: 5 },
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          500: { slidesPerView: 2 },
        },
      }),
      new Swiper('.relatedSwiper', {
        ...r,
        slidesPerView: 1,
        breakpoints: { 1024: { slidesPerView: 3 }, 640: { slidesPerView: 2 } },
      });
  },
  w = (r) => {
    Array.from(r).forEach((s) =>
      s.addEventListener('click', () => {
        a(document.getElementById('hamburger'), ['body-menu-opened']),
          a(document.getElementById('bg-menu'), ['opacity-0', '-right-full', 'opacity-50', 'right-0']),
          a(document.getElementById('menu'), ['-right-80', 'right-0']),
          a(document.getElementById('list-menu'), ['top-0', 'opacity-100', 'top-10', 'opacity-0']);
      }),
    );
  },
  a = (r, s) => r && s.forEach((o) => r.classList.toggle(o));
new LazyLoad({ callback_error: (r) => (r.src = 'https://via.placeholder.com/440x560/?text=Error') });
d(document.getElementById('title'), 0);
GLightbox({});
Array.from(document.getElementsByClassName('handle-dialog')).forEach((r) =>
  r.addEventListener('click', () => {
    const s = document.getElementById('template-1');
    if (s) {
      const o = document.importNode(s, !0);
      (o.innerHTML = o.innerHTML.replace(/{{test}}/g, 'TEST')), m.html(o.innerHTML);
    }
  }),
);
y();
w(document.getElementsByClassName('handle-menu'));
