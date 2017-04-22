import * as users from 'users';

function initRouter() {
    const router = new Navigo(null, false);

    router
        .on('login', () => users.register())
        .on('/', () => {
            $('#main-content').html('');
        })
}

export {
    initRouter
};
