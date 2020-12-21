import { withFormik } from 'formik';
import { connect, RootStateOrAny } from 'react-redux';
import { createTodo, updateTodo } from '../../../slices/todoSlice';
import { CreateOrUpdateTodoForm } from './CreateOrUpdateTodoForm';
import * as Yup from 'yup';

//constants
import {
  PASSWORD_REQUIRED,
  PASSWORD_SHORT_ERROR,
} from '../../../constants/messages/formMessages';

const EnhancedCreateOrUpdateTodoForm = withFormik({
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

const mapStateToProps = (state: RootStateOrAny) => ({
  todo: state.todo,
});

export default connect(null, { createTodo, updateTodo })(
  EnhancedCreateOrUpdateTodoForm
);
