import { Selector, ClientFunction } from 'testcafe';
import { AuthConfig } from '../src/assets/configuration/config'
const applicationUrl = 'http://localhost:8080';

fixture('Music Hall')
    .page(applicationUrl);

const getLocation = ClientFunction(() => document.location.href);

const sEmail = AuthConfig.sEmail;
const sPassword = AuthConfig.sPassword;

//For check navigation button is visible in normal or mobile view
const navigationBtn = Selector('button.navbar-toggler');
//For test create, view show, Add to cart and Favorite
const showName = 'Test Show';

test('Test - First page URL without Login', async t => {
    await t.expect(getLocation()).contains(`${applicationUrl}/#/`).wait(1500);
});

test('Test - Login page Authorization', async t => {
    await t.typeText('#sEmail', 'any@gmail.com')
        .typeText('#sPassword', 'abcd@1234')
        .click('.btn-primary');

    if (await Selector('.alert-danger').exists) {
        await t.click('#sEmail')
            .pressKey('ctrl+a delete')
            .typeText('#sEmail', sEmail)
            .click('#sPassword')
            .pressKey('ctrl+a delete')
            .typeText('#sPassword', sPassword)
            .click('.btn-primary')
            .expect(getLocation()).contains(`${applicationUrl}/#/show/create`);
    }
    else {
        await t.expect(getLocation()).contains(`${applicationUrl}/#/show/create`);
    }

});

test('Test - Home page', async t => {
    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('#home')
            .expect(Selector('.pt-3 .col h4').textContent).eql('The Music Hall').wait(1500);
    }
    else {
        await t.click('#home').expect(Selector('.pt-3 .col h4').textContent).eql('The Music Hall').wait(1500);
    }

});

test('Test - FAQ Page', async t => {
    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click(Selector('.dropdown-toggle span').withText('INFO')).click('#faq')
            .expect(Selector('.mt-3 .col h1').textContent).eql('FAQs').wait(1500);
    }
    else {
        await t.click(Selector('.dropdown-toggle span').withText('INFO')).click('#faq')
            .expect(Selector('.mt-3 .col h1').textContent).eql('FAQs').wait(1500);
    }
});

test('Test - FoodMenu Page', async t => {
    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click(Selector('.dropdown-toggle span').withText('INFO')).click('li #foodmenu')
            .expect(Selector('.mt-3 .col h1').textContent).eql('Food Menu').wait(1500);
    }
    else {
        await t.click(Selector('.dropdown-toggle span').withText('INFO')).click('li #foodmenu')
            .expect(Selector('.mt-3 .col h1').textContent).eql('Food Menu').wait(1500);
    }
});

test('Test - Merch Page', async t => {
    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('ul #merch')
            .expect(Selector('.mt-3 .col h1').textContent).eql('Merch').wait(1500);
    }
    else {
        await t.click('ul #merch')
            .expect(Selector('.mt-3 .col h1').textContent).eql('Merch').wait(1500);
    }
});

test('Test - Interview Page', async t => {
    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('ul #interview')
            .expect(Selector('h1').textContent).eql('Interview').wait(1500);
    }
    else {
        await t.click('ul #interview')
            .expect(Selector('h1').textContent).eql('Interview').wait(1500);
    }

});

test('Test - Create Show, View show , Buy ticket & Cart Page', async t => {

    await t.
        typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary')
        .typeText('#sName', showName)
        .typeText('.ck-editor__editable_inline', 'Test show description.')
        .click('.p-button-icon-only')
        .click('.p-datepicker-today')
        .typeText('#nPrice', '10.8')
        .click('.p-dropdown-trigger')
        .click('.p-dropdown-item')
        .click('div[name="Artist"]')
        .click('div[name="Artist"] .p-dropdown-item')
        .click(Selector('button').withText('Save'))
        .expect(getLocation()).contains(`${applicationUrl}/#/shows`)
        .click(Selector('.fc-content-skeleton table .fc-content .fc-title').withText(showName))
        .expect(getLocation()).contains(`${applicationUrl}/#/details`)
        .click(Selector('button').withText('Buy Now')).wait(1000);

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('#cart').wait(1000);
    }
    else {
        await t.click('#cart').wait(1000);
    }
});

test('Test - Favorite List', async t => {
    await t.typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('#shows').click(Selector('.fc-content-skeleton table .fc-content .fc-title').withText(showName))
            .expect(getLocation()).contains(`${applicationUrl}/#/details`).click('.heartfillcolor').click('#favorites').wait(2000);
    }
    else {
        await t.click('#shows').click(Selector('.fc-content-skeleton table .fc-content .fc-title').withText(showName))
            .expect(getLocation()).contains(`${applicationUrl}/#/details`).click('.heartfillcolor').click('#favorites').wait(2000);
    }
});

test('Test - Logout', async t => {
    await t.typeText('#sEmail', sEmail)
        .typeText('#sPassword', sPassword)
        .click('.btn-primary');

    if (await navigationBtn.visible) {
        await t.click(navigationBtn).click('#logout').expect(getLocation()).contains(`${applicationUrl}/#/login`).wait(500);
    }
    else {
        await t.click('#logout').expect(getLocation()).contains(`${applicationUrl}/#/login`).wait(500);
    }
});
