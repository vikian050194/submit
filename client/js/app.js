import io from "socket.io-client";

const colors =
    [{
        "name": "Polaroid:blue",
        "value": "#00a3e2"
    },
    {
        "name": "Polaroid:green",
        "value": "#1ba548"
    },
    {
        "name": "Polaroid:yellow",
        "value": "#fdc800"
    },
    {
        "name": "Polaroid:orange",
        "value": "#f1860e"
    },
    {
        "name": "Polaroid:red",
        "value": "#e41b13"
    }];

const colorPickerMessage = colors.reduce((acc, c, i) => { acc += `${i}) ${c.name}\n\r`; return acc; }, "");

export default class App {
    constructor() {
        console.info(`App is started at ${(new Date()).toLocaleString()}`);

        this.user = undefined;
        this.socket = io();

        window.addEventListener("beforeunload", () => {
            this.socket.emit("user:logout", this.user);
        });
    }

    login() {
        while (this.user === undefined || this.user === null || this.user.length === 0) {
            this.user = prompt("What is your name?");
        }

        while (this.color === undefined || this.color === null || isNaN(parseInt(this.color)) || parseInt(this.color) < 0 || parseInt(this.color) >= colors.length) {
            this.color = prompt(`What is your favorite color?\n\r${colorPickerMessage}`);
        }

        this.color = colors[this.color].value;

        this.socket.emit("user:login", { name: this.user, color: this.color });
    }

    run() {
        const chat = document.querySelector("#chat");
        const users = document.querySelector("#users");
        const form = document.querySelector("form");
        const input = document.querySelector("input");
        input.focus();

        const sendNewMessage = (message) => {
            this.socket.emit("message:send", message);
        };

        form.addEventListener("submit", (e) => {
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

        const addUser = (user) => {
            let newDiv = document.createElement("p");
            newDiv.id = user.name;
            newDiv.style.color = user.color;
            let newContent = document.createTextNode(user.name);
            newDiv.appendChild(newContent);
            users.appendChild(newDiv);
        };

        const deleteUser = (user) => {
            document.getElementById(user.name).remove();
        };

        this.login();

        this.socket.on("user:login", addUser);
        this.socket.on("user:logout", deleteUser);
        this.socket.on("message:new", addMessage);
    }
}