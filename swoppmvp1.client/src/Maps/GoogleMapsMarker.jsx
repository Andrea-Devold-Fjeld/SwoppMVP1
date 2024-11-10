import React from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

// The latitude of Oslo, Ostlandet, Norway is 59.911491, and the longitude is 10.757933.

const center = {
    lat: 59.911491,
    lng: 10.757933
};


function GoogleMapsComponentMarker({children}) {
    const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const mapId = ["a5995e39d0ac4d83"]
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        mapIds: mapId
    })

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

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
            if({children.length !==0})  {
                children.map(pos => <Marker position={{lat: pos.lat, lng: pos.lng}}/>) 
            }
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(GoogleMapsComponentMarker)