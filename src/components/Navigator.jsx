import { useState } from "react";
import LocationSearch from "./LocationSearch";

export const Navigator = ({ setRoute }) => {
    const [start, setStart] = useState({});
    const [finish, setFinish] = useState({});

    const handleGoClick = () => {
        // Handle the "Go" button click event here
        if (!start || !finish) return;
        console.log("Start:", start);
        setRoute([start, finish]);
    };

    return (
        <>
            <div className="fixed z-10 p-4 bg-white rounded-lg shadow-lg max-md:hidden w-72 right-4 top-4">
                {/* Starting location */}
                <div className="mb-2">
                    <LocationSearch
                        setCoords={setStart}
                        placeholder="Starting location"
                    />
                </div>
                {/* Ending location */}
                <div className="mb-2">
                    <LocationSearch
                        setCoords={setFinish}
                        placeholder="Ending location"
                    />
                </div>

                <button
                    onClick={handleGoClick}
                    className="inline-flex justify-center w-full px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Go
                </button>
            </div>
            {/* Focus on route (if there's one)
            {start && finish && (
                <div className="fixed z-10 p-4 bg-white rounded-lg shadow-lg max-md:hidden w-72 right-4 top-4">
                    <div className="flex flex-col items-center justify-center">
                        <p className="mb-2 text-lg font-semibold text-gray-800">
                            Route
                        </p>
                        <p className="text-sm text-gray-600">
                            {start.display_name} → {finish.display_name}
            } */}

            {/* Mobile */}
            <div className="fixed bottom-0 z-10 w-screen p-4 bg-white shadow-lg md:hidden">
                {/* Starting location */}
                <div className="mb-2">
                    <LocationSearch
                        setCoords={setStart}
                        placeholder="Starting location"
                    />
                </div>
                {/* Ending location */}
                <div className="mb-2">
                    <LocationSearch
                        setCoords={setFinish}
                        placeholder="Ending location"
                    />
                </div>

                <button
                    onClick={handleGoClick}
                    className="inline-flex justify-center w-full px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                    Go
                </button>
            </div>
        </>
    );
};
