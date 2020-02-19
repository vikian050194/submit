import Join from "./pages/joim";
import Menu from "./pages/menu";

fixture("Authorization")
    .page("http://localhost:8080");

test("Sign up and sign out", async () => {
    await Join.doJoin();
    await Join.doJoin("testuser");
    await Menu.doQuit();
    await Join.checkPageVisibility(true);
});