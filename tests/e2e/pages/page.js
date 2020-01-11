import { Selector, t } from "testcafe";

class Page {
    constructor(pageName) {
        this.page = Selector(`div.page.${pageName}-page`);
    }

    async checkPageVisibility(shouldBeVisible) {
        await t.expect(this.page.exists).eql(shouldBeVisible);
    }
}

export default Page;