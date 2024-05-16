(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) i(o);
    new MutationObserver(o => {
        for (const s of o)
            if (s.type === "childList")
                for (const c of s.addedNodes) c.tagName === "LINK" && c.rel === "modulepreload" && i(c)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity), o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function i(o) {
        if (o.ep) return;
        o.ep = !0;
        const s = n(o);
        fetch(o.href, s)
    }
})();
const y = {
    success: ({
        text: e = "",
        title: t = "Success",
        cancelButtonText: n = "Close",
        showCloseButton: i = !0,
        showCancelButton: o = !1,
        showConfirmButton: s = !1,
        confirmButtonColor: c = "#3b82f6",
        cancelButtonColor: r = "#ef4444",
        padding: a = 0
    }) => Swal.fire({
        icon: "success",
        timer: 3e3,
        title: t,
        text: e,
        cancelButtonText: n,
        showCloseButton: i,
        showCancelButton: o,
        showConfirmButton: s,
        confirmButtonColor: c,
        cancelButtonColor: r,
        padding: a,
        customClass: {
            cancelButton: "!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white"
        }
    }),
    warning: ({
        text: e = "",
        title: t = "Warning",
        cancelButtonText: n = "Close",
        confirmButtonText: i = "Ok",
        showCloseButton: o = !0,
        showCancelButton: s = !0,
        showConfirmButton: c = !0,
        padding: r = 0
    }) => Swal.fire({
        icon: "warning",
        title: t,
        text: e,
        cancelButtonText: n,
        confirmButtonText: i,
        showCloseButton: o,
        showCancelButton: s,
        showConfirmButton: c,
        padding: r,
        customClass: {
            cancelButton: "!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white"
        }
    }),
    error: ({
        text: e = "",
        title: t = "Fail",
        cancelButtonText: n = "Close",
        showCloseButton: i = !0,
        showCancelButton: o = !0,
        showConfirmButton: s = !1,
        padding: c = 0
    }) => Swal.fire({
        icon: "error",
        title: t,
        text: e,
        cancelButtonText: n,
        showCloseButton: i,
        showCancelButton: o,
        showConfirmButton: s,
        padding: c,
        focusCancel: o,
        timer: 6e3,
        customClass: {
            cancelButton: "!border !border-solid !border-black-900 !rounded-lg !text-teal-900 !bg-white"
        }
    }),
    confirm: ({
        text: e = "",
        title: t = "",
        cancelButtonText: n = "Close",
        confirmButtonText: i = "Ok",
        onConfirm: o = () => null,
        onDenied: s = () => null,
        confirmButtonColor: c = "#3b82f6",
        cancelButtonColor: r = "#ef4444",
        showCloseButton: a = !0,
        showCancelButton: l = !0,
        showConfirmButton: h = !0,
        padding: d = 0
    }) => Swal.fire({
        icon: "warning",
        text: e,
        title: t,
        cancelButtonText: n,
        confirmButtonText: i,
        confirmButtonColor: c,
        cancelButtonColor: r,
        showCancelButton: l,
        showConfirmButton: h,
        showCloseButton: a,
        padding: d
    }).then(m => {
        m.isConfirmed ? o() : m.isDismissed && s()
    }),
    html: e => Swal.fire({
        html: e,
        showConfirmButton: !1,
        padding: 0
    })
},
    L = "m8nvn*&hKwcgb^D-D#Hz^5CXfKySpY",
    S = "b7a2bdf4-ac40-4012-9635-ff4b7e55eae0",
    E = "http://dev1.geneat.vn:7100/api/v1",
    p = {
        init: () => ({
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + (localStorage.getItem(S) || ""),
                "Accept-Language": localStorage.getItem("i18nextLng") || ""
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        }),
        responsible: async (e, t = {}, n, i = {}) => {
            n.headers = {
                ...n.headers,
                ...i
            };
            const o = Object.keys(t).map(r => r + "=" + encodeURIComponent(typeof t[r] == "object" ? JSON.stringify(t[r]) : t[r])).join("&"),
                s = await fetch(E + e + (o && "?" + o), n),
                c = await s.json();
            return s.ok || s.status === 401 && (localStorage.removeItem(L), location.reload()), c
        },
        get: (e, t = {}, n) => p.responsible(e, t, {
            ...p.init(),
            method: "GET"
        }, n),
        post: (e, t = {}, n = {}, i) => p.responsible(e, n, {
            ...p.init(),
            method: "POST",
            body: JSON.stringify(t)
        }, i),
        put: (e, t = {}, n = {}, i) => p.responsible(e, n, {
            ...p.init(),
            method: "PUT",
            body: JSON.stringify(t)
        }, i),
        delete: (e, t = {}, n) => p.responsible(e, t, {
            ...p.init(),
            method: "DELETE"
        }, n)
    },
    w = () => {
        window._FORM_ = {}, window._FORMSTATUS_ = {}, window._SELECT_ = {}, Array.from(document.getElementsByTagName("form")).forEach(e => {
            e.noValidate && (window._FORM_[e.name] = {}, window._FORMSTATUS_[e.name] = !1, window._SELECT_[e.name] = {}, e.addEventListener("submit", t => {
                t.preventDefault(), b(e)
            }), Array.from(["input", "textarea"]).forEach(t => Array.from(e.querySelectorAll(t)).forEach(n => {
                n.type === "range" && rangeSlider(n), n.addEventListener("blur", () => u(n, t, "blur", e.name), !1)
            })), Array.from([".pretty > input", "select"]).forEach(t => Array.from(e.querySelectorAll(t)).forEach(n => {
                n.type.indexOf("select") > -1 && (window._SELECT_[e.name][n.name] = new Choices(n, {
                    removeItemButton: !0
                })), n.addEventListener("change", () => u(n, t, "change", e.name), !1)
            })))
        })
    },
    b = e => (Array.from(["input", "textarea"]).forEach(t => e.querySelectorAll(".group > " + t).forEach(n => {
        u(n, t, "blur", e.name)
    })), Array.from([".pretty > input", "select"]).forEach(t => e.querySelectorAll(t).forEach(n => {
        u(n, t, "change", e.name, !0)
    })), window._FORMSTATUS_[e.name] = e.querySelectorAll(".group.error").length === 0, !0),
    u = (e, t, n, i, o = !1) => {
        const s = e.closest(".group");
        if (s) {
            o || (t === "select" ? window._FORM_[i][e.name] = e.type.indexOf("multiple") > -1 ? window._SELECT_[i][e.name].getValue().map(l => l.value) : window._SELECT_[i][e.name].getValue().value : window._FORM_[i][e.name.replace("[]", "")] = e.name.indexOf("[]") === -1 ? e.value : [].filter.call(document.getElementsByName(e.name), l => l.checked).map(l => l.value));
            const c = x(e, i, o),
                r = gsap.timeline({
                    defaults: {
                        duration: .3,
                        ease: "power1.inOut"
                    }
                }),
                a = s.querySelector("p");
            if (c)
                if (a) a.innerHTML = c;
                else {
                    t === "select" && window._SELECT_[i][e.name].destroy();
                    const l = s.querySelectorAll(t);
                    s.innerHTML += `<p class="error">${c}</p>`;
                    const h = s.querySelector("p");
                    r.from(h, {
                        marginTop: "-15",
                        opacity: "0",
                        fontSize: "10"
                    }), s.classList.add("error"), Array.from(s.querySelectorAll(t)).forEach((d, m) => {
                        t === "select" && (window._SELECT_[i][d.name] = new Choices(d, {
                            removeItemButton: !0
                        })), d.checked = l[m].checked, d.value = l[m].value, d.addEventListener(n, () => u(d, t, n, i), !1)
                    })
                }
            else {
                const l = s.querySelectorAll(t);
                s.classList.remove("error"), a && r.to(a, {
                    marginTop: "-15",
                    opacity: "0",
                    fontSize: "10"
                }), setTimeout(() => {
                    var h;
                    (h = s.querySelector("p")) == null || h.remove(), Array.from(s.querySelectorAll(t)).forEach((d, m) => {
                        d.checked = l[m].checked, d.addEventListener(n, () => u(d, t, n, i), !1)
                    })
                }, 300)
            }
        }
    },
    x = (e, t, n) => {
        let {
            value: i,
            required: o,
            type: s,
            name: c,
            dataset: r
        } = e;
        if ((n || s === "checkbox" && c && c.indexOf("[]") > -1) && (i = window._FORM_[t][c.replace("[]", "")]), !i && o && c.indexOf("[]") === -1) return window._MESSAGE_.required;
        if (i && s === "email" && !T.test(i.trim())) return window._MESSAGE_.email;
        if (i && r.hasOwnProperty("minLength") && i.length < parseInt(r.minLength)) return window._MESSAGE_.minLengthCheckBox + r.minLength + " ký tự";
        if (i && r.hasOwnProperty("maxLength") && i.length > parseInt(r.maxLength)) return window._MESSAGE_.minLengthCheckBox + r.maxLength + " ký tự";
        if (i && r.hasOwnProperty("regex") && !new RegExp(r.regex).test(i.trim())) return r.hasOwnProperty("message") ? r.message : window._MESSAGE_.required;
        if (i && r.hasOwnProperty("compare")) {
            const a = e.parentElement.parentElement.querySelector(`[name='${r.compare}']`);
            if (a && a.value && a.value.trim() !== i.trim()) return r.hasOwnProperty("message") ? r.message : window._MESSAGE_.required
        }
        return s === "checkbox" && c.indexOf("[]") > -1 && r.hasOwnProperty("minLength") && (!i || i.length < parseInt(r.minLength)) ? window._MESSAGE_.minLengthCheckBox + r.minLength : ""
    },
    T = /^(([^<>()[\]\\.,;:$%^&*\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    _ = () => {
        const e = document.querySelector(".mySwiper-class");
        e && (e.classList.contains("hidden") ? e.classList.remove("hidden") : e.classList.add("hidden"))
    };

function A() {
    const navMenu = document.querySelector('.header-menu');
    const registration = document.querySelector('.registration');

    function handleScroll() {
        const scrollY = window.scrollY;
        const isDesktop = window.screen.availWidth >= 992;
        const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) * 11 / 12;

        if (scrollY > 123) {
            navMenu?.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'shadow-lg', 'bg-white', 'border-b-2');
            if (isDesktop) {
                registration?.classList.add('lg:fixed', 'top-32');
            }
            if (scrollY > maxScroll) {
                registration?.classList.remove('lg:fixed', 'top-32');
            }
        }
        else {
            navMenu?.classList.remove('fixed', 'top-0', 'left-0', 'right-0', 'shadow-lg', 'bg-white', 'border-b-2');
            registration?.classList.remove('lg:fixed', 'top-32');
        }
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

const g = (e, t) => {
    const n = gsap.timeline({
        delay: t,
        defaults: {
            duration: 1,
            ease: "power1.inOut"
        }
    }),
        i = e.querySelectorAll(".gsap"),
        o = gsap.getTweensOf(i);
    if (o.length > 0) return o.forEach(s => s.kill()), !0;
    i.forEach(s => {
        s.classList.contains("left") && n.from(s, {
            x: "-=10%",
            scale: "+=0.15",
            opacity: "-=1"
        }, "<0.25"), s.classList.contains("right") && n.from(s, {
            x: "+=10%",
            scale: "+=0.15",
            opacity: "-=1"
        }, "<0.5"), s.classList.contains("top") && n.from(s, {
            y: "-=50%",
            scale: "+=0.15",
            opacity: "-=1"
        }, "<0.25"), s.classList.contains("bottom") && n.from(s, {
            y: "+=50%",
            scale: "+=0.15",
            opacity: "-=1"
        }, "<0.5"), s.classList.contains("zoom") && gsap.to(s, {
            scale: "+=0.1",
            duration: 20
        }), s.classList.contains("next") && gsap.from(s, {
            opacity: 0,
            scale: .5
        }, {
            opacity: 1,
            scale: 1,
            duration: .5
        })
    })
},
    C = () => {
        const e = {
            loop: !0,
            autoHeight: !0,
            spaceBetween: 30,
            autoplay: {
                delay: 5e3
            }
        };
        new Swiper(".mySwiper", {
            ...e,
            navigation: !1,
            effect: "coverflow",
            grabCursor: !0,
            centeredSlides: !0,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 3,
                slidesPerView: 3
            },
            breakpoints: {
                1366: {
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2
                },
                500: {
                    slidesPerView: 1
                }
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: !0
            }
        }), new Swiper(".mySwiperContent", {
            ...e,
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev"
            },
            on: {
                init: n => g(n.slides[n.activeIndex], 0),
                slideChangeTransitionStart: n => g(n.slides[n.activeIndex], 0)
            }
        });
        var t = new Swiper(".swiperContent", {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: !0,
            watchSlidesProgress: !0
        });
        return new Swiper(".swiperContent2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next-content",
                prevEl: ".swiper-button-prev-content"
            },
            thumbs: {
                swiper: t
            }
        }), t
    };

