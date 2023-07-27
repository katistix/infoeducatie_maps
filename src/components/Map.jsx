"use client";

import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMap,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTraffic } from "../hooks/useTraffic";
import L from "leaflet";

const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
});

const greenIcon = new L.Icon({
    iconUrl: "/green.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
});

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return null;

    // return position === null ? null : (
    //     <Marker position={position} icon={customMarker}>
    //         <Popup>
    //             You are here. <br />
    //             Map bbox: <br />
    //             <b>Southwest lng</b>: {bbox[0]} <br />
    //             <b>Southwest lat</b>: {bbox[1]} <br />
    //             <b>Northeast lng</b>: {bbox[2]} <br />
    //             <b>Northeast lat</b>: {bbox[3]}
    //         </Popup>
    //     </Marker>
    // );
}

const MapComponent = () => {
    const traffic = useTraffic();
    useEffect(() => {
        console.log(traffic);
    }, [traffic]);

    return (
        <MapContainer
            className="z-0 w-full h-full"
            center={[45.9418997, 25.0200795]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Display each point on map as a marker with text */}
            {traffic &&
                traffic.map((point, index) => (
                    <Marker
                        position={[point.latitude, point.longitude]}
                        icon={greenIcon}
                        eventHandlers={{
                            click: (e) => {
                                console.log("marker clicked", e);
                                window.open(point.link);
                            },
                        }}
                    >
                        <a href={point.link} key={index}>
                            <Tooltip>
                                <h2>{point.name}</h2>
                                <p>{point.total_cars} vehicles</p>
                            </Tooltip>
                        </a>
                    </Marker>
                ))}
            <LocationMarker />
        </MapContainer>
    );
};

export default MapComponent;
