import React, { useState } from "react";
import axios from "axios";

const LocationSearch = ({ setCoords }) => {
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
                className="flex flex-col items-center"
            >
                <input
                    type="text"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    placeholder="Enter a place name"
                    className="px-4 py-2 mb-4 border border-gray-400 rounded-lg"
                />
                <button
                    type="submit"
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            <div className="flex flex-col items-center mt-8">
                {results.length === 0 ? (
                    <p className="text-center">No locations found.</p>
                ) : (
                    <div className="flex flex-col items-center">
                        {results.map((location) => (
                            <div
                                key={location.place_id}
                                className="flex justify-between w-full mb-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleLocationClick(location)}
                            >
                                <p>{location.display_name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationSearch;
