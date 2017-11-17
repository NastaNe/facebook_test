/**
 * Created by nastane on 10/13/17.
 */

"use strict";

class Page {
    /**
     * @param title
     */
    constructor(title = 'My Page') {
        this.title = title;
    }
    open(path) {
        browser.url('/' + path);
    }
}
module.exports = Page;