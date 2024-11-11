import GoogleMapsAdvancedMarkers from "@/Maps/GoogleMapsAdvancedMarkers.jsx";


export default function PacketMarker({api_key, children, onStateChange}) {
    console.log("PacketMarker", children);
    let marks = [];
    children.map((packet) => {
        marks.push(
            {
                lat: packet.originLatitude,
                lng: packet.originLongitude,
                text: packet.originAddress
            }
        )
        marks.push(
            {
                lat: packet.destinationLatitude,
                lng: packet.destinationLongitude,
                text: packet.destinationAddress
            }
        )
    });
    //            <GoogleMapsComponentMarker children={marks} />
    console.log(marks)
    return (
        <>
            <GoogleMapsAdvancedMarkers api_key={api_key} packets={children} geoLocations={null} onStateChange={onStateChange} />
        </>
    )
}