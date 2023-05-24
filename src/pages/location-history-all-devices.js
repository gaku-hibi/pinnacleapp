import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { listMetCom3DLocationsByDeviceIDSortedTimestamp, listMetcomDevices } from '../graphql/queries';

const AllDevicesHATGraph = () => {
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

  const fetchData = async (deviceId) => {
    try {
      let nextToken = null;
      let fetchedData = [];
  
      do {
        const deviceData = await API.graphql(graphqlOperation(listMetCom3DLocationsByDeviceIDSortedTimestamp, { 
          DeviceID: deviceId, 
          nextToken: nextToken,
        }));
  
        if (deviceData.data) {
          const newData = deviceData.data.listMetCom3DLocationsByDeviceIDSortedTimestamp.items.map(item => ({
            deviceId: deviceId,
            timestamp: item.Timestamp,
            [deviceId]: item.Hat // the key of the hat value is now the device id
          }));
  
          fetchedData = [...fetchedData, ...newData];
        }
  
        nextToken = deviceData.data.listMetCom3DLocationsByDeviceIDSortedTimestamp.nextToken;
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
  
  return (
    <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
      <YAxis />
      <Tooltip />
      <Legend />
      {
        deviceIDs.map((deviceId, i) => (
          <Line key={deviceId} type="monotone" dataKey={datum => datum.deviceId === deviceId ? datum[deviceId] : null} stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} activeDot={{ r: 8 }} name={`Device ${deviceId}`} />
        ))
      }
    </LineChart>
  );
  
};

export default AllDevicesHATGraph
