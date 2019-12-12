
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
          marker.addListener('rightclick', function(e){
            deleteable(e.latLng);
          });
         // console.log(coords);
        }
       // console.log(getPoints());
      }



export async function deleteable(result){
        var latlng = result.toJSON();
 // console.log(latlng);
let results = await getPoints();
results= results.data.result;
var obj;
var j;
for(var i = 0; i < results.length; i++){
  //console.log(results[i]);
  if(results[i].geometry.coordinates.lat == latlng.lat && results[i].geometry.coordinates.lng == latlng.lng){
    //console.log(i);
    obj = results[i];
    j=i;
  }
 
}
var url = `/points/`+j;
// let b = await pubRoot.get(url);
// let a =await pubRoot.delete(url);
// console.log(a);
//console.log(b);
results.splice(j, 1);
console.log(results);
results = results;
//return await pubRoot.delete(url);
return await pubRoot.post(`/points/`, {
  data: results
 // type: "merge"
});
//console.log('completed');
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
      

export async function handleReportClick(event){
  
    const $report = $('#box');
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
      });
    $report.append(`<div id="click">
  <h1 class="has-text-weight-bold">Click anywhere on the map to add your alert marker!</h1>
  </div>
  `);
  
  }
export async function placeMarker(latLng, map){
  //console.log(latLng);
  $('#click').replaceWith('<div id="click"class="has-text-weight-bold"><h1>Click on the marker again to create the alert.</h1></div>')
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      google.maps.event.clearInstanceListeners(map);
      marker.addListener('click', function(e){
          alertType(e.latLng, map);
      });
}
async function createPoint({id = "", properties = {}, geometry = {}}) {
 // await pubRoot.delete(`/points`);
 //makePoints();
 //let results = await getPoints();
 //let a = results.data.result.length;
 //console.log(results);
  return await pubRoot.post(`/points/`, {
    data: {id, properties, geometry},
    type: "merge"
  });
}
export async function alertType(latLng, map){
  const $report = $('#box');
    var contentString = `<div><label>Fill Out Form to the Right to Report Hazard!</label></div>
    `;
    let lat = latLng.lat();
    let lng = latLng.lng();
    var infoWindow = new google.maps.InfoWindow({
        position: latLng,
        map: map,
        content: contentString
      });
      $report.replaceWith(`<div id="box" class="field">
    <div class="control">
      <label class="label">Warning Type</label>
      <textarea id="alertType" class="textarea" placeholder="Enter Warning Type Here" value=""></textarea>
      <label class="label">Warning Details</label>
      <textarea id="description" class="textarea" placeholder="Enter Warning Details Here!" value=""></textarea>
      <button id=${lat} value=${lng} class="is-primary post button">Post</button>
      <button class="is-danger cancel button">Cancel</button>
    </div>
  </div>
  `);
}
export async function handleCancelPost(event){
  const $report = $('#box');
  $report.replaceWith('<div id="box"></div>');
  
}
export async function handlePostClick(event){
  //console.log(event.target.getAttribute('id'));
  const type = $('#alertType').val();
  const desc = $('#description').val();
  var lat1 = Number(event.target.getAttribute('id'));
  var lng1 = Number(event.target.getAttribute('value'));
  let coords = {
    lat: lat1,
    lng: lng1
  };
//console.log(lat1);
  await createPoint({
    id: type+desc+lat1+lng1,
    properties: {
      alertType: type,
      description: desc

    },
    geometry: {
      type: "point",
      coordinates: coords
        
      
    }
  });
  

}

export async function main() {
    // Note `await` keyword; since we're in an async function (`main`), we can do that
    //let results = getPoints();
    
    const $root = $('#root');
    $(document).on("click", "#report", handleReportClick);
    $(document).on("click", ".post", handlePostClick);
    $(document).on("click", ".cancel", handleCancelPost);
    
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