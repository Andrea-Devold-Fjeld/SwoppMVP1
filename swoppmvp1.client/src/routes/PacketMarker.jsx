import GoogleMapsAdvancedMarkers from "@/Maps/GoogleMapsAdvancedMarkers.jsx";


export default function PacketMarker({children, onStateChange}) {
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
            <GoogleMapsAdvancedMarkers packets={children} geoLocations={null} onStateChange={onStateChange} />
        </>
    )
}