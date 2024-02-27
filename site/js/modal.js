let elements1 = $('.modal-overlay, .modal');

$('.img1').click(function(){
    elements1.addClass('active');
    $("body").addClass("locked");
});

$('.close-modal').click(function(){
    elements1.removeClass('active');
    $("body").removeClass("locked");
});

let elements2 = $('.modal-overlay2, .modal2');

$('.img2').click(function(){
    elements2.addClass('active');
    $("body").addClass("locked");
});

$('.close-modal2').click(function(){
    elements2.removeClass('active');
    $("body").removeClass("locked");
});

let elements3 = $('.modal-overlay3, .modal3');

$('.img3').click(function(){
    elements3.addClass('active');
    $("body").addClass("locked");
});

$('.close-modal3').click(function(){
    elements3.removeClass('active');
    $("body").removeClass("locked");
});

