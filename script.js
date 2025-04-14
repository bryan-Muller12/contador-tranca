let total1 = 0;
let total2 = 0;

function adicionarPontos() {
    let pontosJ1 = parseInt(document.getElementById('pontos1').value) || 0;
    let pontosJ2 = parseInt(document.getElementById('pontos2').value) || 0;

    total1 += pontosJ1;
    total2 += pontosJ2;

    let diferenca = Math.abs(total1 - total2);

    document.getElementById('total1').innerText = total1;
    document.getElementById('total2').innerText = total2;
    document.getElementById('diferenca').innerText = ` ${diferenca}`;

    if (pontosJ1 !== 0) {
        document.getElementById('history1').innerHTML += `<div class="history-item ${pontosJ1 > 0 ? 'positive' : 'negative'}">${pontosJ1}</div>`;
    }
    if (pontosJ2 !== 0) {
        document.getElementById('history2').innerHTML += `<div class="history-item ${pontosJ2 > 0 ? 'positive' : 'negative'}">${pontosJ2}</div>`;
    }

    document.getElementById('pontos1').value = '';
    document.getElementById('pontos2').value = '';
}

function resetarPontos() {
    total1 = 0;
    total2 = 0;

    document.getElementById('total1').innerText = total1;
    document.getElementById('total2').innerText = total2;
    document.getElementById('diferenca').innerText = "0";
    document.getElementById('history1').innerHTML = '';
    document.getElementById('history2').innerHTML = '';
}
