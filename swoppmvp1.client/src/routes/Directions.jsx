import GoogleMapsDirections from "@/Maps/GoogleMapsDirections.jsx";


export default function Directions({geoLocation, packets}){
    return (
        <GoogleMapsDirections geoLocation={geoLocation} packets={packets}/>
    )
}