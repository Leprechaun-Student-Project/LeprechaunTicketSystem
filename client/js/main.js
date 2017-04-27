import * as router from 'router';
import { initUserNavbar } from 'users';

// Save initial tickets page offset to sessionStorage
window.sessionStorage.setItem('current_page_index', '0');

initUserNavbar();

router.initRouter();
