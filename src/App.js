import './sass/App.scss';
import { useLoadScript } from "@react-google-maps/api";
import LunchContainer from './components/lunchContainer.jsx';

const libraries = ["places"];

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES,
    libraries
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="App">
        <LunchContainer />
    </div>
  );
}

export default App;
