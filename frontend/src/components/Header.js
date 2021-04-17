import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
import "../css/Header.css";

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' className = "navb" variant='dark' expand='lg' collapseOnSelect>
        <div className="container-fluid navdiv">
          <LinkContainer to='/'>
            <Navbar.Brand>Interact&Learn</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            
            <Nav className='ml-auto'>
              <LinkContainer className="mx-2" to='/Conference'>
                    <Nav.Link><i className='fas fa-lightbulb'></i> Doubt Solving</Nav.Link>
              </LinkContainer>
              <LinkContainer className="mx-2" to='/video'>
                    <Nav.Link><i className='fas fa-video'></i> Tutorial Recording</Nav.Link>
              </LinkContainer>
              <LinkContainer className="mx-2" to='/cart'>
                <Nav.Link>
                  <i className='fas fa fa-square-o'></i> Tutorials
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown className="mx-2 " title={userInfo.name} id='username'>
                  
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer className="mx-2 " to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown className="mx-2" title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isCreator && (
                <NavDropdown title='Creator' id='adminmenu'>
                  <LinkContainer to='/cc'>
                    <NavDropdown.Item>Course Creator</NavDropdown.Item>
                  </LinkContainer>
        
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  )
}

export default Header
