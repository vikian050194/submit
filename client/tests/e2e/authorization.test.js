import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Menu from "./pages/menu";

fixture("Authorization")
    .page("http://localhost:8080");

test("Sign up and sign out", async () => {
    await SignIn.doSignUp();
    await SignUp.doSignUp("TestUser", "Test", "User");
    await Menu.doSignOut();
    await SignIn.checkPageVisibility(true);
});