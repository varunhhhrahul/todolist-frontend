import React, { useEffect } from 'react';
import {
  shallowEqual,
  useDispatch,
  useSelector,
  RootStateOrAny,
} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FormContainer } from '../../../components/FormContainer';
import Loader from '../../../components/Loader/Loader';
import { getTodo, setTodo } from '../../../slices/todoSlice';
import { Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EnhancedCreateOrUpdateTodoForm from './EnhancedCreateOrUpdateTodoForm';

interface CreateOrUpdateTodoProps {}

export const CreateOrUpdateTodo: React.FC<CreateOrUpdateTodoProps> = ({}) => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const history = useHistory();
  useEffect(() => {
    dispatch(setTodo(null));
    dispatch(getTodo(id));
  }, []);

  const {
    todo: { todo, loading, createTodo, updatedTodo, deletedTodo },
  } = useSelector((state: RootStateOrAny) => {
    return {
      todo: state.todo,
    };
  }, shallowEqual);
  useEffect(() => {
    dispatch(setTodo(null));
    dispatch(getTodo(id));
  }, [id, createTodo, updatedTodo, deletedTodo]);
  if (todo === null || loading) return <Loader />;
  return (
    <>
      <FormContainer>
        <Button
          startIcon={<ChevronLeftIcon />}
          style={{ alignSelf: 'flex-start' }}
          onClick={() => history.goBack()}
        >
          {' '}
          Back to tasks
        </Button>
        <EnhancedCreateOrUpdateTodoForm history={history} todo={todo} />
      </FormContainer>
    </>
  );
};
