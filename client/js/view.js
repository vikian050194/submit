export default (externalCallback) => {
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    httpGetAsync("/config", (body) => {
        const { x, y } = JSON.parse(body).size;

        const table = document.querySelector("table");
        let content = "";

        for (let i = 0; i < y; i++) {
            let row = "<tr>";

            for (let j = 0; j < x; j++) {
                row += `<td class="cell" x=${j} y="${i}"><div class="square wall"></div></td>`;
            }

            row += "</tr>";
            content += row;
        }

        table.innerHTML = content;

        externalCallback();
    });
};