window.API = p;
window.Message = y;
w();
window.SetupFormValid = w;
window._MESSAGE_ = {
    required: "Xin vui lòng nhập nội dung",
    email: "Xin vui lòng nhập địa chỉ email hợp lệ!",
    minLengthCheckBox: "Xin vui lòng chọn ít nhất ",
    minLength: "Xin vui lòng nhập tối thiểu ",
    maxLength: "Xin vui lòng nhập không quá ",
    compare: "Xin vui lòng nhập không quá "
};
const getDataWithAxios = async (url) => {
    return await axios.get(url);
}

function changeAddressSelect() {
    const provinceSelect = document.getElementById('selectAddressMain');
    if (provinceSelect) {
        provinceSelect.addEventListener('change', async function () {
            const selectedProvince = provinceSelect.value;
            const filter = {
                province: selectedProvince,
            };
            const paginableParams = new URLSearchParams({
                page: "1",
                perPage: "10",
                filter: JSON.stringify(filter),
            });
            const getDatawithUrl = `dataBuildings?${paginableParams.toString()}`;
            const responses = await getDataWithAxios(getDatawithUrl)
            const divBuilding = document.getElementById('reRenderBuildings');
            let reRender = '';
            divBuilding.innerHTML = '';
            for (let index = 0; index < responses?.data?.bu.length; index++) {
                reRender += reRenderHome(responses.data.bu[index], responses.data.slug[index]);
            }
            divBuilding.innerHTML = reRender;
        });
    }
}

