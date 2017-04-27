import * as router from 'router';  //'./js/router.js'

// Save initial tickets page offset to sessionStorage
window.sessionStorage.setItem('current_page_index', '0');

// init navigo router (Navigo maps routes to finctions)
router.initRouter();