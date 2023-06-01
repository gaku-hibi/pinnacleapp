import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RouterIcon from '@mui/icons-material/Router';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import Grid from '@mui/material/Unstable_Grid2';

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

        const sortedLocations = Object.values(locationsByDevice).sort((a, b) => parseInt(a.DeviceID,  16) - parseInt(b.DeviceID, 16));
        setLocations(sortedLocations);
        //TimeStampでソートする
        //const sortedLocations = Object.values(locationsByDevice).sort((a, b) => b.Timestamp - a.Timestamp);
        //setLocations(sortedLocations);
      } catch (err) {
        console.error('Error fetching locations', err);
      }
    }
  
    return (
      <div className="Locations">
        <header className="Locations-header">
          <h2>Device Locations</h2>
          <div style={{marginBottom: 30}}>
            <Grid container spacing={2}>
            { locations.map(location => (
                <Grid item key={location.id} xs={12} sm={6} md={4}>
                  <Link to={`/history/${location.DeviceID}`} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardHeader title={location.DeviceID} />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid xs={6} md={4}>
                            <ThermostatIcon /> {(location.Pressure / 100).toFixed(2)} hPa
                          </Grid>
                          <Grid xs={6} md={4}>
                            <BusinessIcon /> {location.Hat !== null && location.Hat !== undefined ? location.Hat.toFixed(1) : "-"} m
                          </Grid>
                          <Grid xs={6} md={4}>
                            <PublicIcon /> {location.Hae !== null && location.Hae !== undefined ? location.Hae.toFixed(1) : "-"} m
                          </Grid>
                          <Grid xs={6} md={4}>
                            <AccessTimeIcon /> {new Date(location.Timestamp * 1000).toLocaleString()}
                          </Grid>
                          <Grid xs={6} md={4}>
                            <PermDataSettingIcon /> {location.BarocalNeeded}
                          </Grid>
                        </Grid>
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