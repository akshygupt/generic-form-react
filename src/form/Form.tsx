import * as React from "react";
import isEmpty from "lodash/isEmpty";
import FromsProvider, { useFromContext } from "./FormContext";
import { FormReducerConstants } from "./FormReducer";

export interface FormValues {
  [field: string]: any;
}

export interface FormTouchedValues {
  [field: string]: boolean;
}

export interface FormErrorsValues {
  [field: string]: string | string[];
}

export interface FormProps<FormValues> {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void | Promise<any>;
  children: React.ReactNode;
  action?: string;
  validate?: (values: FormValues) => void | FormErrorsValues;
  className?: string;
}

const Form: React.SFC<FormProps<FormValues>> = (props) => {
  const _action = props.action || "#";
  const { FormState, dispatch } = useFromContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: FormReducerConstants.SUBMIT_ATTEMPT,
    });
    //run validation
    let errors: void | FormErrorsValues = {};
    if (props.validate && typeof props.validate === "function") {
      errors = props.validate(FormState.values);
      dispatch({
        type: FormReducerConstants.SET_ERROR,
        payload: errors,
      });
    }
    // if there are no errors
    if (isEmpty(errors)) {
      // submit
      return props.onSubmit(FormState.values);
    }
    return;
  };

  // set initial value
  React.useEffect(() => {
    if (!isEmpty(props.initialValues)) {
      dispatch({
        type: FormReducerConstants.SET_INITIAL_VALUE,
        payload: props.initialValues,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      noValidate
      action={_action}
      className={props.className}
      onSubmit={handleSubmit}
    >
      {props.children}
    </form>
  );
};

const FormWrapper: React.SFC<FormProps<FormValues>> = (props) => {
  return (
    <FromsProvider>
      <Form {...props} />
    </FromsProvider>
  );
};

export default FormWrapper;
