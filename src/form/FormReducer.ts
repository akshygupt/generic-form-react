import { FormValues, FormTouchedValues } from "./Form";

export enum FormReducerConstants {
  SET_VALUE = "SET_VALUE",
  SET_TOUCHED = "SET_TOUCHED",
  SET_ERROR = "SET_ERROR",
  SUBMIT_ATTEMPT = "SUBMIT_ATTEMPT",
  SET_INITIAL_VALUE = "SET_INITIAL_VALUE",
}

export interface IFormState {
  values: FormValues;
  errors: any;
  touched: FormTouchedValues;
  submitAttempt: number;
}

export const initialFormState: IFormState = {
  values: {},
  errors: {},
  touched: {},
  submitAttempt: 0,
};

const setTouchedValue = (values: FormValues, status: boolean) => {
  const touched: FormTouchedValues = {};
  for (let key of Object.keys(values)) {
    touched[key] = status;
  }
  return touched;
};

export default (state: IFormState, action: any) => {
  switch (action.type) {
    case FormReducerConstants.SET_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };
    case FormReducerConstants.SET_INITIAL_VALUE:
      return {
        ...state,
        values: action.payload,
      };
    case FormReducerConstants.SUBMIT_ATTEMPT:
      return {
        ...state,
        touched: setTouchedValue(state.values, true),
        submitAttempt: state.submitAttempt + 1,
      };
    case FormReducerConstants.SET_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.name]: action.payload.touched,
        },
      };
    case FormReducerConstants.SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
