import React, { useParam, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listMetcom3DLocations } from '../graphql/queries';

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