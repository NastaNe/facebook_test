/**
 * Created by nastane on 10/14/17.
 */


var Page = require('./page');
class ConformationPage extends Page {
    get code_conformation(){
        return browser.element("//*[@name='code']");
    }

    get file_input() {
        return browser.element(".//input[contains(@type, 'file')]");
    }

    get submit_button(){
        return browser.element(".//button[contains(@type, 'submit')]");
    }

    open() {
        super.open('');
    }
}
module.exports = ConformationPage;