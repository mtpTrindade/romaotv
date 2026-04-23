async function carregarTabela() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjBZIhPTAYzZzPvYY_ugJwWJeKrtxHXpNENMFhkgAxvWc_1bSldCoTZbCcOuzdvcUapxC1xtY4Ngi7/pub?gid=2107217145&single=true&output=csv"; // substitua pelo seu link CSV
  
  try {
    const resposta = await fetch(url);
    const texto = await resposta.text();
  
    // Corrige vírgula decimal antes de dividir
    const linhas = texto.trim().split("\n").map(l => {
      const fixed = l.replace(/(\d+),(\d+)/g, "$1.$2");
      return fixed.split(",");
    });

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
      <tr class="title"><td colspan="8" rowspan="2">RANKING</td></tr>
      <tr></tr>
      <tr class="header">
        <td rowspan="2">PLAYERS</td>
        <td rowspan="2">MATCHES</td>
        <td colspan="2">CARTEL</td>
        <td colspan="2">SINGLE GAMES</td>
        <td rowspan="2">SGW</td>
        <td rowspan="2">WINRATE</td>
      </tr>
      <tr class="header">
        <td class="wins">WINS</td>
        <td class="loses">LOSES</td>
        <td class="wins">WINS</td>
        <td class="loses">LOSES</td>
      </tr>
  `;

  for (let i = 4; i < linhas.length; i++) {
    let rowClass = (i % 2 === 0) ? "row-even" : "row-odd";
    html += `<tr class="${rowClass}">`;

    for (let j = 0; j < linhas[i].length; j++) {
      let cell = linhas[i][j];
      // Corrige porcentagens quebradas em duas colunas
      if (j === 6 && linhas[i][j + 1] && linhas[i][j + 1].includes("%")) {
        cell = cell + linhas[i][j + 1];
        j++; // pula a próxima célula
      }
      if (j === 6 || j === 7) cell = formatPercent(cell);
      html += `<td>${cell}</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  document.getElementById("ranking").innerHTML = html;
 } catch (erro) {
  console.error("Erro ao carregar tabela:", erro);
}
}

carregarTabela();

setInterval(carregarTabela, 60000);
