import { Selector, t } from "testcafe";
import Page from "./page";

class SignUp extends Page {
    constructor() {
        super("signup");

        this.name = Selector("input.signup__input.name");
        this.login = Selector("input.signup__input.login");
        this.password = Selector("input.signup__input.password");
        this.signUp = Selector(".signup__button").withText("Sign up");
        this.goBack = Selector(".signup__button").withText("Back");
    }

    async doSignUp(name, login, password) {
        await t
            .typeText(this.name, name)
            .typeText(this.login, login)
            .typeText(this.password, password)
            .click(this.signUp);
    }

    async goBack() {
        await t
            .click(this.goBack);
    }
}

export default new SignUp();