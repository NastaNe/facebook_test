/**
 * Created by nastane on 11/14/17.
 */

var Page = require('./page');
class LoginPage extends Page{

    get login_email() {
        return browser.element(".//*[@name='email']");
    }

    get login_password() {
        return browser.element(".//*[@name='pass']");
    }

    get login_button() {
        return browser.element(".//*[@id='loginbutton']");
    }

    login(data){
        if("name" in data){
            this.login_email.setValue(data['name']);
        }
        if("password" in data){
            this.login_password.setValue(data['password']);
        }
        this.login_button.click;
    }
}

module.exports = LoginPage;