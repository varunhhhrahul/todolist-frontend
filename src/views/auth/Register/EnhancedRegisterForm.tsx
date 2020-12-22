import { FormikValues, withFormik } from 'formik';
import { connect } from 'react-redux';
import { register } from '../../../slices/authSlice';
import { RegisterForm } from './RegisterForm';
import * as Yup from 'yup';

//constants
import {
  EMAIL_INVALID_ERROR,
  EMAIL_NOT_LONG_ERROR,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_SHORT_ERROR,
  CONFIRM_PASSWORD_REQUIRED,
  NAME_REQUIRED,
  PASSWORDS_MATCH_ERROR,
} from '../../../constants/messages/formMessages';
import { AppThunk } from '../../../store';
interface IDispatchProps {
  register: (formData: any) => AppThunk;
}
interface EnhancedRegisterFormProps {
  register: (formData: any) => void;
}
export interface EnhancedRegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EnhancedRegistrationForm = withFormik<
  EnhancedRegisterFormProps,
  EnhancedRegisterFormValues
>({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required!'),
    lastName: Yup.string().required('Last name is required!'),
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ERROR)
      .max(255)
      .email(EMAIL_INVALID_ERROR)
      .required(EMAIL_REQUIRED),

    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_SHORT_ERROR),

    confirmPassword: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .min(6, PASSWORD_SHORT_ERROR)
      .oneOf([Yup.ref('password')], PASSWORDS_MATCH_ERROR),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { register } = props;
    register({
      name: values.firstName + ' ' + values.lastName,
      ...values,
    });
    // console.log(values);

    setSubmitting(false);
  },
  displayName: 'RegisterForm',
})(RegisterForm);

export default connect<null, IDispatchProps>(null, { register })(
  EnhancedRegistrationForm
);
