async function carregarTabela() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjBZIhPTAYzZzPvYY_ugJwWJeKrtxHXpNENMFhkgAxvWc_1bSldCoTZbCcOuzdvcUapxC1xtY4Ngi7/pub?gid=2107217145&single=true&output=csv"; // substitua pelo seu link CSV

  try {
    const resposta = await fetch(url);
    const texto = await resposta.text();
    const linhas = texto.trim().split("\n").map(l => l.split(","));

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
        <!-- Título mesclado em duas linhas até H -->
        <tr class="title"><td colspan="8" rowspan="2">RANKING</td></tr>
        <tr></tr>

        <!-- Cabeçalho principal -->
        <tr class="header">
          <td rowspan="2">PLAYERS</td>
          <td rowspan="2">MATCHES</td>
          <td colspan="2">CARTEL</td>
          <td colspan="2">SINGLE GAMES</td>
          <td rowspan="2">SGW</td>
          <td rowspan="2">WINRATE</td>
        </tr>

        <!-- Subcabeçalho -->
        <tr class="header">
          <td class="wins">WINS</td>
          <td class="loses">LOSES</td>
          <td class="wins">WINS</td>
          <td class="loses">LOSES</td>
        </tr>
    `;

    // Corpo da tabela: dados dos jogadores (linhas a partir da 5ª no CSV)
    for (let i = 5; i < linhas.length; i++) {
      let rowClass = (i % 2 === 0) ? "row-even" : "row-odd";
      html += `<tr class="${rowClass}">`;
      linhas[i].forEach((cell, j) => {
        if (j === 6 || j === 7) cell = formatPercent(cell); // G e H em porcentagem
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
  return isNaN(num) ? value : num.toFixed(2).replace(".", ",") + "%";
}

carregarTabela();
