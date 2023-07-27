import './App.css';
import MapComponent from './components/Map';
import { Navigator } from './components/Navigator';

function App() {
    return (
        <div
            className="relative w-screen h-screen"
        >
            <Navigator />
            <MapComponent />
        </div>
    );
}

export default App;
