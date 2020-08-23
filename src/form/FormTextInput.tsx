import * as React from "react";
import { useFromContext } from "./FormContext";
import { FormReducerConstants } from "./FormReducer";

export interface FormTextInputProps {
  name: string;
  id?: string;
  placeholder?: string;
  validate?: (values: any) => void | string;
  className?: string;
}

const FormTextInput: React.SFC<FormTextInputProps> = (props) => {
  const {validate, ...rest} = props;
  const { FormState, dispatch } = useFromContext();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormReducerConstants.SET_VALUE,
      payload: {
        name: props.name,
        value: e.target.value,
      },
    });
  };

  const fields = {
    value: FormState.values[props.name] || ""
  }

  const validateField = () => {
    if(props.validate && typeof props.validate === "function") {
      const errors = {
        ...FormState.errors,
        [props.name]: props.validate(FormState.values[props.name])
      }
      dispatch({
        type: FormReducerConstants.SET_ERROR,
        payload: errors
      })
    }
  };

  React.useEffect(() => {
    // if a submit attempt has been made, then run the field
    // level validations
    if(FormState.submitAttempt) {
      validateField();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FormState.submitAttempt])

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FormReducerConstants.SET_TOUCHED,
      payload: {
        name: props.name,
        touched: true
      }
    })
    validateField();
  };

  return (
    <input
      {...rest}
      onChange={handleChange}
      onBlur={handleBlur}
      type="text"
      {...fields}
    />
  );
};

export default FormTextInput;
