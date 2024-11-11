import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import React, {useCallback, useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";

const libraries = ["places", "routes", "marker"];

const center = {
    lat: 59.911491,
    lng: 10.757933
};
const containerStyle = {
    width: '800px',
    height: '800px'
};

function handleClick(e){
    console.log("Deliver packet", e.name, e, e.target)
}

export default function GoogleMapsAdvancedMarkers({api_key,packets, geoLocations, onStateChange}) {
    console.log("Google Maps Advanced API Key: ", api_key);
    const mapIds = ["a5995e39d0ac4d83"]
    console.log(mapIds)
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        libraries: libraries,
        mapIds: mapIds
    })
    
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState([]);
    
    const onLoad = useCallback(function callback(map) {
        const {infoWindow} = new window.google.maps.InfoWindow();
        const {AdvancedMarkerElement, PinElement} = new window.google.maps.Marker();
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
        /*
                packets.map((packet) => {
            const marker = new AdvancedMarkerElement({
                map,
                position: {lat: packet.originLat, lng: packet.originLng},
            })
            setMarker([...marker, marker])
        })
         */

            
    }, [])
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (map && packets.length > 0) {
            console.log("Packets: ", packets)
            const infoWindow = new window.google.maps.InfoWindow();
            packets.forEach((packet) => {
                console.log("OriginLatitude: ", packet.originLatitude, "type: ", typeof packet.originLatitude)
                console.log("OriginLongitude: ", packet.originLongitude, "type: ", typeof packet.originLongitude)
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
            console.log("Click event", e);
            onStateChange({packetId: property.id, status: "Delivered"});
        });
        content.innerHTML = `<div>
            <h5>Packet</h5>
            <p>Origin Address: ${property.originAddress}</p>
            <p>Destination Address: ${property.destinationAddress}</p>
            <p>Height: ${property.height}</p>
            <p>Width: ${property.width}</p>
            <p>Depth: ${property.depth}</p>
            <p>Weight: ${property.weight}</p>
            <button>Deliver</button>
        </div>`;
        
        console.log("Content", content)
        
        return content;
    }


/*
click: () => {
                    console.log("Marker clicked")
                    return (
                        <div>
                            <h1>Packet</h1>
                            <h2>Origin Address: {packet.originAddress}</h2>
                            <h2>Destination Address: {packet.destinationAddress}</h2>
                            <h2>Height: {packet.height}</h2>
                            <h2>Width: {packet.width}</h2>
                            <h2>Depth: {packet.depth}</h2>
                            <h2>Weight: {packet.weight}</h2>
                            <button>Deliver</button>
                        </div>
                    )
 */
    return isLoaded ? (
        <GoogleMap
            options={{mapId: import.meta.env.VITE_APP_MAPS_ID}}
            mapContainerStyle={containerStyle}
            center={center}
            onLoad={onLoad}
            zoom={5}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */ }
              
        </GoogleMap>
    ) : <><button onClick={handleClick}>Deliver</button> </>
}