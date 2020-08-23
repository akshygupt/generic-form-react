import * as React from "react";
import { useFromContext } from "./FormContext";

export interface FormErrorMessageProps {
  name: string;
}

const FormErrorMessage: React.SFC<FormErrorMessageProps> = (props) => {
  const { FormState } = useFromContext();
  if (FormState.touched[props.name] && FormState.errors[props.name]) {
    return <div className="error">{FormState.errors[props.name]}</div>;
  }
  return null;
};

export default FormErrorMessage;
