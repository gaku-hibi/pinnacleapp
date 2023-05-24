/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMetcom3DLocations = /* GraphQL */ `
  mutation CreateMetcom3DLocations(
    $input: CreateMetcom3DLocationsInput!
    $condition: ModelMetcom3DLocationsConditionInput
  ) {
    createMetcom3DLocations(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureMin
      PressureMax
      Latitude
      Longitude
      LocationAccuracy
      Hae
      HaeAccuracy
      Hat
      HatAccuracy
      BarocalNeeded
      createdAt
      updatedAt
    }
  }
`;
export const updateMetcom3DLocations = /* GraphQL */ `
  mutation UpdateMetcom3DLocations(
    $input: UpdateMetcom3DLocationsInput!
    $condition: ModelMetcom3DLocationsConditionInput
  ) {
    updateMetcom3DLocations(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureMin
      PressureMax
      Latitude
      Longitude
      LocationAccuracy
      Hae
      HaeAccuracy
      Hat
      HatAccuracy
      BarocalNeeded
      createdAt
      updatedAt
    }
  }
`;
export const deleteMetcom3DLocations = /* GraphQL */ `
  mutation DeleteMetcom3DLocations(
    $input: DeleteMetcom3DLocationsInput!
    $condition: ModelMetcom3DLocationsConditionInput
  ) {
    deleteMetcom3DLocations(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureMin
      PressureMax
      Latitude
      Longitude
      LocationAccuracy
      Hae
      HaeAccuracy
      Hat
      HatAccuracy
      BarocalNeeded
      createdAt
      updatedAt
    }
  }
`;
export const createMetcomAmbients = /* GraphQL */ `
  mutation CreateMetcomAmbients(
    $input: CreateMetcomAmbientsInput!
    $condition: ModelMetcomAmbientsConditionInput
  ) {
    createMetcomAmbients(input: $input, condition: $condition) {
      id
      DeviceID
      ChannelID
      ReadKey
      WriteKey
      createdAt
      updatedAt
    }
  }
`;
export const updateMetcomAmbients = /* GraphQL */ `
  mutation UpdateMetcomAmbients(
    $input: UpdateMetcomAmbientsInput!
    $condition: ModelMetcomAmbientsConditionInput
  ) {
    updateMetcomAmbients(input: $input, condition: $condition) {
      id
      DeviceID
      ChannelID
      ReadKey
      WriteKey
      createdAt
      updatedAt
    }
  }
`;
export const deleteMetcomAmbients = /* GraphQL */ `
  mutation DeleteMetcomAmbients(
    $input: DeleteMetcomAmbientsInput!
    $condition: ModelMetcomAmbientsConditionInput
  ) {
    deleteMetcomAmbients(input: $input, condition: $condition) {
      id
      DeviceID
      ChannelID
      ReadKey
      WriteKey
      createdAt
      updatedAt
    }
  }
`;
export const createMetcomDevices = /* GraphQL */ `
  mutation CreateMetcomDevices(
    $input: CreateMetcomDevicesInput!
    $condition: ModelMetcomDevicesConditionInput
  ) {
    createMetcomDevices(input: $input, condition: $condition) {
      DeviceID
      Name
      AppID
      Latitude
      Longitude
      Accuracy
      Calibration
      createdAt
      updatedAt
    }
  }
`;
export const updateMetcomDevices = /* GraphQL */ `
  mutation UpdateMetcomDevices(
    $input: UpdateMetcomDevicesInput!
    $condition: ModelMetcomDevicesConditionInput
  ) {
    updateMetcomDevices(input: $input, condition: $condition) {
      DeviceID
      Name
      AppID
      Latitude
      Longitude
      Accuracy
      Calibration
      createdAt
      updatedAt
    }
  }
`;
export const deleteMetcomDevices = /* GraphQL */ `
  mutation DeleteMetcomDevices(
    $input: DeleteMetcomDevicesInput!
    $condition: ModelMetcomDevicesConditionInput
  ) {
    deleteMetcomDevices(input: $input, condition: $condition) {
      DeviceID
      Name
      AppID
      Latitude
      Longitude
      Accuracy
      Calibration
      createdAt
      updatedAt
    }
  }
`;
export const createMetcomDeviceDefs = /* GraphQL */ `
  mutation CreateMetcomDeviceDefs(
    $input: CreateMetcomDeviceDefsInput!
    $condition: ModelMetcomDeviceDefsConditionInput
  ) {
    createMetcomDeviceDefs(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureAve
      PressureDef
      Hae
      HaeAccuracy
      HaeAve
      HaeDef
      Hat
      HatAccuracy
      HatAve
      HatDef
      createdAt
      updatedAt
    }
  }
`;
export const updateMetcomDeviceDefs = /* GraphQL */ `
  mutation UpdateMetcomDeviceDefs(
    $input: UpdateMetcomDeviceDefsInput!
    $condition: ModelMetcomDeviceDefsConditionInput
  ) {
    updateMetcomDeviceDefs(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureAve
      PressureDef
      Hae
      HaeAccuracy
      HaeAve
      HaeDef
      Hat
      HatAccuracy
      HatAve
      HatDef
      createdAt
      updatedAt
    }
  }
`;
export const deleteMetcomDeviceDefs = /* GraphQL */ `
  mutation DeleteMetcomDeviceDefs(
    $input: DeleteMetcomDeviceDefsInput!
    $condition: ModelMetcomDeviceDefsConditionInput
  ) {
    deleteMetcomDeviceDefs(input: $input, condition: $condition) {
      id
      DeviceID
      Timestamp
      Pressure
      PressureAve
      PressureDef
      Hae
      HaeAccuracy
      HaeAve
      HaeDef
      Hat
      HatAccuracy
      HatAve
      HatDef
      createdAt
      updatedAt
    }
  }
`;
