$(document).ready(() => {

  const getData = function(){

      $.ajax({
        url: '/home',
        method: 'GET',
        success: (data) =>{
          console.log(data);
        },
        error:(err) =>{
          console.log(err);
        },
    });
  };

  const postData = function(){
      const obj = {name: "Sabrina", age: 18};

    $.ajax({
      url: 'http://localhost:3000',
      method: 'POST',
      data: obj,
      success: (data) => {
        console.log(data);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  // WORKING AJAX CALL
  $('#test').submit((e) => {
      e.preventDefault();

    $.ajax({
      url: 'http://localhost:5000/predict',
      method: 'POST',
      data: $('#test').serialize(),
      success: (data) => {
        console.log("data", data);
      },
      error:(err) => {
        console.log("error", err);
      }
    })
  });

  $("#user-by-start").submit((e) => {
      e.preventDefault();

      $.ajax({
        url: '/api/start',
        method: 'POST',
        data: {start_name: $('#start_name').val()},
        success: data => {
          createChart(data);
        }, error: error => console.log(error)
      })

  });

  const createChart = (uncleanedData) => {
    const ctx = $("#myChart");

    const cleaned = [];
    const labels = [];

    uncleanedData.forEach(datum => {
      labels.push(datum.start_time);
      cleaned.push({x: parseInt(datum.start_time.substr(0,2)), y: datum.price})
    });

    console.log(cleaned);


    

    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
            label: "Price",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: cleaned,
            showLine: false,
            spanGaps: false
          }]
      }, options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
    });
  };

});
