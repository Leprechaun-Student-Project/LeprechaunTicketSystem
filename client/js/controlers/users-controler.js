
import * as templates from 'templates'; // './js/templates.js'
import * as data from 'data';           // './js/data.js'

const USERNAME_LOCAL_STORAGE_KEY = 'signed-in-user-display_Name';
const AUTH_KEY_LOCAL_STORAGE_KEY = 'signed-in-user-auth-key';

// validate input user types into the form at 
function validate_User_Data(form_Input_Data) {
    const {
        display_Name,
        first_Name,
        last_Name,
        email,
        pass,
        pass_Confirm
    } = form_Input_Data;

    // https://regexper.com/#%2F%5E%5Ba-zA-Z0-9_%5C.%5D%7B6%2C30%7D%24%2F
    const regex_User_Name = /^[a-zA-Z0-9_\.]{6,30}$/;

    let error = false;

    if (!regex_User_Name.test(display_Name)) {
        /*toastr is a Javascript library for non-blocking notifications. jQuery is required. 
           The goal is to create a simple core library that can be customized and extended.*/
        toastr.error('Not correct display_Name field');
        error = true;
    }

    // https://regexper.com/#%2F%5E%5Ba-zA-Z%5D%7B1%2C30%7D%24%2F
    const regex_Name = /^[a-zA-Z]{1,30}$/;

    if (!regex_Name.test(first_Name)) {
        toastr.error('Not correct first name field');
        error = true;
    }

    if (!regex_Name.test(last_Name)) {
        toastr.error('Not correct last name field');
        error = true;
    }

    // https://regexper.com/#%2F%5E%5Cw%2B(%5B%5C.-%5D%3F%5Cw%2B)*%40%5Cw%2B(%5B%5C.-%5D%3F%5Cw%2B)*(%5C.%5Cw%7B2%2C3%7D)%2B%24%2F
    var regex_Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex_Email.test(email)) {
        toastr.error('Not correct email field');
        error = true;
    }

    if (!regex_User_Name.test(pass)) {
        toastr.error('Not correct password field');
        error = true;
    }

    if (pass !== pass_Confirm) {
        toastr.error('Not correct confirmation');
        error = true;
    }

    if (error) {
        return false;
    } else {
        return true;
    }
}

function build_Form_For_New_User() {
    templates.get('register')
        .then(function (template_HTML) {

            // draw form on window
            $('#main-content').html(template_HTML());

            $('#btn-register').on('click', function () {

                const form_Input_Data = {
                    display_Name: $('#tb-reg-display_Name').val(),
                    first_Name: $('#tb-reg-first_Name').val(),
                    last_Name: $('#tb-reg-last_Name').val(),
                    email: $('#tb-reg-email').val(),
                    pass: $('#tb-reg-pass').val(),
                    pass_Confirm: $('#tb-reg-pass-confirm').val()
                };

                if (validate_User_Data(form_Input_Data)) {
                    data.register_New_User(form_Input_Data)
                        .then(function(successObject) {
                            login(display_Name, pass);
                            toastr.success(`User ${successObject.display_Name} registered!`);
                        }, function(err) {
                            toastr.error(err.responseJSON);
                        });
                }

            });
        });
}

function login_Form() {
    templates.get('signin')
        .then(function(template_HTML) {
            $('#main-content').html(template_HTML());

            $('#sign-in').on('click', function() {
                const display_Name = $('#input-display_Name').val();
                const password = $('#input-password').val();
                login(display_Name, password)
            });
        });
}

function login(display_Name, password) {
    const usrname = display_Name;
    const pass = password;
    const passHash = pass; // HASH ME

    data.login(usrname, passHash)
        .then(
            result => {
                console.log(JSON.stringify(result));
                localStorage.setItem(AUTH_KEY_LOCAL_STORAGE_KEY, result.result.authKey);
                $('#log-in').addClass('hidden');
                $('#log-out').removeClass('hidden');
                toastr.success(`Hi, ${display_Name}`);
                location.href = '#';
            },
            errorMsg => toastr.error(errorMsg));
}

function logout() {
    localStorage.removeItem(AUTH_KEY_LOCAL_STORAGE_KEY);
    $('#log-in').removeClass('hidden');
    $('#log-out').addClass('hidden');
    //toastr.success('Logged out');
    location.href = '#';
}


export {
    build_Form_For_New_User,
    login_Form,
    logout
};
