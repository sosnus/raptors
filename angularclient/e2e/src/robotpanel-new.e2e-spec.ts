import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('robot status', () => {
    let page: AppPage;
    const login = "dispatchTest";
    const password = "gBrZzVbCbMsr";

    beforeEach(async () => {
        page = new AppPage();
        const script = "sessionStorage.setItem('token', btoa('" + login + ":" + password + "'))";
        await page.navigateToLocation('robotpanel-new/refreshtest');
        await browser.executeScript(script);
        await page.navigateToLocation('robotpanel-new/refreshtest');
    });

    it('check robot status table contents', () => {
        page.navigateToLocation('robotpanel-new/refreshtest');

        expect(
            element.all(by.cssContainingText('h3', 'Status robota')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('button', 'refresh')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('th', 'Online')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('th', 'IP')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('th', 'Pozycja')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('th', 'Orientacja')).count()
        ).toEqual(1);

        expect(
            element.all(by.cssContainingText('th', 'Bateria')).count()
        ).toEqual(1);
    });

    it('should refresh robot status table', async () => {
        await page.navigateToLocation('robotpanel-new/refreshtest');
        
        var pole = element(by.cssContainingText('td', '104, 76.4, 34.34'))

        expect(
            element.all(by.cssContainingText('td', '104, 76.4, 34.34')).count()
        ).toEqual(1);
        expect(
            pole.isPresent()
        ).toBeTruthy;

        await element(by.cssContainingText('button', 'refresh')).click();

        expect(
            element.all(by.cssContainingText('td', '104, 76.4, 34.34')).count()
        ).toEqual(1);
        expect(
            pole.isPresent()
        ).toBeTruthy;
    });
});

describe('breadcrumbs', () => {
    let page: AppPage;
    const login = "dispatchTest";
    const password = "gBrZzVbCbMsr";

    beforeAll(async () => {
      page = new AppPage();
      const script = "sessionStorage.setItem('token', btoa('" + login + ":" + password + "'))";
      await page.navigateToLocation('robotpanel-new/refreshtest');
      await browser.executeScript(script);
      await page.navigateToLocation('robotpanel-new/refreshtest');
    });

    // wejdz w model >> batteryType i name field jest capacity
    it('*see more* should return correct model', async () => {
        await page.navigateToLocation('robotpanel-new/refreshtest');

        const model = element(by.cssContainingText('th', 'model'));
        expect(model.isPresent());

        model.element(by.xpath('..')).element(by.cssContainingText('td', 'see more')).click();

        const field = element(by.cssContainingText('th', 'maxLiftingCapacity'));
        expect(field.isPresent());

        const batteryType = element(by.cssContainingText('th', 'batteryType'));
        expect(batteryType.isPresent());

        batteryType.element(by.xpath('..')).element(by.cssContainingText('td', 'see more')).click();

        const capacity = element(by.cssContainingText('th', 'capacity'));
        expect(capacity.isPresent());
    });

    // cofnij się do moduelu, jest field o nazwie maxVelocity
    it('breadcrumbs should navigate you back', async () => {
        await page.navigateToLocation('robotpanel-new/refreshtest');
        const model = element(by.cssContainingText('th', 'model'));
        model.element(by.xpath('..')).element(by.cssContainingText('td', 'see more')).click();
        const batteryType = element(by.cssContainingText('th', 'batteryType'));
        batteryType.element(by.xpath('..')).element(by.cssContainingText('td', 'see more')).click();
        const capacity = element(by.cssContainingText('th', 'capacity'));
        expect(capacity.isPresent()); //entered "root >> model >> batteryType"

        const breadcrumbsModel = element(by.cssContainingText('span', 'model'));
        expect(breadcrumbsModel.isPresent());
        breadcrumbsModel.click(); //entered "root >> model

        const turningRadius = element(by.cssContainingText('th', 'turningRadius'));
        expect(turningRadius.isPresent());
    });
});
