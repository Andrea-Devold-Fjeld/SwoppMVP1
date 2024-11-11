import GoogleMapsDirections from "@/Maps/GoogleMapsDirections.jsx";


export default function Directions({api_key, geoLocation, packets, handleStateChange}){
    return (
        <GoogleMapsDirections api_key={api_key} geoLocation={geoLocation} packets={packets} onStateChange={handleStateChange}/>
    )
}