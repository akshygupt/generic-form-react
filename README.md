## Demo
[Demo](https://akshygupt.github.io/generic-form-react/)

## Form API

Basic Form Api

- initialValues - (Required)    - Provide initial values for the form element in the form of object schema
- className     - (Optional)    - Provide css classname
- onSubmit      - (Required)    - handles form submit, form values are provided as arguments
- validate      - (Optional)    - Form level validation, return errors as FormErrorValues, runs on form submit

## FormTextInput API

-  name         - (Required)    - Name of the field 
-  id           - (Optional)    - Id of the field
-  placeholder  - (Optional)    - Placeholder for the input
-  validate     - (Optional)    - Field level validations, runs on form submit and with onBlur event of the field
-  className     - (Optional)    - Provide css classname


The Form Api takes the initialValue of the form and populates the fields with their correponding values.

The onSubmit function gets access to all the values populated in the form.

Form level validate function gets access to all the values and excutest the validation function, which returns an error object
in the form of `[name]: errorString`, where each errorString refers to the error in the field designated by the name key.

Each FormTextInput takes a attribute called `name` which keeps track of all values related to the field. It also has a `validate` function which run with `onBlur` event or on Form submission.


## useFormContext

This is the heart of the system which keep tracks of four main variables, `values`, `errors`, `touched`, `submitAttempt`.
The context contains all the values, errors, submit attempts made by the users and which fields have been interacted with. 
Because we are using a context, we can share it across many components and pass it to the user and build custom 
components. It won't matter what type of component that is being used, custom or native, all of the data will kept in a single reducer and can be accessed anywhere.

- values - Object containing all the values of the fields as `[name]: value`, updated on every onChange event of the field
- errors - Object containing all the erros of the fields as `[name]: errorString`, gets update whenever a validation event is fired
- touched - Object containing information on which fields have been interacted with as `[name]: true|false`, gets updated on every onBlur event, we use this value to decide when to show the error to the user. We don't show the error to the user as he is typing as most user usually write correct values and it would be very annoying to show the error even as the user is interacting with the said field, so, touched value allows us to show the error after the user has interacted with it.
- submitAttempt - Keeps track of how many times a submission attempt has been made, it allows us to execute field level validations on form submit

Keeping values and errors of a field separate allows for simpler interactions as we are only updating one field at a time.
