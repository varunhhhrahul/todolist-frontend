import React, { useEffect } from 'react';
import {
  RootStateOrAny,
  shallowEqual,
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Button,
  IconButton,
} from '@material-ui/core';
import { FormContainer } from '../../components/FormContainer';
import Loader from '../../components/Loader/Loader';
import { getAllTodos, updateTodo, deleteTodo } from '../../slices/todoSlice';
import EnhancedBasicCreateTodoForm from './BasicCreateTodo/EnhancedBasicCreateTodoForm';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory } from 'react-router-dom';
interface TodosProps {}

export const Todos: React.FC<TodosProps> = ({}) => {
  const {
    todo: { createdTodo, updatedTodo, deletedTodo, todos },
  } = useSelector((state: RootStateOrAny) => {
    return {
      todo: state.todo,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllTodos());
  }, []);
  useEffect(() => {
    dispatch(getAllTodos());
  }, [createdTodo, updatedTodo, deletedTodo]);
  if (todos === null) return <Loader />;
  return (
    <>
      <FormContainer marginTop={20}>
        <EnhancedBasicCreateTodoForm />
      </FormContainer>
      <FormContainer marginTop={-65} color='#F4F4F4'>
        <List style={{ height: 300, overflow: 'scroll' }}>
          {todos.map((todo: any) => {
            return (
              <Paper
                key={todo._id}
                style={{
                  padding: '0.5rem',
                  backgroundColor: todo.isCompleted ? '#C8E7F7' : 'white',
                  marginBottom: '0.5rem',
                }}
              >
                <ListItem style={{ width: '100%' }}>
                  <ListItemText
                    primary={
                      <span
                        style={{
                          textDecoration: todo.isCompleted
                            ? 'line-through'
                            : '',
                        }}
                      >
                        {todo.task}
                      </span>
                    }

                    // secondary={todo.description.slice(0, 100) + '...'}
                  />
                  <ListItemSecondaryAction
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Button
                      variant='contained'
                      onClick={() =>
                        dispatch(
                          updateTodo(
                            todo._id,
                            {
                              ...todo,
                              isCompleted: true,
                              dateOfCompletion: Date.now(),
                            },
                            history
                          )
                        )
                      }
                      disabled={todo.isCompleted}
                    >
                      {' '}
                      Complete
                    </Button>
                    <IconButton onClick={() => dispatch(deleteTodo(todo._id))}>
                      <ClearIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      </FormContainer>
    </>
  );
};
