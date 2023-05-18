import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function Locations() {
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      fetchLocations();
    },[]);
  
    async function fetchLocations(){
      try {
        const apiData = await API.graphql(graphqlOperation(listMetcom3DLocations, {
          limit:1000,
          sortDirection: 'DESC'
        }));
        console.log(apiData);
        const locations = apiData.data.listMetcom3DLocations.items;

        //DeviceID毎に最新の位置データを取得する
        const locationsByDevice = {};
        for (const location of locations) {
          if (!locationsByDevice[location.DeviceID] || locationsByDevice[location.DeviceID].Timestamp < location.Timestamp) {
            locationsByDevice[location.DeviceID] = location;
          }
        }

        //TimeStampでソートする
        const sortedLocations = Object.values(locationsByDevice).sort((a, b) => b.Timestamp - a.Timestamp);
        setLocations(sortedLocations);
      } catch (err) {
        console.error('Error fetching locations', err);
      }
    }
  
    return (
      <div className="Locations">
        <header className="Locations-header">
          <h1>Pinnacle Test</h1>
          <h2>Locations</h2>
          <div style={{marginBottom: 30}}>
            <Grid container spacing={2}>
            { locations.map(location => (
                <Grid item key={location.id} xs={12} sm={6} md={4}>
                  <Link to={`/history/${location.DeviceID}`}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          Device ID: {location.DeviceID}
                        </Typography>
                        <Typography color="textSecondary">
                          Timestamp: {new Date(location.Timestamp * 1000).toLocaleString()}
                        </Typography>
                        <Typography color="textSecondary">
                          Pressure: {(location.Pressure / 100).toFixed(2)} hPa
                        </Typography>
                        <Typography color="textSecondary">
                          HAT: {location.Hat !== null && location.Hat !== undefined ? location.Hat.toFixed(1) : "-"} m
                        </Typography>
                        <Typography color="textSecondary">
                          HAE: {location.Hae !== null && location.Hae !== undefined ? location.Hae.toFixed(1) : "-"} m
                        </Typography>
                        <Typography color="textSecondary">
                          BarocalNeeded: {location.BarocalNeeded}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
            ))}
            </Grid>
          </div>
        </header>
      </div>
    );
}

export default Locations;