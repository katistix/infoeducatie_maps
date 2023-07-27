import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ setCoords, placeholder }) => {
    const [placeName, setPlaceName] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    placeName
                )}&format=json&limit=5`
            );
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleLocationClick = async (location) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    location.display_name
                )}&format=json&limit=1`
            );
            const { lat, lon } = response.data[0];
            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            setCoords([lat, lon]);
            setPlaceName(location.display_name);
            setResults([]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form
                onSubmit={handleSearch}
                className="flex flex-col items-center w-full"
            >
                <input
                    type="text"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>

            {results.length !== 0 && (
                <div className="flex flex-col items-center mt-8">
                    {results.map((location) => (
                        <div
                            key={location.place_id}
                            className="flex justify-between w-full px-4 py-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-200"
                            onClick={() => handleLocationClick(location)}
                        >
                            <p className="text-gray-800">
                                {location.display_name}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
