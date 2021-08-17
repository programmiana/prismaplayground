import * as React from "react";
import { FC, useState, useEffect } from "react";

type FetchLocationProps = {
  timeout?: number;
  maximumAge?: number;
};

export function useFetchGeoLocation<FetchLocationProps>() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [findLocation, setFindLocation] = useState(null);


  const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0`;

  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;
    setLat(latitude);
    setLong(longitude);


    if (lat && long) setLoading(false);
  });

  useEffect(() => {
    fetch(url).then(
        res => res.ok && res.json()).then(data => [setFindLocation(data.results), setPending(false)])
    .catch(err => setError(true))
}, [lat, long])


  return {lat, long, findLocation}
};
