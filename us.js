/*global google*/

function initMap() {
  // The location of Uluru
  var uluru = {lat: 37.090240, lng: -95.712891};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById("map"), {zoom: 5, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}