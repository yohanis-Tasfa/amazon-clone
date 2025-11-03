import React, { createContext, useReducer } from "react";

const defaultState = { basket: [] }; // adjust to match your initialState shape
export const DataContext = createContext([defaultState, () => {}]);

export const DataProvider = ({ children, reducer, initialState }) => {
  const value = useReducer(reducer, initialState);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
