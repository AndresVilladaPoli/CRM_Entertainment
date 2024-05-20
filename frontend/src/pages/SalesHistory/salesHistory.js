import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
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
  Input,
  Form,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Product, Price, Date } from "./salesHistoryCol";
import Breadcrumbs from "components/Common/Breadcrumb";
import {
  getSales as onGetSales,
  addNewSale as onAddNewSale,

} from "store/saleshistory/actions";
import { isEmpty } from "lodash";

import { useSelector, useDispatch } from "react-redux";
import saleshistory from "store/saleshistory/reducer";

const salesHistoryList = props => {
  document.title = "Sales History | SpectraSphere";

  const dispatch = useDispatch();
  const [salesHistory, setsalesHistory] = useState();
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      product: (salesHistory && salesHistory.product) || "",
      price: (salesHistory && salesHistory.price) || "",
      date: (salesHistory && salesHistory.date) || "",

    },
    validationSchema: Yup.object({
      product: Yup.string().required("Please enter the contact's name"),
      price: Yup.string().required("Please enter the contact's address"),
      date: Yup.string().required("Please enter the contact's address"),
    }),
    onSubmit: (values) => {
      
        const newSale = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          product: values["product"],
          price: values["price"],
          date: values["date"],
        };
        dispatch(onAddNewSale(newSale));
        validation.resetForm();
      toggle();
    },
  });
  const { sales } = useSelector(state => ({
    sales: state.saleshistory.sales,
  }));

  const [saleList, setSaleList] = useState([]);
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
                  {cellProps.product.charAt(0)}
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
        Header: "Product",
        accessor: "product",
        filterable: true,
        Cell: cellProps => {
          return <Product {...cellProps} />;
        },
      },
      {
        Header: "Price",
        accessor: "price",
        filterable: true,
        Cell: cellProps => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "date",
        filterable: true,
        Cell: cellProps => {
          return <Date {...cellProps} />;
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (sales && !sales.length) {
      dispatch(onGetSales());

    }
  }, [dispatch, sales]);

  useEffect(() => {
    setsalesHistory(sales);
  
  }, [sales]);

  useEffect(() => {
    if (!isEmpty(sales)) {
      setsalesHistory(sales);

    }
  }, [sales]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSaleClick = arg => {
    const sale = arg;

    setsalesHistory({
      id: sale.id,
      product: sale.product,
      price: sale.price,
      date: sale.date,

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

  const handleSaleClicks = () => {
    setSaleList("");
    toggle();
  };

  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Sales History" breadcrumbItem="User List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={sales}
                    isGlobalFilter={true}
                    isAddSaleList={true}
                    handleSaleClick={handleSaleClicks}
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
                              <Label className="form-label">Product</Label>
                              <Input
                                name="product"
                                type="text"
                                placeholder="Insert Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.product || ""}
                                invalid={
                                  validation.touched.product &&
                                    validation.errors.product
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.product &&
                                validation.errors.product ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.product}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Price</Label>
                              <Input
                                name="price"
                                label="Address"
                                placeholder="Insert Price"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.price || ""}
                                invalid={
                                  validation.touched.price &&
                                    validation.errors.price
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.price &&
                                validation.errors.price ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.price}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Date</Label>
                              <Input
                                name="date"
                                label="date"
                                type="text"
                                placeholder="Insert Date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.date || ""}
                                invalid={
                                  validation.touched.date &&
                                    validation.errors.date
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.date &&
                                validation.errors.date ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.date}
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

export default withRouter(salesHistoryList);

    