const reRenderHome = (bu, slug) => {
    return ` <a href="/danh-sach-phong/${slug}_${bu.id}">
    <div class="group overflow-hidden rounded-xl border hover:shadow-lg duration-300 shadow-md mb-4">
        <div class="flex flex-col sm:flex-row group-hover:shadow-xl sm:h-full w-full max-h-56">
            <img src="/api/auth/download?key=${bu.media}" alt=""
                class="w-full sm:max-w-52 md:max-w-72 z-10 border-none sm:rounded-l-xl gap-4 group-hover:scale-105 duration-500" 
                onerror="this.src='/images/home/property-1.png'"
                />
            <div
                class="sm:rounded-r-xl rounded-b-xl sm:rounded-bl-none border-x-2 sm:border-x-0 border-b-2 sm:border-y-2 sm:border-r-2 border-orange-400 overflow-hidden py-6 gap-1 w-full max-h-full pl-4  ">
                <div class="flex flex-wrap">
                    <div class="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M11.275 2.99479C11.3167 3.03141 11.3285 3.06702 11.316 3.12136L11.1102 4.03534C11.0876 4.13549 11.1045 4.1768 11.1404 4.20288C11.1759 4.22897 11.2205 4.23181 11.3086 4.17964L12.1141 3.70125C12.1621 3.67299 12.1992 3.67299 12.2473 3.70125L13.0528 4.17964C13.1412 4.23198 13.1854 4.22896 13.2213 4.20288C13.2567 4.1768 13.2738 4.1355 13.2511 4.03534L13.0454 3.12136C13.0332 3.06702 13.0449 3.0314 13.0867 2.99479L13.7906 2.3763C13.8679 2.30841 13.8786 2.26527 13.8649 2.2233C13.8512 2.18083 13.8172 2.15257 13.7151 2.14321L12.782 2.05626C12.7267 2.05125 12.6963 2.02918 12.6742 1.97835L12.3038 1.11805C12.2627 1.02341 12.2252 1 12.1809 1C12.1366 1 12.0992 1.02341 12.0584 1.11788L11.6878 1.97818C11.6658 2.02901 11.6355 2.05108 11.5801 2.0561L10.6473 2.14338C10.5451 2.15274 10.5109 2.18134 10.4973 2.22347C10.4834 2.26544 10.4945 2.30858 10.5716 2.37647L11.275 2.99479Z"
                                fill="#B01D13" />
                            <path
                                d="M16.0769 2.99475C16.1185 3.03137 16.1304 3.06699 16.1182 3.12133L15.9124 4.0353C15.8903 4.13546 15.9067 4.17676 15.9423 4.20285C15.9781 4.22893 16.0224 4.23177 16.1109 4.1796L16.9163 3.70121C16.9643 3.67296 17.0016 3.67296 17.0495 3.70121L17.8551 4.1796C17.9436 4.23194 17.9877 4.22927 18.0237 4.20285C18.0596 4.17676 18.076 4.1358 18.0536 4.0353L17.8478 3.12133C17.8356 3.06699 17.8473 3.03137 17.8891 2.99475L18.593 2.37626C18.6699 2.30838 18.681 2.26523 18.6672 2.22327C18.6527 2.18096 18.6184 2.15271 18.5166 2.14334L17.5836 2.0564C17.5282 2.05138 17.4978 2.02931 17.4757 1.97848L17.1054 1.11788C17.0647 1.02341 17.0271 1 16.9826 1C16.938 1 16.9007 1.02341 16.8599 1.11788L16.489 1.97848C16.4673 2.02931 16.4367 2.05138 16.3814 2.0564L15.4488 2.14334C15.3465 2.15271 15.3124 2.1813 15.2989 2.22343C15.2855 2.2654 15.296 2.30821 15.3734 2.37643L16.0769 2.99475Z"
                                fill="#B01D13" />
                            <path
                                d="M6.47264 2.99479C6.51411 3.03141 6.52565 3.06702 6.51361 3.12137L6.30778 4.03547C6.28521 4.13563 6.30176 4.17693 6.33771 4.20301C6.37349 4.2291 6.4178 4.23227 6.50625 4.17977L7.31138 3.70138C7.35953 3.67312 7.39699 3.67312 7.44497 3.70138L8.25057 4.17977C8.33902 4.23228 8.38316 4.22943 8.41911 4.20301C8.45506 4.17693 8.47162 4.13596 8.44904 4.03547L8.24288 3.12149C8.23084 3.06715 8.24237 3.03154 8.28417 2.99492L8.98811 2.37643C9.06536 2.30854 9.07606 2.2654 9.06268 2.22343C9.0488 2.18096 9.01469 2.15271 8.9127 2.14334L7.97967 2.0564C7.92432 2.05138 7.89389 2.02931 7.87182 1.97848L7.50146 1.11788C7.46033 1.02341 7.42237 1 7.37856 1C7.33392 1 7.29663 1.02341 7.25583 1.11788L6.8853 1.97848C6.86357 2.02931 6.83297 2.05138 6.77762 2.0564L5.84443 2.14334C5.74227 2.15271 5.70832 2.1813 5.69478 2.22343C5.68057 2.2654 5.69143 2.30821 5.76902 2.37643L6.47264 2.99479Z"
                                fill="#B01D13" />
                            <path
                                d="M20.655 20.4555H19.9489V6.14186C19.9489 5.48673 19.6156 5.15332 18.96 5.15332H5.4006C4.74564 5.15332 4.41206 5.48673 4.41206 6.14186V20.4555H3.70594C3.23808 20.4555 3 20.6937 3 21.1614V21.8679C3 22.3356 3.2381 22.5738 3.70594 22.5738H20.6546C21.1228 22.5738 21.3607 22.3355 21.3607 21.8679V21.1614C21.3607 20.6937 21.1226 20.4555 20.655 20.4555ZM8.64942 18.6639H6.10701V16.1214H8.64942V18.6639ZM8.64942 14.1924H6.10701V11.65H8.64942V14.1924ZM8.64942 9.72101H6.10701V7.17847H8.64942V9.72101ZM13.4513 20.4553H10.9092V16.1217H13.4513V20.4553ZM13.4513 14.1924H10.9092V11.65H13.4513V14.1924ZM13.4513 9.72101H10.9092V7.17847H13.4513V9.72101ZM18.2536 18.6639H15.7112V16.1214H18.2533V18.6639H18.2536ZM18.2536 14.1924H15.7112V11.65H18.2533V14.1924H18.2536ZM18.2536 9.72101H15.7112V7.17847H18.2533V9.72101H18.2536Z"
                                fill="#B01D13" />
                        </svg>
                    </div>
                    <div class="flex justify-center items-center pl-2">
                        <h3 class="text-base font-bold leading-5 text-red-600">${bu.name}</h3>
                    </div>
                </div>
                <div
                    class="inline-flex flex-col items-start gap-2 text-sm text-gray-700 font-normal leading-5 pl-1">
                    <div class="flex flex-wrap">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M10.8958 5.43658L13.567 5.8215C14.3244 5.93063 14.6279 6.86105 14.0806 7.39578L12.1502 9.28178C11.9328 9.49415 11.834 9.79985 11.8857 10.0993L12.3451 12.7586C12.4753 13.5126 11.6843 14.0888 11.0065 13.7335L8.61625 12.4807C8.34705 12.3396 8.02564 12.3399 7.75691 12.4817L5.36968 13.7404C4.69278 14.0973 3.90035 13.523 4.02877 12.7686L4.48176 10.1081C4.5327 9.8085 4.43315 9.50299 4.21517 9.2911L2.28065 7.40984C1.73197 6.87635 2.03323 5.94528 2.79059 5.83429L5.46076 5.44307C5.76144 5.39911 6.02114 5.20989 6.15528 4.9372L7.34676 2.51568C7.68463 1.82901 8.66325 1.82785 9.00268 2.51374L10.1999 4.93234C10.3348 5.20454 10.5949 5.39319 10.8957 5.43648L10.8958 5.43658Z"
                                    fill="#616161" />
                            </svg>
                        </div>
                        <div class="pl-3 flex justify-center items-center">
                            <h4>${bu.buildingAddressId}</h4>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M7.83022 8.79536V12.8302C7.83022 13.0088 7.92548 13.1737 8.08008 13.263C8.23468 13.3522 8.4252 13.3522 8.57979 13.263C8.73439 13.1737 8.82965 13.0088 8.82965 12.8302V8.79536C10.0977 8.62469 11.1911 7.81903 11.7297 6.6584C12.2683 5.49778 12.1775 4.14264 11.489 3.06416C10.8006 1.98564 9.6095 1.33301 8.32994 1.33301C7.05039 1.33301 5.85935 1.98564 5.17089 3.06416C4.48245 4.14258 4.39165 5.49772 4.93018 6.6584C5.46871 7.81908 6.56216 8.62468 7.83024 8.79536H7.83022Z"
                                    fill="#616161" />
                                <path
                                    d="M9.89601 10.941C9.7191 10.9172 9.54287 10.9896 9.43376 11.1309C9.32467 11.2724 9.29924 11.4611 9.36717 11.6263C9.43499 11.7915 9.58579 11.9078 9.7628 11.9316C11.4366 12.1564 12.328 12.7432 12.328 13.0804C12.328 13.5045 10.9169 14.3297 8.33025 14.3297C5.74355 14.3297 4.33252 13.5045 4.33252 13.0804C4.33252 12.7432 5.22387 12.1564 6.89769 11.9316C7.07471 11.9078 7.2255 11.7915 7.29332 11.6263C7.36125 11.4611 7.33582 11.2724 7.22673 11.1309C7.11764 10.9896 6.9414 10.9172 6.76448 10.941C4.64794 11.2255 3.33301 12.045 3.33301 13.0804C3.33301 14.5565 5.84697 15.3291 8.33016 15.3291C10.8133 15.3291 13.3273 14.5565 13.3273 13.0804C13.3273 12.045 12.0124 11.2255 9.89584 10.941H9.89601Z"
                                    fill="#616161" />
                            </svg>
                        </div>
                        <h4 class="pl-3">${bu.buildingAddress.province}</h4>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M4.95356 6.1629H8.63996C8.80638 6.1629 8.93433 6.03486 8.93433 5.86852V3.50052C8.93433 3.33409 8.8063 3.20614 8.63996 3.20614L4.95356 3.20605C4.78713 3.20605 4.65918 3.33409 4.65918 3.50043V5.86843C4.65918 6.03486 4.79998 6.1629 4.95356 6.1629V6.1629ZM7.27036 3.8205C7.41116 3.8205 7.52633 3.93568 7.52633 4.07648C7.52633 4.21727 7.41115 4.33245 7.27036 4.33245C7.12956 4.33245 7.01438 4.21727 7.01438 4.07648C7.00161 3.93567 7.11679 3.8205 7.27036 3.8205ZM5.6832 5.3181L6.41285 4.29408C6.47687 4.21729 6.59204 4.21729 6.65607 4.29408L7.07847 4.88292C7.1041 4.90855 7.14249 4.90855 7.15526 4.88292L7.25767 4.74212C7.32169 4.66533 7.43686 4.66533 7.50089 4.74212L7.91054 5.30534C7.97456 5.40775 7.91054 5.53569 7.79536 5.53569H5.7984C5.68322 5.54846 5.6192 5.40766 5.68322 5.31811L5.6832 5.3181Z"
                                    fill="#616161" />
                                <path
                                    d="M13.7469 5.03638C13.7342 4.94674 13.6573 4.88281 13.5677 4.88281H12.1853C12.0957 4.88281 12.0189 4.94683 12.0061 5.03638L11.6733 6.57236C11.6477 6.68754 11.7374 6.80272 11.8525 6.80272H12.6461V12.3323H12.4029C12.2749 12.3323 12.1725 12.4347 12.1725 12.5627C12.1725 12.6907 12.275 12.793 12.4029 12.793H13.3373C13.4653 12.793 13.5676 12.6906 13.5676 12.5627C13.5676 12.4346 13.4652 12.3323 13.3373 12.3323H13.0941V6.78992H13.8877C14.0029 6.78992 14.0925 6.67474 14.0669 6.55956L13.7469 5.03638Z"
                                    fill="#616161" />
                                <path
                                    d="M4.16026 8.4924C4.16026 8.37722 4.2499 8.28758 4.36508 8.28758H6.19544C6.31062 8.28758 6.40026 8.37723 6.40026 8.4924V9.3116H7.1683V8.4924C7.1683 8.37722 7.25795 8.28758 7.37312 8.28758H9.20348C9.31866 8.28758 9.4083 8.37723 9.4083 8.4924V9.3116H10.6115L10.6114 7.69883C10.6114 7.32767 10.3171 7.0332 9.93303 7.0332H3.63543C3.26428 7.0332 2.95703 7.32758 2.95703 7.69883V9.3116H4.16025L4.16026 8.4924Z"
                                    fill="#616161" />
                                <path
                                    d="M11.2128 9.74707H2.36797C2.11199 9.74707 1.91992 9.95189 1.91992 10.1951V11.3343C1.91992 11.5903 2.12474 11.7824 2.36797 11.7824H2.496V12.3583C2.496 12.5887 2.6752 12.768 2.90565 12.768C3.136 12.768 3.3153 12.5888 3.3153 12.3583V11.7824H10.2529V12.3583C10.2529 12.5887 10.4321 12.768 10.6625 12.768C10.8929 12.768 11.0722 12.5888 11.0722 12.3583V11.7824H11.2002C11.4562 11.7824 11.6483 11.5775 11.6483 11.3343V10.1951C11.6735 9.95189 11.4688 9.74707 11.2127 9.74707H11.2128Z"
                                    fill="#616161" />
                            </svg>
                        </div>
                        <h4 class="pl-3">${bu.type}</h4>
                    </div>
                    <div class="inline-flex">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 16 16" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.4059 15.108C9.54154 13.4157 12.6663 8.55543 12.6663 6.30735C12.6663 3.56012 10.577 1.33301 7.99967 1.33301C5.42237 1.33301 3.33301 3.56012 3.33301 6.30735C3.33301 8.55543 6.45775 13.4158 7.59345 15.108C7.79484 15.408 8.20456 15.408 8.40596 15.108H8.4059ZM6.44409 6.30735C6.44409 5.39156 7.1405 4.64923 7.99964 4.64923C8.85879 4.64923 9.5552 5.39156 9.5552 6.30735C9.5552 7.22313 8.85879 7.96546 7.99964 7.96546C7.1405 7.96546 6.44409 7.22313 6.44409 6.30735ZM7.99964 3.54383C6.56782 3.54383 5.40705 4.78112 5.40705 6.30735C5.40705 7.83357 6.56782 9.07087 7.99964 9.07087C9.43147 9.07087 10.5922 7.83357 10.5922 6.30735C10.5922 4.78112 9.43147 3.54383 7.99964 3.54383Z"
                                    fill="#616161" />
                            </svg>
                        </div>
                        <h4 class="pl-3 line-clamp-2">${bu.address}</h4>
                    </div>
                    <div class="inline-flex">
                        <div class="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 16 16" fill="none">
                                <path
                                    d="M5.76344 13.6984C6.3007 14.234 7.17873 14.234 7.71546 13.6984L13.1244 8.28909C13.6609 7.75254 14.1003 6.6919 14.1003 5.93324V2.71325C14.1003 1.95406 13.4786 1.33301 12.7199 1.33301H9.49956C8.74133 1.33301 7.68044 1.77202 7.14386 2.30929L1.73523 7.71755C1.19893 8.25411 1.19893 9.13274 1.73523 9.6693L5.76344 13.6984ZM10.8796 3.17329C11.6419 3.17329 12.2597 3.79084 12.2597 4.5531C12.2597 5.31497 11.6419 5.9332 10.8796 5.9332C10.118 5.9332 9.49949 5.31497 9.49949 4.5531C9.49949 3.79084 10.1179 3.17329 10.8796 3.17329Z"
                                    fill="#616161" />
                            </svg>
                        </div>                     
                        <h4 class="pl-3 line-clamp-2">${bu.description ? bu.description : `Lựa chọn tuyệt vời`}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</a>`;
}


