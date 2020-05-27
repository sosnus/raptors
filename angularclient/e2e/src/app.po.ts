import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToLocation(location: String) {
    return browser.get(browser.baseUrl + location) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
