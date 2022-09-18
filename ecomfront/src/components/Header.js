import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";

import { logout } from "../redux/actions/userActions";
import { CartIcon } from "./CartIcon";
import SearchBar from './SearchBar';

function Header() {

  const userLogin = useSelector((state) => state.userLogin)
  // console.log("userlogin", userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="head">
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              ReactCOM
            </Link>
          </Navbar.Brand>{" "}
          {/*root reference*/}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              { userInfo && userInfo.username ? (
                <NavDropdown title={userInfo.username} id="username" >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item >
                      <div className="btn-group d-flex">
                        <Button variant='outline-warning'>
                          PROFILE
                        </Button>
                      </div>
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    <div className="btn-group d-flex">
                        <Button variant='outline-danger'>
                          LOGOUT <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </Button>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="outline-success">
                  <Link to={'/login'} style={{ textDecoration: "none", color: "white" }}>
                    <i className="fas fa-user"></i> LOGIN
                  </Link>
                </Button>
              )}

              { userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
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
              <SearchBar />
              <Button variant="outline-info" style={{ position: "absolute", right: "50px" }}>
                <Link
                  to={"/cart"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <CartIcon />
                </Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
