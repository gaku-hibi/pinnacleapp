import './App.css';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Devices from "./pages/devices";
import Ambients from "./pages/ambients";
import Locations from "./pages/locations";
import LocationHistory from "./pages/location-history";
import DeviceDefs from "./pages/device-defs";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './header';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <HelmetProvider>
      <div className="App"> 
        <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Locations />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/ambients" element={<Ambients />} />
            <Route path="/history/:deviceID" element={<LocationHistory />} />
            <Route path="/baros" element={<DeviceDefs />} />
          </Routes>
        </Router>
        <Helmet>
          <meta charSet="utf-8" />
          <title>PinnaFox</title>
        </Helmet>
      </div>
    </HelmetProvider>
  );
}
export default App;
