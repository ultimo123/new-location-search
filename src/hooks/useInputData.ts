import React, { useReducer } from "react";

export interface InitialStateUserInput {
  city: string;
  date: Date|undefined;
  cityOfOrigin: string;
  intermedieteCitys: string[];
  numberOfPassengers: number;
}

interface Actions {
  type: string;
  payload: any;
}

const reducer = (state: InitialStateUserInput, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case "setCity":
      return {
        ...state,
        city: payload,
      };
    case "setDate":
      return {
        ...state,
        date: payload,
      };
    case "setCityOfOrigin":
      return {
        ...state,
        cityOfOrigin: payload,
      };
    case "setIntermedieteCitys":
      return {
        ...state,
        intermedieteCitys: payload,
      };
    case "setNumberOfPassengers":
      return {
        ...state,
        numberOfPassengers: payload,
      };
    default:
      return state;
  }
};

const initialState: InitialStateUserInput = {
  city: "",
  date: undefined,
  cityOfOrigin: "",
  intermedieteCitys: [],
  numberOfPassengers: 0,
};

const useInputData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = () => {
    return {
      setCity: (payload: string) =>
        dispatch({ type: "setCity", payload: payload }),
      setDate: (payload: Date) =>
        dispatch({ type: "setDate", payload: payload }),
      setCityOfOrigin: (payload: string) =>
        dispatch({ type: "setCityOfOrigin", payload: payload }),
      setIntermedieteCitys: (payload: string[]) =>
        dispatch({ type: "setIntermedieteCitys", payload: payload }),
      setNumberOfPassengers: (payload: number) =>
        dispatch({ type: "setNumberOfPassengers", payload: payload }),
    };
  };

  return { state, actions: actions() };
};

export default useInputData;