const filter = () => {
    const search = document.getElementById('search');
    const selectAddress = document.getElementById('selectAddress');
    const selectType = document.getElementById('selectType');
    const selectAcreage = document.getElementById('selectAcreage');
    const selectRoomNumber = document.getElementById('selectRoomNumber');
    const selectYear = document.getElementById('selectYear');
    const btnFilter = document.getElementById('buttonFilter')

    if (search || selectAddress || selectType || selectAcreage || selectRoomNumber || btnFilter) {
        btnFilter.addEventListener('click', async () => {
            const selectPriceMin = document.querySelector('input[name="lowPrice"]:checked').value;
            const selectPriceMax = document.querySelector('input[name="highPrice"]:checked').value;
            const selectedProvince = selectAddress.value;
            const selectedType = selectType.value;
            const selectedAcreage = selectAcreage.value;
            const selectedRoomNumber = selectRoomNumber.value;
            const searchValue = search.value;
            const selectedYear = selectYear.value;
            const filter = {
                province: selectedProvince,
                type: selectedType,
                year: selectedYear,
                acreage: selectedAcreage,
                bedroomTotal: selectedRoomNumber,
                price: `${selectPriceMin ? selectPriceMin : ""}/${selectPriceMax ? selectPriceMax : ""}`,
            };
            const sort = ``;
            const paginableParams = new URLSearchParams({
                page: "1",
                perPage: "10",
                fullTextSearch: searchValue,
                filter: JSON.stringify(filter), // Convert filter object to JSON string
                sort: ""
            });

            const responses = await getDataWithAxios(`getDataBuildings?${paginableParams.toString()}`)

            const renderBuis = document.getElementById('renderBuildings');
            if (renderBuis) {
                renderBuis.innerHTML = "";
                const buis = responses.data?.bu;
                const slug = responses.data?.slug;
                let reRender = '';
                for (let index = 0; index < buis.length; index++) {
                    reRender += rerender(buis[index], slug[index]);
                }
                renderBuis.innerHTML = reRender;
            }
        })
    }
}
const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const rerender = (bu, slug) => {
    return `  <a href="/danh-sach-phong/${slug}_${bu.id}" class="group">
    <div
        class="grid grid-cols-3 max-w-full w-full border border-spacing-1 border-red-100 shadow shadow-gray-300 gap-5 rounded-2xl items-center group-hover:shadow-xl overflow-hidden mb-5">
        <div class="w-full h-56  rounded-l-2xl">
            <img class=" w-full h-full " src="/api/auth/download?key=${bu.media}" 
            onerror="this.src='/images/home/property-1.png'"
            />
        </div>
        <div class="col-span-2 gap-2.5 max-w-md ml-2 mb-2 md:ml-0 md:mb-0">
            <div class="flex items-center gap-1.5">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 25"
                        fill="none">
                        <path
                            d="M11.6588 3.47037C11.7005 3.50699 11.7123 3.54261 11.6998 3.59695L11.494 4.51092C11.4714 4.61108 11.4883 4.65238 11.5242 4.67847C11.5597 4.70455 11.6043 4.70739 11.6924 4.65522L12.4979 4.17683C12.5458 4.14858 12.583 4.14858 12.6311 4.17683L13.4365 4.65522C13.525 4.70756 13.5691 4.70455 13.6051 4.67847C13.6405 4.65238 13.6576 4.61108 13.6349 4.51092L13.4292 3.59695C13.417 3.54261 13.4287 3.50699 13.4705 3.47037L14.1744 2.85188C14.2517 2.784 14.2624 2.74085 14.2487 2.69889C14.2349 2.65642 14.201 2.62816 14.0988 2.6188L13.1658 2.53185C13.1105 2.52683 13.08 2.50476 13.058 2.45393L12.6876 1.59363C12.6465 1.499 12.609 1.47559 12.5647 1.47559C12.5204 1.47559 12.4829 1.499 12.4421 1.59347L12.0716 2.45376C12.0495 2.5046 12.0193 2.52667 11.9639 2.53168L11.0311 2.61897C10.9289 2.62833 10.8946 2.65692 10.8811 2.69906C10.8672 2.74103 10.8783 2.78417 10.9553 2.85205L11.6588 3.47037Z"
                            fill="#B01D13" />
                        <path
                            d="M16.4607 3.47034C16.5023 3.50696 16.5142 3.54257 16.502 3.59691L16.2962 4.51089C16.2741 4.61104 16.2905 4.65235 16.3261 4.67843C16.3619 4.70452 16.4062 4.70736 16.4946 4.65519L17.3001 4.1768C17.3481 4.14854 17.3853 4.14854 17.4333 4.1768L18.2389 4.65519C18.3274 4.70753 18.3715 4.70485 18.4075 4.67843C18.4434 4.65235 18.4598 4.61138 18.4374 4.51089L18.2316 3.59691C18.2194 3.54257 18.2311 3.50695 18.2729 3.47034L18.9768 2.85185C19.0537 2.78396 19.0647 2.74082 19.051 2.69885C19.0365 2.65655 19.0022 2.62829 18.9004 2.61893L17.9674 2.53198C17.912 2.52697 17.8816 2.50489 17.8595 2.45406L17.4892 1.59347C17.4485 1.499 17.4109 1.47559 17.3664 1.47559C17.3218 1.47559 17.2845 1.499 17.2437 1.59347L16.8728 2.45406C16.8511 2.5049 16.8205 2.52697 16.7651 2.53198L15.8326 2.61893C15.7303 2.62829 15.6962 2.65688 15.6826 2.69902C15.6693 2.74099 15.6798 2.7838 15.7572 2.85201L16.4607 3.47034Z"
                            fill="#B01D13" />
                        <path
                            d="M6.85643 3.47038C6.8979 3.507 6.90944 3.54261 6.8974 3.59695L6.69157 4.51106C6.66899 4.61121 6.68555 4.65251 6.7215 4.6786C6.75728 4.70468 6.80159 4.70786 6.89004 4.65536L7.69516 4.17697C7.74332 4.14871 7.78077 4.14871 7.82876 4.17697L8.63435 4.65536C8.72281 4.70786 8.76695 4.70502 8.8029 4.6786C8.83885 4.65251 8.8554 4.61155 8.83283 4.51106L8.62666 3.59708C8.61463 3.54274 8.62616 3.50712 8.66796 3.47051L9.37189 2.85201C9.44914 2.78413 9.45985 2.74099 9.44647 2.69902C9.43259 2.65655 9.39848 2.62829 9.29648 2.61893L8.36346 2.53198C8.30811 2.52697 8.27768 2.50489 8.25561 2.45406L7.88525 1.59347C7.84412 1.499 7.80616 1.47559 7.76235 1.47559C7.71771 1.47559 7.68042 1.499 7.63962 1.59347L7.26909 2.45406C7.24736 2.50489 7.21676 2.52697 7.16141 2.53198L6.22822 2.61893C6.12606 2.62829 6.09211 2.65688 6.07857 2.69902C6.06435 2.74099 6.07522 2.7838 6.15281 2.85201L6.85643 3.47038Z"
                            fill="#B01D13" />
                        <path
                            d="M21.0388 20.9311H20.3326V6.61745C20.3326 5.96232 19.9994 5.62891 19.3438 5.62891H5.78439C5.12942 5.62891 4.79584 5.96232 4.79584 6.61745V20.9311H4.08973C3.62187 20.9311 3.38379 21.1693 3.38379 21.637V22.3435C3.38379 22.8111 3.62189 23.0494 4.08973 23.0494H21.0384C21.5066 23.0494 21.7445 22.8111 21.7445 22.3435V21.637C21.7445 21.1693 21.5064 20.9311 21.0388 20.9311ZM9.03321 19.1394H6.4908V16.597H9.03321V19.1394ZM9.03321 14.668H6.4908V12.1256H9.03321V14.668ZM9.03321 10.1966H6.4908V7.65406H9.03321V10.1966ZM13.8351 20.9308H11.293V16.5972H13.8351V20.9308ZM13.8351 14.668H11.293V12.1256H13.8351V14.668ZM13.8351 10.1966H11.293V7.65406H13.8351V10.1966ZM18.6374 19.1394H16.095V16.597H18.6371V19.1394H18.6374ZM18.6374 14.668H16.095V12.1256H18.6371V14.668H18.6374ZM18.6374 10.1966H16.095V7.65406H18.6371V10.1966H18.6374Z"
                            fill="#B01D13" />
                    </svg></span>
                <span class="font-bold text-red-600 text-base">${bu.name}</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 17 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.6058 2.69824H2.16135C1.67024 2.69824 1.27246 3.09602 1.27246 3.58713V13.3649C1.27246 13.856 1.67024 14.2538 2.16135 14.2538H14.6058C15.0969 14.2538 15.4947 13.856 15.4947 13.3649V3.58713C15.4947 3.09602 15.0969 2.69824 14.6058 2.69824ZM2.16135 13.3649V3.58713H14.6058V13.3649H2.16135ZM12.828 4.92046H3.93913V12.0316H12.828V4.92046ZM4.65024 11.1427H6.65024V8.83158H4.65024V11.1427ZM4.65024 5.63158H6.65024V8.12046H4.65024V5.63158ZM11.9391 11.1427V8.83158H10.1169V11.1427H11.9391ZM10.1169 5.63158H11.9391V8.12046H10.1169V5.63158ZM7.36135 5.63158V8.12046H9.4058V5.63158H7.36135ZM9.4058 11.1427H7.36135V8.83158H9.4058V11.1427Z"
                            fill="#737373" />
                    </svg></span>
                <span class="text-sm text-gray-700 font-normal">${bu.rooms[0].acreage} m2</span>
            </div>
            <div class="flex gap-3 items-center">
                <span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 17 17" fill="none">
                        <path
                            d="M5.33735 7.0545H9.02375C9.19017 7.0545 9.31812 6.92646 9.31812 6.76012V4.39212C9.31812 4.2257 9.19009 4.09775 9.02375 4.09775L5.33735 4.09766C5.17092 4.09766 5.04297 4.22569 5.04297 4.39203V6.76003C5.04297 6.92646 5.18377 7.0545 5.33735 7.0545V7.0545ZM7.65415 4.7121C7.79495 4.7121 7.91012 4.82728 7.91012 4.96808C7.91012 5.10887 7.79494 5.22405 7.65415 5.22405C7.51335 5.22405 7.39817 5.10887 7.39817 4.96808C7.3854 4.82727 7.50058 4.7121 7.65415 4.7121ZM6.06699 6.2097L6.79664 5.18568C6.86066 5.10889 6.97583 5.10889 7.03986 5.18568L7.46226 5.77452C7.48789 5.80015 7.52628 5.80015 7.53905 5.77452L7.64146 5.63372C7.70548 5.55693 7.82065 5.55693 7.88468 5.63372L8.29433 6.19694C8.35834 6.29935 8.29433 6.4273 8.17915 6.4273H6.18219C6.06701 6.44006 6.00299 6.29926 6.06701 6.20971L6.06699 6.2097Z"
                            fill="#616161" />
                        <path
                            d="M14.1307 5.92799C14.1179 5.83834 14.0411 5.77441 13.9515 5.77441H12.5691C12.4795 5.77441 12.4027 5.83843 12.3899 5.92799L12.0571 7.46396C12.0315 7.57914 12.1212 7.69432 12.2363 7.69432H13.0299V13.2239H12.7867C12.6587 13.2239 12.5563 13.3263 12.5563 13.4543C12.5563 13.5823 12.6587 13.6846 12.7867 13.6846H13.7211C13.8491 13.6846 13.9514 13.5822 13.9514 13.4543C13.9514 13.3262 13.849 13.2239 13.7211 13.2239H13.4778V7.68152H14.2715C14.3867 7.68152 14.4763 7.56634 14.4507 7.45116L14.1307 5.92799Z"
                            fill="#616161" />
                        <path
                            d="M4.54405 9.384C4.54405 9.26883 4.63369 9.17918 4.74887 9.17918H6.57923C6.69441 9.17918 6.78405 9.26883 6.78405 9.384V10.2032H7.55209V9.384C7.55209 9.26883 7.64174 9.17918 7.75691 9.17918H9.58727C9.70245 9.17918 9.79209 9.26883 9.79209 9.384V10.2032H10.9953L10.9952 8.59043C10.9952 8.21927 10.7008 7.9248 10.3168 7.9248H4.01922C3.64807 7.9248 3.34082 8.21918 3.34082 8.59043V10.2032H4.54404L4.54405 9.384Z"
                            fill="#616161" />
                        <path
                            d="M11.5966 10.6387H2.75176C2.49578 10.6387 2.30371 10.8435 2.30371 11.0867V12.2259C2.30371 12.4819 2.50853 12.674 2.75176 12.674H2.87979V13.2499C2.87979 13.4803 3.05899 13.6596 3.28944 13.6596C3.51979 13.6596 3.69908 13.4804 3.69908 13.2499V12.674H10.6367V13.2499C10.6367 13.4803 10.8159 13.6596 11.0463 13.6596C11.2767 13.6596 11.456 13.4804 11.456 13.2499V12.674H11.584C11.84 12.674 12.0321 12.4691 12.0321 12.2259V11.0867C12.0573 10.8435 11.8526 10.6387 11.5965 10.6387H11.5966Z"
                            fill="#616161" />
                    </svg></span>
                <span class="text-sm text-gray-700 font-normal">Loại: ${bu.type}</span>
            </div>
            <div class="flex gap-3 items-center">
                <span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                        viewBox="0 0 17 17" fill="none">
                        <g clip-path="url(#clip0_8475_18677)">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.78969 15.9996C9.92533 14.3073 13.0501 9.44703 13.0501 7.19895C13.0501 4.45172 10.9608 2.22461 8.38346 2.22461C5.80616 2.22461 3.7168 4.45172 3.7168 7.19895C3.7168 9.44703 6.84154 14.3074 7.97724 15.9996C8.17863 16.2996 8.58835 16.2996 8.78975 15.9996H8.78969ZM6.82788 7.19895C6.82788 6.28316 7.52429 5.54084 8.38343 5.54084C9.24257 5.54084 9.93899 6.28316 9.93899 7.19895C9.93899 8.11473 9.24257 8.85706 8.38343 8.85706C7.52429 8.85706 6.82788 8.11473 6.82788 7.19895ZM8.38343 4.43543C6.95161 4.43543 5.79084 5.67273 5.79084 7.19895C5.79084 8.72517 6.95161 9.96247 8.38343 9.96247C9.81526 9.96247 10.976 8.72517 10.976 7.19895C10.976 5.67273 9.81526 4.43543 8.38343 4.43543Z"
                                fill="#616161" />
                        </g>
                        <defs>
                            <clipPath id="clip0_8475_18677">
                                <rect width="16" height="16" fill="white"
                                    transform="translate(0.383789 0.475586)" />
                            </clipPath>
                        </defs>
                    </svg></span>
                <span class="text-sm text-gray-700 font-normal">${bu.address}</span>
            </div>
            <div class="flex gap-3 items-center">
                <span class="ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        viewBox="0 0 17 17" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14.6058 4.53125H2.16135C1.67043 4.53125 1.27246 4.92922 1.27246 5.42014V12.5313C1.27246 13.0222 1.67043 13.4201 2.16135 13.4201H14.6058C15.0967 13.4201 15.4947 13.0222 15.4947 12.5313V5.42014C15.4947 4.92922 15.0967 4.53125 14.6058 4.53125ZM5.58357 8.97563C5.58357 7.22452 6.84134 5.79785 8.38357 5.79785C9.92579 5.79785 11.1836 7.22452 11.1836 8.97563C11.1836 10.7267 9.92579 12.1534 8.38357 12.1534C6.84134 12.1534 5.58357 10.7267 5.58357 8.97563ZM6.29468 8.97125C6.29468 10.3312 7.23246 11.4379 8.38357 11.4379V11.4424C9.53468 11.4424 10.4725 10.3312 10.4725 8.97125C10.4725 7.61125 9.53468 6.50458 8.38357 6.50458C7.23246 6.50458 6.29468 7.61125 6.29468 8.97125ZM12.8725 5.4202C12.9249 6.36264 13.665 7.1217 14.6058 7.19798V5.4202H12.8725ZM14.6058 7.91798V10.0646C13.2809 10.1442 12.2269 11.2059 12.1569 12.5313H4.60134C4.534 11.2073 3.48439 10.1443 2.16134 10.0602V7.90909C3.49433 7.82849 4.55124 6.75432 4.61023 5.4202H12.1658C12.2244 6.75113 13.2763 7.82414 14.6058 7.90909V7.91798ZM2.16134 7.19798C3.10215 7.1217 3.84224 6.36264 3.89468 5.4202H2.16134V7.19798ZM2.16135 10.7801C3.0927 10.8548 3.82952 11.5992 3.89468 12.5312H2.16135V10.7801ZM14.6058 10.7801C13.6744 10.8548 12.9376 11.5992 12.8725 12.5312H14.6058V10.7801Z"
                            fill="#737373" />
                    </svg></span>
                <span class="text-base text-red-600 font-medium">
                    <span class="">${formatNumber(bu.rooms[0].price)}</span>
                    <span class="">tr/tháng</span>
                </span>
            </div>
        </div>
    </div>
</a>`
}

