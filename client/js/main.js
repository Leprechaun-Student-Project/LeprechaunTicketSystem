import * as router from 'router';
import { initUserNavbar } from 'users';
import { initQuickSerachEvent } from 'ticket';
import { initiatePopover } from 'popover'

initiatePopover();

initUserNavbar();

initQuickSerachEvent();

router.initRouter();
