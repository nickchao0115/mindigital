(function ($) {
  "use strict";

  var cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: ''   // mailchimp url
  },

    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);


  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {

    $("html").addClass('ss-preload');

    $WIN.on('load', function () {

      //force page scroll position to top at page refresh
      $('html, body').animate({ scrollTop: 0 }, 'normal');

      // will first fade out the loading animation 
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations 
      $("html").removeClass('ss-preload');
      $("html").addClass('ss-loaded');

    });
  };


  /* Mobile Menu
   * ---------------------------------------------------- */
  var ssMobileMenu = function () {

    var toggleButton = $('.header-menu-toggle'),
      nav = $('.header-nav-wrap');

    toggleButton.on('click', function (event) {
      event.preventDefault();

      toggleButton.toggleClass('is-clicked');
      nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $WIN.on('resize', function () {
      if (toggleButton.is(':visible')) nav.addClass('mobile');
      else nav.removeClass('mobile');
    });

    nav.find('a').on("click", function () {

      if (nav.hasClass('mobile')) {
        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
      }
    });

  };

  /* Highlight the current section in the navigation bar
   * ------------------------------------------------------ */
  var ssWaypoints = function () {

    var sections = $(".target-section"),
      navigation_links = $(".header-main-nav li a");

    sections.waypoint({

      handler: function (direction) {

        var active_section;

        active_section = $('section#' + this.element.id);

        if (direction === "up") active_section = active_section.prevAll(".target-section").first();

        var active_link = $('.header-main-nav li a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");

      },

      offset: '25%'

    });

  };

  /* site Istotope
  * ------------------------------------------------------ */

  var siteIstotope = function() {
    var $container = $('#posts').isotope({
      itemSelector : '.item',
      isFitWidth: true
    });
  
    $container.isotope({ filter: '*' });
  
    $('#filters').on( 'click', 'a', function(e) {
      e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $('#filters a').removeClass('active');
      $(this).addClass('active');
    });
  
    $container.imagesLoaded()
    .progress( function() {
      $container.isotope('layout');
    })
    .done(function() {
      $('.gsap-reveal-img').each(function() {
        var html = $(this).html();
        $(this).html('<div class="reveal-wrap"><span class="cover"></span><div class="reveal-content">'+html+'</div></div>');
      });
  
      var controller = new ScrollMagic.Controller();
  
      var revealImg = $('.gsap-reveal-img');
  
      if ( revealImg.length ) {
        var i = 0;
        revealImg.each(function() {
  
          var cover = $(this).find('.cover'),
            revealContent = $(this).find('.reveal-content'),
            img = $(this).find('.reveal-content img');
  
  
          var tl2 = new TimelineMax();
  
  
          setTimeout(function() {
  
            tl2
              tl2.set(img, {  scale: '2.0', autoAlpha: 1, })
              .to(cover, 1, { marginLeft: '0', ease:Expo.easeInOut, onComplete() {
                tl2.set(revealContent, { autoAlpha: 1 });
                tl2.to(cover, 1, { marginLeft: '102%', ease:Expo.easeInOut });
                tl2.to(img, 2, { scale: '1.0', ease:Expo.easeOut }, '-=1.5');
              } } )
  
          }, i * 700);
  
          
  
          var scene = new ScrollMagic.Scene({
            triggerElement: this,
            duration: "0%",
            reverse: false,
            offset: "-300%",
          })
          .setTween(tl2)
          .addTo(controller);
  
          i++;
  
        });
      }
    })
  
    $('.js-filter').on('click', function(e) {
      e.preventDefault();
      $('#filters').toggleClass('active');
    });
  
  }

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function () {

    $('.smoothscroll').on('click', function (e) {
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, cfg.scrollDuration, 'swing').promise().done(function () {

        // check if menu is open
        if ($('body').hasClass('menu-is-open')) {
          $('.header-menu-toggle').trigger('click');
        }

        window.location.hash = target;
      });
    });

  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var ssAOS = function () {

    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 300,
      once: true,
      disable: 'mobile'
    });

  };

  /* owlCarousel
   * ------------------------------------------------------ */
  var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			autoplaySpeed:2000,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});
	};
	
  /* Initialize
   * ------------------------------------------------------ */
  (function clInit() {

    ssPreloader();
    ssMobileMenu();
    ssWaypoints();
    ssSmoothScroll();
    ssAOS();
    siteIstotope();
    carousel();
  })();

})(jQuery);