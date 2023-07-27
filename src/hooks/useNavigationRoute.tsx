import { useState } from "react"

const useNavigationRoute = () => {

    const [osrmResponse, setOsrmResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const getRoute = async (origin, destination) => {
        setLoading(true);

        const origin_lat = origin.latitude;
        const origin_lon = origin.longitude;
        const destination_lat = destination.latitude;
        const destination_lon = destination.longitude;

        // const url = `http://127.0.0.1:4000/route/v1/driving/13.388860,52.517037;13.385983,52.496891?steps=true`;
        const url = `http://127.0.0.1:4000/route/v1/driving/${origin_lon},${origin_lat};${destination_lon},${destination_lat}?steps=true`;

        const response = await fetch(url);
        const data = await response.json();
        setOsrmResponse(data);



        // Decode the polyline geometry to get the coordinates
        const decodedGeometry = polyline.decode(data.routes[0].geometry);
        const coords = decodedGeometry.map(([lat, lng]) => [lat, lng]);

        setLoading(false);
    }


    return { osrmResponse, loading, getRoute, routeCoordinates }
}

export default useNavigationRoute