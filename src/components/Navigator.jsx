import { useState } from "react";

export const Navigator = () => {
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");

    const handleStartChange = (event) => {
        setStart(event.target.value);
    };

    const handleFinishChange = (event) => {
        setFinish(event.target.value);
    };

    const handleGoClick = () => {
        // Handle the "Go" button click event here
    };

    return (
        <div className="fixed z-10 p-4 bg-white rounded-lg shadow-lg right-4 top-4">
            <div className="mb-2">
                <input
                    type="text"
                    id="start"
                    placeholder="Starting Point"
                    value={start}
                    onChange={handleStartChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-white focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    id="finish"
                    placeholder="Finish Destination"
                    value={finish}
                    onChange={handleFinishChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-white focus:border-violet-500 focus:ring focus:ring-violet-500 focus:ring-opacity-50"
                />
            </div>
            <button
                onClick={handleGoClick}
                className="inline-flex justify-center px-4 py-2 text-white border border-transparent rounded-md shadow-sm bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
                Go
            </button>
        </div>
    );
};
