import View from "./view";
import App from "./app";

window.addEventListener("load", () => {
    View(() => {
        new App().run();
    });
});