async function carregarTabela() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjBZIhPTAYzZzPvYY_ugJwWJeKrtxHXpNENMFhkgAxvWc_1bSldCoTZbCcOuzdvcUapxC1xtY4Ngi7/pub?gid=2107217145&single=true&output=csv"; // substitua pelo seu link CSV

  try {
    const resposta = await fetch(url);
    const texto = await resposta.text();
    const linhas = texto.trim().split("\n").map(l => l.split(","));

    let html = "<table>";

    // Título
    html += `<tr class="title"><td colspan="8">${linhas[0][0]}</td></tr>`;

    // Cabeçalhos
    html += "<tr class='header'>";
    linhas[2].forEach(h => html += `<td>${h}</td>`);
    html += "</tr>";

    // Subcabeçalhos
    html += "<tr class='header'>";
    linhas[3].forEach(sh => {
      if (sh === "WINS") html += `<td class="wins">${sh}</td>`;
      else if (sh === "LOSES") html += `<td class="loses">${sh}</td>`;
      else html += `<td>${sh}</td>`;
    });
    html += "</tr>";

    // Corpo
    for (let i = 4; i < linhas.length; i++) {
      let rowClass = (i % 2 === 0) ? "row-even" : "row-odd";
      html += `<tr class="${rowClass}">`;
      linhas[i].forEach((cell, j) => {
        if (j === 6 || j === 7) cell = formatPercent(cell);
        html += `<td>${cell}</td>`;
      });
      html += "</tr>";
    }

    html += "</table>";
    document.getElementById("ranking").innerHTML = html;
  } catch (erro) {
    console.error("Erro ao carregar tabela:", erro);
  }
}

function formatPercent(value) {
  if (value.includes("%")) return value;
  const num = parseFloat(value);
  return isNaN(num) ? value : (num * 100).toFixed(2).replace(".", ",") + "%";
}

carregarTabela();

