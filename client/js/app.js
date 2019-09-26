import io from "socket.io-client";

export default class App {
    constructor() {
        console.info(`App is started at ${(new Date()).toLocaleString()}`);

        this.user = undefined;
        this.socket = io();

        window.addEventListener("beforeunload", () => {
            this.socket.emit("user:logout", this.user);
        });

        const buttonKeys = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];

        document.addEventListener("keydown", (e) => {
            if (buttonKeys.indexOf(e.key) === -1) {
                return;
            }

            const direction = e.key.substring(5, e.key.length);
            this.socket.emit("action:move", direction);
        });
    }

    login() {
        let form = document.querySelector("#login");
        let input = form.querySelector("input");
        input.focus();

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this.user === undefined || this.user === null || this.user.length === 0) {
                this.user = input.value;
                input.value = "";
                this.socket.emit("user:login", { name: this.user });
                document.querySelector("#login").setAttribute("hidden", "true");
                document.querySelector("#game").removeAttribute("hidden");
                document.querySelector("table").focus();
            }
        });

    }

    run() {
        const chat = document.querySelector("#chat");
        const users = document.querySelector("#users");
        const chatForm = document.querySelector("#chat");
        const input = document.querySelector("input");

        const sendNewMessage = (message) => {
            this.socket.emit("message:send", message);
        };

        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            sendNewMessage(input.value);
            input.value = "";
        });

        const addMessage = (data) => {
            let newDiv = document.createElement("p");
            newDiv.style.color = data.user.color;
            let newContent = document.createTextNode(`${data.user.name}: ${data.message}`);
            newDiv.appendChild(newContent);
            chat.appendChild(newDiv);

            if (chat.children.length > 10) {
                chat.firstChild.remove();
            }
        };

        const addUserUnit = (user) => {
            let unit = document.createElement("div");
            unit.id = user.id;
            unit.style.color = "#FFFFFF";
            unit.style.backgroundColor = user.color;
            unit.style.textAlign = "center";
            unit.style.height = "100%";
            unit.style.width = "100%";
            let unitName = document.createTextNode(user.name.substring(0, 1).toUpperCase());
            unit.appendChild(unitName);
            const query = `td[x="${user.position.x}"][y="${user.position.y}"]`;
            const target = document.querySelector(query);
            target.appendChild(unit);
        };

        const addUser = (user) => {
            console.info(user);

            let newDiv = document.createElement("p");
            newDiv.id = user.name;
            newDiv.style.color = user.color;
            let newContent = document.createTextNode(user.name);
            newDiv.appendChild(newContent);
            users.appendChild(newDiv);

            addUserUnit(user);
        };

        const deleteUser = (user) => {
            document.querySelector(`p[id="${user.name}"]`).remove();
            document.querySelector(`div[id="${user.id}"]`).remove();
        };

        const moveUser = (user) => {
            document.querySelector(`div[id="${user.id}"]`).remove();
            addUserUnit(user);
        };

        this.login();

        this.socket.on("user:login", addUser);
        this.socket.on("user:logout", deleteUser);
        this.socket.on("message:new", addMessage);
        this.socket.on("user:move", moveUser);
    }
}