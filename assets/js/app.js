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


    const mainSlider = new Swiper('.main-slider__body', {
        speed: 1000,
        // navigation: {
        //     nextEl: document.querySelector('.controls-main-slider__button-next'),
        //     prevEl: document.querySelector('.controls-main-slider__button-prev'),
        // },
        pagination: {
            el: '.controls-main-slider__dots',
            type: 'bullets',
            clickable: true
        },
    })


})
