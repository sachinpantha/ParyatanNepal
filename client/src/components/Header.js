import React from 'react'
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import Logo from '../../src/logo.png'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (


    <header>
      <Navbar bg="danger" variant="dark" expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Image className='headLogo' src={Logo}></Image>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              {/* For Bootstrap 5 use ms-auto instead of ml-auto */}
              <LinkContainer to="/connect" >
                <Nav.Link >


                  <i className='fas fa-user'></i>{" "}Connections

                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fa-solid fa-right-to-bracket'></i>{" "}Sign In
                  </Nav.Link>
                </LinkContainer>
              )}


            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  )
}

export default Header