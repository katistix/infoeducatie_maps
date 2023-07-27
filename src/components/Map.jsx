"use client";

import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Tooltip,
    useMap,
    Polyline,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTraffic } from "../hooks/useTraffic";
import L from "leaflet";
import useNavigationRoute from "../hooks/useNavigationRoute";
import polyline from "polyline";

const customMarker = new L.icon({
    iconUrl: "/default.png",
    iconSize: [60, 60],
    iconAnchor: [30, 39],
    popupAnchor: [0, 0],
});

const userMarker = new L.icon({
    iconUrl: "/user.png",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
});

const greenIcon = new L.Icon({
    iconUrl: "/green.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
});

const yellowIcon = new L.Icon({
    iconUrl: "/yellow.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
});

const orangeIcon = new L.Icon({
    iconUrl: "/orange.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
});

const redIcon = new L.Icon({
    iconUrl: "/red.png",
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

    return position === null ? null : (
        <Marker position={position} icon={userMarker}></Marker>
    );
}

const NavigationFlyTo = ({ route }) => {
    const map = useMap();

    useEffect(() => {
        if (!route) {
            return;
        }

        map.flyToBounds(route);
    }, [route]);

    return null;
};

const MapComponent = ({ route }) => {
    const { traffic, updateTraffic } = useTraffic();

    useEffect(() => {
        console.log("route:", route);
    }, [route]);

    const navigator = useNavigationRoute();
    useEffect(() => {
        if (!route) {
            return;
        }

        if (!route[0][0] || !route[0][1] || !route[1][0] || !route[1][1]) {
            return;
        }
        navigator.getRoute(
            { latitude: route[0][0], longitude: route[0][1] },
            { latitude: route[1][0], longitude: route[1][1] }
        );
        updateTraffic();
    }, [route]);

    const icon = (location) => {
        if (location) {
            if (location.traffic < 5) {
                return greenIcon;
            } else if (location.traffic < 10) {
                return yellowIcon;
            } else if (location.traffic < 15) {
                return orangeIcon;
            } else {
                return redIcon;
            }
        }

        return greenIcon;
    };

    return (
        <MapContainer
            className="z-0 w-full h-full"
            center={[45.9418997, 25.0200795]}
            zoom={4}
            scrollWheelZoom={true}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Display each point on map as a marker with text */}
            {traffic &&
                traffic.map((point, index) => (
                    <Marker
                        position={[point.latitude, point.longitude]}
                        icon={icon(point)}
                        key={index}
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
                                <p>Traffic score: {point.traffic}</p>
                            </Tooltip>
                        </a>
                    </Marker>
                ))}

            {/* Polyline from navigator.routeCoordinates */}
            {navigator.routeCoordinates && (
                <>
                    {/* Ending point */}
                    <Marker
                        position={[
                            navigator.routeCoordinates[
                                navigator.routeCoordinates.length - 1
                            ][0],
                            navigator.routeCoordinates[
                                navigator.routeCoordinates.length - 1
                            ][1],
                        ]}
                        icon={customMarker}
                    >
                        <Popup>
                            <h2>Destination</h2>
                        </Popup>
                    </Marker>
                    <Polyline
                        pathOptions={{
                            color: "#4f46e5",
                            weight: 6,
                        }}
                        positions={navigator.routeCoordinates}
                    />
                </>
            )}

            <NavigationFlyTo route={route} />

            <LocationMarker />
        </MapContainer>
    );
};

export default MapComponent;
