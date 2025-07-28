const faturamentoPacoteData = {
    labels: ["Pacote A", "Pacote B", "Pacote C"],
    datasets: [{
        label: "Faturamento (R$)",
        data: [40000, 50000, 35000],
        backgroundColor: ["#0d6efd", "#6c757d", "#198754"],
    }]
};
const faturamentoHotelData = {
    labels: ["Hotel X", "Hotel Y", "Hotel Z", "Hotel W", "Hotel V", "Hotel U"],
    datasets: [{
        label: "Faturamento (R$)",
        data: [10000, 60000, 35000, 45000, 25000, 55000],
        backgroundColor: ["#ffc107", "#dc3545", "#20c997", "#6f42c1", "#fd7e14", "#e83e8c"],
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