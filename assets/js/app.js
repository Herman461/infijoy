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
    let baseAudio = null
    if (document.querySelectorAll('.meditations-main-slider__audio').length > 0) {
        GreenAudioPlayer.init({
            selector: '.meditations-main-slider__audio',
            stopOthersOnPlay: true
        });
    }

    const mainSliders = document.querySelectorAll('.main-slider__body')


    if (mainSliders.length > 0) {
        for (let index = 0; index < mainSliders.length; index++) {
            const slider = mainSliders[index]
            let wasSliderChanged = false
            new Swiper(slider, {
                speed: 1000,
                loop: true,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: slider.closest('.main-slider').querySelector('.controls-main-slider__button-next'),
                    prevEl: slider.closest('.main-slider').querySelector('.controls-main-slider__button-prev'),
                },
                pagination: {
                    el: slider.closest('.main-slider').querySelector('.controls-main-slider__dots'),
                    type: 'bullets',
                    clickable: true
                },
                on: {
                    slideChange() {

                        if (slider.closest('.main-slider') && slider.closest('.main-slider').classList.contains('main-slider_meditation')) {

                            if (document.querySelector('.main-slider_meditation .swiper-slide-prev .play-pause-btn') && document.querySelector('.main-slider_meditation .swiper-slide-prev .play-pause-btn').getAttribute('aria-label') === 'Pause') {
                                const audio = document.querySelector('.main-slider_meditation .swiper-slide-prev audio')
                                GreenAudioPlayer.pausePlayer(audio)
                            }

                        }

                        if (!wasSliderChanged) {
                            wasSliderChanged = true
                        } else {
                            slider.closest('.main-slider').classList.add('visible')
                        }
                    }
                }
            })
        }
    }





    const baseSliders = document.querySelectorAll('.base-slider__body')

    if (baseSliders.length > 0) {
        for (let index = 0; index < baseSliders.length; index++) {
            const slider = baseSliders[index]

            if (slider.classList.contains('base-slider__body_trending')) {
                new Swiper(slider, {
                    speed: 1000,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    breakpoints: {
                        991.98: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        767.98: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        490.98: {
                            slidesPerView: 2,
                        }
                    },
                    pagination: {
                        el: slider.closest('.base-slider').querySelector('.base-slider__dots'),
                        type: 'bullets',
                        clickable: true
                    },
                })

                continue;
            }

            if (slider.classList.contains('base-slider__body_popular')) {
                new Swiper(slider, {
                    speed: 1000,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: slider.closest('.base-slider').querySelector('.base-slider__button-next'),
                        prevEl: slider.closest('.base-slider').querySelector('.base-slider__button-prev'),
                    },
                    slidesPerView: 1,
                    breakpoints: {

                        767.98: {
                            slidesPerView: 1.7,
                        },

                    },
                    pagination: {
                        el: slider.closest('.base-slider').querySelector('.base-slider__dots'),
                        type: 'bullets',
                        clickable: true
                    },
                })

                continue;
            }
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


    const player = videojs('video-1')
    const timeEl = document.querySelector('.vjs-remaining-time')
    player.on('timeupdate', function() {
        let currentTime = player.currentTime().toFixed(0)
        let duration = player.duration().toFixed(0)


        if (currentTime < 10) {
            currentTime = '0' + currentTime
        }
        if (currentTime < 60) {
            currentTime = '0:' + currentTime
        } else {
            let seconds = currentTime % 60
            let minutes = currentTime / 60
            currentTime = (Math.floor(minutes).toFixed(0)) + ':'
                + (seconds < 10 ? '0' + seconds : seconds)


        }

        if (duration < 10) {
            duration = '0' + duration
        }
        if (duration < 60) {
            duration = '0:' + duration
        } else {
            duration = (Math.floor(duration / 60).toFixed(0)) + ':' + (duration % 60)
        }
        timeEl.innerHTML = currentTime + ' / ' + duration

    });
})
