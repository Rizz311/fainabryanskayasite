"use strict";

$(window).load( function() {

//PRELOADER
 $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.



    if ($('.isotope_items').length) {

    // GALLERY ISOTOPE
     var $container = $('.isotope_items');
     $container.isotope();

    $('.gallery_filter ul li').on("click", function(){
        $(".gallery_filter ul li").removeClass("select-cat");
        $(this).addClass("select-cat");
        var selector = $(this).attr('data-filter');
        $(".isotope_items").isotope({
            filter: selector,
    });
        return false;
    });

}



     // PAGE ANIMATION

		var ascensor = $('#ascensorBuilding').ascensor({
				height: "100%",
				ascensorFloorName:["home", "about", "experience" , "gallery" , "contact"], direction: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]]});
			var ascensorInstance = $('#ascensorBuilding').data('ascensor');
			var floorAdded = false;

			$(".links-to-floor li").on("click", function(event, index) {
				ascensorInstance.scrollToFloor($(this).index());
			});

			$(".links-to-floor li a:eq("+ ascensor.data("current-floor") +")").addClass("selected");

			ascensor.on("scrollStart", function(event, floor){
				$(".links-to-floor li a").removeClass("selected");
				$(".links-to-floor li a:eq("+floor.to+")").addClass("selected");
			});

			$(".prev").on("click", function() {
				ascensorInstance.prev();
			});

			$(".next").on("click", function() {
				ascensorInstance.next();
			});

			$(".direction").on("click", function() {
				ascensorInstance.scrollToDirection($(this).data("direction"));
			});


}); // load end



$(document).ready( function() {



		// MAGNIFIC POPUP FOR GALLERY PAGE
        if ($('.image-link').length) {
            $('.image-link').magnificPopup({
                type: 'image'
            });
        }



	//PAGE SLIDER
        if ($('#page-slider').length) {
            $("#page-slider").owlCarousel({
                  navigation : false, // Show next and prev buttons
                  pagination : false,
                  slideSpeed : 300,
                  paginationSpeed : 400,
                  singleItem:true,
                  autoPlay: true
              });
        }


	//TESTIMONIAL SLIDER
    if ($('#testimonial').length) {
		$("#testimonial").owlCarousel({
			  navigation : false, // Show next and prev buttons
			  pagination : true,
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true,
			  autoPlay: true
		  });
    }


		// CUSTOM SCROLLBAR
    if ($('.scroll-out').length) {
		$(".scroll-out").mCustomScrollbar({
			   theme:"minimal-dark",
			   autoHideScrollbar: true,
			});
    }




}); // ready end



/* Contact Form JS*/
(function($){
   'use strict';

   $(".contact-form").on('submit', function(e){
        e.preventDefault();

        var uri = $(this).attr('action');
        $("#con_submit").val('Wait...');
        var con_name = $("#con_name").val();
        var con_email = $("#con_email").val();
        var con_message = $("#con_message").val();

        var required = 0;
        $(".requie", this).each(function() {
            if ($(this).val() == '')
            {
                $(this).addClass('reqError');
                required += 1;
            }
            else
            {
                if ($(this).hasClass('reqError'))
                {
                    $(this).removeClass('reqError');
                    if (required > 0)
                    {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0)
        {
            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: {con_name: con_name, con_email: con_email, con_message: con_message},
                success: function(data)
                {
                    $(".contact-form input, .contact-form textarea").val('');
                    $("#con_submit").val('Done!');
					$("#con_submit").addClass("ok");
                }
            });
        }
        else
        {
            $("#con_submit").val('Failed!');
        }
   });
   $(".requie").keyup(function() {
        $(this).removeClass('reqError');
    });

})(jQuery);
