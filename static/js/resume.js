$(document).ready(function(){

    var $header_btn = $("header h1"),
    delaytime = 1000,
    original_btn_styles= $header_btn.css(['font-size','color']);


    $("button").on('click',function(){
        $header_btn.css({'color':'red'});
        $header_btn.animate({fontSize: '+=.5rem'}, delaytime);

        // add border for introduction photo
        $('figure img').css({'border':'0px solid white'}).animate({borderWidth:"2px"});


        // back to original font size
        setTimeout(function(){
            $header_btn.animate({fontSize: '-=.5rem'},delaytime);
        }, delaytime)

        // back to original color
        setTimeout(function(){
            $header_btn.css({color:original_btn_styles['color']});
        }, delaytime * 2);
  });


});
