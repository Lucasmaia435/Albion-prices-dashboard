const graf = document.getElementById("chart").getContext('2d');
let data_chart = [];
let labels = [];
let chart;

const goldValues = () => {
    const api = "https://www.albion-online-data.com/api/v2/stats/gold?count=20"
    axios.get(api)
    .then((response) => {
        console.log(response.data);
        for(let i = 0; i < response.data.length; i ++ ){
            data_chart.push(response.data[i].price);
            labels.push(response.data[i].timestamp);
        }
        data_chart = data_chart.reverse();
        labels = labels.reverse();
        chart = new Chart(graf, {
            type: 'line',                     
            data: {
                labels: [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
                datasets: [
                    {   
                        label: "Gold",
                        data: data_chart,
                        backgroundColor: "rgba(241, 194, 90, 0.1)",
                        borderColor: "rgb(247, 231, 6)"
                    }
                ]
            },
        });
    })
    .catch((error) => {
        console.log(error);
    })
}
goldValues();
