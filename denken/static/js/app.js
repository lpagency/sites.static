$(document).ready(function () {
    
    var $headerBtn = $(".header-btn");
    var $headerNav = $(".header-nav");    

    $headerBtn.click(function () {
        $headerNav.slideToggle("fast");
    });
    
});