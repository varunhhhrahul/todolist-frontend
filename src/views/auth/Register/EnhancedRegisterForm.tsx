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

interface EnhancedRegisterFormProps {}

const EnhancedRegistrationForm = withFormik<
  EnhancedRegisterFormProps,
  FormikValues
>({
  mapPropsToValues: () => ({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // role: 'user',
    address: '',
    image: '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(NAME_REQUIRED),
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ERROR)
      .max(255)
      .email(EMAIL_INVALID_ERROR)
      .required(EMAIL_REQUIRED),
    username: Yup.string().required(),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_SHORT_ERROR),
    address: Yup.string()
      .required('Address is required!')
      .min(10, 'Address is too short'),
    confirmPassword: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .min(6, PASSWORD_SHORT_ERROR)
      .oneOf([Yup.ref('password')], PASSWORDS_MATCH_ERROR),
    image: Yup.string().notRequired(),
    // role: Yup.string().required(ROLE_REQUIRED),
    // publicKey: Yup.string().required(PUBLIC_KEY_REQUIRED),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    // register(values);
    // console.log(values);

    setSubmitting(false);
  },
  displayName: 'RegisterForm',
})(RegisterForm);

export default connect(null, { register })(EnhancedRegistrationForm);
