$(function () {
    $('ul li').on('click', function () {
        $(this).parent().find('li.active').removeClass('active');
        $(this).addClass('active');
    });
});