export const listMetcom3DLocationsSortbyTime = /* GraphQL */ `
  query ListMetcom3DLocationsSortbyTime (
    $limit: Int
    $sortDirection: ModelSortDirection
  ) {
    listMetcom3DLocations(
        limit: $limit,
        sortDirection: $sortDirection
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
            }
        }
    }
}
`;