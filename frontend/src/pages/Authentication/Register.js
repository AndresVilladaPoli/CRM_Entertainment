import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser } from "store/auth/register/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SuccessModal from "../../components/Common/SuccessModal";
import TermsModal from "../../components/Common/TermsModal";

import logosp from "../../assets/images/logosp.png";

const Register = (props) => {
  document.title = "Register";

  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      username: "",
      password: "",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      if (!values.termsAccepted) {
        setShowTermsModal(true);
        return;
      }

      try {
        await dispatch(registerUser(values));
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  });

  useEffect(() => {
    validation.setValues((values) => ({
      ...values,
      termsAccepted: validation.values.termsAccepted,
    }));
  }, [validation.values.termsAccepted]);

  const { user, loading } = useSelector((state) => ({
    user: state.Register.user,
    loading: state.Register.loading,
  }));

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div style={{ backgroundColor: "#C9B7D2" }}>
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 style={{ color: "#0A0B24", fontSize: "25px" }}>Free Register</h5>
                        <p style={{ color: "#0A0B24", fontSize: "15px" }}>Get your account now.</p>
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img src={logosp} alt="" className="rounded-circle" height="90" />
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal" onSubmit={validation.handleSubmit}>
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
                          invalid={validation.touched.email && validation.errors.email}
                        />
                        <FormFeedback>{validation.errors.email}</FormFeedback>
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
                          invalid={validation.touched.username && validation.errors.username}
                        />
                        <FormFeedback>{validation.errors.username}</FormFeedback>
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
                          invalid={validation.touched.password && validation.errors.password}
                        />
                        <FormFeedback>{validation.errors.password}</FormFeedback>
                      </div>

                      <div className="mb-3 form-check">
                        <Input
                          type="checkbox"
                          id="termsAccepted"
                          checked={validation.values.termsAccepted}
                          onChange={validation.handleChange}
                          className="form-check-input"
                        />
                        <Label className="form-check-label" htmlFor="termsAccepted">
                          I agree to the Terms of Use*
                        </Label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{ backgroundColor: "#C9B7D2", color: "#0A0B24" }}
                          disabled={loading}
                        >
                          {loading ? "Registering..." : "Register"}
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="fw-medium " style={{ color: "#8F6FA0", fontSize: "15px" }}>
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Spectra Sphere. </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <SuccessModal show={showSuccessModal} onCloseClick={() => setShowSuccessModal(false)} />
      <TermsModal
        show={showTermsModal}
        onCloseClick={() => setShowTermsModal(false)}
        onAcceptTerms={() => {
          validation.setValues((values) => ({
            ...values,
            termsAccepted: true,
          }));
          setShowTermsModal(false);
          validation.handleSubmit();
        }}
      />
    </React.Fragment>
  );
};

export default Register;