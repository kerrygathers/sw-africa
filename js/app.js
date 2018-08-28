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

    var csvData = omnivore.csv('data/itinerary.csv')
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
                    iconUrl: /*feature.properties.iconl*/ "./icons/site.svg",
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

        getDay(tripStops, 3, "Kloof Street", "Cape Town", "South Africa");


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
                    currentMarker = L.marker([tripData[this.value - 3].lat, tripData[this.value - 3].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[this.value - 3].site);

                map.addLayer(currentMarker);

                console.log(currentMarker);

                //clearInactive(currentMarker);

                function clearInactive(currentMarker, currentDay) {
                    if (map.hasLayer(currentMarker)) {
                        map.removeLayer(currentMarker);
                    }
                }
                */

                var activeIcon = L.icon({
                    iconUrl: "./icons/site-active.svg",
                    iconSize: [24, 24],
                    popupAnchor: [-22, -22],
                    className: "icon"
                });

                var aug3 = L.marker([tripData[0].lat, tripData[0].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[0].site),
                    aug4 = L.marker([tripData[1].lat, tripData[1].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[1].site),
                    aug5 = L.marker([tripData[2].lat, tripData[2].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[2].site),
                    aug6 = L.marker([tripData[3].lat, tripData[3].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[3].site),
                    aug7 = L.marker([tripData[4].lat, tripData[4].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[4].site),
                    aug8 = L.marker([tripData[5].lat, tripData[5].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[5].site),
                    aug9 = L.marker([tripData[6].lat, tripData[6].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[6].site),
                    aug10 = L.marker([tripData[7].lat, tripData[7].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[7].site),
                    aug11 = L.marker([tripData[8].lat, tripData[8].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[8].site),
                    aug12 = L.marker([tripData[9].lat, tripData[9].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[9].site),
                    aug13 = L.marker([tripData[10].lat, tripData[10].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[10].site),
                    aug14 = L.marker([tripData[11].lat, tripData[11].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[11].site),
                    aug15 = L.marker([tripData[12].lat, tripData[12].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[12].site),
                    aug16 = L.marker([tripData[13].lat, tripData[13].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[13].site),
                    aug17 = L.marker([tripData[14].lat, tripData[14].lon], {
                        icon: activeIcon
                    }).bindTooltip(tripData[14].site);

                if (this.value == 4) {
                    map.addLayer(aug4);
                }

                $('#slider input[type=range]')
                    .on('input', function () {

                        //console.log(tripData[this.value - 3].icona)

                        if (this.value == 3) {
                            map.addLayer(aug3);
                        }

                        if (this.value != 3) {
                            map.removeLayer(aug3);
                        }

                        if (this.value == 4) {
                            map.addLayer(aug4);
                        }

                        if (this.value != 4) {
                            map.removeLayer(aug4);
                        }

                        if (this.value == 5) {
                            map.addLayer(aug5);
                        }

                        if (this.value != 5) {
                            map.removeLayer(aug5);
                        }

                        if (this.value == 6) {
                            map.addLayer(aug6);
                        }

                        if (this.value != 6) {
                            map.removeLayer(aug6);
                        }

                        if (this.value == 7) {
                            map.addLayer(aug7);
                        }

                        if (this.value != 7) {
                            map.removeLayer(aug7);
                        }

                        if (this.value == 8) {
                            map.addLayer(aug8);
                        }

                        if (this.value != 8) {
                            map.removeLayer(aug8);
                        }

                        if (this.value == 9) {
                            map.addLayer(aug9);
                        }

                        if (this.value != 9) {
                            map.removeLayer(aug9);
                        }

                        if (this.value == 10) {
                            map.addLayer(aug10);
                        }

                        if (this.value != 10) {
                            map.removeLayer(aug10);
                        }

                        if (this.value == 11) {
                            map.addLayer(aug11);
                        }

                        if (this.value != 11) {
                            map.removeLayer(aug11);
                        }

                        if (this.value == 12) {
                            map.addLayer(aug12);
                        }

                        if (this.value != 12) {
                            map.removeLayer(aug12);
                        }

                        if (this.value == 13) {
                            map.addLayer(aug13);
                        }

                        if (this.value != 13) {
                            map.removeLayer(aug13);
                        }

                        if (this.value == 14) {
                            map.addLayer(aug14);
                        }

                        if (this.value != 14) {
                            map.removeLayer(aug14);
                        }

                        if (this.value == 15) {
                            map.addLayer(aug15);
                        }

                        if (this.value != 15) {
                            map.removeLayer(aug15);
                        }

                        if (this.value == 16) {
                            map.addLayer(aug16);
                        }

                        if (this.value != 16) {
                            map.removeLayer(aug16);
                        }

                        if (this.value == 17) {
                            map.addLayer(aug17);
                        }

                        if (this.value != 17) {
                            map.removeLayer(aug17);
                        }
                    })

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

    (function () {
        Galleria.loadTheme("https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js");
        Galleria.configure({
            transition: 'fade',
            imageCrop: true,
            lightbox: true,
            overlayBackground: '#fff'
        });
        Galleria.run('#galleria-soss');
    }());

})();
