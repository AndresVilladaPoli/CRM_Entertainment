import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Name, Address, Email, Telephone, } from "./contactlistCol";

import Breadcrumbs from "components/Common/Breadcrumb";

import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,

} from "store/contacts/actions";
import { isEmpty } from "lodash";

import { useSelector, useDispatch } from "react-redux";

const ContactsList = props => {

  document.title = "Contacts | SpectraSphere";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      email: (contact && contact.email) || "",
      address: (contact && contact.address) || "",
      telephone: (contact && contact.telephone) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter the contact's name"),
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please Enter Valid Email"
        )
        .required("Please enter the contact's email"),
      adress: Yup.string().required("Please enter the contact's address"),
      telephone: Yup.string()
        .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, "Please Enter Valid Phone Number")
        .required("Please enter the contact's telephone"),
    }),
    onSubmit: values => {
     
      
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          email: values["email"],
          address: values["address"],
          telephone: values["telephone"],
        };
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      
      toggle();
    },
  });
  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }));

  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [

      {
        Header: "Img",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => (
          <>
            {!cellProps.img ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={cellProps.img}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />;
        },
      },
      {
        Header: "Address",
        accessor: "address",
        filterable: true,
        Cell: cellProps => {
          return <Address {...cellProps} />;
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />;
        },
      },
      
      {
        Header: "Telephone",
        accessor: "telephone",
        filterable: true,
        Cell: cellProps => {
          return <Telephone {...cellProps} />;
            
          
        },
      },
      
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
  }, [dispatch, users]);

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      telephone: user.telephone,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };




  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
    
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Insert Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                    validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                                validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Address</Label>
                              <Input
                                name="address"
                                label="Address"
                                placeholder="Insert Adress"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ""}
                                invalid={
                                  validation.touched.address &&
                                    validation.errors.address
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.address &&
                                validation.errors.address ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.address}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Insert Email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                    validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                                validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                              
                            <div className="mb-3">
                              <Label className="form-label">Telephone</Label>
                              <Input
                                name="telephone"
                                label="Telephone"
                                type="text"
                                placeholder="Insert Telephone"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.telephone || ""}
                                invalid={
                                  validation.touched.telephone &&
                                    validation.errors.telephone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.telephone &&
                                validation.errors.telephone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.telephone}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn  save-user"
                                style={{backgroundColor: '#C9B7D2' , color:'#0A0B24'}}
                                >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsList);
