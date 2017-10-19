$(document).ready(function () {
    
    // Menú principal
    var $menuBtn = $(".header-btn");
    var $menuLista = $(".header-menu");
    
    $menuBtn.click(function () {
        $menuLista.slideToggle("fast");
    });
    
    // Menús secundarios
    var $menuItemTrigger = $(".header-menu-item-trigger");
    
    $menuItemTrigger.hover(function () {
        var $this = $(this);
        var $submenu = $this.find(".header-submenu");
        if ($window.width() > 768) {
            var $icono = $this.find(".header-submenu-icono");
            $icono.fadeIn("fast");
        }
        $submenu.slideDown("fast");
    }, function () {
        var $this = $(this);
        var $submenu = $this.find(".header-submenu");
        if ($window.width() > 768) {
            var $icono = $this.find(".header-submenu-icono");
            $icono.fadeOut("fast");
        }
        $submenu.slideUp("fast");
    });
    
    var $window = $(window);
    var windowWidth;
    $window.resize(function () {
        windowWidth = $window.width();
        handleMenu(windowWidth);
    });
    
    function handleMenu(width) {
        if (width > 768) {
            $menuLista.css("display", "flex");
        } else {
            if ($menuLista.css("display") != "block") {
                $menuLista.css("display", "none");
            }
        }
    }
    
    if ($(".slider").length > 0) {
        $(".slider-contenido").slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            prevArrow: "<img src='../static/img/slider-flecha.png' class='slider-flecha slider-flecha-prev'>",
            nextArrow: "<img src='../static/img/slider-flecha.png' class='slider-flecha slider-flecha-next'>"
        });
    }
    
    if ($(".lista-slider").length > 0){
        $(".lista-slider").slick({
            mobileFirst: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            dots: false,
            prevArrow: "<img src='../static/img/lista-flecha.png' class='lista-slider-flecha lista-slider-flecha-prev'>",
            nextArrow: "<img src='../static/img/lista-flecha.png' class='lista-slider-flecha lista-slider-flecha-next'>",
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                }
            ]
        });
    }
    
    if ($(".producto").length > 0) {
        var $item = $(".producto-preview-item");
        var $img = $(".producto-preview-img");
        
        $item.click(function () {
            var src = $(this).attr("src");
            $img.attr("src", src);
        });
    }
    
});