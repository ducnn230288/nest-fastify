/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) o(n);
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === 'childList')
        for (const a of s.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && o(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(n) {
    const s = {};
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    );
  }
  function o(n) {
    if (n.ep) return;
    n.ep = !0;
    const s = t(n);
    fetch(n.href, s);
  }
})();
const l = (c, e) => {
    const t = gsap.timeline({ delay: e, defaults: { duration: 1, ease: 'power1.inOut' } }),
      o = c.querySelectorAll('.gsap'),
      n = gsap.getTweensOf(o);
    if (n.length > 0) return n.forEach((s) => s.kill()), !0;
    o.forEach((s) => {
      s.classList.contains('left') && t.from(s, { x: '-=10%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
        s.classList.contains('right') && t.from(s, { x: '+=10%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
        s.classList.contains('top') && t.from(s, { y: '-=50%', scale: '+=0.15', opacity: '-=1' }, '<0.25'),
        s.classList.contains('bottom') && t.from(s, { y: '+=50%', scale: '+=0.15', opacity: '-=1' }, '<0.5'),
        s.classList.contains('zoom') && gsap.to(s, { scale: '+=0.1', duration: 20 });
    });
  },
  w = () => {
    const c = {
      loop: !0,
      autoHeight: !0,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: !0 },
      on: {
        init: (e) => l(e.slides[e.activeIndex], 0),
        slideChangeTransitionStart: (e) => l(e.slides[e.activeIndex], 0),
      },
      autoplay: { delay: 5e3 },
    };
    new Swiper('.mySwiper', { ...c, slidesPerView: 1 }),
      new Swiper('.swiper-section-contact', {
        ...c,
        slidesPerView: 2,
        breakpoints: {
          1366: { slidesPerView: 5 },
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          500: { slidesPerView: 2 },
        },
      }),
      new Swiper('.related-swiper', {
        ...c,
        slidesPerView: 1,
        breakpoints: { 1024: { slidesPerView: 3 }, 640: { slidesPerView: 2 } },
      });
  },
  d = (c, e, t, o, n, s) => {
    const a = {
      loop: s,
      autoHeight: !1,
      speed: 1200,
      navigation: { nextEl: `.btn-next-${c}`, prevEl: `.btn-prev-${c}` },
      on: {
        init: (r) => l(r.slides[r.activeIndex], 0),
        slideChangeTransitionStart: (r) => l(r.slides[r.activeIndex], 0),
      },
    };
    new Swiper(`.mySwiper-${c}`, {
      ...a,
      slidesPerView: e,
      pagination: t && { el: '.swiper-pagination', type: 'bullets', clickable: !0 },
      autoplay: o && { delay: o, disableOnInteraction: !1 },
      spaceBetween: 20,
      breakpoints: n && {
        1280: { slidesPerView: n.slidePer_xl },
        1024: { slidesPerView: n.slidePer_lg },
        768: { slidesPerView: n.slidePer_md },
        640: { slidesPerView: n.slidePer_sm },
      },
    });
  },
  x = (c) => {
    [...c].forEach((t) => {
      const o = setInterval(() => {
        const n = t.dataset.time,
          s = new Date().getTime(),
          r = new Date(`${n} 00:00:00`).getTime() - s,
          p = String(Math.floor(r / 864e5)),
          L = String(Math.floor(r / 36e5) % 24),
          y = String(Math.floor(r / 6e4) % 60),
          f = String(Math.floor(r / 1e3) % 60),
          h = t.querySelector('.countdown-day'),
          v = t.querySelector('.countdown-hours'),
          S = t.querySelector('.countdown-minutes'),
          m = t.querySelector('.countdown-seconds');
        (h.innerHTML = p), (v.innerHTML = L), (S.innerHTML = y), (m.innerHTML = f), r || clearInterval(o);
      }, 1e3);
    });
  },
  b = (c) => {
    Array.from(c).forEach((e) =>
      e.addEventListener('click', () => {
        i(document.getElementById('hamburger'), ['body-menu-opened']),
          i(document.getElementById('bg-menu'), ['opacity-0', '-right-full', 'opacity-50', 'right-0']),
          i(document.getElementById('menu'), ['-right-80', 'right-0']),
          i(document.getElementById('list-menu'), ['top-0', 'opacity-100', 'top-10', 'opacity-0']);
      }),
    );
  },
  i = (c, e) => c && e.forEach((t) => c.classList.toggle(t)),
  u = (c, e, t) => {
    [...document.getElementsByClassName(c)].forEach((o) => {
      e.forEach((n) => {
        o.addEventListener('mouseover', (s) => {
          s.preventDefault(), i(o.querySelector(`.${n}`), t);
        }),
          o.addEventListener('mouseout', (s) => {
            s.preventDefault(), i(o.querySelector(`.${n}`), t);
          });
      });
    });
  },
  q = (c) => {
    const e = document.getElementById('arrow'),
      t = document.getElementById('dropmenu');
    c.addEventListener('click', () =>
      t != null && t.classList.contains('invisible')
        ? t == null
          ? void 0
          : t.classList.remove('invisible')
        : t == null
        ? void 0
        : t.classList.add('invisible'),
    ),
      c.addEventListener('click', () =>
        t != null && t.classList.contains('invisible')
          ? e == null
            ? void 0
            : e.classList.replace('fa-chevron-up', 'fa-chevron-down')
          : e == null
          ? void 0
          : e.classList.replace('fa-chevron-down', 'fa-chevron-up'),
      );
  },
  k = (c) => {
    const e = document.getElementById('category');
    c.addEventListener('click', () =>
      e != null && e.classList.contains('invisible')
        ? e.classList.remove('invisible')
        : e == null
        ? void 0
        : e.classList.add('invisible'),
    );
  },
  E = (c) => {
    const e = document.querySelectorAll('.item'),
      t = document.getElementById('category');
    e == null ||
      e.forEach((o) => {
        o.addEventListener('click', () => {
          let n = o.querySelector('.itemtext');
          (c.innerText = n == null ? void 0 : n.innerText),
            t != null && t.classList.contains('invisible')
              ? t.classList.remove('invisible')
              : t == null || t.classList.add('invisible'),
            e.forEach((s) => {
              s.classList.remove('bg-gray-200');
            }),
            o.classList.add('bg-gray-200');
        });
      });
  },
  P = (c) => {
    const e = [
        'All Categories',
        'Milks and Dairies',
        'Wines & Alcohol',
        'Clothing & Beauty',
        'Pet Foods & Toy',
        'Fast food',
        'Baking material',
        'Vegetables',
        'Fresh Seafood',
        'Noodles & Rice',
        'Ice Cream',
      ],
      t = document.querySelector('#listitems');
    c.addEventListener('keyup', () => {
      let o = [],
        n = c.value;
      (o = e
        .filter((s) => s.toLowerCase().includes(n))
        .map(
          (
            s,
          ) => `<li class="item font-quicksand text-gray-grey text-[15px] cursor-pointer ml-2 py-2 hover:bg-green-bggrn">
                          <span class="itemtext">${s}</span>
                      </li>`,
        )
        .join('')),
        t != null &&
          (t.innerHTML = o || '<span class="font-quicksand text-gray-grey text-[15px]">No result found</span>');
    });
  },
  I = (c) => {
    const e = document.querySelector('#moreitem1'),
      t = document.querySelector('#moreitem2'),
      o = document.querySelector('#moreitem3'),
      n = document.querySelector('#moreitem4'),
      s = document.getElementById('plus');
    c.addEventListener('click', () => {
      e != null && e.classList.contains('hidden')
        ? s == null || s.classList.replace('fa-plus-circle', 'fa-minus-circle')
        : s == null || s.classList.replace('fa-minus-circle', 'fa-plus-circle'),
        e == null || e.classList.toggle('hidden'),
        t == null || t.classList.toggle('hidden'),
        o == null || o.classList.toggle('hidden'),
        n == null || n.classList.toggle('hidden');
    });
  },
  C = (c) => {
    const e = document.querySelector('#hometitle'),
      t = document.querySelector('#homelist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  B = (c) => {
    const e = document.querySelector('#shoptitle'),
      t = document.querySelector('#shoplist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  V = (c) => {
    const e = document.querySelector('#producttitle'),
      t = document.querySelector('#productlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  T = (c) => {
    const e = document.querySelector('#invtitle'),
      t = document.querySelector('#invlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  _ = (c) => {
    const e = document.querySelector('#ventitle'),
      t = document.querySelector('#venlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  M = (c) => {
    const e = document.querySelector('#megatitle'),
      t = document.querySelector('#megalist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  A = (c) => {
    const e = document.querySelector('#wmtitle'),
      t = document.querySelector('#wmlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  H = (c) => {
    const e = document.querySelector('#mtitle'),
      t = document.querySelector('#mlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  O = (c) => {
    const e = document.querySelector('#techtitle'),
      t = document.querySelector('#techlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  D = (c) => {
    const e = document.querySelector('#blogtitle'),
      t = document.querySelector('#bloglist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  N = (c) => {
    const e = document.querySelector('#layouttitle'),
      t = document.querySelector('#layoutlist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  $ = (c) => {
    const e = document.querySelector('#pagetitle'),
      t = document.querySelector('#pagelist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  F = (c) => {
    const e = document.querySelector('#lngtitle'),
      t = document.querySelector('#lnglist');
    c.addEventListener('click', () => {
      c.classList.contains('fa-chevron-down')
        ? c.classList.replace('fa-chevron-down', 'fa-chevron-up')
        : c.classList.replace('fa-chevron-up', 'fa-chevron-down'),
        t == null || t.classList.toggle('hidden'),
        t != null && t.classList.contains('hidden')
          ? e == null || e.classList.replace('text-green-grn', 'text-gray-blck')
          : e == null || e.classList.replace('text-gray-blck', 'text-green-grn');
    });
  },
  z = (c) => {
    const e = document.querySelector('#slidemenu');
    c.addEventListener('click', () => {
      e == null || e.classList.add('-translate-x-full');
    });
  },
  g = (c) => {
    const e = document.querySelector('#slidemenu');
    c.addEventListener('click', () => {
      e == null || e.classList.remove('-translate-x-full');
    });
  },
  W = (c) => {
    c.querySelectorAll('.cover').forEach((t) => {
      const o = t.querySelector('.gsapt'),
        n = t.querySelector('.gsapd');
      o == null ||
        o.addEventListener('mouseover', () => {
          gsap.from(n, { y: 10, opacity: 0, ease: 'power1.in', duration: 0.5 });
        }),
        o == null ||
          o.addEventListener('mouseout', () => {
            gsap.from(n, { y: 0, opacity: '+=1', ease: 'power1.in', duration: 0.5 });
          });
    });
  };
new LazyLoad({ callback_error: (c) => (c.src = 'https://via.placeholder.com/440x560/?text=Error') });
w();
d('cate', 2, !1, !1, { slidePer_xl: 10, slidePer_lg: 6, slidePer_md: 4, slidePer_sm: 3 }, !0);
d('banner', 1, !0, 3e3, !1, !0);
d('sale', 1, !1, 1e3, { slidePer_xl: 3, slidePer_lg: 3, slidePer_md: 2, slidePer_sm: 1 }, !0);
const j = document.getElementsByClassName('deals-countdown');
x(j);
u('card-product', ['hover-img', 'hover-product_action'], ['opacity-0', 'opacity-100']);
u('product-action_heart', ['product-label_heart'], ['hidden', 'block']);
b(document.getElementsByClassName('handle-menu'));
GLightbox({});
Inputmask().mask(document.querySelectorAll('input'));
q(document.querySelector('#menubtn'));
k(document.querySelector('#btnlist'));
E(document.querySelector('#btnlist'));
P(document.querySelector('#search'));
I(document.querySelector('#plusbtn'));
C(document.querySelector('#homebtn'));
B(document.querySelector('#shopbtn'));
V(document.querySelector('#productbtn'));
T(document.querySelector('#invbtn'));
_(document.querySelector('#venbtn'));
M(document.querySelector('#megabtn'));
A(document.querySelector('#wmbtn'));
H(document.querySelector('#mbtn'));
O(document.querySelector('#techbtn'));
D(document.querySelector('#blogbtn'));
N(document.querySelector('#layoutbtn'));
F(document.querySelector('#lngbtn'));
$(document.querySelector('#pagebtn'));
z(document.querySelector('#closemenu'));
g(document.querySelector('.openmenu'));
g(document.querySelector('.openmenu2'));
W(document.querySelector('#navxl'));
