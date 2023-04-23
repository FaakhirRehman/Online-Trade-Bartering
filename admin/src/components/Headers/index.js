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
                <NavLink to="/admin/signup" className="nav-link">Sign Up</NavLink>
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
                <Navbar.Brand href="/">Online Trade & Bartering - Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    
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