/**
 * Created by nastane on 10/13/17.
 */

var MainPage = require('../pages/main.page');
var ConfirmationPage = require('../pages/conformation.page')
var fs = require('fs');
var {generateEmail, getInbox, getEmailHash, sleep} = require('../helpers/index_temp_mail');

describe('New account creation ', function () {
    let account;
    let emails;
    let confirmationPage = new ConfirmationPage;

    before(function () {
        fs.readFile('./helpers/accounts.json', 'utf8', function (err, data) {
            if (data) {
                var storage = JSON.parse(data);
                var random_number = Math.floor(Math.random() * (storage.items.length - 1)) + 1;
                account = storage.items[random_number];
            } else {
                console.log(err)
            }
        });
    });

    it('Create a new test email', function () {
        generateEmail(5).then(email => {
            console.log('new email', email);
            expect(typeof email).to.equal('string');
            account['email'] = email;
            return email;
        })
            .then(getInbox)
            .catch((err) => {
                expect(err.message).to.equal('Request failed: 404');
            });
    });

    it('Create a new non verified account', function () {
        var mainPage = new MainPage();
        mainPage.open();
        mainPage.createAccount(account);
        console.log(getEmailHash(account['email']));
        expect(mainPage.isCreatedOrLoggedIn(), 'User is created').to.equal(true, 'Account is not created');
    });

    it('Confirmation email is came', async function () {
        for(let i = 0; i <= 60; i+=10) {
            try {
                emails = await getInbox(account['email']);
                console.log(emails[0]["mail_from"]);
                if(emails)
                    break;
            } catch (err) {
                console.log("Response Rejected - ", err.message);
                await sleep(10000);
            }
        }
        expect(emails[0]["mail_from"]).to.contains('Facebook');
    });

    // TODO In Order to Post Something you need to Provide a Phone Number or Upload Photo to Facebook, which Facebook will check and
    // only after this you can write a post or add background -> It can be automated,
    // but really hard, especially because Facebook have different scenarios -> If you think that it is not enough for this task -> please contact me
    // and I will try to automate more steps. It was hard to find an email provider which is not blocked by Facebook.

    it('Confirm Registration and Upload Photo', function () {
        let url = (emails[0]["mail_text"]).split("\n")[2];
        console.log(url);
        browser.url(url);
        confirmationPage.file_input.waitForExist(50000);
        expect(confirmationPage.file_input.isExisting()).to.be.equal(true, "Facebook blocked this account, " +
            "you need to provide mobile phone for verification -> Should create new user");
        confirmationPage.file_input.setValue(__dirname +"/photo_test.jpg");
        browser.waitForVisible(".//*[contains(text(), 'photo_test.jpg')]");
        confirmationPage.submit_button.click();
        expect(confirmationPage.ok_button.isExisting()).to.be.equal(true, "Avatar is not uploaded")
    });

    after(function () {
        if(emails) {
            let json = JSON.stringify(account);
            fs.writeFile('./helpers/account_data.json', json, 'utf8', function (err) {
                if (err)
                    console.log("Error writing file" + err)
            });
        }
    });
});

