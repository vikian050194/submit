import { Selector, t } from "testcafe";
import Page from "./page";

class Join extends Page {
    constructor() {
        super("join");

        this.page = Selector("div.page.join-page");
        this.name = Selector("input.join__input.name");
        this.join = Selector(".join__button").withText("Join");
    }

    async doJoin(name) {
        await t
            .typeText(this.name, name)
            .click(this.join);
    }
}

export default new Join();