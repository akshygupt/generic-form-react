import * as React from "react";
import { Form, FormTextInput, FormErrorMessage } from "../form";
import { FormValues } from "../form/Form";
import "../form/form.css";
import "./example.css";

export interface ExampleProps {}

const Example: React.SFC<ExampleProps> = (props) => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  return (
    <div className="app">
      <h1>Sign Up</h1>
      <Form
        initialValues={initialValues}
        onSubmit={async (values) => {
          console.log("values", values);
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        className="form"
        validate={(values) => {
          const errors: any = {};
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
      >
        <div className="field-group">
          <label className="label" htmlFor="firstName">First Name</label>
          <FormTextInput
            id="firstName"
            name="firstName"
            placeholder="First Name"
            className="field"
          />
          <FormErrorMessage name="firstName" />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="lastName">Last Name</label>
          <FormTextInput
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            className="field"
            validate={(value) => {
              let errors: string = "";
              if (!value) {
                errors = "Required";
              }
              return errors;
            }}
          />
          <FormErrorMessage name="lastName" />
        </div>
        <div className="field-group">
          <label className="label" htmlFor="email">Email</label>
          <FormTextInput
            id="email"
            name="email"
            placeholder="abc@example.com"
            className="field"
            type="email"
          />
          <FormErrorMessage name="email" />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Example;
