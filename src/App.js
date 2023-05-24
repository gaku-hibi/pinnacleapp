import './App.css';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Devices from "./pages/devices";
import Ambients from "./pages/ambients";
import Locations from "./pages/locations";
import LocationHistory from "./pages/location-history";
import LocationHistoryAll from "./pages/location-history-all-devices";

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Locations />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/ambients" element={<Ambients />} />
          <Route path="/history/:deviceID" element={<LocationHistory />} />
          <Route path="/allhistory" element={<LocationHistoryAll />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
