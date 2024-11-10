import GoogleMapsDirections from "@/Maps/GoogleMapsDirections.jsx";


export default function Directions({geoLocation, packets, handleStateChange}){
    return (
        <GoogleMapsDirections geoLocation={geoLocation} packets={packets} onStateChange={handleStateChange}/>
    )
}