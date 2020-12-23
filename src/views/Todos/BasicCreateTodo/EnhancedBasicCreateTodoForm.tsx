import { FormikValues, withFormik } from 'formik';
import { connect, RootStateOrAny } from 'react-redux';
import { createTodo, updateTodo } from '../../../slices/todoSlice';
import { BasicCreateTodoForm } from './BasicCreateTodoForm';
import * as Yup from 'yup';

//constants
import {
  PASSWORD_REQUIRED,
  PASSWORD_SHORT_ERROR,
} from '../../../constants/messages/formMessages';
import { AppThunk } from '../../../store';

interface IDispatchProps {
  createTodo: (formData: any) => AppThunk;
}
interface EnhancedBasicCreateTodoFormProps {
  createTodo: (formData: any) => void;
}

export interface EnhancedBasicCreateTodoFormValues {
  task: string;
  description: string;
}

const EnhancedBasicCreateTodoForm = withFormik<
  EnhancedBasicCreateTodoFormProps,
  EnhancedBasicCreateTodoFormValues
>({
  mapPropsToValues: (props) => ({
    task: '',
    description: '',
  }),
  validationSchema: Yup.object().shape({
    task: Yup.string()
      .required('Task is required!')
      .max(30, 'Task cannot be more than 30 characters!'),
    description: Yup.string()
      .required('Todo description is required!')
      .max(300, 'Task cannot be more than 300 characters!'),
    // isEvent: Yup.boolean().notRequired(),
    // isCompleted: Yup.boolean().notRequired(),
    // dateOfEvent: Yup.date().notRequired(),
    // dateOfCompletion: Yup.date().notRequired(),
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    const { createTodo } = props;

    // if (todo) {
    //   updateTodo(values);
    // } else {
    createTodo(values);
    // }

    // login(formData);

    console.log(values);
    setSubmitting(false);
    resetForm();
  },
  displayName: 'BasicCreateTodoForm',
})(BasicCreateTodoForm);

export default connect<null, IDispatchProps>(null, { createTodo })(
  EnhancedBasicCreateTodoForm
);
