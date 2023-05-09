import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Locations() {
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      console.log("useEffect実行")
      fetchLocations();
    },[]);
  
    async function fetchLocations(){
      const apiData = await API.graphql(graphqlOperation(listMetcom3DLocations))
      console.log(apiData);
      setLocations(apiData.data.listMetcom3DLocations.items);
    }
  
    return (
      <div className="Locations">
        <header className="Locations-header">
          <h1>MetCom Pinnacle</h1>
          <h2>Locations</h2>
          <div style={{marginBottom: 30}}>
            <Grid container spacing={2}>
            { locations.map(location => {
                <Grid item key={location.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Device ID: {location.DeviceID}
                      </Typography>
                      <Typography color="textSecondary">
                        Timestamp: {new Date(location.Timestamp * 1000).toLocaleString()}
                      </Typography>
                      <Typography color="textSecondary">
                        Pressure: {location.Pressure.toFixed(2)} Pa
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              })
            }
            </Grid>
          </div>
        </header>
      </div>
    );
}


export default Locations;