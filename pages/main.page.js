/**
 * Created by nastane on 10/13/17.
 */

/**
 * Created by nastane on 9/16/17.
 */

var Page = require('./page');
class MainPage extends Page {
    get first_name() {return browser.element("//*[@name='firstname']");}

    get last_name() {return browser.element("//*[@name='lastname']");}

    get email() {return browser.element("//*[@name='reg_email__']");}

    get rewrite_email() {return browser.element("//*[@name='reg_email_confirmation__']");}

    get password() {return browser.element("//*[@name='reg_passwd__']");}

    get month_select_box() {return browser.element("//*[@name='birthday_month']");}

    get day_select_box() {return browser.element("//*[@name='birthday_day']");}

    get year_select_box() {return browser.element("//*[@name='birthday_year']");}

    get female_checkbox(){return browser.element("//*[@name='sex' and @value='1']");}

    get male_checkbox(){return browser.element("//*[@name='sex' and @value='2']");}

    get create_account(){return browser.element("//*[@name='websubmit']");}

    open() {
        super.open('');
    }

    createAccount(data){
        if("first_name" in data){
            this.first_name.setValue(data['first_name']);
        }
        if("last_name" in data){
            this.last_name.setValue(data['last_name']);
        }
        if("email" in data){
            this.email.setValue(data['email']);
        }
        if("password" in data){
            this.password.setValue(data['password']);
        }
        if("month" in data){
            this.month_select_box.selectByValue(data['month']);
        }
        if("day" in data){
            this.day_select_box.selectByValue(data['day']);
        }
        if("year" in data){
            this.year_select_box.selectByValue(data['year']);
        }
        if("female" in data){
            this.female_checkbox.click();
        }
        if("male" in data){
            this.male_checkbox.click();
        }
        if("email" in data){
            this.rewrite_email.setValue(data['email']);
        }

        this.create_account.click();
    }

    isCreatedOrLoggedIn(){
        for (let i=0; i<=7000; i+=10 ){
            if (browser.getUrl() !== 'https://www.facebook.com/') {
                return true;
            }
        }
        return false;
    }
}
module.exports = MainPage;
