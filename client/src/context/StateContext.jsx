import {  createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./StateReducers";

export const StateContext=createContext();

export const StateProvider=({initialState,reducer,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider=()=>useContext(StateContext);