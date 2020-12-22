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
import { AppThunk } from '../../../store';

interface IDispatchProps {
  login: (formData: any) => AppThunk;
}
interface EnhancedLoginFormProps {
  login: (formDate: any) => void;
}
export interface EnhancedLoginFormValues {
  email: string;
  password: string;
}

const EnhancedLoginForm = withFormik<
  EnhancedLoginFormProps,
  EnhancedLoginFormValues
>({
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
    const { login } = props;

    login(values);

    console.log(values);
    setSubmitting(false);
  },
  displayName: 'LoginForm',
})(LoginForm);

export default connect<null, IDispatchProps>(null, { login })(
  EnhancedLoginForm
);
