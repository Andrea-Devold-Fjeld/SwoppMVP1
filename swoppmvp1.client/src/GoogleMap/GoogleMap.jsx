function Comp() {
    //console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    console.log(import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    const google_key = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const google_url= 'https://maps.googleapis.com/maps/api/js?key='+google_key+'&callback=initMap&libraries=places';

    console.log(google_key)
    console.log(google_url)
    initMap()
 
    let map;

    async function initMap() {
        // The location of Uluru
        const position = { lat: -25.344, lng: 131.031 };
        // Request needed libraries.
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // The map, centered at Uluru
        map = new Map(document.getElementById("map"), {
            zoom: 4,
            center: position,
            mapId: `${import.meta.env.MAPS_ID}`,
        });

        // The marker, positioned at Uluru
        const marker = new AdvancedMarkerElement({
            map: map,
            position: position,
            title: "Uluru",
        });
    }

    initMap();

    return (
        <>
            <script async defer
                    src={google_url}
                    type="text/javascript"></script>
            <div className="jumbotron">
                <div className="container-fluid">
                    <h1>Optimize Travel Between 2 Places</h1>
                    <p>App helps calculate travel distances</p>
                    <div id="map"></div>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label for="from" className="col-xs-2 control-label">
                                <i className="far fa-dot-circle"></i>
                            </label>
                            <div className="col-xs-4">
                                <input type="text" id="from" placeholder="Origin" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="to" className="col-xs-2 control-label">
                                <i className="fas fa-map-marker-alt"></i>
                            </label>
                            <div className="col-xs-4">
                                <input type="text" id="to" placeholder="Destination" className="form-control"/>
                            </div>
                        </div>
                    </form>

                    <div className="col-xs-offset-2 col-xs-10">
                        <button className="btn btn-info btn-lg" onClick="calcRoute();">
                            <i className="fas fa-map-signs"></i>
                        </button>
                    </div>
                </div>

                <div class="container-fluid">
                    <div id="googleMap"></div>
                    <div id="output"></div>
                </div>
            </div>

            <script src="Scripts/jquery-3.1.1.min.js"></script>
            <script src="Main.js"></script>
        </>
    )
}

export default Comp