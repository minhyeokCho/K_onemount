$(document).ready(function(){
	$('.js_gnb').length && gnbDepth();
	$('.js_main_visual').length && mainVisual();
	$('.js_main_banner').length && mainBanner();
	$('.js_btn_drop').length && dropTab();
	$('.js_tab_menu').length && tabMenu();
	$('.js_btn_top').length && btnTop();


	// responsive event
	var wWidth = windowWidth();

	if(wWidth < 1025){
		$('.js_m_gnb').length && gnbMenu();
	}else{
		if($('.js_m_nav').hasClass('on')){
			$('.js_m_nav').removeClass('on');
			$('#dim').hide();
		}
	};


	// resize event
	$(window).resize(function (e) {
		var wWidth = windowWidth();

		if(wWidth < 1025){
			$('.js_m_gnb').length && gnbMenu();
		}else{
			if($('.js_m_nav').hasClass('on')){
				$('.js_m_nav').removeClass('on');
				$('#dim').hide();
				$('body').removeClass('fixed');
			}
		}
	});
});

function Mobile(){ // mobile
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function windowWidth() { // responsive
	if($(document).innerHeight() > $(window).innerHeight()){
		if(Mobile()){
			return $(window).innerWidth();
		}else{
			return $(window).innerWidth() + 17;
		}
	}else{
		return $(window).innerWidth();
	}
}

function gnbDepth(){
	$('.js_gnb > li').on('mouseenter', function(){
		$(this).addClass('active');
		$(this).find('ul').stop().slideDown();
	});
	$('.js_gnb > li').on('mouseleave', function(){
		$(this).removeClass('active');
		$(this).find('ul').stop().slideUp();
	})
}

function dimShow(){ // dim show
	$('#dim').stop().fadeIn();
	$('body').addClass('fixed');
}
function dimHide(){ // dim hide
	$('#dim').stop().fadeOut();
	$('body').removeClass('fixed');
}

function gnbMenu() { // mobile gnb
	var gnbArrow = $('.js_m_gnb .m_gnb_arrow');
	$('.js_m_gnb .m_gnb_arrow').off().on('click', function(){ // mobile gnb 1depth
		$(gnbArrow).not(this).closest('li').removeClass('on');
		$(gnbArrow).not(this).parent('div').next('ul').stop().slideUp();

		if($(this).closest('li').hasClass('on')){
			$(this).closest('li').removeClass('on');
			$(this).parent('div').next('ul').stop().slideUp();
		}else{
			$(this).closest('li').addClass('on');
			$(this).parent('div').next('ul').stop().slideDown();
		}
	});

	$('.js_btn_allmenu_m').off().on('click', function(){ // mobile GNB open
		$('.js_m_nav').addClass('on');
		dimShow();
	})
	$('.js_btn_allmenu_close_m').off().on('click', function(){ // mobile GNB close
		$('.js_m_nav').removeClass('on');
		dimHide();
	});

	$('#dim').mouseup(function (e){ // mobile GNB close
		var gnb = $('.js_m_nav');
		if(gnb.has(e.target).length == 0 && gnb.hasClass('on')){
			gnb.removeClass('on');
			dimHide();
		}
	});
}

function mainVisual(){ // main visual
	$('.js_main_visual').not('.slick-initialized').slick({
		arrows: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 1000,
		pauseOnHover: false,
		pauseOnFocus: false,
		infinite: true,
	});
}

function mainBanner(){ // main banner
	$('.js_main_banner').not('.slick-initialized').slick({
		arrows: true,
		prevArrow : $('.js_mn_btn_left'),
  		nextArrow : $('.js_mn_btn_right'),
		dots: false,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 1000,
		pauseOnHover: false,
		pauseOnFocus: false,
		infinite: true,
	});
	$('.js_mn_btn_pause').on('click', function(){
		if($(this).hasClass('on')){
			$('.js_main_banner').slick('slickPlay');
			$(this).removeClass('on');
		}else{
			$('.js_main_banner').slick('slickPause');
			$(this).addClass('on');
		}
	});

	var current = $('.js_current_num'),
		total = $('.js_total_num'),
		totalCount = $('.js_main_banner_con').length,
		slickCloned = $('.js_main_banner_con.slick-cloned').length;

	total.text(totalCount - slickCloned);

	$('.js_main_banner').on('beforeChange', function (event, slick, currentSlide) {
		$('.slick-slide').removeClass('on');
	});

	$('.js_main_banner').on('afterChange', function (event, slick, currentSlide) {
		$('.slick-slide').removeClass('on');
		$('.slick-current').addClass('on');

		var i = (currentSlide ? currentSlide : 0) + 1;

		current.text(i);
		total.text(slick.slideCount);
	});
}

function dropTab(){ // drop tab
	$('.js_btn_drop').on('click', function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(this).next('.js_drop_menu').stop().slideUp();
		}else{
			$(this).addClass('on');
			$(this).next('.js_drop_menu').stop().slideDown();
		}
	});
}

function tabMenu(){ // click tab
	$('.js_tab_con').hide().first().show();
	$('.js_tab_menu li').on('click', function(){
		var cnt = $(this).index();
		$('.js_tab_menu li').not(this).removeClass('on');
		$(this).addClass('on');
		$('.js_tab_con').hide();
		$('.js_tab_con').eq(cnt).stop().fadeIn();
	})
}

function btnTop(){ // top btn
	$(window).scroll(function(e){
		if ($(window).scrollTop() > 100) {
			$('.js_btn_top').addClass('on');
		} else {
			$('.js_btn_top').removeClass('on');
		}
	});

	if ($(window).scrollTop() > 100) {
		$('.js_btn_top').addClass('on');
	} else {
		$('.js_btn_top').removeClass('on');
	}

	$('.js_btn_top').on('click',function(e){
		$('html, body').stop().animate({
			'scrollTop': 0
		},400);
		return false;
	});
}