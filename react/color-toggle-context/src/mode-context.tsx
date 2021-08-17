import * as React from "react";
import {
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  useContext,
} from "react";
import { useFetchGeoLocation } from "./use-fetch-location";

type State = boolean;

const NightModeContext = createContext<
  | { setNightMode: Dispatch<SetStateAction<boolean>>, nightMode: State }
  | undefined
>(undefined);



function NightModeProvider({ children }) {
  const { findLocation } = useFetchGeoLocation();
  const [nightMode, setNightMode] = useState(false);

  if (!findLocation) return <p>Fetching location...</p>;

  const { sunrise, sunset } = findLocation;
  const now = JSON.stringify(new Date());

  if (now > JSON.stringify(sunset)) setNightMode(true);

  const value = { nightMode, setNightMode };

  return (
    <NightModeContext.Provider value={value}>
      {children}
    </NightModeContext.Provider>
  );
}

function useMode() {
  const context = useContext(NightModeContext);

  console.log(context)
  if (context === undefined) {
    throw new Error("useMode must be used within a NightModeProvider");
  }
  return context;
}

export { NightModeProvider, useMode };
