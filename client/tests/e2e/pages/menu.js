import { Selector, t } from "testcafe";
import Page from "./page";

class Menu extends Page {
    constructor() {
        super("menu");

        this.signOut = Selector(".menu__button").withText("Sign out");
    }

    async doSignOut() {
        await t
            .click(this.signOut);
    }
}

export default new Menu();