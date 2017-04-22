import * as templates from 'templates';
import * as data from 'data';

function register() {
    templates.get('register')
        .then(function(template) {
            $('#main-content').html(template());

            $('#btn-register').on('click', function() {
                var user = {
                    username: $('#tb-reg-username').val(),
                    password: $('#tb-reg-pass').val()
                };

                data.register(user)
                    .then(function(successObject) {
                        toastr.success(`User ${successObject.username} registered!`);
                    }, function(err) {
                        toastr.error(err.responseJSON);
                    });
            });
        });
}

export {
    register
};
