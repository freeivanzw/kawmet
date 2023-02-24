$(function () {
    jQuery.fn.dropdown = function (options) {

        var settings = $.extend({
            arrow: '',
            prevent: true,
            onChange: ''
        }, options);

        return this.each(function () {
            var $this = $(this);

            if ($this.find('.selected').length > 0) {
                if ($(this).find('.overflow input').length > 0) {
                    $this.find('input:eq(0)')
                        .val($this.find('.selected').text())
                        .end()
                        .find('input').eq(1).val($this.find('.selected a').data('value'))
                        .end()
                        .find('.selected').closest('li').hide();
                } else {
                    $this.find('span:eq(0)')
                        .html($this.find('.selected').text() + settings.arrow)
                        .end()
                        .find('input').val($this.find('.selected a').data('value'))
                        .end()
                        .find('.selected').closest('li').hide();
                }
            }

            $this.on('click', '.overflow', function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (!$(this).closest('.dropdown').hasClass('dropdown-open') || e.target.tagName === 'INPUT') {
                    $this.addClass('dropdown-open').find('ul:eq(0)').stop().slideDown(function () {
                        var h = parseInt($(this).outerHeight(true, true)),
                            top = parseInt($(this).offset()['top']) - parseInt($(document).scrollTop()),
                            wh = parseInt($(window).height());

                        if (top + h > wh) {
                            var dwh = wh - top - 10;

                            if (dwh < 200) {
                                dwh = 200;
                            }

                            $(this).css({
                                'max-height': dwh
                            });
                        } else {
                            $(this).css({
                                'max-height': 'auto'
                            });
                        }
                    });
                } else {
                    $this.removeClass('dropdown-open').find('ul:eq(0)').stop().slideUp();
                }
            });

            $this.on('keyup paste', '.overflow input', function () {
                var val = $.trim($(this).val()).toLowerCase();

                if (val === '') {
                    $this.find('.search_hidden').removeClass('search_hidden').removeClass('hidden');
                } else {
                    $this.find('li').map(function () {
                        if ($(this).find('a').text().toLowerCase().search(val) > -1) {
                            $(this).removeClass('search_hidden').removeClass('hidden');
                        } else {
                            $(this).addClass('search_hidden').addClass('hidden');
                        }
                    });
                }
            });

            $this.find('ul').eq(0).on('click', 'a', function (e) {
                e.preventDefault();

                if (!$(this).hasClass('disabled')) {
                    if (settings.prevent === false) {
                        window.location.href = $(this).attr('href');
                    } else {
                        $(this).closest('ul').find('.selected').removeClass('selected').show().end().end().closest('li').addClass('selected').hide();

                        if ($(this).find('.overflow input').length > 0) {
                            $this.find('input:eq(0)').val($(this).text()).end().find('input:eq(1)').val($(this).data('value'));
                        } else {
                            $this.find('span:eq(0)').html($(this).text() + settings.arrow).end().find('input').val($(this).data('value'));
                        }

                        $this.removeClass('dropdown-open').find('ul:eq(0)').slideUp();
                        if ($.isFunction(settings.onChange)) settings.onChange($(this));
                    }
                }
            });
        });
    };

    $('.header_dropdown').find('.selected_box').on('click', function (e) {
        e.preventDefault();

        $(this).parent().toggleClass('active');
    })


    if ($(window).innerWidth() >= 1024) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 150) {
                $('body').addClass('header_fixed');
            } else {
                $('body').removeClass('header_fixed');
            }
        })

        $(window).trigger('scroll')
    }

    var $openMenu = $('.mob_menu-btn');
    var $closeMenu = $('.close-mobile_menu');
    var $mobMenu = $('.mobile_menu');

    $openMenu.on('click', function (e) {
        e.preventDefault();

        $mobMenu.addClass('active');
        $('body').addClass('overflow');
    })

    $closeMenu.on('click', function (e) {
        e.preventDefault();

        $mobMenu.removeClass('active');
        $('body').removeClass('overflow');
    })


    $('.order_payment').dropdown();
    $('.city_dropdown').dropdown();


    // --------------------- тест верхнього меню

    $('.top_menu-1lvl').on('click', 'a', function (e) {
        e.preventDefault();

        $('.site_header').toggleClass('menu-has_opened');
        $('body').toggleClass('overflow');
        $('.desk-top_menu').toggleClass('active');
        $('.shadow').toggleClass('hidden');

    })

    $('.header_catalog-btn').on('click', function (e) {
        e.preventDefault();

        $('.site_header').toggleClass('menu-has_opened');
        $('body').toggleClass('overflow');
        $('.desk-top_menu').toggleClass('active_fixed');
        $('.shadow').toggleClass('hidden');
    })
    // --------------------- тест верхнього меню


    $(window).on('scroll', function () {
        console.log()
        if ($(window).scrollTop() > 500) {
            $('.to_up').addClass('active');
        } else {
            $('.to_up').removeClass('active');
        }
    })

    $('.to_up').on('click', function (e) {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    })

    var $certificateSlider = new Swiper(".certificate_slider", {
        spaceBetween: 20,
        scrollbar: {
            el: ".custom-scrollbar",
            hide: false,
            draggable: true,
        },
        navigation: {
            nextEl: ".arrow-next",
            prevEl: ".arrow-prev",
        },
    });

    var $mainSlider = new Swiper(".main_slider", {
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
    });

    var $productSlider = new Swiper(".product_swiper", {
        spaceBetween: -1,
        slidesPerView: "auto",
        scrollbar: {
            el: ".custom-scrollbar",
            hide: false,
            draggable: true,
        },
        navigation: {
            nextEl: ".arrow-next",
            prevEl: ".arrow-prev",
        },
        breakpoints: {
            768: {
                spaceBetween: 10,
            }
        }
    });

    if ($(window).width() < 640) {
        var $categoriesSlider = new Swiper(".categories_slider", {
            spaceBetween: 5,
            slidesPerView: "auto",
            scrollbar: {
                el: ".custom-scrollbar",
                hide: false,
                draggable: true,
            },
        });
    }


    var $reviewsSlider = new Swiper(".reviews_slider", {
        spaceBetween: 20,
        slidesPerView: "auto",
        scrollbar: {
            el: ".custom-scrollbar",
            hide: false,
            draggable: true,
        },
        navigation: {
            nextEl: ".arrow-next",
            prevEl: ".arrow-prev",
        }
    });

    var $interiorSlider = new Swiper(".interior_slider", {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    if ($(window).width() < 1024) {
        var $categoriesSlider = new Swiper(".last_news-slider", {
            spaceBetween: 10,
            slidesPerView: "auto",
            scrollbar: {
                el: ".custom-scrollbar",
                hide: false,
                draggable: true,
            },
        });
    }


})

