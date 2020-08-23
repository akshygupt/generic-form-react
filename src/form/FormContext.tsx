import * as React from "react";
import FromReducer, { IFormState, initialFormState } from "./FormReducer";

export interface IFromContext {
  FormState: IFormState;
  dispatch: React.Dispatch<any>;
}

const initialFrom: IFromContext = {
  FormState: initialFormState,
  dispatch: () => {}
};

export const FromContext = React.createContext<IFromContext>(initialFrom);

export const useFromContext = () => React.useContext(FromContext);

export interface FromsProviderProps {}

const FromsProvider: React.SFC<FromsProviderProps> = (props) => {
  const [FormState, dispatch] = React.useReducer(FromReducer, initialFormState);
  return (
    <FromContext.Provider value={{ FormState, dispatch }}>
      {props.children}
    </FromContext.Provider>
  );
};

export default FromsProvider;
