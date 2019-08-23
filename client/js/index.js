import View from "./view";
import App from "./app";

$(document).ready(function () {
    View();

    let app = new App();
    app.run();
});