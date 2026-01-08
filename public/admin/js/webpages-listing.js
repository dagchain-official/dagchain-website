$('.dropdownmenu').each(function () {
  $(this).dropdown();
});


$(document).ready(function () {

  // Filter toggle
  $(".filter_wrap .btntype").on("click", function () {
    $(this).siblings(".filter_whitebox").toggleClass("d-none");
  });

  $(".filter_wrap .filterbtn").on("click", function () {
    $(this).closest(".filter_whitebox").addClass("d-none");
  });

  // Select UI
  $(".single_select .common_box").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });

  $(".multiple_select .common_box").on("click", function () {
    $(this).toggleClass("active");
  });

  // Bulk action bar
  $(".hostedby_show").on("click", function () {
    $(".hostedby_onclick").toggleClass("d-none");
  });

  // Success toast
  $(document).on("click", ".show_successmsg", function () {
    const target = $(this).data("target");
    $("#" + target).addClass("show");

    setTimeout(() => {
      $(".top_successful_msg").removeClass("show");
    }, 4000);
  });

});
