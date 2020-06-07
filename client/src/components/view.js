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
        const { size } = JSON.parse(body);

        const table = document.querySelector("table");
        let content = "";

        for (let i = 0; i < size; i++) {
            let row = "<tr>";

            for (let j = 0; j < size; j++) {
                row += `<td class="cell" x=${j} y="${i}"><div class="square wall"></div></td>`;
            }

            row += "</tr>";
            content += row;
        }

        table.innerHTML = content;

        externalCallback();
    });
};