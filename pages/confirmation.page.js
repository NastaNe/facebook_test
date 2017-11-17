/**
 * Created by nastane on 10/14/17.
 */


var Page = require('./page');
class ConfirmationPage extends Page {
    get code_conformation(){return browser.element("//*[@name='code']");}

    get file_input() {return browser.element(".//input[contains(@type, 'file')]");}

    get submit_button(){return browser.element(".//button[contains(@type, 'submit')]");}

    get ok_button(){return browser.element(".//*[contains(text(), 'OK')]");}

    submitCode(code){
        this.code_conformation.setValue(code);
        this.submit_button.click();
    }

    open() {
        super.open('' + "/login");
    }
}
module.exports = ConfirmationPage;