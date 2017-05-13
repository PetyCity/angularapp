
//Initializing the map
function initMap() {
    getCategories();
    window.markers = [];
    var myLatLng = {lat:4.6381991 , lng: -74.0884238}; //Set the first coordinate
    //Set the map 
    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng,
    });

    var markerImage = new google.maps.MarkerImage
        (
            "images/icono-huella.png",
            new google.maps.Size(32, 32, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(15, 15),
            new google.maps.Size(32, 32, "px", "px")
        );
    //Set new marker
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: markerImage,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: 'Punto de referencia' 
    });
    //Content for first marker
    let contentString = '<div id="content">'+
    'punto de referencia <br> Latitud: ' + marker.getPosition().lat() + 
    '<br> Longitud: ' + marker.getPosition().lng() +
    '</div>'; 
    let infowindow = new google.maps.InfoWindow({content: contentString});
    // Add the circle for this map.
    var radiusCircle = new google.maps.Circle({
    strokeColor: '#00c462',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#00c462',
    fillOpacity: 0.35,
    map: map,
    center: marker.getPosition(),
    radius: 2000,
    });
    //Add listener for marker
    google.maps.event.addListener(marker, 'click',  
            function (infowindow, marker) {
                return function () {
                    toggleBounce(marker);
                    infowindow.close();
                    contentString = '<div id="content">'+
                    'punto de referencia <br> Latitud: ' + marker.getPosition().lat() + 
                    '<br> Longitud: ' + marker.getPosition().lng() +
                    '</div>'; 
                    infowindow = new google.maps.InfoWindow({content: contentString});
                    infowindow.open(map, marker);
                };
            }(infowindow, marker)
        );
    marker.setMap(map);
    radiusCircle.bindTo("center", marker, "position");
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function openInfoWindow(marker) {
    var markerLatLng = marker.getPosition();
    infoWindow.setContent([
        '&lt;b&gt;La posicion del marcador es:&lt;/b&gt;&lt;br/&gt;',
        markerLatLng.lat(),
        ', ',
        markerLatLng.lng(),
        '&lt;br/&gt;&lt;br/&gt;Arr&amp;aacute;strame y haz click para actualizar la posici&amp;oacute;n.'
    ].join(''));
    infoWindow.open(map, marker);
}

//Principal function
function explore() {
    deleteMarkers();//Clear all markers on the map
    //Get all necessary variables from the form
    let container = document.getElementById("container");
    let sucess = document.getElementById("msj-sucess");
    let loading = document.getElementById("msj-loading");
    let safety = document.getElementById('safety');
    let strsafety = safety.options[safety.selectedIndex].value;
    let transport = document.getElementById('transport');
    let strtransport = transport.options[transport.selectedIndex].value;
    let distance = document.getElementById('distance');
    let strdistance = distance.options[distance.selectedIndex].value;
    let propertyType = document.getElementById('propertytype');
    let strpropertyType = propertyType.options[propertyType.selectedIndex].value;
    let bycicle = document.querySelector('input[name="bycicle"]:checked').value;
    let userform = document.getElementById('options');
    let titulo = "";
    //Making some messages visible
    userform.style.display = "none";
    sucess.style.display = "block";
    loading.style.display = "block";
    document.getElementById("searchButton").style.display = "block";
    sucess.innerHTML="<h4> Update ready </h4><p> Your consulting dates are: </p>";
    loading.innerHTML="<div class='info-home'>University: <img src='images/University.png' /></div> <div class='info-home'>Police: <img class='icon-home' src='images/Police.png' /></div> <div class='info-home'> Home: <img class='icon-home' src='images/home.png' /> </div> <div class='info-home'> Byke racks: <img class='icon-home' src='images/Byke.png' /> </div><div style='clear:both'></div>";    
    sucess.innerHTML+="<br><strong> Safety percent >: </strong>"+ strsafety +"<br><strong> Transport quality >: </strong>"+ strtransport +"<br><strong> Distance: </strong>"+ strdistance +"<br><strong> Property Type: </strong>"+ strpropertyType +"<br> <strong>Want alternative transport: </strong>"+ bycicle;
    container.style.height = '750px';
    //Calling functions
    getPolice(strdistance);//Get Police Stations
    getHouses(strdistance, strpropertyType);//Get Possible Houses
    if (bycicle == "Yes"){ //If want bike is selected, show bikes raks
        getBykes(strdistance);
    }
}
function searchAgain() { //Restoring everything as at first
    document.getElementById('options').style.display = "block";
    document.getElementById("msj-sucess").style.display = "none";
    document.getElementById("searchButton").style.display = "none";
    document.getElementById("stadistics").style.display = "none";
    document.getElementById("msj-loading").style.display = "none";
}
//Function to add marker to the map
function addMarker(location, contentString, valuearray = "", markertype) {
    var valueString = '<div id="content" class="barra-titulo">'+
                '<strong> Estimated valuation:</strong> <br><br>' +
                '</div>'; 
    var infowindow = new google.maps.InfoWindow({content: contentString});
    //Obtaining the type of marker, used to set the icon on the map
    if (markertype == "house"){
        var markerImage = new google.maps.MarkerImage
        (
            "images/home.png",
            new google.maps.Size(36, 36, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(36, 36, "px", "px")
        );
        titulo = "Possible property"
    }
    if (markertype == "police"){
        var markerImage = new google.maps.MarkerImage
        (
            "images/Police.png",
            new google.maps.Size(52, 52, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(52, 52, "px", "px")
        );
        titulo = "Police"
    }
    if (markertype == "bikes"){
        var markerImage = new google.maps.MarkerImage
        (
            "images/Byke.png",
            new google.maps.Size(32, 32, "px", "px"),
            new google.maps.Point(0, 0),
            new google.maps.Point(0, 0),
            new google.maps.Size(32, 32, "px", "px")
        );
        titulo = "Bikes"
    }
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerImage,
        title: titulo 
    });
    markers.push(marker);//Add markers on the global array
    
    google.maps.event.addListener(marker, 'click', 
            function (infowindow, marker) {
                return function () {
                    infowindow.open(map, marker);
                    if (markertype == "house"){ //If marker is house, we can show some statistics
                        addStatics(valueString);
					    createDraw(valuearray);
                    }
                };
            }(infowindow, marker)
        );
    marker.setMap(map);
}
// Obtaining possible houses
function getCategories(){
    var categoryAPI = "http://localhost:3000/api/v1/admin/users/1/companies";//Api to obtain data of categories
    $.getJSON(categoryAPI, function (data) {
        for (var i = 0; i < data.companies.length; i++) {
            let datos= data.companies[i];
            //console.log(datos);
            $('#categorias_check').append('<div class="checkCategory"> <input type="checkbox" name="' + datos.name_comp + '" id="' + datos.name_comp + '" class="css-checkbox" checked="checked"> <label for="' +  datos.name_comp + '" name="' +  datos.name_comp + '" class="css-label dark-check-green">' +  datos.name_comp + '</label> </div>');
        }
    });
}

