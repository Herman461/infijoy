document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('click', function(e) {
        if (e.target.closest('.languages__head')) {
            e.target.closest('.languages').classList.toggle('active')
        }

        if (!e.target.closest('.languages') && document.querySelector('.languages').classList.contains('active')) {
            document.querySelector('.languages.active').classList.remove('active')
        }

        if (e.target.closest('.item-languages')) {
            const currentLanguage = e.target.closest('.item-languages')

            if (currentLanguage.classList.contains('active')) return

            const activeLanguage = e.target.closest('.languages').querySelector('.item-languages.active')

            if (activeLanguage) {
                activeLanguage.classList.remove('active')
            }

            currentLanguage.classList.add('active')
            e.target.closest('.languages').classList.remove('active')
        }
    })



    // Меню

    const menu = document.querySelector('.header__menu')
    let lock = false
    const burger = document.querySelector('.header__burger')

    burger.addEventListener('click', function() {

        if (lock) return

        lock = true

        toggleMenu()
        document.querySelector('.menu__content').setAttribute('hidden', '')
        setTimeout(function () {

            slideDown(document.querySelector('.menu__content'), 700)
        }, 300)

        setTimeout(() => {
            lock = false
        }, 800)
    })

    function toggleMenu() {
        burger.classList.toggle('active')
        menu.classList.toggle('active')
        lockBody()
    }
    function lockBody() {
        const scrollWidth = window.innerWidth - document.body.clientWidth

        document.body.classList.toggle('lock')

        document.body.style.paddingRight = scrollWidth + 'px'
    }

    const mainSliders = document.querySelectorAll('.main-slider__body')
    if (mainSliders.length > 0) {
        for (let index = 0; index < mainSliders.length; index++) {
            const slider = mainSliders[index]

            new Swiper('.main-slider__body', {
                speed: 1000,
                loop: true,
                navigation: {
                    nextEl: slider.closest('.main-slider').querySelector('.controls-main-slider__button-next'),
                    prevEl: slider.closest('.main-slider').querySelector('.controls-main-slider__button-prev'),
                },

                pagination: {
                    el: slider.closest('.main-slider').querySelector('.controls-main-slider__dots'),
                    type: 'bullets',
                    clickable: true
                },
            })
        }
    }



    GreenAudioPlayer.init({
        selector: '.meditations-main-slider__audio',
        stopOthersOnPlay: true
    });


    const baseSliders = document.querySelectorAll('.base-slider__body')

    if (baseSliders.length > 0) {
        for (let index = 0; index < baseSliders.length; index++) {
            const slider = baseSliders[index]

            if (slider.classList.contains('base-slider__body_big')) {
                new Swiper(slider, {
                    speed: 1000,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: slider.closest('.base-slider').querySelector('.base-slider__button-next'),
                        prevEl: slider.closest('.base-slider').querySelector('.base-slider__button-prev'),
                    },
                    slidesPerView: 1.1,
                    breakpoints: {

                        767.98: {
                            slidesPerView: 1.8,
                            spaceBetween: 20,
                        },

                    }
                })
            } else {
                new Swiper(slider, {
                    speed: 1000,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: slider.closest('.base-slider').querySelector('.base-slider__button-next'),
                        prevEl: slider.closest('.base-slider').querySelector('.base-slider__button-prev'),
                    },
                    slidesPerView: 2.05,
                    breakpoints: {
                        991.98: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        767.98: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        360.98: {
                            slidesPerView: 2.2,
                        }
                    }
                })
            }

        }
    }
})
