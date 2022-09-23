import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SignInImage from "./signInImage";
import axios from 'axios';
import '../App.css'
import { NavLink, useNavigate } from 'react-router-dom';
const Login = () => {
    const history = useNavigate();
    const [data, setData] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getEmail = (e) => {
        setEmail(e.target.value)
    }
    const getPassword = (e) => {
        setPassword(e.target.value)
    }
    const onDataSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://api.social.ramkrishnan.xyz/login`, {
            email,
            password
        })
            .then(result =>{
                console.log("token",result.data.response)
                alert('Successfully Logged In')
                if(result){
                    const{token} =result.data.response;
                    localStorage.setItem('token', JSON.stringify(token));
                    localStorage.getItem('token');
                    history('/dashboard')
                  
                }
              
             })
            .catch(error =>{
                console.log(error)
                alert(error.response.data.response)
            }
              
            )
           
            const userDetails = localStorage.getItem('UserDetails');

    }

    return (
        <>
            <div className='container'>
                <h3>Login Form</h3>
                <section className="card">
                    <div className='d-flex justify-content-center'>
                        <div className='col-lg-6'>
                            <Form className='card-body mt-5 ml-5 p-5'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter email" onChange={getEmail} />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Password" onChange={getPassword} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={onDataSubmit}>
                                    Submit
                                </Button>
                                <p className="ep account">Don't have an account?<NavLink to="/"> Signup Now</NavLink></p>
                            </Form>
                        </div>
                        <div className='col-lg-6'>
                            <SignInImage />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Login