import { Selector, t } from "testcafe";
import Page from "./page";

class SignIn extends Page {
    constructor() {
        super("signin");

        this.page = Selector("div.page.signin-page");
        this.login = Selector("input.signin__input.password");
        this.password = Selector("input.signin__input.password");
        this.signIn = Selector(".signin__button").withText("Sign in");
        this.signUp = Selector(".signin__button").withText("Sign up");
    }

    async doSignIn(login, password) {
        await t
            .typeText(this.login, login)
            .typeText(this.password, password)
            .click(this.signIn);
    }

    async doSignUp() {
        await t
            .click(this.signUp);
    }
}

export default new SignIn();