
import React, {useCallback, useState} from 'react'
import {DirectionsRenderer, GoogleMap, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

// The latitude of Oslo, Ostlandet, Norway is 59.911491, and the longitude is 10.757933.

const center = {
    lat: 59.911491,
    lng: 10.757933
};

const libraries = ["places", "routes"]


function GoogleMapsComponent({geoLocation}) {
    const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        libraries: libraries
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
        console.log("origin", origin)
        console.log("destination", destination)
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

    return isLoaded ? (
        <GoogleMap
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