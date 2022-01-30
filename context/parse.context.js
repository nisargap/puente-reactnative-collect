import React, { createContext, useEffect } from 'react';

import {
  initialize
} from '../services/parse/auth/index';

export const ParseContext = createContext();

export const ParseContextProvider = ({ children }) => {
  useEffect(() => initialize());
  return (
    <ParseContext.Provider>
      {children}
    </ParseContext.Provider>
  );
};
