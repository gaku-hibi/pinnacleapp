import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { listMetComDeviceDefsByDeviceIDSortedTimestamp, listMetcomDevices } from '../graphql/queries';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


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
            timestamp: item.Timestamp * 1000,
            [deviceId]: item.PressureDef // the key of the pressuredef value is now the device id
          }));
  
          fetchedData = [...fetchedData, ...newData];
        }
  
        nextToken = deviceData.data.listMetComDeviceDefsByDeviceIDSortedTimestamp.nextToken;
      } while (nextToken);
  
      setData(prevData => {
        let updatedData = [...prevData];
  
        fetchedData.forEach(fetchedDatum => {
          let existingDatum = updatedData.find(datum => datum.timestamp === fetchedDatum.timestamp);
  
          if (existingDatum) {
            existingDatum[deviceId] = fetchedDatum[deviceId];
          } else {
            updatedData.push(fetchedDatum);
          }
        });
  
        return updatedData.sort((a, b) => a.timestamp - b.timestamp);
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
    const date = new Date(tickItem);
  
    // Return date in YYYY/MM/DD format
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const hours = date.getHours().toString().padStart(2, '0');

    return `${month}/${day} ${hours}h`;
  };    

  //Oldest,Newestの日時と気圧差(PressureDef)を取得する
  function getOldestAndNewestPressure(data, deviceId) {
    if (data.length === 0) {
      return {};
    }
    
    // Sort data by timestamp
    const sortedData = data.sort((a, b) => a.timestamp - b.timestamp);
    
    const oldestPressure = sortedData[0][deviceId];
    const newestPressure = sortedData[sortedData.length - 1][deviceId];
  
    const oldestTimestamp = sortedData[0].timestamp;
    const newestTimestamp = sortedData[sortedData.length - 1].timestamp;

    const deltaPressure = newestPressure - oldestPressure;
  
    return {
      oldestPressure,
      newestPressure,
      oldestTimestamp,
      newestTimestamp,
      deltaPressure,
    };
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Barometer Aging</h2>
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
          {
            deviceIDs.map((deviceId, i) => (
              <Line key={deviceId} type="linear" dataKey={deviceId} stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} activeDot={{ r: 8 }} name={`Device ${deviceId}`} />

              //<Line key={deviceId} type="monotone" dataKey={datum => datum.deviceId === deviceId ? datum[deviceId] : null} stroke={`#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`} activeDot={{ r: 8 }} name={`Device ${deviceId}`} />
            ))
          }
        </LineChart>
      </ResponsiveContainer>

      <h3>Device Data</h3>
      <div style={{ width: '90%' }}>
        <TableContainer component={Paper}>
          <Table aria-label="device data table">
            <TableHead>
              <TableRow>
                <TableCell>Device ID</TableCell>
                <TableCell>Oldest Date</TableCell>
                <TableCell>⊿P from ave(Pa)</TableCell>
                <TableCell>Newest Date</TableCell>
                <TableCell>⊿P from ave(Pa)</TableCell>
                <TableCell>⊿Aging(Pa)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deviceIDs.map((deviceId) => {
                const deviceData = data.filter((item) => item[deviceId]);
                const { oldestPressure, newestPressure, oldestTimestamp, newestTimestamp, deltaPressure } = getOldestAndNewestPressure(deviceData, deviceId);
                
                return (
                  <TableRow key={deviceId}>
                    <TableCell component="th" scope="row">{deviceId}</TableCell>
                    <TableCell>{oldestTimestamp ? formatDate(new Date(oldestTimestamp)) : 'N/A'}</TableCell>
                    <TableCell>{oldestPressure ? oldestPressure.toFixed(2) : 'N/A'}</TableCell>
                    <TableCell>{newestTimestamp ? formatDate(new Date(newestTimestamp)) : 'N/A'}</TableCell>
                    <TableCell>{newestPressure ? newestPressure.toFixed(2) : 'N/A'}</TableCell>
                    <TableCell>{deltaPressure ? deltaPressure.toFixed(2) : 'N/A'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
  
};

export default DeviceDefs
