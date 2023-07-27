import { useState } from "react";
import polyline from "polyline";

const useNavigationRoute = () => {
    const [loading, setLoading] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState(null);

    const getRoute = async (origin, destination) => {
        setLoading(true);

        const origin_lat = origin.latitude;
        const origin_lon = origin.longitude;
        const destination_lat = destination.latitude;
        const destination_lon = destination.longitude;

        const url = `http://127.0.0.1:4000/route/v1/driving/${origin_lon},${origin_lat};${destination_lon},${destination_lat}?steps=true`;
        // const url = `http://router.project-osrm.org/route/v1/driving/${origin_lon},${origin_lat};${destination_lon},${destination_lat}?steps=true`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("DATA:", data);

        // returns a GeoJSON LineString Geometry
        const geo = polyline.toGeoJSON(data.routes[0].geometry);
        // Invert the GeoJSON coordinates (OSRM returns lon,lat, but we want lat,lon)
        geo.coordinates = geo.coordinates.map((coord) => [coord[1], coord[0]]);

        console.log("GEO:", geo);

        // Decode the polyline geometry to get the coordinates
        // const decodedGeometry = polyline.decode(data.routes[0].geometry);
        // const coords = decodedGeometry.map(([lat, lng]) => [lat, lng]);

        // Set the state
        setRouteCoordinates(geo.coordinates);
        setLoading(false);
    };

    return { loading, getRoute, routeCoordinates };
};

export default useNavigationRoute;
