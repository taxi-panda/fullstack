$(document).ready(() => {




    const ctx = $("#myChart");
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });



$('#submit').on('click', e =>{
e.preventDefault();
grabStart();
grabEnd();
})

const grabStart = function(){
let pAddress = $('#paddress').val();
let startAddress = pAddress.split(' ').join('+');
let pCity = $('#pcity').val();
let startCity = pCity.split(' ').join('+');
let pState = $('#pstate').val();
let startState = pState.split(' ').join('+');

console.log(startAddress);
console.log(startCity);
console.log(startState);

grabStartLocation(startAddress, startCity, startState);
}

const grabEnd = function(){
  let dAddress = $('#dadress').val();
  let endAddress = dAddress.split(' ').join('+');
  let dCity = $('#dcity').val().split(' ').join('+');
  let endCity = dCity.split(' ').join('+');
  let dState = $('#dstate').val().split(' ').join('+');
  let endState = dState.split(' ').join('+');

  console.log(endAddress);
  console.log(endCity);
  console.log(endState);

  grabEndLocation(endAddress, endCity, endState);
}

const grabStartLocation = function(startAddress,startCity,startState){
let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + startAddress + ',' + startCity + ',' + startState +'&key=AIzaSyAjz5F9aOz4-Qq-ENbLv2-xFwGD-nZL80o';
$.ajax({
  url: url,
  method:'GET',
  success: (data)=>{
    console.log(data.results[0].geometry.location.lng);
    console.log(data.results[0].geometry.location.lat);
    let startLong = data.results[0].geometry.location.lng;
    let startLat = data.results[0].geometry.location.lat;
    grabEndLocation(startLong, startLat);
  },
  error:(err)=>{
    console.log(err)
  }
});
}

let grabEndLocation = function(endAddress,endCity,endState){
  let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + endAddress + ',' + endCity + ',' + endState +'&key=AIzaSyAjz5F9aOz4-Qq-ENbLv2-xFwGD-nZL80o';
  $.ajax({
    url: url,
    method:'GET',
    success: (data)=>{
      console.log(data.results[0].geometry.location.lng);
      console.log(data.results[0].geometry.location.lat);
      let endLong = data.results[0].geometry.location.lng;
      let endLat = data.results[0].geometry.location.lat;
      postMap(endLong, endLat);
    },
    error:(err)=>{
      console.log(err)
    }
  });
}

let postFuture = function(){
  $.ajax({
    url: '/api',
    method:'POST',
    success: (data)=>{
      console.log(data.results[0].geometry.location.lng);
      console.log(data.results[0].geometry.location.lat);
      let long = data.results[0].geometry.location.lng;
      let lat = data.results[0].geometry.location.lat;
    },
    error:(err)=>{
      console.log(err)
    }
});
}

const getData = function(){

    $.ajax({
      url: '/api',
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

});
