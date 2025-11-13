// cypress/support/e2e.js

import userRoles from './user-roles.js';
import l10n from './l10n.json';
import urls from './urls.js';
import selectors from './selectors.js';
import './commands';

global.userRoles = userRoles.userRoles;
global.inventoryPage = selectors.inventoryPage;
global.loginPage = selectors.loginPage;
global.cartPage = selectors.cartPage;
global.homePage = selectors.homePage;
global.checkoutInfoPage = selectors.checkoutInfoPage;
global.checkoutOverviewPage = selectors.checkoutOverviewPage;
global.checkoutCompletePage = selectors.checkoutCompletePage;

global.appUrls = urls; // changed from "global.urls" to "global.appUrls" and same change in all linked tests files
global.l10n = l10n;
