import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

import * as Yup from "yup";
import { useFormik } from "formik";



import { loginUser } from "../../store/actions";

import profile from "assets/images/logosp.png";

const Login = props => {

  document.title = "Login | SpectraSphere";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "admin@example.com" || '',
      password: "123456" || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    }
  });

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

 


  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container >
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }} >
                <div style={{backgroundColor: '#C9B7D2' }}>
                  <Row>
                    
                    <Col xs={7}>
                      <div className="text-primary p-4 mb-5">
                        <h5  style={{color:'#0A0B24', fontSize:'25px'}}>Welcome Back !</h5>
                        <p style={{color:'#0A0B24', fontSize:'15px'}}>Sign in to continue </p>
                      </div> 
                    </Col>
{/*                     
                    <Link to="/">
                        <span className="avatar-title-register rounded-circle ">
                          <img
                            src={profile}
                            alt=""
                            className="rounded-circle"
                            height="150"
                        
                            
                          />
                        </span>
                  </Link> */}
                  <Col className="col-5 align-self-end">
                      <img src={profile}  height="150" style={{marginBottom:'15px'}}/>
                    </Col>
                  </Row>
                  
                </div>
                
                
                <CardBody className="pt-0" style={{ height: '300px', marginTop:'50px' }} >
                  
                  <div className="p-2" >
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="dark">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check " >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline" 
                          
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                          
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn  btn-block"
                          type="submit"
                          style={{backgroundColor: '#C9B7D2' , color:'#0A0B24'}}
                        >
                          Log In
                        </button>
                      </div>

                      

                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium " style={{color:'#8F6FA0', fontSize:'15px'}}>
                    {" "}
                    SignUp now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Created 
                  <i className="mdi mdi-heart text-danger" /> by Andrea, Dayron, Mateo & Andrés
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
