import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [hideModal, setHideModal] = useState(false)
  const id = localStorage.getItem('id');
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  })
  const fetchData = async () => {

    try {
      const id = localStorage.getItem('id');
      const data = axios
        .get(`https://api.social.ramkrishnan.xyz/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("airesponse", res)
          // console.log("data", res.data.response)
          // let arr = [];
          // arr.push(res.data.response);
          // setData(arr);
          // console.log(res.data);
          var user = res.data.response;
          const jsonString = JSON.stringify(user);
          localStorage.setItem("userDetails", jsonString);


          if (res) {
            setData(user);
            props.setName(user.firstName)
            // setUserName(res.data.response.firstName)
          }
        });
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = ({ }) => {
    console.log(userData)
    setHideModal(true);

    delete userData.age;
    delete userData.gender;
    delete userData.dob;
    delete userData.email;
    axios.put(`https://api.social.ramkrishnan.xyz/user/${id}`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(result =>
        console.log(result)
      )

  }
  console.log(userData)

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userDetails')))
    if (!localStorage.getItem("token")) {
      navigate("/login");

    }
    fetchData();
  }, []);
  const handleShow = () => {
    setShow(true);

  }

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <h3>Profile Details</h3>
          <div className="card-body">
            <div>
              {" "}
              {loading ? (<Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.age}</td>
                    <td>{data.gender}</td>
                    <td>{data.email}</td>
                    <td><Button variant="info" className="success" onClick={handleShow}>
                      Edit
                    </Button></td>
                  </tr>
                </tbody>
              </Table>) : <Spinner animation="border" role="status" />}
            </div>
          </div>
        </div>
      </div>
      <div >
        <Modal show={show} onHide={handleClose} className={hideModal ? 'd-none' : ''}>
          <Modal.Header closeButton>
            <Modal.Title>Update User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <Form.Group className="mb-3 " controlId="formBasicFirst">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={userData.firstName}
                  onChange={(e) => { setUserData({ ...userData, firstName: e.target.value }) }}
                />

              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicLast">
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={userData.lastName}
                  onChange={(e) => { setUserData({ ...userData, lastName: e.target.value }) }}
                />

              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicNumber">
                <Form.Control
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Number"
                  value={userData && userData.phoneNumber}
                  onChange={(e) => { setUserData({ ...userData, phoneNumber: e.target.value }) }}
                />

              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicGender">
                <Form.Control
                  as="select"
                  custom="true"
                  defaultValue="male"
                  name="gender"
                  value={userData && userData.gender}
                  disabled
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formBasicAge">
                <Form.Control
                  type="number"
                  name="age"
                  min="18"
                  placeholder="Enter Your Age"
                  value={userData && userData.age}
                  disabled
                />

              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={userData && userData.email}
                  disabled
                />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

    </>


  );
}



export default Dashboard;
