export default () => {
    const x = 20;
    const y = 20;
    const table = $("table")[0];
    let content = "";

    for (let i = 0; i < y; i++) {
        let row = "<tr>";
        
        for (let j = 0; j < x; j++) {
            // row += `<td>${i}:${j}</td>`;
            row += "<td></td>";
        }

        row += "</tr>";  
        content += row;  
    }

    table.innerHTML = content;
};