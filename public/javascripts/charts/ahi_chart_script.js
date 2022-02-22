var years = [2016, 2017, 2018, 2019, 2020, 2021];
new Chart("ahi_chart", {
    type: "horizontalBar",
    data: {
        labels: years,
        datasets: [{
            axis: 'y',
            label: 'Average Household Income ($)',
            data: [91960, 100105, 100746, 110043, 112001, 112345],
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
                    min: 90000,
                    max: 120000
                }
            }]
        }
    }
});