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

    var $dark = $('.shadow');
    $dark.on('click', function (e) {
        e.preventDefault();

        $(this).toggleClass('hidden');
    })

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
    $('.city_list').dropdown();


    // --------------------- тест верхнього меню

    $('.top_menu-1lvl').on('click', 'a', function (e) {
        e.preventDefault();

        $('.site_header').toggleClass('menu-has_opened');
        $('body').toggleClass('overflow');
        $('.desk-top_menu').toggleClass('active');
        $dark.toggleClass('hidden');

    })

    $('.header_catalog-btn').on('click', function (e) {
        e.preventDefault();

        $('.site_header').toggleClass('menu-has_opened');
        $('body').toggleClass('overflow');
        $('.desk-top_menu').toggleClass('active_fixed');
        $dark.toggleClass('hidden');
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

    $('.filters_cat').find('.has_drop').on('click', function (e) {
        e.preventDefault();

        $(this).parent().toggleClass('active');
        $('.catalog_filters').toggleClass('filter_overflow');
    })

    $('.turn_back').on('click', function (e) {
        e.preventDefault();

        $(this).parent().removeClass('active');
        $('.catalog_filters').removeClass('filter_overflow');
    })

    $('.open-filter_cat').on('click', function (e) {
        e.preventDefault();

        $('.catalog_filters').addClass('active');
        $('body').addClass('overflow');
        $dark.removeClass('hidden');
    })

    $('.close_filters').on('click', function (e) {
        e.preventDefault();

        $('.catalog_filters').removeClass('active');
        $('body').removeClass('overflow');
        $dark.addClass('hidden');
    })

    $dark.on('click', function () {
        $('.catalog_filters').removeClass('active');
        $('body').removeClass('overflow');
        $dark.addClass('hidden');
    })

    $('.filter_title').on('click', function (e) {
        e.preventDefault();

        $(this).parent().toggleClass('active');
    })

    $('.open-sort_cat').on('click', function (e) {
        e.preventDefault();

        $('.filter_sort').addClass('active');
        $dark.removeClass('hidden');
    })

    $('.close-filter_sort').on('click', function (e) {
        e.preventDefault();

        $('.filter_sort').removeClass('active');
        $dark.addClass('hidden');
    })

    $dark.on('click', function () {
        $('.filter_sort').removeClass('active');
    })

    $('.plus_icon').on('click', function (e) {
        e.preventDefault();

        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else  {
            $('.fireplace_prefer').removeClass('active');
            $(this).parent().addClass('active');
        }
    })

    $('.open-customers_aside').on('click', function (e) {
        e.preventDefault();

        $(this).addClass('hidden');
        $('.close-customers_aside').removeClass('hidden');
        $('.for_customers-aside').addClass('active');
    })

    $('.close-customers_aside').on('click', function (e) {
        e.preventDefault();

        $(this).addClass('hidden');
        $('.open-customers_aside').removeClass('hidden');
        $('.for_customers-aside').removeClass('active');
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

    if ($(window).width() < 768) {
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

    var $miniSlider = new Swiper(".mini_slider", {
        spaceBetween: 5,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
    });
    var $bigSlider = new Swiper(".big_slider", {
        navigation: {
            nextEl: ".arrow-next",
            prevEl: ".arrow-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        thumbs: {
            swiper: $miniSlider,
        },
    });


    $('.mini_slider').find('.arrow-next').on('click', function (e) {
        e.preventDefault();

        $('.big_slider').find('.arrow-next').trigger('click');
    })

    $('.mini_slider').find('.arrow-prev').on('click', function (e) {
        e.preventDefault();

        $('.big_slider').find('.arrow-prev').trigger('click');
    })

    var $videoSwiper = new Swiper(".video_swiper.small_video", {
        spaceBetween: 10,
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
    });

    var $videoSwiperBig = new Swiper(".video_swiper.big_video", {
        spaceBetween: 10,
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
                spaceBetween: 20,
            }
        }
    });

    var $interiorSwiper = new Swiper(".interior_swiper", {
        spaceBetween: 10,
        navigation: {
            nextEl: ".arrow-next",
            prevEl: ".arrow-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    if ($(window).width() < 768) {
        var $categoriesSlider = new Swiper(".download_doc-swiper", {
            spaceBetween: 10,
            slidesPerView: "auto",
            scrollbar: {
                el: ".custom-scrollbar",
                hide: false,
                draggable: true,
            },
        });
    }
    var $compareSlider = new Swiper(".compare_slider", {
        spaceBetween: 0,
        slidesPerView: "auto",
        scrollbar: {
            el: ".custom-scrollbar",
            hide: false,
            draggable: true,
        },
    });

    var $fixedCompareSlider = new Swiper(".fixed_compare-slider", {
        spaceBetween: 0,
        slidesPerView: "auto",
    });

    var $gallerySlider = new Swiper(".gallery_slider", {
        spaceBetween: 10,
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
                spaceBetween: 30,
            }
        }
    });

})

