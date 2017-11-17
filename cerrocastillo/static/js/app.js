$(document).ready(function () {
    
    var $menuBtn = $(".header-btn");
    var $menu = $(".header-nav");

    $menuBtn.click(function () {
        $menu.slideToggle("fast");
    });

    var $window = $(window);
    var windowWidth;
    $window.resize(function () {
        windowWidth = $window.width();
        handleMenu(windowWidth);
    });

    function handleMenu(width) {
        if (width > 768) {
            $menu.css("display", "block");
        }
    }

    handleMenu($window.width());

    if ($(".popup")) {
        var $popupOpen = $(".popup-open");
        var $popupClose = $(".popup-close");
        var $popup = $(".popup");

        $popupOpen.click(function () {
            var $target = $(".popup[data-popup='" + $(this).attr("data-popup") + "']");
            $target.addClass("popup-active");
        });

        $popupClose.click(function () {
            $popup.removeClass("popup-active");
        });

    }
    
});