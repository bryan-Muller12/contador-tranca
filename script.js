(function() {
    // 1. Cache dos elementos do DOM
    const total1El = document.getElementById('total1');
    const total2El = document.getElementById('total2');
    const diferencaEl = document.getElementById('diferenca');
    const history1El = document.getElementById('history1');
    const history2El = document.getElementById('history2');
    const pontos1Input = document.getElementById('pontos1');
    const pontos2Input = document.getElementById('pontos2');
    const nome1Input = document.getElementById('nome1');
    const nome2Input = document.getElementById('nome2');
    const addButton = document.getElementById('adicionar');
    const resetButton = document.querySelector('.reset-icon');
    const themeToggleButton = document.querySelector('.theme-toggle-icon');

    // 2. Estado da aplicação
    let placar = {
        dupla1: 0,
        dupla2: 0
    };

    // 3. Funções

    // --- LÓGICA PARA O TEMA ---
    const themeIcon = themeToggleButton.querySelector('i');

    function aplicarTema(tema) {
        if (tema === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    function trocarTema() {
        const temaAtual = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const novoTema = temaAtual === 'light' ? 'dark' : 'light';
        
        aplicarTema(novoTema);
        localStorage.setItem('theme', novoTema);
    }

    function aplicarTemaInicial() {
        const temaSalvo = localStorage.getItem('theme');
        const prefereModoClaro = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (temaSalvo) {
            aplicarTema(temaSalvo);
        } else if (prefereModoClaro) {
            aplicarTema('light');
        } else {
            aplicarTema('dark'); // Padrão
        }
    }

    // --- LÓGICA DO PLACAR ---
    function salvarEstado() {
        localStorage.setItem('placarTranca', JSON.stringify(placar));
        localStorage.setItem('history1Tranca', history1El.innerHTML);
        localStorage.setItem('history2Tranca', history2El.innerHTML);
    }

    function carregarEstado() {
        const placarSalvo = localStorage.getItem('placarTranca');
        const history1Salvo = localStorage.getItem('history1Tranca');
        const history2Salvo = localStorage.getItem('history2Tranca');

        if (placarSalvo) {
            placar = JSON.parse(placarSalvo);
        }
        if (history1Salvo) {
            history1El.innerHTML = history1Salvo;
        }
        if (history2Salvo) {
            history2El.innerHTML = history2Salvo;
        }
        atualizarInterface();
    }

    function adicionarPontos() {
        const pontosJ1 = parseInt(pontos1Input.value) || 0;
        const pontosJ2 = parseInt(pontos2Input.value) || 0;

        placar.dupla1 += pontosJ1;
        placar.dupla2 += pontosJ2;

        if (pontosJ1 !== 0) {
            history1El.innerHTML += `<div class="history-item ${pontosJ1 > 0 ? 'positive' : 'negative'}">${pontosJ1}</div>`;
        }
        if (pontosJ2 !== 0) {
            history2El.innerHTML += `<div class="history-item ${pontosJ2 > 0 ? 'positive' : 'negative'}">${pontosJ2}</div>`;
        }
        
        atualizarInterface();
        pontos1Input.value = '';
        pontos2Input.value = '';
        pontos1Input.focus();
        salvarEstado();
    }

    function resetarPontos() {
        if (confirm("Tem certeza que deseja zerar o placar?")) {
            placar.dupla1 = 0;
            placar.dupla2 = 0;
            history1El.innerHTML = '';
            history2El.innerHTML = '';
            atualizarInterface();
            salvarEstado();
        }
    }
    
    function atualizarInterface() {
        const diferenca = Math.abs(placar.dupla1 - placar.dupla2);
        total1El.innerText = placar.dupla1;
        total2El.innerText = placar.dupla2;
        diferencaEl.innerText = diferenca;
    }

    function atualizarPlaceholders() {
        const nome1 = nome1Input.value || 'Dupla 1';
        const nome2 = nome2Input.value || 'Dupla 2';
        pontos1Input.placeholder = `Pontos ${nome1}`;
        pontos2Input.placeholder = `Pontos ${nome2}`;
    }

    // 4. Adicionando os Event Listeners
    addButton.addEventListener('click', adicionarPontos);
    resetButton.addEventListener('click', resetarPontos);
    themeToggleButton.addEventListener('click', trocarTema);
    nome1Input.addEventListener('input', atualizarPlaceholders);
    nome2Input.addEventListener('input', atualizarPlaceholders);
    
    pontos2Input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            adicionarPontos();
        }
    });
    
    pontos1Input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            pontos2Input.focus();
        }
    });

    // --- INICIALIZAÇÃO DA APLICAÇÃO ---
    aplicarTemaInicial();
    carregarEstado();
    atualizarPlaceholders();
})();