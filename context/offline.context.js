import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

import { getData, storeData } from '../modules/async-storage';
import { populateCache, residentQuery } from '../modules/cached-resources';
import { UserContext } from './auth.context';

export const OfflineContext = createContext();

export const OfflineContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [residents, setResidents] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.id && user.isOnline === true) {
      fetchOnlineResidentData();
      populateCache(user);
    }
  }, [user]);

  const fetchOnlineResidentData = async () => {
    setIsLoading(true);
    const queryParams = {
      skip: 0,
      offset: 0,
      limit: 2000,
      parseColumn: 'surveyingOrganization',
      parseParam: user.organization,
    };

    const records = residentQuery(queryParams);
    storeData(records, 'residentData');
    setResidents(records);
    setIsLoading(false);
    return records;
  };

  const fetchOfflineResidentData = () => getData('residentData').then(async (data) => {
    const residentData = data || [];
    let offlineData = [];
    const offlineResidentData = await getData('offlineIDForms');
    if (offlineResidentData !== null) {
      Object.entries(offlineResidentData).forEach(([, valueOne]) => {
        offlineData = offlineData.concat(valueOne.localObject);
      });
    }
    const allData = residentData.concat(offlineData);
    setResidents(allData.slice());
    return allData.slice() || [];
  });

  return (
    <OfflineContext.Provider
      value={{
        residents,
        isLoading,
        residentOfflineData: fetchOfflineResidentData,
        residentOnlineData: fetchOnlineResidentData,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};
