import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { EnhancedLoginFormValues } from './EnhancedLoginForm';
import {
  FormControl,
  makeStyles,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { CheckFormikValues } from '../../../components/Formik/CheckFormikValues';

const styles = (theme: any) => ({
  multilineColor: {
    color: 'white',
  },
});

const useStyles = makeStyles(styles);

interface LoginFormProps {}

export const LoginForm: React.FC<
  LoginFormProps & FormikProps<EnhancedLoginFormValues>
> = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const debug = false;
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = props;
  const [view, setView] = useState(false);
  const {
    auth: { loading },
  } = useSelector((state: RootStateOrAny) => {
    return {
      auth: state.auth,
    };
  });

  return (
    <>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: 12 }}>
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{
            // marginLeft: '0.5rem',
            // marginRight: '0.5rem',
            width: '100%',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <TextField
            color='secondary'
            variant='outlined'
            label='Email*'
            placeholder='Email*'
            InputProps={{
              className: classes.multilineColor,
            }}
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.email && touched.email) || false}
            helperText={errors.email && touched.email && errors.email}
          />
        </FormControl>
        <FormControl
          style={{
            // marginLeft: '0.5rem',
            // marginRight: '0.5rem',
            // marginTop: '1rem',
            marginBottom: '1rem',
            width: '100%',
          }}
        >
          <TextField
            color='secondary'
            variant='outlined'
            label='Password*'
            placeholder='Password*'
            name='password'
            type={view ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.password && touched.password) || false}
            helperText={errors.password && touched.password && errors.password}
            InputProps={{
              className: classes.multilineColor,
              endAdornment: (
                <InputAdornment position='end'>
                  {!view ? (
                    <VisibilityIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setView(!view)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setView(!view)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <Button
          fullWidth
          style={{ color: 'white', fontSize: 20 }}
          type='submit'
          color='secondary'
          variant='contained'
        >
          {loading ? 'Loading...' : 'Login'}
        </Button>

        {debug ? <CheckFormikValues {...props} /> : ''}
      </form>
    </>
  );
};
