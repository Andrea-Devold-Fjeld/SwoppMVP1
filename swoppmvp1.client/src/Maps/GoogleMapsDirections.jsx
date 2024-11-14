
import React, {useCallback, useState, useEffect} from 'react'
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {useOutletContext} from "react-router-dom";


const containerStyle = {
    width: '800px',
    height: '800px'
};

 

// The latitude of Oslo, Ostlandet, Norway is 59.911491, and the longitude is 10.757933.

const center = {
    lat: 59.911491,
    lng: 10.757933
};

const libraries = ["places", "routes", "marker"]


function GoogleMapsComponent({api_key, geoLocation, packets, onStateChange}) {
    const mapIds = ["a5995e39d0ac4d83"]

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        libraries: libraries, 
        mapIds: mapIds
    })

    const [map, setMap] = useState(null);
    const [response, setResponse] = useState(null);
    
    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
        const origin = {lat: geoLocation.originLat, lng: geoLocation.originLng}

        const destination = {lat: geoLocation.destinationLat, lng: geoLocation.destinationLng}

        setMap(map)

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            directionsCallback

        );
    }, [])
    const directionsCallback = useCallback(
        (
            result, status
        ) => {
            if (result !== null) {
                if (status === 'OK') {
                    setResponse(result);
                } else {
                    console.log('response: ', result);
                }
            }},
        []
    );

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (map && packets.length > 0) {
            const infoWindow = new window.google.maps.InfoWindow();
            packets.forEach((packet) => {
                const pin = new google.maps.marker.PinElement({});
                let marker =new window.google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: {lat: packet.originLatitude, lng: packet.originLongitude},
                    content: pin.element,
                    gmpClickable: true,
                });
                marker.addListener("click", ({ domEvent, latLng }) => {
                    const { target } = domEvent;

                    infoWindow.close();
                    infoWindow.setContent(buildContent(packet));
                    infoWindow.open(marker.map, marker);
                });
                //google.maps.event.removeListener(clickListener);
            });

        }
    }, [map, packets]);

    function toggleHighlight(markerView, property) {
        if (markerView.content.classList.contains("highlight")) {
            markerView.content.classList.remove("highlight");
            markerView.zIndex = null;
        } else {
            markerView.content.classList.add("highlight");
            markerView.zIndex = 1;
        }
    }


    function buildContent(property) {
        const content = document.createElement("div");
        content.classList.add("property");
        content.addEventListener("click", (e) => {
            onStateChange({packetId: property.id, status: "Delivered"});
        });
        content.innerHTML = `<div>
            <h1>Packet</h1>
            <h2>Origin Address: ${property.originAddress}</h2>
            <h2>Destination Address: ${property.destinationAddress}</h2>
            <h2>Height: ${property.height}</h2>
            <h2>Width: ${property.width}</h2>
            <h2>Depth: ${property.depth}</h2>
            <h2>Weight: ${property.weight}</h2>
            <button>Deliver</button>
        </div>`;

        console.log("Content", content)

        return content;
    }

    return isLoaded ? (
        <GoogleMap
            options={{mapId: "a5995e39d0ac4d83"}}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            {response !== null ? <DirectionsRenderer directions={response} /> : <></>}
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMapsComponent)