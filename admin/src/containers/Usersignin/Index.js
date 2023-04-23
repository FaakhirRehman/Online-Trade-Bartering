import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layouts';
import Input from '../../components/UI/Inputs/Index';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

/**
* @author
* @function Usersignin
**/

export const Usersignin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {

    e.preventDefault();

    const user = {
      email, password
    }

    dispatch(login(user));
  }

  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="container-fluid text-center" style={{ padding: '3rem' }}>
        <h1>User Login</h1>
      </div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="E-mail Address"
                placeholder="E-mail Address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button variant="primary" type="submit">
                Login
              </Button>

              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Form.Text className="text-muted">
                  Don't have an account? Sign Up Here
                </Form.Text>
                <Link to="/admin/signup">
                  <Button variant="secondary" type="" to="/admin/signup">
                    Sign Up
                  </Button>
                </Link>
              </div>



            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Usersignin;