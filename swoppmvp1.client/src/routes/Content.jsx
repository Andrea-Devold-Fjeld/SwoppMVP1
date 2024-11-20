import '@/App.css';
import GoogleMapsComponent from "@/Maps/GoogleMaps.jsx";
import {useOutletContext} from "react-router-dom";
function Content() {
    const {api_key} = useOutletContext();
    return (
        <>
            <div className="dashboard">
                Her skal det stå
            </div>
        </>
    )
}
export default Content;