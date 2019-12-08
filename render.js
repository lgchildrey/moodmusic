var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: 'terrain'
        });
        

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        // This example uses a local copy of the GeoJSON stored at
        // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
        script.src = 'points.json';
        document.getElementsByTagName('head')[0].appendChild(script);
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Your Location');
      infoWindow.open(map);
      map.setCenter(pos);
      map.setPosition(pos);
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
        
      }

export async function handleReportClick(event){
    const $report = $('#box');
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
      });
    $report.append(`<div class="field">
    <label class="label">New Warning</label>
    <div class="control">
      <textarea id="newpost" class="textarea" placeholder="Enter Warning Details Here!" value=""></textarea>
      <button class="is-danger post button">Post</button>
    </div>
  </div>
  `);
  
  }
export async function placeMarker(latLng, map){
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      google.maps.event.clearInstanceListeners(map);
      marker.addListener('click', function(e){
          alertType(e.latLng, map);
      });
}
export async function alertType(latLng, map){
    var contentString = `<div><h1>Fill Out Form Below to Report Hazard!</h1></div>
    `;
    var infoWindow = new google.maps.InfoWindow({
        position: latLng,
        map: map,
        content: contentString
      });
      var feature ={
        "type":"Feature",
        "properties":{
            "color": "blue",
            "alertType":"dark"
        },
        "geometry":{
            "type": "point",
            "coordinates": latLng
        }
      };
      features.append(feature);
      
      
}

export async function main() {
    // Note `await` keyword; since we're in an async function (`main`), we can do that
    const $root = $('#root');
    $(document).on("click", "#report", handleReportClick);
  
}


$(function() {
    //       let result = getTweets();
    //       loadIntoDOM(result);
   // const $root = $('#root');
   // $root.append(`<h1>hello</h1>`);
   initMap();
    main();
    });