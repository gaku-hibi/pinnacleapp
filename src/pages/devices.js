import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMetcomDevices, updateMetcomDevices, deleteMetcomDevices } from '../graphql/mutations';
import { listMetcomDevices } from '../graphql/queries';

function Devices() {
    const [devices, setDevices] = useState([]);
    const [checkUseEffect, setCheckUseEffect] = useState(false)
    const formState = {DeviceID: "", Name: "", 
                        AppID: "Metcom_Kccs_jp.co.free.kccs.plh_PLH_Eval",
                        Latitude: "", Longitude: "",  
                        Accuracy: 0.01, 
                        Calibration: false}
  
    useEffect(() => {
      console.log("useEffect実行");
      fetchDevices();
    },[checkUseEffect]);
  
    async function fetchDevices(){
      const apiData = await API.graphql(graphqlOperation(listMetcomDevices))
      console.log(apiData);
      setDevices(apiData.data.listMetcomDevices.items);
    }
  
    async function createDevice(device) {
      console.log("createDevice関数実行");
      console.log(device);
      await API.graphql(graphqlOperation(createMetcomDevices, {input: device}));
      reloadDeviceList();
    }
  
    async function updateDevice(deviceId, name, latitude, longitude, calibration) {
      console.log("updateDevice関数実行");
      await API.graphql(graphqlOperation(updateMetcomDevices, {
          input: {
            DeviceID: deviceId,
            Name: name,
            Latitude: latitude,
            Longitude: longitude,
            Calibration: calibration
          }
      }));
      reloadDeviceList();
    }
  
    async function deleteDevice(deviceId){
      console.log("deleteDevice関数開始");
      await API.graphql(graphqlOperation(deleteMetcomDevices, {
        input: {
          DeviceID: deviceId
        }
      }))
      reloadDeviceList();
    }
  
    function reloadDeviceList(){
      setCheckUseEffect(!checkUseEffect);
    }
  
    function updateFormState(key, value){
      formState[key] = value;
    }
  
    return (
      <div className="Devices">
        <header className="Devices-header">
          <h2>Device登録</h2>
          <input placeholder="DeviceID" onChange={e => updateFormState("DeviceID", e.target.value)} />
          <input placeholder="Name" onChange={e => updateFormState("Name", e.target.value)} />
          <input placeholder="AppID" type="hidden" onChange={e => updateFormState("AppID", e.target.value)} defaultValue={formState.AppID} />
          <input placeholder="Latitude" type="number" onChange={e => updateFormState("Latitude", e.target.value)} />
          <input placeholder="Longitude" type="number" onChange={e => updateFormState("Longitude", e.target.value)} />
          <input placeholder="Accuracy" type="hidden" onChange={e => updateFormState("Accuracy", e.target.value)} defaultValue={formState.Accuracy} />
          <input placeholder="Calibration" type="checkbox" onChange={e => updateFormState("Calibration", e.target.checked)} defaultValue={formState.Calibration} />
          <button onClick={() => createDevice(formState)}>Device作成</button>
          <h2>Device一覧</h2>
          <div style={{marginBottom: 30}}>
          {
            devices.map(device => {
              const input_id = device.DeviceID + "id";
              const input_name_id = device.DeviceID + "name";
              const input_latitude_id = device.DeviceID + "latitude";
              const input_longitude_id = device.DeviceID + "longitude";
              const input_calibration_id = device.DeviceID + "calibration";
              return (
                <div key={device.DeviceID}>
                {
                  <div>
                    <input id={input_id} type="text" defaultValue={device.DeviceID} readOnly/>
                    <input id={input_name_id} type="text" defaultValue={device.Name} />
                    <input id={input_latitude_id} type="number" defaultValue={device.Latitude} />
                    <input id={input_longitude_id} type="number" defaultValue={device.Longitude} />
                    <input id={input_calibration_id} type="checkbox" defaultChecked={device.Calibration} />
                    <button type="button" onClick={() => updateDevice(device.DeviceID, document.getElementById(input_name_id).value, document.getElementById(input_latitude_id).value, document.getElementById(input_longitude_id).value, document.getElementById(input_calibration_id).checked)}>更新</button>
                    <button type="button" onClick={() => deleteDevice(device.DeviceID)}>削除</button>
                  </div>
                }
                </div>
              )
            })
          }
          </div>
        </header>
      </div>
    );
}


export default Devices;