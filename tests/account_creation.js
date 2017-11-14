/**
 * Created by nastane on 10/13/17.
 */

var expect = require('chai').expect;
var CreateAccountPage = require('../pages/create_account.page');
var fs = require('fs');
var {generateEmail, getInbox, getEmailHash} = require('../helpers/index_temp_mail');

describe('New account creation ', function () {
    var account;

    before(() => {
        var random_number = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        fs.readFile('./helpers/accounts.json', 'utf8', function (err, data) {
            if (data) {
                var storage = JSON.parse(data);
                account = storage.items[random_number];
            } else {
                console.log(err)
            }
        });
    });

    it('Create a new email', function () {
        console.log('Create a new email');
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

    it('should create a new non verified account -> email for confirmation in Inbox', function () {
        var createAccountPage = new CreateAccountPage();
        createAccountPage.open();
        createAccountPage.createAccount(account);
        console.log('login');
        browser.pause(7000);
        console.log(getEmailHash(account['email']));
        getInbox(account['email']).then(result => {
            console.log('res = ', result);
            emails = result;
            expect(result[0].mail_from).to.contains('Facebook');
            return result;
        }).catch(function () {
            console.log("Promise Rejected");
        });
    });

    it('Confirm account from email', function () {
        getInbox(account['email'])
            .then((result) => {
                expect(result[0].mail_from).to.contains('Facebook');
                return result;
            }).catch(function () {
            console.log("Promise Rejected");
        });
    });
});

