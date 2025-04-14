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
function atualizarPlaceholders() {
    const nome1 = document.getElementById('nome1').value || 'Dupla 1';
    const nome2 = document.getElementById('nome2').value || 'Dupla 2';

    document.getElementById('pontos1').placeholder = `Digite os pontos de ${nome1}`;
    document.getElementById('pontos2').placeholder = `Digite os pontos de ${nome2}`;
}

// Atualiza automaticamente ao digitar
document.getElementById('nome1').addEventListener('input', atualizarPlaceholders);
document.getElementById('nome2').addEventListener('input', atualizarPlaceholders);

// Atualiza ao carregar a página
atualizarPlaceholders();