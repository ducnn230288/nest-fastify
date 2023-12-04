(function () {
  const r = document.createElement('link').relList;
  if (r && r.supports && r.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === 'childList')
        for (const s of o.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(n) {
    const o = {};
    return (
      n.integrity && (o.integrity = n.integrity),
      n.referrerPolicy && (o.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (o.credentials = 'omit')
        : (o.credentials = 'same-origin'),
      o
    );
  }
  function i(n) {
    if (n.ep) return;
    n.ep = !0;
    const o = t(n);
    fetch(n.href, o);
  }
})();
const y = {
    success: ({
      text: e = '',
      title: r = 'Success',
      cancelButtonText: t = 'Close',
      showCloseButton: i = !0,
      showCancelButton: n = !1,
      showConfirmButton: o = !1,
      confirmButtonColor: s = '#3b82f6',
      cancelButtonColor: c = '#ef4444',
      padding: u = 0,
    }) =>
      Swal.fire({
        icon: 'success',
        timer: 3e3,
        title: r,
        text: e,
        cancelButtonText: t,
        showCloseButton: i,
        showCancelButton: n,
        showConfirmButton: o,
        confirmButtonColor: s,
        cancelButtonColor: c,
        padding: u,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    warning: ({
      text: e = '',
      title: r = 'Warning',
      cancelButtonText: t = 'Close',
      confirmButtonText: i = 'Ok',
      showCloseButton: n = !0,
      showCancelButton: o = !0,
      showConfirmButton: s = !0,
      padding: c = 0,
    }) =>
      Swal.fire({
        icon: 'warning',
        title: r,
        text: e,
        cancelButtonText: t,
        confirmButtonText: i,
        showCloseButton: n,
        showCancelButton: o,
        showConfirmButton: s,
        padding: c,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    error: ({
      text: e = '',
      title: r = 'Fail',
      cancelButtonText: t = 'Close',
      showCloseButton: i = !0,
      showCancelButton: n = !0,
      showConfirmButton: o = !1,
      padding: s = 0,
    }) =>
      Swal.fire({
        icon: 'error',
        title: r,
        text: e,
        cancelButtonText: t,
        showCloseButton: i,
        showCancelButton: n,
        showConfirmButton: o,
        padding: s,
        focusCancel: n,
        timer: 6e3,
        customClass: { cancelButton: '!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white' },
      }),
    confirm: ({
      text: e = '',
      title: r = '',
      cancelButtonText: t = 'Close',
      confirmButtonText: i = 'Ok',
      onConfirm: n = () => null,
      onDenied: o = () => null,
      confirmButtonColor: s = '#3b82f6',
      cancelButtonColor: c = '#ef4444',
      showCloseButton: u = !0,
      showCancelButton: a = !0,
      showConfirmButton: p = !0,
      padding: l = 0,
    }) =>
      Swal.fire({
        icon: 'warning',
        text: e,
        title: r,
        cancelButtonText: t,
        confirmButtonText: i,
        confirmButtonColor: s,
        cancelButtonColor: c,
        showCancelButton: a,
        showConfirmButton: p,
        showCloseButton: u,
        padding: l,
      }).then((f) => {
        f.isConfirmed ? n() : f.isDismissed && o();
      }),
    html: (e) => Swal.fire({ html: e, showConfirmButton: !1, padding: 0 }),
  },
  S = 'm8nvn*&hKwcgb^D-D#Hz^5CXfKySpY',
  E = 'b7a2bdf4-ac40-4012-9635-ff4b7e55eae0',
  b = 'http://dev1.geneat.vn:7100/api/v1',
  d = {
    init: () => ({
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + (localStorage.getItem(E) || ''),
        'Accept-Language': localStorage.getItem('i18nextLng') || '',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }),
    responsible: async (e, r = {}, t, i = {}) => {
      t.headers = { ...t.headers, ...i };
      const n = Object.keys(r)
          .map((c) => c + '=' + encodeURIComponent(typeof r[c] == 'object' ? JSON.stringify(r[c]) : r[c]))
          .join('&'),
        o = await fetch(b + e + (n && '?' + n), t),
        s = await o.json();
      return o.ok ? s : (o.status === 401 && (localStorage.removeItem(S), location.reload()), {});
    },
    get: (e, r = {}, t) => d.responsible(e, r, { ...d.init(), method: 'GET' }, t),
    post: (e, r = {}, t = {}, i) => d.responsible(e, t, { ...d.init(), method: 'POST', body: JSON.stringify(r) }, i),
    put: (e, r = {}, t = {}, i) => d.responsible(e, t, { ...d.init(), method: 'PUT', body: JSON.stringify(r) }, i),
    delete: (e, r = {}, t) => d.responsible(e, r, { ...d.init(), method: 'DELETE' }, t),
  },
  g = () => {
    (window._FORM_ = {}),
      (window._FORMSTATUS_ = {}),
      (window._SELECT_ = {}),
      Array.from(document.getElementsByTagName('form')).forEach((e) => {
        (window._FORM_[e.name] = {}),
          (window._FORMSTATUS_[e.name] = !1),
          (window._SELECT_[e.name] = {}),
          e.addEventListener('submit', (r) => {
            r.preventDefault(), _(e);
          }),
          Array.from(['input', 'textarea']).forEach((r) =>
            Array.from(e.querySelectorAll(r)).forEach((t) => {
              t.addEventListener('blur', () => m(t, r, 'blur', e.name), !1);
            }),
          ),
          Array.from(['.pretty > input', 'select']).forEach((r) =>
            Array.from(e.querySelectorAll(r)).forEach((t) => {
              t.type.indexOf('select') > -1 &&
                (window._SELECT_[e.name][t.name] = new Choices(t, { removeItemButton: !0 })),
                t.addEventListener('change', () => m(t, r, 'change', e.name), !1);
            }),
          );
      });
  },
  _ = (e) => (
    Array.from(['input', 'textarea']).forEach((r) =>
      e.querySelectorAll('.group > ' + r).forEach((t) => {
        m(t, r, 'blur', e.name);
      }),
    ),
    Array.from(['.pretty > input', 'select']).forEach((r) =>
      e.querySelectorAll(r).forEach((t) => {
        m(t, r, 'change', e.name, !0);
      }),
    ),
    (window._FORMSTATUS_[e.name] = e.querySelectorAll('.group.error').length === 0),
    !0
  ),
  m = (e, r, t, i, n = !1) => {
    const o = e.closest('.group');
    if (o) {
      n ||
        (r === 'select'
          ? (window._FORM_[i][e.name] =
              e.type.indexOf('multiple') > -1
                ? window._SELECT_[i][e.name].getValue().map((a) => a.value)
                : window._SELECT_[i][e.name].getValue().value)
          : (window._FORM_[i][e.name.replace('[]', '')] =
              e.name.indexOf('[]') === -1
                ? e.value
                : [].filter.call(document.getElementsByName(e.name), (a) => a.checked).map((a) => a.value)));
      const s = L(e, i, n),
        c = gsap.timeline({ defaults: { duration: 0.3, ease: 'power1.inOut' } }),
        u = o.querySelector('p');
      if (s)
        if (u) u.innerHTML = s;
        else {
          r === 'select' && window._SELECT_[i][e.name].destroy();
          const a = o.querySelectorAll(r);
          o.innerHTML += `<p class="error">${s}</p>`;
          const p = o.querySelector('p');
          c.from(p, { marginTop: '-15', opacity: '0', fontSize: '10' }),
            o.classList.add('error'),
            Array.from(o.querySelectorAll(r)).forEach((l, f) => {
              r === 'select' && (window._SELECT_[i][l.name] = new Choices(l, { removeItemButton: !0 })),
                (l.checked = a[f].checked),
                (l.value = a[f].value),
                l.addEventListener(t, () => m(l, r, t, i), !1);
            });
        }
      else {
        const a = o.querySelectorAll(r);
        o.classList.remove('error'),
          u && c.to(u, { marginTop: '-15', opacity: '0', fontSize: '10' }),
          setTimeout(() => {
            var p;
            (p = o.querySelector('p')) == null || p.remove(),
              Array.from(o.querySelectorAll(r)).forEach((l, f) => {
                (l.checked = a[f].checked), l.addEventListener(t, () => m(l, r, t, i), !1);
              });
          }, 300);
      }
    }
  },
  L = ({ value: e, required: r, type: t, name: i, dataset: n }, o, s) => (
    (s || (t === 'checkbox' && i.indexOf('[]') > -1)) && (e = window._FORM_[o][i.replace('[]', '')]),
    !e && r && i.indexOf('[]') === -1
      ? window._MESSAGE_.required
      : e && t === 'email' && !A.test(e.trim())
      ? window._MESSAGE_.email
      : t === 'checkbox' &&
        i.indexOf('[]') > -1 &&
        n.hasOwnProperty('mincheck') &&
        (!e || e.length < parseInt(n.mincheck))
      ? window._MESSAGE_.mincheck + n.mincheck
      : ''
  ),
  A =
    /^(([^<>()[\]\\.,;:$%^&*\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  O = (e) => {
    Array.from(e).forEach((r) =>
      r.addEventListener('click', () => {
        w(document.getElementById('hamburger'), ['body-menu-opened']),
          w(document.getElementById('bg-menu'), ['opacity-0', '-right-full', 'opacity-50', 'right-0']),
          w(document.getElementById('menu'), ['-right-80', 'right-0']),
          w(document.getElementById('list-menu'), ['top-0', 'opacity-100', 'top-10', 'opacity-0']);
      }),
    );
  },
  w = (e, r) => e && r.forEach((t) => e.classList.toggle(t)),
  h = (e, r) => {
    const t = gsap.timeline({ delay: r, defaults: { duration: 1, ease: 'power1.inOut' } }),
      i = e.querySelectorAll('.gsap');
    i.forEach((o) => {
      o.classList.contains('left') && t.from(o, { x: '-=10%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
        o.classList.contains('right') && t.from(o, { x: '+=10%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
        o.classList.contains('top') && t.from(o, { y: '-=50%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
        o.classList.contains('bottom') && t.from(o, { y: '+=50%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
        o.classList.contains('zoom') && gsap.to(o, { scale: '+=0.1', duration: 20 });
    });
  },
  T = () => {
    const e = {
      loop: !0,
      autoHeight: !0,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: !0 },
      on: {
        init: (r) => h(r.slides[r.activeIndex], 0),
        slideChangeTransitionStart: (r) => h(r.slides[r.activeIndex], 0),
      },
      autoplay: { delay: 5e3 },
    };
    new Swiper('.mySwiper', { ...e, slidesPerView: 1 }),
      new Swiper('.swiperSectionContact', {
        ...e,
        slidesPerView: 2,
        breakpoints: {
          1366: { slidesPerView: 5 },
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          500: { slidesPerView: 2 },
        },
      }),
      new Swiper('.relatedSwiper', {
        ...e,
        slidesPerView: 1,
        breakpoints: { 1024: { slidesPerView: 3 }, 640: { slidesPerView: 2 } },
      });
  };
new LazyLoad({ callback_error: (e) => (e.src = 'https://via.placeholder.com/1x1/?text=') });
GLightbox({});
g();
window.API = d;
window.Message = y;
window.SetupFormValid = g;
O(document.getElementsByClassName('handle-menu'));
T();
