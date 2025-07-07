// Função para filtrar as tabelas por mês
function filtrarPorMes() {
    const mesSelecionado = document.getElementById('mesFilter').value;
    const todasTabelas = document.querySelectorAll('.month-table');
    
    todasTabelas.forEach(tabela => {
        if (mesSelecionado === 'todos' || tabela.getAttribute('data-mes') === mesSelecionado) {
            tabela.style.display = 'block';
        } else {
            tabela.style.display = 'none';
        }
    });
}

// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento ao botão filtrar
    document.getElementById('filtrarBtn').addEventListener('click', filtrarPorMes);
    
    // Selecionar o mês atual no dropdown
    document.getElementById('mesFilter').value = 'janeiro-2025';
    
    // Aplicar filtro inicial
    filtrarPorMes();
});