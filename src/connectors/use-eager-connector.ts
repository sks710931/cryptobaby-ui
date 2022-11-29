/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injectedConnector } from "./injected-connector";

export function useEagerConnect() {

    
  const { activate, active } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized) => {
        
      if (isAuthorized) {
        activate(injectedConnector).catch((error) => {
            console.log("error", error);
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); 
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}
