import '@/App.css';
import GoogleMapsComponent from "@/Maps/GoogleMaps.jsx";
import {useOutletContext} from "react-router-dom";
function Content() {
    const {api_key} = useOutletContext();
    return (
        <>
            <div className="content" id={"content"}>
                Content
            </div>
            <div className={"map"} id={"map"}>
                <GoogleMapsComponent api_key={api_key}/>
            </div>
        </>
    )
}
export default Content;