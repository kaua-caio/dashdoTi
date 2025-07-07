// Navegação entre páginas
 document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove a classe active de todos os links
      document.querySelectorAll('.nav-link').forEach(el => {
          el.classList.remove('active');
      });
      
      // Adiciona a classe active apenas ao link clicado
      this.classList.add('active');
      
      // Oculta todas as páginas de conteúdo
      document.querySelectorAll('.content-page').forEach(page => {
          page.classList.remove('active');
      });
      
      // Mostra a página de conteúdo correspondente
      const pageId = this.getAttribute('data-page');
      document.getElementById(pageId).classList.add('active');
      
      // Atualiza o título da página
      document.getElementById('page-title').textContent = this.querySelector('span').textContent;
  });
});

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Filtro de custos por mês
document.getElementById('filtrarBtn').addEventListener('click', () => {
  const mesSelecionado = document.getElementById('mesFilter').value;
  
  document.querySelectorAll('.month-table').forEach(table => {
      if (mesSelecionado === 'todos' || table.getAttribute('data-mes') === mesSelecionado) {
          table.style.display = 'block';
      } else {
          table.style.display = 'none';
      }
  });
});

// Toggle de tema escuro/claro
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  
  // Atualiza o texto do botão
  const themeBtn = document.querySelector('.sidebar-footer .btn');
  const icon = themeBtn.querySelector('i');
  const text = themeBtn.querySelector('span');
  
  if (document.body.classList.contains('dark-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      text.textContent = 'Tema Claro';
  } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      text.textContent = 'Tema Escuro';
  }
}

// Atualizar saudação conforme horário
function updateGreeting() {
  const hour = new Date().getHours();
  const greetingEl = document.getElementById('greeting-text');
  let greeting = '';
  
  if (hour >= 5 && hour < 12) {
      greeting = 'Bom dia! Um ótimo dia de trabalho começa agora.';
  } else if (hour >= 12 && hour < 18) {
      greeting = 'Boa tarde! Aproveite sua produtividade vespertina.';
  } else {
      greeting = 'Boa noite! Hora de revisar os resultados do dia.';
  }
  
  greetingEl.textContent = greeting;
}

// Atualizar horário atual
function updateCurrentTime() {
  const now = new Date();
  const timeEl = document.getElementById('current-time');
  const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
  };
  
  timeEl.textContent = now.toLocaleDateString('pt-BR', options);
}

function updateDynamicCards() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const dynamicCards = document.getElementById('dynamic-cards');
    const nextCommitments = document.getElementById('next-commitments');

    // Limpa os cards dinâmicos
    dynamicCards.innerHTML = '';
    nextCommitments.style.display = 'none';

    // Horários de atenção
    const baterPontoTimes = [
        { start: 450, end: 510 }, // 7:30 - 8:30
        { start: 675, end: 840 }, // 11:15 - 14:00
        { start: 1070, end: 1140 } // 17:50 - 19:00
    ];
    const dailyTime = { start: 630, end: 670 }; // 10:30 - 11:10

    // Verifica se está no horário de bater ponto
    const isBaterPontoTime = baterPontoTimes.some(
        time => currentTime >= time.start && currentTime <= time.end
    );

    // Verifica se está no horário de daily
    const isDailyTime = currentTime >= dailyTime.start && currentTime <= dailyTime.end;

    // Adiciona o card de Bater Ponto
    if (isBaterPontoTime) {
        dynamicCards.innerHTML += `
            <div class="card-action">
                <a href="https://app.tangerino.com.br/Tangerino/pages/baterPonto/" target="_blank" class="card-link">
                    <div class="card-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="card-content">
                        <h4>Não esqueça de Bater o Ponto</h4>
                        <p>Registre seu horário de trabalho.</p>
                    </div>
                </a>
            </div>
        `;
    }

    // Adiciona o card de Daily
    if (isDailyTime) {
        dynamicCards.innerHTML += `
            <div class="card-action">
                <a href="https://meet.google.com/hiq-tqcc-cbn?authuser=0" target="_blank" class="card-link">
                    <div class="card-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="card-content">
                        <h4>Daily em Andamento</h4>
                        <p>Participe da reunião diária do time.</p>
                    </div>
                </a>
            </div>
        `;
    }

    // Exibe próximos compromissos fora dos horários
    if (!isBaterPontoTime && !isDailyTime) {
        nextCommitments.style.display = 'block';
    }
}

function updateNextCommitments() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    const nextCommitments = document.getElementById('next-commitments');

    // Limpa o conteúdo anterior
    nextCommitments.style.display = 'none';
    nextCommitments.innerHTML = '';

    // Horário para "Marcar as horas no ClickUp"
    const clickUpTimeStart = 675; // 11:15 (em minutos)
    const clickUpTimeEnd = 1440; // 00:00 (em minutos)

    if (currentTime >= clickUpTimeStart && currentTime < clickUpTimeEnd) {
        nextCommitments.style.display = 'block';
        nextCommitments.innerHTML = `
            <h3>Próximos Compromissos</h3>
            <p>Marcar as horas no ClickUp</p>
            <button class="btn btn-sm" onclick="window.open('https://app.clickup.com/', '_blank')">
                <i class="fas fa-clock"></i> Acessar ClickUp
            </button>
        `;
    }
}

// Atualiza os compromissos a cada minuto
setInterval(updateNextCommitments, 60000);
updateNextCommitments();

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  updateGreeting();
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000);
  setInterval(updateDynamicCards, 60000);
  updateDynamicCards();
});
