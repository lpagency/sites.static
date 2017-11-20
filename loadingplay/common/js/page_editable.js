/*global $*/
/*global site_base*/
/*global EditMenuController*/
"use strict";

var PageEditModel = {
    "name" : "{{ page.name }}",
    "keywords" : "{{ page.keywords }}",
    "uri" : "{{ page.uri }}",
    "highlight" : false
};


var PageEditView = function(controller)
{
    this.controller = controller;
    this.options = {
        title : ".title-view",
        keywords : ".keywords-view",
        body : ".content-body",
        bodyURL : site_base + "/page/"+ PageEditModel.uri +"/body"
    };

    if (PageEditModel.highlight)
    {
        this.options.bodyURL = site_base + "/page/" + PageEditModel.uri + "/body?t=highlight";
    }

    if (this.controller !== undefined)
    {
        this.init();
    }
};

PageEditView.prototype.init = function() 
{
    var self = this;
    $(this.options.title).editable(
    {
        textAlign : "center"
    },
    function(old_value, new_value) 
    {
        document.title = new_value;
        self.controller.updateTitle(new_value);
    });

    $(this.options.keywords).editable(
    {
        textAlign : "center"
    },
    function(old_value, new_value)
    {
        self.controller.updateKeywords(new_value);
    });

    this.renderBody();
};

PageEditView.prototype.imageResize = function($img) 
{
    if ($img.hasClass("no-resize"))
        return;

    var offset = [parseInt($img.attr("offsetx")), 
                  parseInt($img.attr("offsety"))];

    var $canvas = $img.parent().parent();

    if ($canvas.width() == 0)
    {
        $canvas = $img.parent();
    }

    var image_size = [$img[0].naturalWidth, $img[0].naturalHeight];
    var canvas_size = [parseInt($canvas.css("width").replace("px", "")), 
                        parseInt($canvas.css("height").replace("px", ""))];

    var transform = $.me.getTransform(canvas_size, image_size, offset);

    $img.width(transform[0]);
    $img.height(transform[1]);
    $img.css("margin-left", transform[2] + "px");
    $img.css("margin-top", transform[3] + "px");
    $img.css("max-width", "auto");
};

PageEditView.prototype.loadLazyLoader = function() 
{
    var self = this;
    $("img.lazy").lazyload({
        effect : "fadeIn",
        load : function()
        {
            self.imageResize($(this));
        }
    });

    $(window).resize(function()
    {
        $("img.lazy").each(function()
        {
            self.imageResize($(this));
        });
    });
};

PageEditView.prototype.renderBody = function() 
{
    var self = this;
    var $body = $(self.options.body);

    $body.css("opacity", 0);
    $.get(this.options.bodyURL, function(html)
    {
        $body.html(html);
        $body.animate({ opacity : 1 }, 300);

        self.loadLazyLoader();
        new EditMenuController();  // adding edit menu
    });
};


var PageEditController = function()
{
    this.model = PageEditModel;
    this.view = new PageEditView(this);

    this.options = {
        "titleUpdate" : site_base + "/page/update"
    };
};

PageEditController.prototype.updateTitle = function(title) 
{
    this.model.name = title;
    this.updateModel();
};

PageEditController.prototype.updateKeywords = function(keywords) 
{
    this.model.keywords = keywords;
    this.updateModel();
};

PageEditController.prototype.updateModel = function() 
{
    var self = this;

    $.get(this.options.titleUpdate, this.model, function(data)
    {
        var json_data = $.parseJSON(data);

        if (json_data.hasOwnProperty("success"))
        {
            self.view.renderBody();
        }
    });
};


(function($) {
    $.fn.editablepage = function(options)
    {

        PageEditModel = {
            "name" : options.page_name,
            "keywords" : options.page_keywords,
            "uri" : options.page_uri,
            "highlight" : options.highlight === undefined ? false : options.highlight
        };

        var controller = new PageEditController();
    };


    $.fn.loadpagecontent = function(options)
    {
        PageEditModel = {
            "keywords" : options.page_keywords,
            "uri" : options.page_uri,
            "highlight" : options.highlight === undefined ? false : options.highlight
        };

        var page_body = new PageEditView();
        page_body.renderBody();
    };

})(jQuery);
