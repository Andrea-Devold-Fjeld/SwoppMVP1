import {useJsApiLoader} from "@react-google-maps/api";


const libraries = ["places", "routes", "marker"];

const center = {
    lat: 59.911491,
    lng: 10.757933
};

export default function GoogleMapsAdvancedMarkers({packets, geoLocations}){
    const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: api_key,
        libraries: libraries
    })
    
    const [map, setMap] = useState(null);
    
    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        
        packets.map((packet) => {
            const marker = new AdvancedMarkerElement({
                map,
                position: {lat: packet.originLat, lng: packet.originLng},
            })
        })
    }, [])
    
}