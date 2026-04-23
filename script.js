async function carregarTabela() {
  const url = "https://script.google.com/macros/s/AKfycbxPFrWFTKj9EOXv8m7KsLf_omkQanoiHB2Yiw7yI5dHMZ9JkSHg0coti1z0wsvBRXIfsg/exec"; // substitua pelo seu link /exec

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    let html = `
      <table>
        <colgroup>
          <col style="width:100px">
          <col style="width:70px">
          <col style="width:50px">
          <col style="width:50px">
          <col style="width:50px">
          <col style="width:50px">
          <col style="width:70px">
          <col style="width:70px">
        </colgroup>
    `;

    html += `<tr class="title"><td colspan="8">${dados.title}</td></tr>`;
    html += "<tr class='header'>";
    for (let h of dados.headers) html += `<td>${h}</td>`;
    html += "</tr>";

    html += "<tr class='header'>";
    for (let sh of dados.subheaders) {
      if (sh === "WINS") html += `<td class="wins">${sh}</td>`;
      else if (sh === "LOSES") html += `<td class="loses">${sh}</td>`;
      else html += `<td>${sh}</td>`;
    }
    html += "</tr>";

    dados.rows.forEach((row, i) => {
      let rowClass = (i % 2 === 0) ? "row-even" : "row-odd";
      html += `<tr class="${rowClass}">`;
      row.forEach((cell, j) => {
        if (j === 6 || j === 7) cell = formatPercent(cell);
        html += `<td>${cell}</td>`;
      });
      html += "</tr>";
    });

    html += "</table>";
    document.getElementById("ranking").innerHTML = html;
  } catch (erro) {
    console.error("Erro ao carregar tabela:", erro);
  }
}

function formatPercent(value) {
  if (typeof value === "number") {
    return (value * 100).toFixed(2).replace(".", ",") + "%";
  } else if (typeof value === "string" && value.includes("%")) {
    let num = parseFloat(value.replace(",", ".").replace("%", ""));
    return num.toFixed(2).replace(".", ",") + "%";
  }
  return value;
}

setInterval(carregarTabela, 30000);
carregarTabela();
