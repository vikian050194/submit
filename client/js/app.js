import * as api from "./api";

export default class App {
    constructor() {
        console.info(`App is started at ${(new Date()).toLocaleString()}`);

        this.user = undefined;

        this.addUser = this.addUser.bind(this);
        this.addUnit = this.addUnit.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addMessage = this.addMessage.bind(this);

        this.sendNewMessage = api.subscribeToChat(this.addMessage);
        this.login = api.subscribeToLogin(this.addUser);
        this.logout = api.subscribeToLogout(this.deleteUser);

        window.addEventListener("beforeunload", this.logout);
    }

    addMessage(data) {
        const history = document.querySelector(".chat__history");

        let item = document.createElement("p");
        item.classList.add(`foreground-color-${data.user.color}`);
        item.innerHTML = `${data.user.name}: ${data.message}`;

        history.appendChild(item);

        if (history.children.length > 10) {
            history.firstChild.remove();
        }
    }

    addUnit(user) {
        let unit = document.createElement("div");
        unit.id = user.id;
        unit.style.color = "#FFFFFF";
        unit.classList.add("square", "unit", `background-color-${user.color}`);
        let unitName = document.createTextNode(user.name.substring(0, 1).toUpperCase());
        unit.appendChild(unitName);
        const query = `td[x="${user.position.x}"][y="${user.position.y}"] `;
        const target = document.querySelector(query);
        target.firstChild.replaceWith(unit);
    }

    addUser(user) {
        const users = document.querySelector(".users");

        let newDiv = document.createElement("p");
        newDiv.id = user.name;
        newDiv.classList.add("user", `background-color-${user.color}`);
        let newContent = document.createTextNode(user.name);
        newDiv.appendChild(newContent);
        users.appendChild(newDiv);

        this.addUnit(user);
    }

    deleteUser(user) {
        const empty = document.createElement("div");
        empty.classList.add("square");

        document.querySelector(`p[id="${user.name}"]`).remove();
        document.querySelector(`div[id="${user.id}"]`).replaceWith(empty);
    }

    moveUser(user) {
        const empty = document.createElement("div");
        empty.classList.add("square");

        document.querySelector(`div[id="${user.id}"]`).replaceWith(empty);
        this.addUnit(user);
    }

    run() {
        let login = document.querySelector("form.login");
        let loginInput = login.querySelector("input");
        loginInput.focus();

        login.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.user === undefined || this.user === null || this.user.length === 0) {
                this.user = loginInput.value;
                loginInput.value = "";

                this.login({ name: this.user });

                document.querySelector(".login-page").classList.add("hidden");
                document.querySelector(".game-page").classList.remove("hidden");
                document.querySelector("table").focus();
            }
        });

        const chat = document.querySelector("form.chat");
        const chatInput = chat.querySelector("input");

        chat.addEventListener("submit", (e) => {
            e.preventDefault();

            this.sendNewMessage(chatInput.value);
            chatInput.value = "";
        });
    }
}