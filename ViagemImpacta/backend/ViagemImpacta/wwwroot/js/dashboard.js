// Dados mockados para exemplo
const faturamentoPacoteData = {
    labels: ["Pacote A", "Pacote B", "Pacote C"],
    datasets: [{
        label: "Faturamento (R$)",
        data: [40000, 50000, 35000],
        backgroundColor: ["#0d6efd", "#6c757d", "#198754"],
    }]
};
const faturamentoHotelData = {
    labels: ["Hotel X", "Hotel Y", "Hotel Z"],
    datasets: [{
        label: "Faturamento (R$)",
        data: [10000, 60000, 35000],
        backgroundColor: ["#ffc107", "#dc3545", "#20c997"],
    }]
};

new Chart(document.getElementById('faturamentoPacoteChart'), {
    type: 'pie',
    data: faturamentoPacoteData,
    options: {
        responsive: true,
    }
});
new Chart(document.getElementById('faturamentoHotelChart'), {
    type: 'pie',
    data: faturamentoHotelData,
    options: {
        responsive: true,
    }
});