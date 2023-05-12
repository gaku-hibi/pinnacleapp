import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
            <LineChart
                width={500}
                height={300}
                data={locations}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Pressure" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Hat" stroke="#82ca9d" />
            </LineChart>
        </div>
    );    
}

export default LocationHistory;