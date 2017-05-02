import * as router from 'router';
import { initUserNavbar } from 'users';

// Save initial tickets page offset to sessionStorage
window.sessionStorage.setItem('current_page_index', '1');   // one based

// register handlebars helpers to use later in display-tickets.js
Handlebars.registerHelper('getColSpan', function (obj_With_Properties) {
    return Object.keys(obj_With_Properties).length;
});

Handlebars.registerHelper('ifNotEqual', function (a, b, opts) {
    if (a !== b) {
        return opts.fn(this);       // pure mistery
    } else {
        return opts.inverse(this);  //
    }
});

Handlebars.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});

initUserNavbar();

router.initRouter();

window.alert("Stuff loaded. Now you can use the UI!");

// enable user clicks when the whole stuff is loaded and ready to go
document.getElementById('no-click').style.display = 'none';