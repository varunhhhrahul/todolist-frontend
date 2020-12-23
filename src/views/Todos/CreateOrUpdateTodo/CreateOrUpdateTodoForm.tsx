import {
  FormControl,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { FormikProps } from 'formik';
import React from 'react';
import {
  RootStateOrAny,
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteTodo, updateTodo } from '../../../slices/todoSlice';
import { EnhancedCreateOrUpdateTodoFormValues } from './EnhancedCreateOrUpdateTodoForm';
import DoneAllIcon from '@material-ui/icons/DoneAll';
interface CreateOrUpdateTodoFormProps {}

export const CreateOrUpdateTodoForm: React.FC<
  CreateOrUpdateTodoFormProps &
    FormikProps<EnhancedCreateOrUpdateTodoFormValues>
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
    todo: { loading, todo },
  } = useSelector((state: RootStateOrAny) => {
    return {
      todo: state.todo,
    };
  }, shallowEqual);
  const history = useHistory();
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <>
      <div style={{ paddingTop: '0.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <FormControl
              style={{
                width: width > 600 ? '70%' : '60%',
                marginRight: '0.2rem',
              }}
            >
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {!values.isCompleted ? (
                        <></>
                      ) : (
                        <DoneAllIcon style={{ color: 'green' }} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant='contained'
              onClick={() =>
                dispatch(
                  updateTodo(
                    todo._id,
                    {
                      ...todo,
                      isCompleted: !values.isCompleted,
                      dateOfCompletion: Date.now(),
                    },
                    history
                  )
                )
              }
              // disabled={todo.isCompleted}
            >
              {values.isCompleted ? 'Pending' : 'Complete'}
            </Button>
          </div>
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
          <div>
            <Button
              style={{
                backgroundColor: '#48BAF8',
                color: 'white',
                marginTop: '1rem',
                marginLeft: '0.5rem',
              }}
              variant='contained'
              type='submit'
              onClick={() =>
                dispatch(
                  updateTodo(
                    todo._id,
                    {
                      ...values,
                    },
                    history
                  )
                )
              }
            >
              {loading ? 'Loading...' : 'Save'}
            </Button>
            <Button
              style={{
                // backgroundColor: '#48BAF8',
                // color: 'white',
                marginTop: '1rem',
                marginLeft: '0.5rem',
              }}
              variant='contained'
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: 'tomato',
                color: 'white',
                marginTop: '1rem',
                marginLeft: '0.5rem',
              }}
              variant='contained'
              onClick={() => {
                dispatch(deleteTodo(todo._id));
                history.goBack();
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
