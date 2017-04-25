import * as templates from 'templates';
import * as data from 'data';

function validateUserData(inputData) {
    const {
        username,
        frstname,
        lsname,
        email,
        pass,
        passConfirm
    } = inputData;

    const regexUsername = /^[a-zA-Z0-9_\.]{6,30}$/;
    let error = false;
    if (!regexUsername.test(username)) {
        toastr.error('Not correct username field');
        error = true;
    }

    const regexName = /^[a-zA-Z]{1,30}$/;

    if (!regexName.test(frstname)) {
        toastr.error('Not correct first name field');
        error = true;
    }

    if (!regexName.test(lsname)) {
        toastr.error('Not correct last name field');
        error = true;
    }

    var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regexEmail.test(email)) {
        toastr.error('Not correct email field');
        error = true;
    }

    if (!regexUsername.test(pass)) {
        toastr.error('Not correct password field');
        error = true;
    }

    if (pass !== passConfirm) {
        toastr.error('Not correct confirmation');
        error = true;
    }

    if (error) {
        return false;
    } else {
        return true;
    }
}

function register() {
    templates.get('register')
        .then(function(template) {
            $('#main-content').html(template());

            $('#btn-register').on('click', function() {
                const inputData = {
                    username: $('#tb-reg-username').val(),
                    frstname: $('#tb-reg-frstname').val(),
                    lsname: $('#tb-reg-lsname').val(),
                    email: $('#tb-reg-email').val(),
                    pass: $('#tb-reg-pass').val(),
                    passConfirm: $('#tb-reg-pass-confirm').val()
                };

                if (validateUserData(inputData)) {
                    data.register(inputData)
                        .then(function(successObject) {
                            toastr.success(`User ${successObject.username} registered!`);
                        }, function(err) {
                            toastr.error(err.responseJSON);
                        });
                }

            });
        });
}


export {
    register,

};
