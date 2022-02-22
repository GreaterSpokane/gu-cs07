var years = [2016, 2017, 2018, 2019, 2020, 2021];
new Chart("mfi_chart", {
    type: "horizontalBar",
    data: {
        labels: years,
        datasets: [{
            axis: 'y',
            label: 'Median Family Income ($)',
            data: [86500, 89150, 89100, 89400, 89760, 91900],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            boarderWidth: 1
        }],
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    min: 85000,
                    max: 95000
                }
            }]
        }
    }
});