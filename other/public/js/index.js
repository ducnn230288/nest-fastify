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

function changeAddressSelect() {
    const provinceSelect = document.getElementById('selectAddressMain');
    if (provinceSelect) {
        provinceSelect.addEventListener('change', function () {
            const selectedProvince = provinceSelect.value;
            window.location.href = `?address=${selectedProvince}`;
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get('address');
    if (address) {
        const option = document.querySelector(`option[value="${address}"]`);
        console.log('option', option);
        if (option) {
            provinceSelect.value = address;
        }
    }
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
        console.log('filter');
        btnFilter.addEventListener('click', () => {
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
            window.location.href = `
                /danh-sach-toa-nha?${paginableParams.toString()}
            `;
        })
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');
        if (filter) {
            console.log('filter');

            const filterObject = JSON.parse(filter);
            const search = urlParams.get('fullTextSearch');
            const priceChecked = filterObject.price.split('/')
            const radioButtonsMin = document.querySelectorAll('input[name="lowPrice"]');
            const radioButtonsMax = document.querySelectorAll('input[name="highPrice"]');
            function checked(arr, newValue) {
                arr.forEach(function (radioButton) {
                    if (radioButton.value === newValue) {
                        radioButton.checked = true;
                    } else {
                        radioButton.checked = false;
                    }
                });
            }
            function setValueIfExists(ele, selector, value) {
                const option = document.querySelector(selector);
                if (option) {
                    ele.value = value;
                }
            }
            function setValueIDIfExists(ele, selector, value) {
                const option = document.getElementById(selector);
                if (option) {
                    ele.value = value;
                }
            }
            if (priceChecked) {
                if (priceChecked[0]) {
                    checked(radioButtonsMin, priceChecked[0]);
                }
                if (priceChecked[1]) {
                    checked(radioButtonsMax, priceChecked[1]);
                }
            }

            if (filterObject.province) {
                setValueIfExists(selectAddress, `option[value="${filterObject.province}"]`, filterObject.province);
            }
            if (search) {
                setValueIDIfExists(search, `search`, search);
            }
            if (filterObject.type) {
                setValueIfExists(selectType, `option[value="${filterObject.type}"]`, filterObject.type);
            }
            if (filterObject.year) {
                setValueIfExists(selectYear, `option[value="${filterObject.year}"]`, filterObject.year);
            }
            if (filterObject.acreage) {
                setValueIfExists(selectAcreage, `option[value="${filterObject.acreage}"]`, filterObject.acreage);
            }
            console.log(filterObject.bedroomTotal);

            if (filterObject.bedroomTotal) {
                setValueIfExists(selectRoomNumber, `option[value="${filterObject.bedroomTotal}"]`, filterObject.bedroomTotal);
            }
        }
    }
}

function togglePriceRadio() {
    const value = document.getElementById("priceRange");
    if (value) {
        console.log('togglePriceRadio');

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


A();
changeAddressSelect();
filter();
togglePriceRadio();
C();

