import GoogleMapsComponentMarker from "@/Maps/GoogleMapsMarker.jsx";


export default function PacketMarker({children}) {
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
    console.log(marks)
    return (
        <>
            <GoogleMapsComponentMarker children={marks} />
        </>
    )
}