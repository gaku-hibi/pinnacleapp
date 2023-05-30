import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { listMetComDeviceDefsByDeviceIDSortedTimestamp, listMetcomDevices } from '../graphql/queries';

const DeviceDefs = () => {
  const [data, setData] = useState([]);
  const [deviceIDs, setDeviceIDs] = useState([]);

  const fetchAllDeviceIDs = async () => {
    try {
      const deviceIDsData = await API.graphql(graphqlOperation(listMetcomDevices));
      if (deviceIDsData.data) {
        const fetchedDeviceIDs = deviceIDsData.data.listMetcomDevices.items.map(item => item.DeviceID);
        setDeviceIDs(fetchedDeviceIDs);
        //const allData = await Promise.all(fetchedDeviceIDs.map(deviceId => fetchData(deviceId)));
        //setData(allData.flat().sort((a, b) => a.timestamp - b.timestamp));

        fetchedDeviceIDs.forEach(deviceId => {
          fetchData(deviceId);
        });
      }
    } catch (error) {
      console.error('Error fetching device IDs', error);
    }
  };
/*
  const fetchData = async (deviceId) => {
    try {
      let nextToken = null;
  
      do {
        const deviceData = await API.graphql(graphqlOperation(listMetComDeviceDefsByDeviceIDSortedTimestamp, { 
          DeviceID: deviceId, 
          nextToken: nextToken,
        }));
  
        if (deviceData.data) {
          const newData = deviceData.data.listMetComDeviceDefsByDeviceIDSortedTimestamp.items;
          const mappedData = newData.map(d => ({
            ...d,
            Timestamp: d.Timestamp * 1000, // Here, we keep the Timestamp as a Date object
          }));

          // Add data to the corresponding timestamp object
          mappedData.forEach(item => {
            // Check if an object for the timestamp already exists in the data array
            let timestampObject = data.find(datum => datum.timestamp === item.Timestamp);
  
            if (timestampObject) {
              // Add the new device data to the existing timestamp object
              timestampObject[deviceId] = item.PressureDef;
            } else {
              // Create a new object for the timestamp and add the device data
              data.push({
                timestamp: item.Timestamp,
                [deviceId]: item.PressureDef
              });
            }
          });
        }
  
        nextToken = deviceData.data.listMetComDeviceDefsByDeviceIDSortedTimestamp.nextToken;
      } while (nextToken);
    } catch (error) {
      console.error(`Error fetching device data for ID ${deviceId}`, error);
    }
  };
  */
  const fetchData = async (deviceId) => {
    try {
      let nextToken = null;
      let fetchedData = [];
  
      do {
        const deviceData = await API.graphql(graphqlOperation(listMetComDeviceDefsByDeviceIDSortedTimestamp, { 
          DeviceID: deviceId, 
          nextToken: nextToken,
        }));
  
        if (deviceData.data) {
          const newData = deviceData.data.listMetComDeviceDefsByDeviceIDSortedTimestamp.items.map(item => ({
            deviceId: deviceId,
            timestamp: item.Timestamp * 1000,
            [deviceId]: item.PressureDef // the key of the pressuredef value is now the device id
          }));
          console.log(newData);
  
          fetchedData = [...fetchedData, ...newData];
        }
  
        nextToken = deviceData.data.listMetComDeviceDefsByDeviceIDSortedTimestamp.nextToken;
      } while (nextToken);
  
      setData(prevData => {
        // Merge the fetched data with the existing data and sort by timestamp
        const updatedData = [...prevData, ...fetchedData].sort((a, b) => a.timestamp - b.timestamp);
        return updatedData;
      });
  
    } catch (error) {
      console.error(`Error fetching device data for ID ${deviceId}`, error);
    }
  };
  
  useEffect(() => {
    fetchAllDeviceIDs();
  }, []); 

  const formatXAxis = (tickItem) => {
    // Assume that the tickItem is a timestamp in seconds
    // If it is in milliseconds, you do not need to multiply by 1000
    const date = new Date(tickItem * 1000);
  
    // Return date in YYYY/MM/DD format
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hours = date.getHours().toString().padStart(2, '0');

    return `${month}/${day} ${hours}h`;
  };    

  return (
    <div>
      <h2>Barometer's Delta</h2>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis domain={[-200, 200]} />
          <Tooltip labelFormatter={(label) => formatDate(new Date(label))} />
          <Legend />
          {
            deviceIDs.map((deviceId, i) => (
              <Line key={deviceId} type="monotone" dataKey={deviceId} stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} activeDot={{ r: 8 }} name={`Device ${deviceId}`} />

              //<Line key={deviceId} type="monotone" dataKey={datum => datum.deviceId === deviceId ? datum[deviceId] : null} stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} activeDot={{ r: 8 }} name={`Device ${deviceId}`} />
            ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  
};

export default DeviceDefs
