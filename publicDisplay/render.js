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
        script.src = 'http://localhost:3000/public';
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

     //import axios from 'axios';
     //const axios = require('axios');
    
const pubRoot = new axios.create({
  baseURL: "http://localhost:3000/public"
});
async function getPoints() {
  
  return await pubRoot.get('/points');
}
async function makePoints(){
  await pubRoot.post('/points',{
   data: {}
  });
}

      async function renderPoints(){
        //await pubRoot.delete(`/points/`);
       // makePoints();
      let results = await getPoints();
      console.log(results.data.result);
        for (var i = 0; i < results.data.result.length; i++) {
          var coords = results.data.result[i].geometry.coordinates;
         // var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: coords,
            map: map
            //info: result[i]
          });
          marker.addListener('click', function(e){
            displayInfo(e.latLng);
          });
         // console.log(coords);
        }
       // console.log(getPoints());
      }
      export async function displayInfo(result){
        var latlng = result.toJSON();
        // console.log(latlng);
       let results = await getPoints();
       results= results.data.result;
       var obj;
       for(var i = 0; i < results.length; i++){
         //console.log(results[i]);
         if(results[i].geometry.coordinates.lat == latlng.lat && results[i].geometry.coordinates.lng == latlng.lng){
           //console.log(i);
           obj = results[i];
         }
        
       }
       var contentString=`<div><label>Alert Type:</label><p>${obj.properties.alertType}</p><label>Alert Description:</label><p>${obj.properties.description}</div>`;
       var infoWindow = new google.maps.InfoWindow({
         position: latlng,
         map: map,
         content: contentString
       });
       
       }
       export async function main() {
        // Note `await` keyword; since we're in an async function (`main`), we can do that
        //let results = getPoints();
        
        const $root = $('#root');
       // $(document).on("click", "#report", handleReportClick);
       // $(document).on("click", ".post", handlePostClick);
       // $(document).on("click", ".cancel", handleCancelPost);
        
    }
       $(function() {
        //       let result = getTweets();
        //       loadIntoDOM(result);
       // const $root = $('#root');
       // $root.append(`<h1>hello</h1>`);
       initMap();
        main();
        renderPoints();
        });
