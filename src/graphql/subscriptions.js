/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMetcom3DLocations = /* GraphQL */ `
  subscription OnCreateMetcom3DLocations(
    $filter: ModelSubscriptionMetcom3DLocationsFilterInput
  ) {
    onCreateMetcom3DLocations(filter: $filter) {
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
export const onUpdateMetcom3DLocations = /* GraphQL */ `
  subscription OnUpdateMetcom3DLocations(
    $filter: ModelSubscriptionMetcom3DLocationsFilterInput
  ) {
    onUpdateMetcom3DLocations(filter: $filter) {
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
export const onDeleteMetcom3DLocations = /* GraphQL */ `
  subscription OnDeleteMetcom3DLocations(
    $filter: ModelSubscriptionMetcom3DLocationsFilterInput
  ) {
    onDeleteMetcom3DLocations(filter: $filter) {
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
export const onCreateMetcomAmbients = /* GraphQL */ `
  subscription OnCreateMetcomAmbients(
    $filter: ModelSubscriptionMetcomAmbientsFilterInput
  ) {
    onCreateMetcomAmbients(filter: $filter) {
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
export const onUpdateMetcomAmbients = /* GraphQL */ `
  subscription OnUpdateMetcomAmbients(
    $filter: ModelSubscriptionMetcomAmbientsFilterInput
  ) {
    onUpdateMetcomAmbients(filter: $filter) {
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
export const onDeleteMetcomAmbients = /* GraphQL */ `
  subscription OnDeleteMetcomAmbients(
    $filter: ModelSubscriptionMetcomAmbientsFilterInput
  ) {
    onDeleteMetcomAmbients(filter: $filter) {
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
export const onCreateMetcomDevices = /* GraphQL */ `
  subscription OnCreateMetcomDevices(
    $filter: ModelSubscriptionMetcomDevicesFilterInput
  ) {
    onCreateMetcomDevices(filter: $filter) {
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
export const onUpdateMetcomDevices = /* GraphQL */ `
  subscription OnUpdateMetcomDevices(
    $filter: ModelSubscriptionMetcomDevicesFilterInput
  ) {
    onUpdateMetcomDevices(filter: $filter) {
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
export const onDeleteMetcomDevices = /* GraphQL */ `
  subscription OnDeleteMetcomDevices(
    $filter: ModelSubscriptionMetcomDevicesFilterInput
  ) {
    onDeleteMetcomDevices(filter: $filter) {
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
