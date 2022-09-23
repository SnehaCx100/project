import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SignInImage from "./signInImage";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dob: '',
        age: '',
        password: '',
        email: '',
        gender: 'male'
    })
    console.log(inputValue)
    const GetData = (e) => {
        // console.log(e.target.value)

        const { value, name } = e.target;
        setInputValue(() => {
            return {
                ...inputValue,
                [name]: value
            }
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        const { firstName, lastName, phoneNumber, dob, age, password, email, gender } = inputValue
        if (firstName === '') {
            alert('First name is Required')
        }
        else if (lastName === '') {
            alert("Last Name is Required")
        }
        else if (email === '') {
            alert('Email is required')
        }
        else if (!email.includes('@')) {
            alert('Invalid Mail')
        }
        else if (phoneNumber === '') {
            alert('PhoneNumber is required')
        }
        else if (dob === '') {
            alert('DOB is required')
        }
        else if (password === '') {
            alert('Password is required')
        }
        else if (password.length < 8) {
            alert('Password should be at least 8 characters long')
        }
        else if (age === '') {
            alert('Age is required')
        }
        else if (gender === '') {
            alert('Gender is required')
        }
        else {
            axios.post(`https://api.social.ramkrishnan.xyz/register`, {
                ...inputValue
            })
                .then(result =>
                    console.log(result)
                )
                .catch(error => {
                    console.log(error)
                    alert(error.response.data.statusMessage)
                }

                )
            localStorage.setItem('UserDetails', JSON.stringify([...data, inputValue]))
            history('/login')


        }
    }

    return (
        <>
            <div className="container ">
                <h3 className="text-center">Signup</h3>

                <section className="card">
                    <div className="d-flex justify-content-between">
                        <div className="col-lg-6">

                            <Form className="card-body ">
                                <Form.Group className="mb-3 " controlId="formBasicFirst">
                                    <Form.Control type="text" name="firstName" onChange={GetData} placeholder="Enter First Name" />
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicLast">
                                    <Form.Control type="text" name="lastName" onChange={GetData} placeholder="Enter Last Name" />
                                </Form.Group>

                                <Form.Group className="mb-3 " controlId="formBasicNumber">
                                    <Form.Control type="tel" name="phoneNumber" onChange={GetData} placeholder="Enter Number" />
                                </Form.Group>
                                <Form.Group className="mb-3 " onChange={GetData} controlId="formBasicdob">
                                    <Form.Control type="date" name="dob" />
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicGender">
                                    <Form.Control as="select" custom onChange={GetData} defaultValue="male" name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3 " onChange={GetData} controlId="formBasicAge">
                                    <Form.Control type="number" name="age" min="18" placeholder="Enter Your Age" />
                                </Form.Group>

                                <Form.Group className="mb-3 " controlId="formBasicEmail">
                                    <Form.Control type="email" name="email" onChange={GetData} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3 " controlId="formBasicPassword">
                                    <Form.Control type="password" name="password" placeholder="Password" onChange={GetData} />
                                </Form.Group>
                                <Button variant="success" type="submit" onClick={submitData}>
                                    Submit
                                </Button>
                                <p className="mt-5">Already Have an Account <span><NavLink to="/login">Sign In</NavLink></span></p>
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
