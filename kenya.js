/*global google*/

function initMap() {
  // The location of Uluru
  var uluru = {lat: -0.023559, lng: 37.906193};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById("map"), {zoom: 5, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}