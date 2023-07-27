import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import L from "leaflet";
import polyline from "polyline";
import "leaflet/dist/leaflet.css";
import { useTraffic } from "../hooks/useTraffic";
// import useNavigationRoute from "../hooks/useNavigationRoute";

const MapComponent = () => {
    // const navigationRoute = useNavigationRoute();
    const traffic = useTraffic();

    // useEffect(() => {
    //     navigationRoute.getRoute(
    //         {
    //             longitude: 13.38886,
    //             latitude: 52.517037,
    //         },
    //         {
    //             longitude: 13.397634,
    //             latitude: 52.529407,
    //         }
    //     );
    // }, []);
    useEffect(() => {
        console.log(traffic);
    }, [traffic]);

    return (
        <MapContainer
            className="z-0 w-full h-full"
            center={[52.517037, 13.38886]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* <Polyline positions={routeCoordinates} color="blue" /> */}
        </MapContainer>
    );
};

export default MapComponent;
