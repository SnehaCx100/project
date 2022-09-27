import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please Enter Your First Name"),
    lastName: Yup.string().min(2).max(25).required("Please Enter Your Last Name"),
    phoneNumber: Yup.number().required("Please Enter Your Number"),
    dob: Yup.date().required("Enter Your DOB"),
    age: Yup.number().required("Please Enter Your age"),
    password: Yup.string().min(8).required("Password should be at least 8 characters long"),
    email: Yup.string().email('Invalid Email').required("Enter Your Email"),
    gender: Yup.string().oneOf(['male', 'female'])
})