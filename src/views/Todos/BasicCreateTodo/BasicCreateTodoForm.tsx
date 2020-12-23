import { FormControl, TextField, Button } from '@material-ui/core';
import { FormikProps } from 'formik';
import React from 'react';
import {
  RootStateOrAny,
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux';
import { EnhancedBasicCreateTodoFormValues } from './EnhancedBasicCreateTodoForm';
interface BasicCreateTodoFormProps {}

export const BasicCreateTodoForm: React.FC<
  BasicCreateTodoFormProps & FormikProps<EnhancedBasicCreateTodoFormValues>
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
  const {
    todo: { loading },
  } = useSelector((state: RootStateOrAny) => {
    return {
      todo: state.todo,
    };
  }, shallowEqual);
  return (
    <>
      <div style={{ paddingTop: '0.5rem' }}>
        <h1>TO-DO:</h1>

        <form onSubmit={handleSubmit}>
          <FormControl style={{ width: '100%' }}>
            <TextField
              color='secondary'
              variant='standard'
              label='Task'
              placeholder='Task'
              name='task'
              value={values.task}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(errors.task && touched.task) || false}
              helperText={errors.task && touched.task && errors.task}
            />
          </FormControl>
          <FormControl style={{ width: '100%' }}>
            <TextField
              color='secondary'
              variant='standard'
              label='Description'
              placeholder='Please add a task description'
              name='description'
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={(errors.description && touched.description) || false}
              helperText={
                errors.description && touched.description && errors.description
              }
              multiline
            />
          </FormControl>

          <Button
            style={{
              backgroundColor: '#48BAF8',
              color: 'white',
              marginTop: '1rem',
            }}
            variant='contained'
            type='submit'
          >
            {loading ? 'Loading...' : 'Add new Todo'}
          </Button>
        </form>
      </div>
    </>
  );
};
