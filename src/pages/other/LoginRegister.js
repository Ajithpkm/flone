import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { saveRegister, userLogin, getPhoneCodeDetails } from "../../redux/actions/SignUp";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const LoginRegister = () => {
  const pathname = window.location.pathname;
  const dispatch = useDispatch();
  const saveRegisterResponse = useSelector((state) => state.signUp?.saveRegister);
  const loginDetails = useSelector((state) => state.signUp?.loginDetails);
  const phoneCodeDetails = useSelector((state) => state.signUp?.phoneCodeDetails);
  const [register, setRegister] = useState({ first_name: '', last_name: '', password: '', email: '', phonecode: "", phone: null });
  const [login, setLogin] = useState({ password: '', email: '' });
  const [screen, setScreen] = useState('login');


  useEffect(() => {
    if (saveRegisterResponse) setScreen('login');
  }, [saveRegisterResponse]);

  useEffect(() => {
    if (screen) dispatch(getPhoneCodeDetails());
  }, [screen]);

  useEffect(() => {
    if (loginDetails) localStorage.setItem('currentLoggedInUser', JSON.stringify({ id: loginDetails.user?.id, First_Name: loginDetails.user?.first_name, token: loginDetails?.authorisation?.token }))
  }, [loginDetails]);

  const registerHandleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }

  const loginHandleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const registerFormSubmitter = (e) => {
    e.preventDefault();
    const payload = {
      "first_name": register.first_name,
      "last_name": register.last_name,
      "phonecode": register.phonecode,
      "phone": register.phone,
      "email": register.email,
      "password": register.password
    };
    dispatch(saveRegister(payload));
  }

  const loginFormSubmitter = (e) => {
    e.preventDefault();
    const payload = {
      "email": login.email,
      "password": login.password
    };
    dispatch(userLogin(payload));
  }

  const handleSelect = (e) => {
    setScreen(e);
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container activeKey={screen} onSelect={handleSelect}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey='login'>
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={loginFormSubmitter}>
                              <input
                                type="text"
                                name="email"
                                placeholder="Username"
                                value={login.email}
                                onChange={loginHandleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={login.password}
                                onChange={loginHandleChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane> :
                      <Tab.Pane eventKey='register'>
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={registerFormSubmitter}>
                              <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={register.first_name}
                                onChange={registerHandleChange}
                              />
                              <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={register.last_name}
                                onChange={registerHandleChange}
                              />
                              <select placeholder="Phone Code" name='phonecode' value={register.phonecode} onChange={registerHandleChange}>
                                {
                                  phoneCodeDetails && phoneCodeDetails?.records?.length > 0 && phoneCodeDetails?.records?.map((v, i) => {
                                    return <option value={v.code}>{v.name}</option>
                                  })
                                }
                              </select>
                              <input
                                type="text"
                                placeholder="Phone Number"
                                name="phone"
                                value={register.phone}
                                onChange={registerHandleChange}
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={register.password}
                                onChange={registerHandleChange}
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={register.email}
                                onChange={registerHandleChange}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  addToCart: PropTypes.func,
};

export default LoginRegister;
