import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signout } from '../../actions';
import './style.css';

/**
* @author
* @function Header
**/

export const Header = (props) => {

    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    const renderNonLoggedInLinks = () => {
        return (<Nav>
            <li className='nav-item'>
                <NavLink to="/user/signin" className="nav-link">Sign In</NavLink>
            </li>
        </Nav>);
    }

    const renderLoggedInLinks = () => {
        return (<Nav>
            <li className='nav-item'>
                <span className="nav-link" onClick={logout} >Sign Out</span>
            </li>
        </Nav>);
    }

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Navbar.Brand href="/">Online Trade & Bartering</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Account" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                    {
                        auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header;