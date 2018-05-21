(function () {

    var map = L.map('map', {
        zoomSnap: .1,
        center: [-27.5, 16.5],
        zoom: 5.4,
        minZoom: 4
    });

    var accessToken = 'pk.eyJ1Ijoia2dhdGhlcnMiLCJhIjoiY2pnd3VkODdzMWJtdjJxbXhqYWQ0MnNldSJ9.5nJcFQH7U3GAQh_vvq3Tcw'

    L.tileLayer('https://api.mapbox.com/styles/v1/kgathers/cjhcxtct0199e2sqgdul3si9o/tiles/256/{z}/{x}/{y}?access_token=' + accessToken, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: accessToken
    }).addTo(map);


    omnivore.csv('data/itinerary.csv')
        .on('ready', function (e) {
            drawMap(e.target.toGeoJSON());
        })
        .on('error', function (e) {
            console.log(e.error[0].message);
        });


    function drawMap(tripStops, currentDay) {

        var options = {
            pointToLayer: function (feature, latlng) {

                var icon = L.icon({
                    iconUrl: feature.properties.iconl,
                    iconSize: [20, 20],
                    popupAnchor: [-22, -22],
                    className: "icon"
                });

                return L.marker(latlng, {
                    icon: icon
                });
            },
            onEachFeature: function (feature, layer) {

                layer.bindTooltip("<h3>" + feature.properties.site + "</h3>" +
                    "<p>" + feature.properties.country + "</p>");
            }
        }

        var tripStops = L.geoJson(tripStops, options).addTo(map);

        sequenceUI(tripStops);

        getDay(tripStops, 3, "Kloof Street", "Cape Town", "South Africa")
    }


    // get current day info

    function getDay(tripStops, currentDay, currentSite, currentPlace, currentCountry) {

        // add year legend above slider
        dayLegend(tripStops, currentDay, currentSite, currentPlace, currentCountry);

    }


    // CONFIGURE SLIDER

    function sequenceUI(tripStops, currentDay) {

        // create Leaflet control for the slider
        var sliderControl = L.control({
            position: 'bottomleft'
        });

        sliderControl.onAdd = function (map) {

            var controls = L.DomUtil.get("slider");

            L.DomEvent.disableScrollPropagation(controls);
            L.DomEvent.disableClickPropagation(controls);

            return controls;

        }

        sliderControl.addTo(map);

        //select the slider's input and listen for change
        $('#slider input[type=range]')
            .on('input', function () {

                // current value of slider is current year
                var currentDay = this.value,
                    currentSite = (tripData[this.value - 3].site),
                    currentPlace = (tripData[this.value - 3].place),
                    currentCountry = (tripData[this.value - 3].country);

                /*
                    var tripData = Papa.parse("../data/itinerary.csv", {
                        download: true,
                        header: true,
                        dynamicTyping: true,
                        complete: function (results) {
                            console.log(results);
                        }

                    });
                    */

                getDay(tripStops, currentDay, currentSite, currentPlace, currentCountry);

            });

    }

    // build legend with information on each day of the trip
    function dayLegend(tripStops, currentDay, currentSite, currentPlace, currentCountry) {
        // create Leaflet control for the legend
        var dayLegend = L.control({
            position: 'bottomleft'
        });

        // when the control is added to the map
        dayLegend.onAdd = function (map) {

            // select the legend using id attribute of legend
            var dayLegend = L.DomUtil.get("day-legend");

            // return the selection
            return dayLegend;

        }

        // populate HTML elements with relevant info
        $('.day span').html(currentDay);
        $('.site span').html(currentSite);
        $('.place-country span').html(currentPlace + ', ' + currentCountry);

        dayLegend.addTo(map);

    }


    // COUNDTOWN TIMER

    // Set the date we're counting down to
    var countDownDate = new Date("Aug 2, 2018 18:45:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("countdown-app").innerHTML = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "It's on!";
        }
    }, 1000);

})();
