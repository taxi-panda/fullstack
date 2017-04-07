$(document).ready(() => {


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



$('#submit').on('click', e =>{
e.preventDefault();
console.log('click');
grabStart();
grabEnd();

});

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

  let dAddress = $('#daddress').val();
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
// const grabTime = function(){
//   let hour =
// }

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
      let results = data.results[0].geometry;
      let long = results.location.lng;
      let lat = results.location.lat;
      let locations =[{start_lng: startLong},
        {end_lng: endLong}
      ]
      initMap(locations)
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
      let results = data.results[0].geometry;
      let long = results.location.lng;
      let lat = results.location.lat;
    },
    error:(err)=>{
      console.log(err)
    }
});
}
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

  const initMap = (locations) => {


    let myLatlng = {lat: Number(locations[0].start_lat), lng: Number(locations[0].start_lng)};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatlng
      });

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Click to zoom'
      });

      map.addListener('center_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function() {
          map.panTo(marker.getPosition());
        }, 3000);
      });

      marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });

        let endTag = locations[1];

        let myendLatlng = {lat: Number(endTag.start_lat), lng: Number(endTag.start_lng)};

        var marker = new google.maps.Marker({
          position: myendLatlng,
          title: 'Click to zoom'
        });

        marker.setMap(map);

      }


});
