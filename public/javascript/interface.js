"use strict"

$(document).ready(function() {

  if (document.getElementById("map")) {
    getEventLocations();
  }

  if (document.getElementById("searchTextField")) {
    calculateCoordinates();
  }

  if (document.getElementById("event_date")) {
    setEventDate();
  }

  $(".clickable-row").click(function() {
    window.location = $(this).data("href");
  });

  function calculateCoordinates() {
    if(document.location.href.indexOf("/events/new") != -1) {
      function initialize() {
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              document.getElementById('cityLat').value = place.geometry.location.lat();
              document.getElementById('cityLng').value = place.geometry.location.lng();
             });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }
  }

  function setEventDate() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);

    $('#event_date').val(today);
    $('#event_date').attr({'min': today});

    $(function(){
      $("#event_time").each(function(){
        var d = new Date(),
            h = d.getHours(),
            m = d.getMinutes();
        if(h < 10) h = '0' + h;
        if(m < 10) m = '0' + m;
        $(this).attr({
          'value': h + 1 + ':' + m,
          'min': h + ':' + m
        });
      });
    });
  }

  function addMapToStartPage(locations) {
    var map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        putPinsOnMap(locations, map);
      });
    } else {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: new google.maps.LatLng(51.5074, .1278),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      putPinsOnMap(locations, map);
    }
  }

  function getEventLocations() {
    $.get("/events/getEventLocations", function(data) {
      addMapToStartPage(data);
    })
  }

  function putPinsOnMap(locations, map) {
    var marker, i;
    var infowindow = new google.maps.InfoWindow();

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("Test name22" + "<br><a href='" + locations[i][4] + "'>Link</a>");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }
});
