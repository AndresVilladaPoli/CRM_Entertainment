import React from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "store/auth/register/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import logosp from "../../assets/images/logosp.png";

const Register = props => {

  document.title = "Register";

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    }
  });

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Register.user,
    registrationError: state.Register.registrationError,
    loading: state.Register.loading,
  }));



  return (
    <React.Fragment>

      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
              <div style={{backgroundColor: '#C9B7D2' }}>
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 style={{color:'#0A0B24', fontSize:'25px'}}>Free Register</h5>
                        <p style={{color:'#0A0B24', fontSize:'15px'}}>Get your account now.</p>
                      </div>
                    </Col>

                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logosp}
                            alt=""
                            className="rounded-circle"
                            height="90"
                          />
                        </span>
                      </div>

                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
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
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-3 d-grid">
                      <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{backgroundColor: '#C9B7D2' , color:'#0A0B24'}}
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Spectra Sphere{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Spectra Sphere.{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
