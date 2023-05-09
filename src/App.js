import './App.css';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Devices from "./pages/devices";
import Ambients from "./pages/ambients";
import Locations from "./pages/locations";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
