/**
 * Custom hook to get the traffic data from the REST API
 */

import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:5000/get_locations";

export const useTraffic = () => {
    const [traffic, setTraffic] = useState(null);

    useEffect(() => {
        updateTraffic();
    }, []);

    const updateTraffic = () => {
        const headers = new Headers();
        // CORS
        headers.append("Access-Control-Allow-Origin", "*");

        fetch(API_URL, {
            method: "GET",
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTraffic(data);
            })
            .catch((err) => console.log(err));
    };

    return { traffic, updateTraffic };
};
