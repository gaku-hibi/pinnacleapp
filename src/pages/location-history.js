import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';
import { useParams } from 'react-router-dom';

function LocationHistory () {
    const { DeviceID } = useParams();

    return (
        <div>
            <h2>Device Details for ID: {DeviceID}</h2>
            {/* ここで取得した詳細情報を表示するなど */}
        </div>
    );    
}

export default LocationHistory;