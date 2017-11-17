/**
 * Created by nastane on 11/17/17.
 */


var Page = require('./page');
class AccountPage extends Page {

    /**
     * @param user_url
     */
    constructor(user_url) {
        super("Account Page");
        this.user_url = user_url;
    }

    get post_block(){return ".//div[contains(@id, 'timeline_react_composer_container')]";}

    get post_input(){return browser.element(this.post_block +"//span[@data-text='true']");}
    get post_button(){return browser.element(this.post_block+"//button[@type='submit']");}

    open() {
        super.open('' + this.user_url);
    }
}
module.exports = AccountPage;