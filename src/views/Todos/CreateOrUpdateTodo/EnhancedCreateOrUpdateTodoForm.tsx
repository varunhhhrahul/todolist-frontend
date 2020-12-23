import { FormikValues, withFormik } from 'formik';
import { connect, RootStateOrAny } from 'react-redux';
import { createTodo, updateTodo } from '../../../slices/todoSlice';
import { CreateOrUpdateTodoForm } from './CreateOrUpdateTodoForm';
import * as Yup from 'yup';

//constants
import {
  PASSWORD_REQUIRED,
  PASSWORD_SHORT_ERROR,
} from '../../../constants/messages/formMessages';
import { AppThunk } from '../../../store';
interface IDispatchProps {
  createTodo: (formData: any) => AppThunk;
  updateTodo: (id: string, formData: any, history: any) => AppThunk;
}

export interface EnhancedCreateOrUpdateTodoFormValues {
  task: string | undefined;
  description: string | undefined;
  isEvent: boolean | undefined;
  isCompleted: boolean | undefined;
  isImportant: boolean | undefined;
  dateOfCompletion: Date | null | undefined;
  dateOfEvent: Date | null | undefined;
}

interface EnhancedCreateOrUpdateTodoFormProps {
  todo?: {
    task?: string | undefined;
    description?: string | undefined;
    isEvent?: boolean | undefined;
    isCompleted?: boolean | undefined;
    isImportant?: boolean | undefined;
    dateOfCompletion?: Date | null | undefined;
    dateOfEvent?: Date | null | undefined;
  };
  createTodo?: (formData: any) => void;
  updateTodo?: (id: string, formData: any, history: any) => void;
  history?: any;
}

const EnhancedCreateOrUpdateTodoForm = withFormik<
  EnhancedCreateOrUpdateTodoFormProps,
  EnhancedCreateOrUpdateTodoFormValues
>({
  mapPropsToValues: (props) => ({
    task: props.todo ? props.todo.task : '',
    description: props.todo ? props.todo.description : '',
    isEvent: props.todo ? props.todo.isEvent : false,
    isCompleted: props.todo ? props.todo.isCompleted : false,
    isImportant: props.todo ? props.todo.isImportant : false,
    dateOfEvent: props.todo ? props.todo.dateOfEvent : null,
    dateOfCompletion: props.todo ? props.todo.dateOfCompletion : null,
  }),
  validationSchema: Yup.object().shape({
    task: Yup.string()
      .required('Task is required!')
      .max(30, 'Task cannot be more than 30 characters!'),
    description: Yup.string()
      .required('Todo description is required!')
      .max(300, 'Task cannot be more than 300 characters!'),
    isEvent: Yup.boolean().notRequired(),
    isCompleted: Yup.boolean().notRequired(),
    dateOfEvent: Yup.date().notRequired(),
    dateOfCompletion: Yup.date().notRequired(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { todo, createTodo, updateTodo } = props;

    // if (todo) {
    //   updateTodo(values);
    // } else {
    //   createTodo(values);
    // }

    // login(formData);

    console.log(values);
    setSubmitting(false);
  },
  displayName: 'CreateOrUpdateTodoForm',
})(CreateOrUpdateTodoForm);

export default connect<null, IDispatchProps>(null, {
  createTodo,
  updateTodo,
})(EnhancedCreateOrUpdateTodoForm);
