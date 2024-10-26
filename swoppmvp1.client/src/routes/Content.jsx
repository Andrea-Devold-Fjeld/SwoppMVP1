import '@/App.css';
import GoogleMapsComponent from "@/Maps/GoogleMaps.jsx";

function Content() {

    return (
        <>
            <div className="content" id={"content"}>
                Content
            </div>
            <div className={"map"} id={"map"}>
                <GoogleMapsComponent />
            </div>
        </>
    )
}
export default Content;