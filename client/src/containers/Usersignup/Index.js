import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layouts';
import Input from '../../components/UI/Inputs/Index';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';


/**
* @author
* @function Usersignup
**/

export const Usersignup = (props) => {

  /*
  "firstName": "Faakhir",
    "lastName": "Rehman",
    "username": "User Valid",
    "email": "exampleUser@gmail.com",
    "password": "12345",
    "phoneNumber": "159753",
    "city": "Islamabad",
    "address01": "psoshfdoi",
    "postalCode": "12345"
  */
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address01, setaddress01] = useState('');
  const [address02, setaddress02] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const userSignup = (e) => {

    e.preventDefault();

    const user = {
      firstName, lastName, username, email, password,
      phoneNumber, city, address01, address02, 
      postalCode
    }

    dispatch(signup(user)); 
  }

  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  if (user.loading) {
    return <p>Loading...!</p>
  }

  return (
    <Layout>
      <div className="container-fluid text-center" style={{ padding: '3rem' }}>
        <h1>User Account Registration</h1>
      </div>
      <Container>
        { user.message }
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                </Col>

                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => { setlastName(e.target.value) }}
                  />
                </Col>
              </Row>

              <Input
                label="Username"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
              />

              <Input
                label="E-mail Address"
                placeholder="E-mail Address"
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />

              <Input
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />

              <Input
                label="Phone Number"
                placeholder="Phone Number"
                type="text"
                value={phoneNumber}
                onChange={(e) => { setPhoneNumber(e.target.value) }}
              />

              <Input
                label="City"
                placeholder="City"
                type="text"
                value={city}
                onChange={(e) => { setCity(e.target.value) }}
              />

              <Input
                label="Address 01"
                placeholder="Address 01"
                type="text"
                value={address01}
                onChange={(e) => { setaddress01(e.target.value) }}
              />

              <Input
                label="Address 02"
                placeholder="Address 02"
                type="text"
                value={address02}
                onChange={(e) => { setaddress02(e.target.value) }}
              />

              <Input
                label="Postal Code"
                placeholder="Postal Code"
                type="text"
                value={postalCode}
                onChange={(e) => { setPostalCode(e.target.value) }}
              />

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <Form.Text className="text-muted">
                Already have an account? Sign In Here
              </Form.Text>
              <Button variant="secondary" type="submit" >
                Sign In
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default Usersignup;