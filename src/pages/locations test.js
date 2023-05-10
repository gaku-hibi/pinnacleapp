import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcomDevices } from '../graphql/queries';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Locations() {
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      console.log("useEffect実行")
      fetchLocations();
    },[]);
  
    async function fetchLocations(){
      const apiData = await API.graphql(graphqlOperation(listMetcomDevices))
      console.log(apiData);
      setLocations(apiData.data.listMetcomDevices.items);
    }
  
    return (
      <div className="Locations">
        <header className="Locations-header">
          <h1>MetCom Pinnacle</h1>
          <h2>Locations</h2>
          <div style={{marginBottom: 30}}>
            <Grid container spacing={2}>
            { locations.map(location => (
                <Grid item key={location.DeviceID} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Device ID: {location.DeviceID}
                      </Typography>
                      <Typography color="textSecondary">
                        Pressure: {location.Name} Pa
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
            </Grid>
          </div>
        </header>
      </div>
    );
}


export default Locations;