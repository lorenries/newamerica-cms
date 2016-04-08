import $ from 'jquery'

import getJQueryObjects from './../../utilities/get_jquery_objects.js'

function getMobileNavLogo() {
	var imgSrc = $(".sidemenu .sidemenu__logo").attr("src");
	$(".mobile-nav__secondary__logo").attr("src", imgSrc);
}

function highlightActiveLink() {
	$('.sidemenu__link-group__link > a').each(function() {
		console.log($(this).prop('href'));
		console.log(window.location.href);
		if ($(this).prop('href') == window.location.href) {
			console.log("adding active class");
			$(this).addClass('active');
		}
	});
}

$( document ).ready(function() {
	$(highlightActiveLink)
	$(getMobileNavLogo)
});

// var clicked = false;

// function addSidemenuInteractivity() {
// 	$(".mobile-sidemenu__toggle").on("click", function() {
// 		clicked = !clicked;
// 		console.log("clicked!");
// 		$(".sidemenu").toggle();
// 		$(".content-container").toggle();
// 		$("footer").toggle();
// 	})
// }

// $(addSidemenuInteractivity)

// var $window = $( window ); // so you have a "cached" reference 
// var breakpoint = 640;

// $window.resize ( function () {
// 	// console.log("calling resize");
// 		if ($window.width() > breakpoint ) {
// 			// if (clicked == true ) {
// 				// console.log("width is greater");
// 		    	$(".sidemenu").css("display", "block");
// 				$(".content-container").css("display", "table-cell");
// 				$("footer").css("display", "block");
// 				clicked = false;
			
// 	  	} else {
// 	  		if (!clicked) {
// 	  			$(".sidemenu").css("display", "none");
// 	  		}
// 	  	} 
	
// });

