$(window).load(function(){


    var screenW = $(window).outerWidth();

    

    $('.loader').fadeOut(200, function (){

        $('body').removeClass('loading');

        $('body').css('overflow','auto');

        $('.container').animate({

            opacity:1

        }, 1000);

        return false;

    });



    $.simpleWeather({

        location: '',

        woeid: '1020985',

        unit: 'c',

        success: function(weather) {

        html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+' <i class="icon-'+weather.code+'"></i></h2>';



        $("#weather").html(html);

        },

        error: function(error) {

        $("#weather").html('<p>'+error+'</p>');

        }

    });



    var originalContents = $('.btn_rsv').html();

    $('.btn_rsv').click(function (){

        if(!$('.fix_rsv').hasClass('open')){

            $(this).parent('ul').parent('.fix_rsv').animate({

                right: '0'

            }).addClass('open');

        }else{

            $(this).parent('ul').parent('.fix_rsv').animate({

                right: '-404px'

            }).removeClass('open');

        }

    })



    $('.btn_godown').click(function (e){

        e.preventDefault();

        var scrollto = $(this).attr('href');

        $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)-50}, 600);

    });



    $('#lang').change(function (e){

        e.preventDefault();

        var str = window.location.href; 

		console.log(str);

	

        if($(this).val() == ""){

            var res = str.replace("thelumierehotel.com/cn", "thelumierehotel.com");

            window.location.href = res;

			//console.log(res);

        }else{

            var res = str.replace("thelumierehotel.com", "thelumierehotel.com/cn");

            window.location.href = res;

			//console.log(res);



        }

    });



    //open/close primary navigation

    $('.cd-primary-nav-trigger').on('click', function(){

        $('.cd-menu-icon').toggleClass('is-clicked');

        $('.cd-header').toggleClass('menu-is-open');



        //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden

        if( $('.nav_wrap').hasClass('is-visible') ) {

            $('.nav_wrap').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){

                $('body').removeClass('overflow-hidden');

            });

        } else {

            $('.nav_wrap').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){

                $('body').addClass('overflow-hidden');

            });

        }

    });



    if(screenW > 1024){

        /* Subnav */

        $('.mainnav li').hover(function (){

            $(this).find('.subnav_cont').stop(true, false).fadeIn(200).removeClass('slideInDown fadeOutUp').addClass('slideInDown');

        }, function (){

            $(this).find('.subnav_cont').removeClass('slideInDown').addClass('fadeOutUp');

        });

        $('.nav_wrap .btn_speak, .footer .btn_speak, .nav_wrap .btn_happenings, .footer .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)-50}, 600);

            }

        });

        var footHeight = $(".footer").height();
        $('body').css({'padding-bottom' : footHeight + 40});

    }else{

        /* Subnav */

        $('.mainnav > li').each(function (){

            $(this).click(function (e){

                if($(this).has('ul').length){

                    e.preventDefault();

                    $(this).children('.subnav_cont').slideToggle(200);

                    $(this).children('.subnav_cont').find('li a').click(function (){

                        window.location= $(this).attr('href');

                    });

                }

            });

        });

        $('.nav_wrap .btn_speak, .nav_wrap .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                $('.cd-primary-nav-trigger').trigger('click');

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)}, 600);

            }

        });

        $('.footer .btn_speak, .footer .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)}, 600);

            }else{

                var scrollto = $(this).attr('href');

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)-50}, 600);

            }

        });

        var footHeight = $(".footer").height();
        $('body').css({'padding-bottom' : footHeight - 21});

    }



});



if($("#scroll_pagename").val() == 0){

    var headerHeight = $('.topbar').height();

    $(window).on('scroll',

    {

        previousTop: 0

    },

    function () {

        var currentTop = $(window).scrollTop();

        //check if user is scrolling up

        if (currentTop < this.previousTop ) {

            //if scrolling up...

            if (currentTop == 0 && $('.topbar').hasClass('scrDwn')) {

                $('.topbar').addClass('scrUp').removeClass('scrDwn');

            }

        } else {

            //if scrolling down...

            $('.topbar').removeClass('scrUp');

            if( currentTop > headerHeight && !$('.topbar').hasClass('scrDwn')) $('.topbar').addClass('scrDwn');

        }

        this.previousTop = currentTop;

    });

}

$(window).resize(function (){

    var screenW = $(window).outerWidth()+17;  // adding 17 cos there's some difference btw css and jquery calculation of window size



    var happImgH2 = $('.flex-active-slide .banner_happ_image').height()/2;

    $('.banner_happ .flex-direction-nav a').css({'top' : happImgH2});



    if(screenW > 1024){

        /* Subnav */

        $('.mainnav li').unbind();

        $('.mainnav li').hover(function (){

            $(this).find('.subnav_cont').stop(true, false).fadeIn(200).removeClass('slideInDown fadeOutUp').addClass('slideInDown');

        }, function (){

            $(this).find('.subnav_cont').removeClass('slideInDown').addClass('fadeOutUp');

        });

        $('.nav_wrap .btn_speak, .footer .btn_speak, .nav_wrap .btn_happenings, .footer .btn_happenings').unbind();

        $('.nav_wrap .btn_speak, .footer .btn_speak, .nav_wrap .btn_happenings, .footer .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)-50}, 600);

            }

        });
        var footHeight = $(".footer").height();
        $('body').css({'padding-bottom' : footHeight + 40});

    }else{

        /* Subnav */

        $('.mainnav > li').unbind();

        $('.mainnav > li').find('.subnav_cont').removeClass('slideInDown fadeOutUp');

        $('.mainnav > li').each(function (){

            $(this).click(function (e){

                if($(this).has('ul').length){

                    e.preventDefault();

                    $(this).children('.subnav_cont').slideToggle(200);

                    $(this).children('.subnav_cont').find('li a').click(function (){

                        window.location= $(this).attr('href');

                    });

                }

            });

        });

        $('.nav_wrap .btn_speak, .footer .btn_speak, .nav_wrap .btn_happenings, .footer .btn_happenings').unbind();

        $('.nav_wrap .btn_speak, .nav_wrap .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                $('.cd-primary-nav-trigger').trigger('click');

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)}, 600);

            }

        });

        $('.footer .btn_speak, .footer .btn_happenings').click(function (e){

            if(on_index){

                e.preventDefault();

                var scrollto = '#'+$(this).attr('href').split("#").pop();

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)}, 600);

            }else{

                var scrollto = $(this).attr('href');

                $("html, body").animate({ scrollTop: $(scrollto).offset().top-$('.topbar').outerHeight(true)}, 600);

            }

        });
        
        var footHeight = $(".footer").height();
        $('body').css({'padding-bottom' : footHeight - 21});

    }

});
