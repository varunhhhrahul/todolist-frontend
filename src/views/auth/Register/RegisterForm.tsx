import { FormikProps } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { EnhancedRegisterFormValues } from './EnhancedRegisterForm';
interface RegisterFormProps {}

export const RegisterForm: React.FC<
  RegisterFormProps & FormikProps<EnhancedRegisterFormValues>
> = (props) => {
  const dispatch = useDispatch();
  const debug = false;
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  return (
    <>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: 12 }}>
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit}></form>
    </>
  );
};
