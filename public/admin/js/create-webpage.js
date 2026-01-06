$('.dropdownmenu').each(function () {
    $(this).dropdown();
});

$(document).ready(function () {
    // nextstep js Start
    $(document).on("click", ".nextstep_btn", function (e) {
        const isPrev = $(this).hasClass("prevbtn");

        // 🚫 Block NEXT only
        if (!isPrev && !$(this).data("allow-next")) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }

        // reset flag after use
        $(this).data("allow-next", false);

        var targetDiv = $(this).data("target");
        $(".step_content").addClass("d-none");
        $("." + targetDiv).removeClass("d-none");
        $(".nextstep_btn").removeClass("active");
        $(this).addClass("active");
    });

    // ✅ NEW: allow navigation without click
    $(document).on("allow-next-step", function (e, target) {
        $(".step_content").addClass("d-none");
        $("." + target).removeClass("d-none");
        $(".nextstep_btn").removeClass("active");
    });
    // nextstep js End

    // select js Start
    $('.single_select .common_box').click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    $('.multiple_select .common_box').click(function () {
        $(this).toggleClass("active");
    });
    // select js End

    // upload image js Start
    $(".file-input").change(function () {
        var uploadBox = $(this).closest(".uploadbox");
        var curElement = uploadBox.find(".uploadiimage");
        var originalImage = uploadBox.find(".image");
        var removeButton = uploadBox.find(".remove");
        var fileNameElement = uploadBox.find(".file_name");
        var fileSizeElement = uploadBox.find(".file_size");
        var hoverbox = uploadBox.find(".hoverbox");

        var file = this.files[0]; // Get the selected file
        if (file) {
            var fileExtension = file.name.split(".").pop().toLowerCase();
            var reader = new FileReader();
            reader.onload = function (e) {
                curElement.attr("src", e.target.result);
                curElement.removeClass("d-none");
                originalImage.addClass("d-none");
                removeButton.removeClass("d-none");
                hoverbox.addClass("d-none");
                uploadBox.addClass("uploaded");
            };
            reader.readAsDataURL(file);

            // Set file name and size
            fileNameElement.text(file.name);
            fileSizeElement.text((file.size / 1024).toFixed(2) + " KB");
        }
    });

    $(".remove").click(function () {
        var uploadBox = $(this).closest(".uploadbox");
        var curElement = uploadBox.find(".uploadiimage");
        var originalImage = uploadBox.find(".image");
        var removeButton = $(this);
        var fileNameElement = uploadBox.find(".file_name");
        var fileSizeElement = uploadBox.find(".file_size");
        var hoverbox = uploadBox.find(".hoverbox");

        curElement.addClass("d-none");
        originalImage.removeClass("d-none");
        removeButton.addClass("d-none");
        hoverbox.removeClass("d-none");
        uploadBox.find(".file-input").val("");
        fileNameElement.text("No File Chosen");
        fileSizeElement.text("");
        uploadBox.removeClass("uploaded");
    });
    // upload image js End


    // Filter js Start  
    $('.filter-input').on('input', function () {
        var filterValue = $(this).val().toLowerCase();
        var $list = $(this).closest(".menu").find('.filterfrom');

        $list.find('.item').each(function () {
            var text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(filterValue));
        });
    });
    // Filter js End

    // top_successful_msg js start
    $(document).on("click", ".show_successmsg", function () {
        var targetDiv = $(this).data('target');
        $('#' + targetDiv).addClass("show");

        setTimeout(function () {
            $(".top_successful_msg").removeClass("show");
        }, 4000);
    });

    $(".top_successful_msg .close_successful_msg").on("click", function () {
        $(this).closest(".top_successful_msg").removeClass("show");
    });
    // top_successful_msg js end

    // Textarea autoheight js Start
    var textareas = document.querySelectorAll(".text_autoheight");
    textareas.forEach(function (textarea) {
        textarea.addEventListener("input", function () {
            this.style.height = (this.scrollHeight) + "px";
        });
        textarea.style.height = (textarea.scrollHeight) + "px";
    });
    // Textarea autoheight js End

    // modal_autoclose js Start 
    function closeSuccessModal() {
        $('.modal_autoclose').modal('hide');
    }
    $('.modal_autoclose').on('shown.bs.modal', function () {
        setTimeout(closeSuccessModal, 5000);
    });
    // modal_autoclose js End
});