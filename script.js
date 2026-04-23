async function carregarTabela() {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjBZIhPTAYzZzPvYY_ugJwWJeKrtxHXpNENMFhkgAxvWc_1bSldCoTZbCcOuzdvcUapxC1xtY4Ngi7/pub?output=csv";
  const resposta = await fetch(url);
  const texto = await resposta.text();
  const linhas = texto.split("\n").map(l => l.split(","));

  let html = "<table>";
  linhas.forEach((row, i) => {
    let rowClass = (i % 2 === 0) ? "row-even" : "row-odd";
    html += `<tr class="${rowClass}">`;
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += "</tr>";
  });
  html += "</table>";

  document.getElementById("ranking").innerHTML = html;
}

carregarTabela();
