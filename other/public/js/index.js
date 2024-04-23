(function () {
  const a = document.createElement('link').relList;
  if (a && a.supports && a.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) n(t);
  new MutationObserver((t) => {
    for (const i of t)
      if (i.type === 'childList')
        for (const h of i.addedNodes) h.tagName === 'LINK' && h.rel === 'modulepreload' && n(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const i = {};
    return (
      t.integrity && (i.integrity = t.integrity),
      t.referrerPolicy && (i.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : t.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    );
  }
  function n(t) {
    if (t.ep) return;
    t.ep = !0;
    const i = s(t);
    fetch(t.href, i);
  }
})();
const o = (e, a) => {
  const s = document.getElementById(e);
  if (s) {
    const t = Handlebars.compile(s.innerHTML),
      i = {
        ourservices: [
          { src: '/images/0.png', span: 'Product Design', h6: 'Digital Product Design' },
          { src: '/images/1.png', span: 'Customs Services', h6: 'Branding & Design' },
          { src: '/images/2.png', span: 'Product Development', h6: 'Web Development' },
        ],
        peoplesays: [
          { src: '/images/ceo.jpg', name: 'Leonard Heiser', position: 'CEO' },
          { src: '/images/ceo2.jpg', name: 'Leonard Heiser', position: 'CEO' },
        ],
        scrollimg: [
          { src: '/images/sec1.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
          { src: '/images/sec2.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
          { src: '/images/sec3.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
          { src: '/images/sec4.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
          { src: '/images/sec5.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
          { src: '/images/06.jpg', span: 'WEB DESIGN', h5: 'Color Integration', h6: '2023' },
        ],
        ourblogs: [
          { src: '/images/h1.jpg', span: 'AUGUST 6, 2022', h5: 'Free advertising for your online business.' },
          { src: '/images/h4.jpg', span: 'AUGUST 6, 2022', h5: 'Business meeting 2023 in San Francisco.' },
        ],
        'homedark-light': [
          { p: 'Main Home', href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-main.html' },
          {
            p: 'Corporate Bussiness',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-corporate.html',
          },
          { p: 'Home One Page', href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-onepage.html' },
          {
            p: 'Digital Agency',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-digital-agency.html',
          },
          { p: 'FreeLancer', href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-freelancer.html' },
          {
            p: 'Maketing Agency',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-marketing-agency.html',
          },
          {
            p: 'Creative Agency',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-creative-agency.html',
          },
          {
            p: 'Startup Bussiness',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-startup.html',
          },
          {
            p: 'Archiecture',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/home-architecture.html',
          },
        ],
        showcase: [
          {
            p: ' Parallax Slider',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-parallax-slider.html',
          },
          {
            p: ' Flame Slider',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-frame-slider.html',
          },
          {
            p: ' Circle Slider',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-circle-slider.html',
          },
          {
            p: ' Showcase Carousel',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-carousel.html',
          },
          {
            p: ' Interactive Links1',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-interactive-center-horizontal.html',
          },
          {
            p: ' Interactive Links2',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-interactive-center.html',
          },
          {
            p: ' Vertical Parallax',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/dark/showcase-parallax.html',
          },
        ],
        showcaselight: [
          {
            p: ' Parallax Slider',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax-slider.html',
          },
          {
            p: ' Showcase Carousel',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-frame-slider.html',
          },
          {
            p: ' Interactive Links1',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center-horizontal.html',
          },
          {
            p: ' Interactive Links2',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center.html',
          },
          {
            p: ' Vertical Parallax',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax.html',
          },
        ],
        page: [
          {
            p: ' About',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax-slider.html',
          },
          {
            p: ' Service',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-frame-slider.html',
          },
          {
            p: 'Out Team',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center-horizontal.html',
          },
          {
            p: ' Contact us',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center.html',
          },
        ],
        porfolio: [
          {
            p: ' Portfolio Metro',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax-slider.html',
          },
          {
            p: ' Modern Grid',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-frame-slider.html',
          },
          {
            p: 'Project Details 1',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center-horizontal.html',
          },
          {
            p: ' Project Details 2',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center.html',
          },
        ],
        blog: [
          {
            p: ' Blog Standert',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax-slider.html',
          },
          {
            p: ' Block List',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-frame-slider.html',
          },
          {
            p: 'Image Out Frame',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center-horizontal.html',
          },
          {
            p: 'Blog Detail',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center.html',
          },
        ],
        shop: [
          {
            p: ' Shop List',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-parallax-slider.html',
          },
          {
            p: 'Single Product  ',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-frame-slider.html',
          },
          {
            p: 'Cart',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center-horizontal.html',
          },
          {
            p: 'Check Out',
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/showcase-interactive-center.html',
          },
        ],
        infiniteRotate: [
          { h4: 'UI-UX Experience' },
          { h4: 'Web Development' },
          { h4: 'Digital Marketing' },
          { h4: 'Product Design' },
          { h4: 'Mobile Solutions' },
        ],
        classicGrid: [
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-grid-2.html',
            p: 'Grid 2 Columns',
          },
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-grid-3.html',
            p: 'Grid 3 Columns',
          },
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-grid-4.html',
            p: 'Grid 4 Columns',
          },
        ],
        mansory: [
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-masonry-2.html',
            p: 'Mansory 2 Columns',
          },
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-masonry-3.html',
            p: 'Mansory 3 Columns',
          },
          {
            href: 'https://ui-themez.smartinnovates.net/items/geekfolio/light/portfolio-masonry-4.html',
            p: 'Mansory 4 Columns',
          },
        ],
        services: [
          { stt: '01', name: 'UI/UX Design' },
          { stt: '02', name: 'Branding' },
          { stt: '03', name: 'Development' },
          { stt: '04', name: 'Marketing' },
        ],
      };
    var n = document.querySelectorAll(a);
    n.forEach(function (h) {
      h.innerHTML = t(i);
    });
  }
};
o('template-ourservices', '.ourservices');
o('template-peoplesays', '.peoplesays');
o('template-scrollimg', '.scrollimg');
o('template-ourblogs', '.ourblogs');
o('template-homedark-light', '.homedark-light');
o('template-showcase', '.showcase');
o('template-showcaselight', '.showcaselight');
o('template-page', '.page');
o('template-porfolio', '.porfolio');
o('template-blog', '.blog');
o('template-shop', '.shop');
o('template-infiniteRotate', '.infiniteRotate');
o('template-classicGrid', '.classicGrid');
o('template-mansory', '.mansory');
o('template-stars', '.stars');
o('template-services', '.services');
const u = (e) => {
    Array.from(e).forEach((a) =>
      a.addEventListener('click', () => {
        const s = document.getElementById('hamburger').classList.contains('active');
        setTimeout(
          () => {
            r(document.getElementById('bg-menu'), ['opacity-0', 'opacity-100', 'invisible']);
          },
          s ? 200 : 0,
        ),
          setTimeout(
            () => {
              r(document.getElementById('hamburger'), ['active']),
                r(document.getElementById('menu'), ['invisible', 'opacity-0', 'opacity-100']),
                r(document.getElementById('search-container'), [
                  'invisible',
                  'opacity-0',
                  'opacity-100',
                  'top-28',
                  'top-full',
                ]),
                r(document.getElementById('bg-search'), ['h-20', 'h-0', 'opacity-5', 'bg-black']),
                r(document.getElementById('icon-close'), ['invisible', 'opacity-0', 'opacity-100', '-translate-y-4']),
                r(document.getElementById('icon-search'), [
                  'visible',
                  'invisible',
                  'opacity-0',
                  'opacity-100',
                  '-translate-y-4',
                ]),
                r(document.getElementById('list-menu'), []),
                r(document.getElementById('handle-navbar'), ['border-b']);
            },
            s ? 0 : 200,
          );
      }),
    );
  },
  r = (e, a) => e && a.forEach((s) => e.classList.toggle(s));
u(document.getElementsByClassName('handle-menu'));
u(document.getElementsByClassName('handle-search'));
const f = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 48,
    loop: !0,
    pagination: { el: '.swiper-pagination', clickable: !0 },
    navigation: { nextEl: '.button-next', prevEl: '.button-prev' },
    autoplay: { delay: 5e3 },
  }),
  v = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: !0,
    live: !0,
    callback: function (e) {
      console.log(e);
    },
    scrollContainer: null,
  });
f.init();
v.init();
const l = {},
  m = {};
document.querySelectorAll('.handle-collapse').forEach((e) => {
  e.addEventListener('click', (a) => {
    a.preventDefault();
    const s = a.currentTarget.id,
      n = a.currentTarget.parentElement,
      t = n == null ? void 0 : n.querySelector('.handle-content');
    if (
      (document.querySelectorAll('.handle-content').forEach((i) => {
        i !== t && l[i.id] && (l[i.id].reverse(), (m[i.id] = !0));
      }),
      !l[s])
    )
      l[s] = gsap.timeline({ defaults: { duration: 0.25, ease: 'power1.inOut' } });
    else {
      l[s][m[s] ? 'play' : 'reverse'](), (m[s] = !m[s]);
      return;
    }
    t && l[s].to(t, { height: 'auto' }, '0');
  });
});
window.addEventListener('scroll', () => {
  var e = document.querySelector('#header');
  e.classList.toggle('sticky', scrollY > 0);
});
const c = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  let a = e.clientX;
  var s = e.clientY;
  (c.style.left = a + 'px'), (c.style.top = s + 'px');
});
document.querySelectorAll('a').forEach((e) => {
  e.addEventListener('mouseover', () => {
    c.classList.add('cursor-active');
  });
});
document.querySelectorAll('a').forEach((e) => {
  e.addEventListener('mouseout', () => {
    c.classList.remove('cursor-active');
  });
});
const y = GLightbox({ touchNavigation: !1, loop: !1, autoplayVideos: !0 });
y.init();
const p = document.getElementById('horizontal');
let g = gsap.utils.toArray('.horizontal__item');
function d() {
  let e = p.offsetWidth;
  console.log(e),
    e > 1024 &&
      gsap.to(g, {
        xPercent: -100 * (g.length - 1),
        duration: 1,
        scrollTrigger: { trigger: p, pin: !0, scrub: 1, snap: 1 / (g.length - 1), end: '+=' + p.offsetWidth },
      });
}
d();
window.addEventListener('resize', d);
