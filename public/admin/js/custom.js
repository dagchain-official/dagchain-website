$(document).ready(function () {

	// if header has fixed_header then add class on body for padding js start
	if ($("body .header.fixed_header").length > 0) {
		$("body").css("padding-top", $(".header.fixed_header").outerHeight());
	} else {
		$("body").css("padding-top", 0);
	}
	// if header has fixed_header then add class on body for padding js End


	// open_menusect js Start
	$(document).on("click", ".header .open_menusect", function () {
		$(this).toggleClass("click");
		$("#menusect").toggleClass("active");
		$(".dashboard_menu").toggleClass("active");

		// Ensure the click class is added if the dashboard_menu has the active class
		if ($(".dashboard_menu").hasClass("active")) {
			$(".header .open_menusect").addClass("click");
		} else {
			$(".header .open_menusect").removeClass("click");
		}
	});
	// open_menusect js End



	// menu js start
	$(".open_dashboard_menu").click(function () {
		$(".dashboard_menu").addClass("active");
		$(".header .open_menusect").addClass("click");
	});

	$(".dashboard_menu li").has(".dd_menu").addClass("dd");

	$(".menu_links .main_heading a").click(function () {
		$(this).addClass("active");
		$(this).closest("li").siblings("li").find(".dd_menu").slideUp();
		$(this).closest('li').siblings("li").removeClass('dd_active');
		$(this).closest("li").siblings("li").find(".main_heading a").removeClass("active");
		$(this).closest("li").find(".dd_menu").slideDown();
		$(this).closest('li').addClass('dd_active');
	});

	$(".dd_menu li a").click(function () {
		//$(this).siblings(".ddd_menu").slideToggle();
	});

	$(document).on("click", ".open_menusect.click", function () {
		$(".dashboard_menu").find(".dd_menu").css("display", "none");
		// $(".main_heading a").removeClass("active");
	});

	// For each <a> tag inside .main_heading



	// menu js end
});

