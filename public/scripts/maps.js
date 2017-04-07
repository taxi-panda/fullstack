const initMap = (data) => {
  let datum = data[0]

  let myLatlng = {lat: Number(datum.start_lat), lng: Number(datum.start_lng)};

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

    for(i = 1 ; i < data.length -1 ; i++){
      let datum = data[i];

      let myLatlng = {lat: Number(datum.start_lat), lng: Number(datum.start_lng)};

      var marker = new google.maps.Marker({
        position: myLatlng,
        title: 'Click to zoom'
      });

      marker.setMap(map);

    }
}
