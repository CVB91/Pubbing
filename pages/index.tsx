// import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDebounce } from "use-debounce";
import Layout from "src/components/layout";
import Map from "src/components/map";
import HouseList from "src/components/houseList";
import { useLastData } from "src/utils/useLastData";
import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery, HousesQueryVariables } from "src/generated/HousesQuery";


// Define a GraphQL query for fetching house data with the given bounds
const HOUSES_QUERY = gql`
  query HousesQuery($bounds: BoundsInput!) {
    houses(bounds: $bounds) {
      id
      latitude
      longitude
      address
      publicId
      bedrooms
    }
  }
`;

// Define a type for the bounds array used in the parseBounds function
type BoundsArray = [[number, number], [number, number]];

// Parse the bounds string to an object with the latitude and longitude coordinates
const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

// Export the Home component
export default function Home() {
  // Define state for the bounds data using useLocalState from the 'use-local-storage-state' package
  const [dataBounds, setDataBounds] = useLocalState<string>(
    "bounds",
    "[[0,0],[0,0]]"
  );

  // Use the useDebounce hook from the 'use-debounce' package to debounce the dataBounds state
  const [debouncedDataBounds] = useDebounce(dataBounds, 200);

  // Use the useQuery hook from Apollo Client to fetch house data with the given bounds
  const { data, error } = useQuery<HousesQuery, HousesQueryVariables>(
    HOUSES_QUERY,
    { variables: { bounds: parseBounds(debouncedDataBounds) } }
  );

  // Use the useLastData custom hook to keep track of the last fetched data
  const lastData = useLastData(data);

  // If there's an error, show an error message
  if (error) return <Layout main={<div>Error Loading Houses...</div>} />;

  // Log the last fetched data
  console.log(lastData);

  // Return the main content of the Home component
  return (
    <Layout
      main={
        <div className="flex">
          <div
            className="w-1/2 pb-4"
            style={{ maxHeight: "calc(100vh - 64px)", overflowX: "scroll" }}
          >
            <HouseList houses={lastData ? lastData.houses : []} />
          </div>
          <div className="w-1/2">
            <Map setDataBounds={setDataBounds} houses={lastData ? lastData.houses : []} />
          </div>
        </div>
      }
    />
  );
}
