import { Selector, t } from "testcafe";
import Page from "./page";

class Menu extends Page {
    constructor() {
        super("menu");

        this.quit = Selector(".menu__button").withText("Quit");
    }

    async doQuit() {
        await t
            .click(this.quit);
    }
}

export default new Menu();