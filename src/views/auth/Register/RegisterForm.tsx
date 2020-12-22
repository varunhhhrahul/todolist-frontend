import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EnhancedRegisterFormValues } from './EnhancedRegisterForm';
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

const styles = (theme: any) => ({
  multilineColor: {
    color: 'white',
  },
});

const useStyles = makeStyles(styles);

interface RegisterFormProps {}

export const RegisterForm: React.FC<
  RegisterFormProps & FormikProps<EnhancedRegisterFormValues>
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

  const [view2, setView2] = useState(false);

  return (
    <>
      <div style={{ textAlign: 'center', color: 'white', marginBottom: 12 }}>
        <h2>Sign Up</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl
            style={{
              // marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
          >
            <TextField
              color='secondary'
              variant='outlined'
              label='First Name*'
              placeholder='First Name*'
              InputProps={{
                className: classes.multilineColor,
              }}
              name='firstName'
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(errors.firstName && touched.firstName) || false}
              helperText={
                errors.firstName && touched.firstName && errors.firstName
              }
            />
          </FormControl>
          <FormControl
            style={{
              marginLeft: '0.5rem',
              // marginRight: '0.5rem'
            }}
          >
            <TextField
              color='secondary'
              variant='outlined'
              label='Last Name*'
              placeholder='Last Name*'
              InputProps={{
                className: classes.multilineColor,
              }}
              name='lastName'
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(errors.lastName && touched.lastName) || false}
              helperText={
                errors.lastName && touched.lastName && errors.lastName
              }
            />
          </FormControl>
        </div>
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
            label='Confirm Password*'
            placeholder='Confirm Password*'
            name='confirmPassword'
            type={view2 ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.confirmPassword && touched.confirmPassword) || false}
            helperText={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
            InputProps={{
              className: classes.multilineColor,
              endAdornment: (
                <InputAdornment position='end'>
                  {!view2 ? (
                    <VisibilityIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setView2(!view2)}
                    />
                  ) : (
                    <VisibilityOffIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => setView2(!view2)}
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
          Get Started
        </Button>
      </form>
    </>
  );
};
