import './App.css';
import { Amplify } from 'aws-amplify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Devices from "./devices";
import Ambients from "./ambients";
import Locations from "./locations";

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path={`/devices`} elsement={<Devices />} />
        <Route path={`/ambients`} element={<Ambients />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
