import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
                limit: 144,
                sortDirection: 'DESC'
            }));
            const locations = apiData.data.listMetcom3DLocations.items;
            const sortedLocations = locations.sort((a, b) => a.Timestamp - b.Timestamp);
            const mappedLocations = sortedLocations.map(location => ({
                ...location,
                Pressure: location.Pressure / 100,
                Timestamp: new Date(location.Timestamp * 1000), // Here, we keep the Timestamp as a Date object
            }));

            // Calculate min and max for Pressure
            const pressures = mappedLocations.map(location => location.Pressure);
            const minPressure = Math.floor(Math.min(...pressures) / 10) * 10;
            const maxPressure = Math.ceil(Math.max(...pressures) / 10) * 10;

            setLocations({
                data: mappedLocations,
                minPressure,
                maxPressure,
            });

        } catch (err ) {
            console.error('Error fetching locations', err);
        }
    };

    const formatDate = (date) => {
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
    
        return `${month}/${day} ${hours}:${minutes}:${seconds}`;
    };    

    return (
        <div>
            <h2>Location History for ID: {deviceID}</h2>
            <ResponsiveContainer width="99%" aspect={3}>
                <LineChart
                    data={locations.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Timestamp" tickFormatter={formatDate} />
                    <YAxis yAxisId="left" orientation='left' stroke="#8884d8" domain={[locations.minPressure, locations.maxPressure]} />
                    <YAxis yAxisId="right" orientation='right' stroke="#82ca9d" />
                    <Tooltip labelFormatter={(label) => formatDate(new Date(label))} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Pressure" stroke="#8884d8" dot />
                    <Line yAxisId="right" type="monotone" dataKey="Hat" stroke="#82ca9d" dot />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );    
}

export default LocationHistory;
