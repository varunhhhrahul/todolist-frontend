import { FormikValues, withFormik } from 'formik';
import { connect } from 'react-redux';
import { login } from '../../../slices/authSlice';
import { LoginForm } from './LoginForm';
import * as Yup from 'yup';

//constants
import {
  PASSWORD_REQUIRED,
  PASSWORD_SHORT_ERROR,
} from '../../../constants/messages/formMessages';

interface EnhancedLoginFormProps {}

const EnhancedLoginForm = withFormik<EnhancedLoginFormProps, FormikValues>({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: Yup.object().shape({
    text: Yup.string().required('Email or username required!'),

    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_SHORT_ERROR),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // const { login } = props;

    const formData = {
      email: values.email,
      password: values.password,
    };

    // login(formData);

    console.log(values);
    setSubmitting(false);
  },
  displayName: 'LoginForm',
})(LoginForm);

export default connect(null, { login })(EnhancedLoginForm);
