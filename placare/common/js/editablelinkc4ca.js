/*global $*/
/*global site_base*/
"use strict";

$(document).ready(function()
{

    var link_id;
    var content;

    $(document).on("submit", ".form-link", function(e){
        e.preventDefault();
        var new_content=$(this).serializeArray()[0].value;
        $.post($(this).attr("action")+"?" + $(this).serialize(), function(){
                $.fancybox.close();
                document.getElementById(link_id).href=new_content;
        });
    });

    $(document).on("click", ".editablelink", function(e){

        link_id = $(this).attr("link-id");
        content = $(this).attr("content");

        var html='';
        html+='<form class="form-link" role="form" action="'+site_base +'/editablelink/save">';
        html+='<div class="form-group">';
          html+='<label for="content">Ingrese nuevo link:</label>';
          html+='<textarea class="form-control" rows="5" id="content" name="content">'+content+'</textarea>';
        html+='</div>';
        html+='<input type="hidden" name="link_id" value="'+link_id+'">';
        html+='<button type="submit" class="btn btn-default send">Guardar</button>';
        html+='</form>';

        $.fancybox({
            openEffect: 'fade',
            closeEffect: 'fade',
            width:500,
            height:300,
            autoDimensions: true,
            autoSize: false,
            content : html,
            helpers: {
                overlay: {
                    locked: false
                }
            },
        });


    });

    // $(".editablelink").editable(
    //     {
    //         "textAlign" : "center", 
    //         width : "100%",
    //         height : "200px",
    //         color : "black",
    //         input_type : "textarea",
    //     }, function(old_data, new_data)
    //     {
    //         if (new_data == "")
    //         {
    //             $(this).html("click para editar");
    //         }
    //         var link_id = $(this).attr("link-id");
    //         $.post(site_base + "/editablelink/save", { "link_id" : link_id, "content" : new_data }, function(){
    //             // nothing here
    //         });
    //     });
});