function getPolice(userdist){//Obtaining additional data
    if (userdist == 0) {userdist = 4000;}//if userdist is not set, set max distance to 4km
    var policeAPI = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json";//Api to obtain data of the police stations
    var myLatLngOri = {lat:41.8708 , lng: -87.6505};
    $.getJSON(policeAPI, function (datos) {//Get data from api
        let info1 = datos.data;
        $.each(info1, function(i, info){//Looking at each object
            var lati = Number(info[20]);
            var long = Number(info[21]);
            var comarea = info[9];
            var adress = info[10];
            var zip = info[13];
            var phone = info[15];
            let myLatLng={lat:lati, lng:long};
            //Calculating distance from property to university
            var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(myLatLngOri), new google.maps.LatLng(myLatLng));
            var distanceu = Math.round(distance);

            if (distanceu < userdist){//Checking that it is within the selected range
                    let valores = "";
                    let typemarker = "police";
                    let contentString = '<div id="content">'+'<strong> Police Station:</strong> <br><br>' + "<strong>Community area:</strong> " + comarea + "<br> <strong>Adress: </strong> " + adress + "<br> <strong>Zip code: </strong> " + zip + "<br> <strong>Phone number: </strong> " + phone + "<br> <strong>Distance to University: </strong> " + distanceu + " meters " + '</div>'; 
                    addMarker(myLatLng,contentString,valores,typemarker);
            }
        });
    });
}

function getBykes(userdist){
    if (userdist == 0) {userdist = 4000;}//if userdist is not set, set max distance to 4km
    var bikesAPI = "https://data.cityofchicago.org/api/views/cbyb-69xx/rows.json";//Api to obtain data of bike racks
    var myLatLngOri = {lat:41.8708 , lng: -87.6505};
    $.getJSON(bikesAPI, function (datos) {//Get data from api
        let info1 = datos.data;
        let zips = {};
        let bycindex = 1;
        $.each(info1, function(i, info){//Looking at each object
            var lati = Number(info[14]);
            var long = Number(info[15]);
            var comareaid = info[11];
            var comarea = info[12];
            var adress = info[9];
            let myLatLng={lat:lati, lng:long};
            //Calculating distance from property to university
            var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(myLatLngOri), new google.maps.LatLng(myLatLng));
            var distanceu = Math.round(distance);
            let valores = "";
            let typemarker = "bikes";
            if (distanceu < 1100){//Show bike racks within 1km
                if (bycindex % 3 == 0){//Only show 33% of the data not to overload the map
                    let contentString = '<div id="content">'+'<strong> Bikes Racks:</strong> <br><br>' + "<strong>Community area:</strong> " + comarea + "<br> <strong>Adress: </strong> " + adress + "<br> <strong>Distance to University: </strong> " + distanceu + " meters " + '</div>';
                    addMarker(myLatLng,contentString,valores,typemarker);//Add the marker to the map
                }
                bycindex += 1;
            }
            else{
                if (distanceu < userdist){
                        if (zips[comarea]){
                            zips[comarea] += 1;
                        }
                        else{
                            zips[comarea] = 1;
                        }
                        if (zips[comarea] <= 10){//Show max 10 bike rakes per area
                            let contentString = '<div id="content">'+'<strong> Bikes Racks:</strong> <br><br>' + "<strong>Community area:</strong> " + comarea + "<br> <strong>Adress: </strong> " + adress + "<br> <strong>Distance to University: </strong> " + distanceu + " meters " + '</div>';
                            addMarker(myLatLng,contentString,valores,typemarker);//add marker to the map
                        }
                }
            }
        });
    });
}

function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }
// Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }
// Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
