import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { useParams } from 'react-router-dom';

function LocationHistory () {
    const { deviceID } = useParams();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchLocations(deviceID);
    }, [deviceID]);

    async function fetchLocations(deviceID) {
        try {
            const apiData = await API.graphql(graphqlOperation(listMetcom3DLocations, {
                filter: { DeviceID: { eq: deviceID}},
                limit: 100
            }));
            const locations = apiData.data.listMetcom3DLocations.items;
            const sortedLocations = locations.sort((a, b) => b.Timestamp - a.Timestamp);
            setLocations(sortedLocations);
        } catch (err ) {
            console.error('Error fetching locations', err);
        }
    };  

    return (
        <div>
            <h2>Device Details for ID: {deviceID}</h2>
            {locations.map(location => (
                <div key={location.id}>
                    <p>Timestamp: {location.Timestamp}</p>
                    <p>Pressure: {location.Pressure}</p>
                    <p>HAT: {location.Hat}</p>
                </div>
            ))}
        </div>
    );    
}

export default LocationHistory;