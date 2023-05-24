/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMetcom3DLocations = /* GraphQL */ `
  query GetMetcom3DLocations($id: ID!) {
    getMetcom3DLocations(id: $id) {
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
export const listMetcom3DLocations = /* GraphQL */ `
  query ListMetcom3DLocations(
    $filter: ModelMetcom3DLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetcom3DLocations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getMetcomAmbients = /* GraphQL */ `
  query GetMetcomAmbients($id: ID!) {
    getMetcomAmbients(id: $id) {
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
export const listMetcomAmbients = /* GraphQL */ `
  query ListMetcomAmbients(
    $filter: ModelMetcomAmbientsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetcomAmbients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        DeviceID
        ChannelID
        ReadKey
        WriteKey
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMetcomDevices = /* GraphQL */ `
  query GetMetcomDevices($DeviceID: String!) {
    getMetcomDevices(DeviceID: $DeviceID) {
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
export const listMetcomDevices = /* GraphQL */ `
  query ListMetcomDevices(
    $DeviceID: String
    $filter: ModelMetcomDevicesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMetcomDevices(
      DeviceID: $DeviceID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getMetcomDeviceDefs = /* GraphQL */ `
  query GetMetcomDeviceDefs($id: ID!) {
    getMetcomDeviceDefs(id: $id) {
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
export const listMetcomDeviceDefs = /* GraphQL */ `
  query ListMetcomDeviceDefs(
    $filter: ModelMetcomDeviceDefsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetcomDeviceDefs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listMetCom3DLocationsByDeviceIDSortedTimestamp = /* GraphQL */ `
  query ListMetCom3DLocationsByDeviceIDSortedTimestamp(
    $DeviceID: String!
    $Timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMetcom3DLocationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetCom3DLocationsByDeviceIDSortedTimestamp(
      DeviceID: $DeviceID
      Timestamp: $Timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listMetComDeviceDefsByDeviceIDSortedTimestamp = /* GraphQL */ `
  query ListMetComDeviceDefsByDeviceIDSortedTimestamp(
    $DeviceID: String!
    $Timestamp: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMetcomDeviceDefsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMetComDeviceDefsByDeviceIDSortedTimestamp(
      DeviceID: $DeviceID
      Timestamp: $Timestamp
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
