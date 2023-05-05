import * as Yup from 'yup';
export const validationSchema = Yup.object({
    email: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .email('Invalid email address')
      .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
   })