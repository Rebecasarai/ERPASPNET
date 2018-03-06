

$(function () {
    $("#tooltipdiv").hide();
    $("#tooltipdivpass").hide();
    $('#myform').on('submit', function (e) {
        var email = $('#email');
        var password = $('#password');

        if (!email.val()) {
            email.closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#tooltipdiv").show();

            //No permite hacer submit
            e.preventDefault();
        } 
        if (!password.val()) {
            password.closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#tooltipdivpass").show();

            e.preventDefault();
        } else {
            $("#tooltipdiv").hide();
            $("#tooltipdivpass").hide();
            email.closest('.form-group').removeClass('has-error').addClass('has-success');
            password.closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });

});