import React, { ReactElement, useEffect, useState } from "react";

interface locationInterface {
  lat: number;
  long: number;
}

export const LocationContext = React.createContext<locationInterface>({
  lat: 0,
  long: 0,
});

function LocationContextProvider(props: {children: ReactElement}) {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        console.log('Lat', position.coords.latitude)
        console.log('Lon', position.coords.longitude)
      });
    }
  });

  let values: locationInterface = {
    lat,
    long,
  };
  return <LocationContext.Provider value={values}>{props.children}</LocationContext.Provider>;
}

export default LocationContextProvider;