function togglePriceRadio() {
    const value = document.getElementById("priceRange");
    if (value) {
        value.addEventListener("click", function (event) {
            event.preventDefault();
            var priceRadio = document.getElementById("pricetable");
            if (priceRadio.style.display === "none") {
                priceRadio.style.display = "block";
                priceRadio.style.top = "50px";
            } else {
                priceRadio.style.display = "none";
                priceRadio.style.display = "none";
            }
        });
    }
}

const handleShowNavbar = () => {
    const menuNav = document.getElementById('menuNav');
    const navBar = document.getElementById('navbar-cta');
    const url = window.location.href;
    if (menuNav) {
        menuNav.addEventListener('click', () => {
            if (navBar.classList.contains('hidden')) {
                navBar.classList.remove('hidden');
                navBar?.classList.add('block', 'fixed', 'top-10', 'shadow-lg');

            } else {
                navBar.classList.add('hidden');
                navBar?.classList.remove('block', 'fixed', 'top-10', 'shadow-lg');
            }
        })
    }
    if (navBar) {
        const links = navBar.querySelectorAll('ul li a');
        let count = 0;
        links.forEach(link => {
            if (link.href.includes(url)) {
                link.classList.add('bg-blue-700');
                link.classList.add('text-white');
            } else {
                link.classList.remove('bg-blue-700');
                link.classList.remove('text-white');
                count++;
            }
        });
        if (count >= 4) {
            links.forEach(link => {
                if (link.href.includes('/danh-sach-toa-nha')) {
                    link.classList.add('bg-blue-700');
                    link.classList.add('text-white');
                    count = 0;
                }
            });
        }

    }

}

A();
changeAddressSelect();
filter();
togglePriceRadio();
C();
handleShowNavbar();