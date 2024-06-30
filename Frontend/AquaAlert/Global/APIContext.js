import React, { createContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Define the provider component
const AppProvider = ({ children }) => {
  const [email, setemail] = useState('');

  return (
    <AppContext.Provider value={{ email, setemail }}>
      {children}
    </AppContext.Provider>
  );
};


export { AppContext, AppProvider };