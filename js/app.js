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

    map.zoomControl.setPosition('bottomleft');

    var csvData = omnivore.csv('data/itinerary.csv')
        .on('ready', function (e) {
            drawMap(e.target.toGeoJSON());
        })
        .on('error', function (e) {
            console.log(e.error[0].message);
        });


    function drawMap(tripStops) {

        var options = {
            pointToLayer: function (feature, latlng) {

                var icon = L.icon({
                    iconUrl: "./icons/site.svg",
                    iconSize: [18, 18],
                    popupAnchor: [-22, -22],
                    className: "icon"
                });

                return L.marker(latlng, {
                    icon: icon
                });
            },
            onEachFeature: function (feature, layer) {

                layer.bindTooltip("<p class='tooltip-title'>" + feature.properties.site + "</p>" +
                    "<p class='tooltip-sub'>" + feature.properties.place + ", " + feature.properties.country + "</p>");
            }
        }

        var tripStops = L.geoJson(tripStops, options).addTo(map);

        displayMedia(tripStops);

    }

    function displayMedia(tripStops) {

        tripStops.on('click', function (e) {

            $('.map-btn').show(250);

            var props = e.layer.feature.properties;

            if (props.site == "Ashley &amp; Sam's") {
                $('.windhoek').show(250);
            }

            if (props.site == 'Cape Town') {
                $('.cape-town').show(250);
            }

            if (props.site == 'Dune Star Camp') {
                $('.dune-star').show(250);
            }

            if (props.site == 'Swakopmund') {
                $('.swakop').show(250);
            }

            if (props.site == 'Walvis Bay') {
                $('.walvis').show(250);
            }

            if (props.site == 'Sossusvlei') {
                $('.sossusvlei').show(250);
            }

            if (props.site == 'Boulders Beach') {
                $('.boulders').show(250);
            }

            if (props.site == 'Sossusvlei') {
                $('.sossusvlei').show(250);
            }

            if (props.site == 'Mount Etjo Lodge') {
                $('.etjo').show(250);
            }

            if (props.site == 'La Provence Cottages') {
                $('.fransch').show(250);
            }

            // populate HTML elements with relevant info
            $(".site-title span:first-child").html(props.site);

            // populate HTML elements with relevant info
            $(".site-subtitle span:first-child").html(props.place + ", " + props.country);

            /* BACK TO MAP BUTTON */

            $('.map-btn').click(function () {
                $('.site-media').hide();
                $('.map-btn').hide();
            });


        })
    }


    /* CLOSE SITE MEDIA ON CLICK AWAY */

    $(map).on('click', function (e) {
        var markerClick = $('.icon');
        var siteMedia = $('.site-media');
        if (!markerClick.is(e.target) && markerClick.has(e.target).length === 0) {
            siteMedia.hide();
        }
    });

    /* GALLERIA */

    (function () {
        Galleria.loadTheme("https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js");
        Galleria.configure({
            transition: 'fade',
            imageCrop: true,
            lightbox: true,
            overlayBackground: '#fff',
            height: parseInt($('#gallery').css('height')),
            wait: true
        });
        Galleria.run('#galleria-soss');
        Galleria.run('#galleria-cape');
        Galleria.run('#galleria-boulders');
        Galleria.run('#galleria-dune-star');
        Galleria.run('#galleria-swakop');
        Galleria.run('#galleria-walvis');
        Galleria.run('#galleria-etjo');
        Galleria.run('#galleria-windhoek');
        Galleria.run('#galleria-fransch');
    }());

})();
