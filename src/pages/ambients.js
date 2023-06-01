import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMetcomAmbients, updateMetcomAmbients, deleteMetcomAmbients } from '../graphql/mutations';
import { listMetcomAmbients } from '../graphql/queries';

function Ambients() {
    const [ambients, setAmbients] = useState([]);
    const [checkUseEffect, setCheckUseEffect] = useState(false)
    const formState = {DeviceID: "", 
                        ChannelID: 0,
                        ReadKey: "",  
                        WriteKey: "" }
  
    useEffect(() => {
      console.log("useEffect実行");
      fetchAmbients();
    },[checkUseEffect]);
  
    async function fetchAmbients(){
      const apiData = await API.graphql(graphqlOperation(listMetcomAmbients))
      console.log(apiData);
      setAmbients(apiData.data.listMetcomAmbients.items);
    }
  
    async function createAmbient(ambient) {
      console.log("createAmbient関数実行");
      await API.graphql(graphqlOperation(createMetcomAmbients, {input: ambient}));
      reloadAmbientList();
    }
  
    async function updateAmbient(deviceId, channelId, readKey, writeKey) {
      console.log("updateAmbient関数実行");
      await API.graphql(graphqlOperation(updateMetcomAmbients, {
          input: {
            DeviceID: deviceId,
            ChannelID: channelId,
            ReadKey: readKey,
            WriteKey: writeKey
          }
      }));
      reloadAmbientList();
    }
  
    async function deleteAmbient(id){
      console.log("deleteAmbient関数開始");
      await API.graphql(graphqlOperation(deleteMetcomAmbients, {
        input: {
          id: id
        }
      }))
      reloadAmbientList();
    }
  
    function reloadAmbientList(){
      setCheckUseEffect(!checkUseEffect);
    }
  
    function updateFormState(key, value){
      formState[key] = value;
    }
  
    return (
      <div className="Ambients">
        <header className="Ambients-header">
          <h2>Ambient登録</h2>
          <input placeholder="DeviceID" onChange={e => updateFormState("DeviceID", e.target.value)} />
          <input placeholder="ChannelID" type="number" onChange={e => updateFormState("ChannelID", e.target.value)} />
          <input placeholder="ReadKey" onChange={e => updateFormState("ReadKey", e.target.value)} />
          <input placeholder="WriteKey" onChange={e => updateFormState("WriteKey", e.target.value)} />
          <button onClick={() => createAmbient(formState)}>Ambient作成</button>
          <h2>Ambient一覧</h2>
          <div style={{marginBottom: 30}}>
          {
            ambients.map(ambient => {
              const input_deviceid_id = ambient.DeviceID + "deviceId";
              const input_channelid_id = ambient.ChannelID + "channelId";
              const input_readkey_id = ambient.ReadKey + "readkey";
              const input_writekey_id = ambient.WriteKey + "writekey";
              return (
                <div key={ambient.id}>
                {
                  <div>
                    <input id={input_deviceid_id} type="text" defaultValue={ambient.DeviceID} />
                    <input id={input_channelid_id} type="number" defaultValue={ambient.ChannelID} />
                    <input id={input_readkey_id} type="text" defaultValue={ambient.ReadKey} />
                    <input id={input_writekey_id} type="text" defaultValue={ambient.WriteKey} />
                    <button type="button" onClick={() => updateAmbient(ambient.id, document.getElementById(input_deviceid_id).value, document.getElementById(input_channelid_id).value, document.getElementById(input_readkey_id).value, document.getElementById(input_writekey_id).checked)}>更新</button>
                    <button type="button" onClick={() => deleteAmbient(ambient.id)}>削除</button>
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


export default Ambients;