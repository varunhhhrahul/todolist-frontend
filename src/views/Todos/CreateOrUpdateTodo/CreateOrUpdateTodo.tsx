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
import { getTodo } from '../../../slices/todoSlice';
import { Button } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface CreateOrUpdateTodoProps {}

export const CreateOrUpdateTodo: React.FC<CreateOrUpdateTodoProps> = ({}) => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  useEffect(() => {
    dispatch(getTodo(params.id));
  }, []);
  const {
    todo: { todo, loading },
  } = useSelector((state: RootStateOrAny) => {
    return {
      todo: state.todo,
    };
  }, shallowEqual);
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
      </FormContainer>
    </>
  );
};
