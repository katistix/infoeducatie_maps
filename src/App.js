import './App.css';
import MapComponent from './components/Map';
import { Navigator } from './components/Navigator';
import { useState } from 'react';

function App() {
    const [route, setRoute] = useState(null)


    return (
        <div
            className="relative w-screen h-screen"
        >
            <Navigator
                setRoute={setRoute}
            />


            <MapComponent
                route={route}
            />
        </div>
    );
}

export default App;
