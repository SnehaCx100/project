import React from "react";
import { Button, Form } from "react-bootstrap";
import SignInImage from "./signInImage";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import "../App.css";

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    age: "",
    password: "",
    email: "",
    gender: "male",
};

const Home = () => {
    const history = useNavigate();
    const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
        useFormik({
            initialValues: initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values) => {
                console.log(values);
                axios
                    .post(`https://api.social.ramkrishnan.xyz/register`, {
                        ...values,
                    })
                    .then((result) => {
                        if (result) {
                            alert("Registered Successfully");
                        }
                    })
                    .catch((error) => alert(error.response.data.statusMessage));

                history("/login");
            },
        });

    return (
        <>
            <div className="container ">
                <h3 className="text-center">Signup</h3>
                <section className="card">
                    <div className="d-flex justify-content-between">
                        <div className="col-lg-6">
                            <Form className="card-body" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3 " controlId="formBasicFirst">
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter First Name"
                                    />
                                    {errors.firstName && touched ? (
                                        <p className="form-error">{errors.firstName}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicLast">
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Last Name"
                                    />
                                    {errors.lastName && touched ? (
                                        <p className="form-error">{errors.lastName}</p>
                                    ) : null}
                                </Form.Group>

                                <Form.Group className="mb-3 " controlId="formBasicNumber">
                                    <Form.Control
                                        type="tel"
                                        name="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Number"
                                    />
                                    {errors.phoneNumber && touched ? (
                                        <p className="form-error">{errors.phoneNumber}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicdob">
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={values.dob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.dob && touched ? (
                                        <p className="form-error">{errors.dob}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicGender">
                                    <Form.Control
                                        as="select"
                                        custom
                                        value={values.gender}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        defaultValue="male"
                                        name="gender"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                    {errors.gender && touched ? (
                                        <p className="form-error">{errors.gender}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicAge">
                                    <Form.Control
                                        type="number"
                                        name="age"
                                        min="18"
                                        value={values.age}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Your Age"
                                    />
                                    {errors.age && touched ? (
                                        <p className="form-error">{errors.age}</p>
                                    ) : null}
                                </Form.Group>

                                <Form.Group className="mb-3 " controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && touched ? (
                                        <p className="form-error">{errors.email}</p>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched ? (
                                        <p className="form-error">{errors.password}</p>
                                    ) : null}{" "}
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                                <p className="mt-5">
                                    Already Have an Account{" "}
                                    <span>
                                        <NavLink to="/login">Sign In</NavLink>
                                    </span>
                                </p>
                            </Form>
                        </div>
                        <div className="col-lg-6">
                            <SignInImage />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;
