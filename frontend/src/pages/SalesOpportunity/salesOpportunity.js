import React, { useEffect, useState, useMemo } from "react";
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
import { Product, Price, Date, Name, State } from "./salesOpportunityCol";
import Breadcrumbs from "components/Common/Breadcrumb";
import {
    getSales as onGetSales,
    addNewSale as onAddNewSale,
} from "store/saleshistory/actions";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const SalesOpportunityList = props => {
    document.title = "Sales Opportunity | SpectraSphere";

    const dispatch = useDispatch();
    const [sale, setSale] = useState({
        product: '',
        price: '',
        date: '',
        state: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({
            ...sale,
            [name]: value
        });
    };

    const { sales } = useSelector(state => ({
        sales: state.saleshistory.sales,
    }));

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            product: "",
            price: "$",
            date: "",
            name: "",
            state: "Progress",
        },
        validationSchema: Yup.object({
            product: Yup.string().required("Please enter the product name"),
            price: Yup.string()
                .matches(/^\$\d+$/, "The price must contain only numbers")
                .required("Please enter the product price"),
            date: Yup.string()
                .matches(
                    /^(?:(?:19|20)\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
                    "The date must be in the format YYYY-MM-DD and valid"
                )
                .required("Please enter the contact's address"),
            name: Yup.string().required("Please enter the client's name"),
            state: Yup.string().required("Please select the sale state"),
        }),
        onSubmit: (values) => {
            const newSale = {
                id: Math.floor(Math.random() * (30 - 20)) + 20,
                product: values["product"],
                price: values["price"],
                date: values["date"],
                name: values["name"],
                state: values["state"],
            };
            dispatch(onAddNewSale(newSale));
            validation.resetForm();
            toggle();
        },
    });

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
            {
                Header: "Name",
                accessor: "name",
                filterable: true,
                Cell: cellProps => {
                    return <Name {...cellProps} />;
                },
            },
            {
                Header: "State",
                accessor: "state",
                filterable: true,
                Cell: cellProps => {
                    return <State {...cellProps} />;
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

    const toggle = () => {
        setModal(!modal);
    };

    const handleSaleClick = arg => {
        const sale = arg;

        setSale({
            id: sale.id,
            product: sale.product,
            price: sale.price,
            date: sale.date,
            name: sale.name,
            state: sale.state,
        });
        setIsEdit(true);
        toggle();
    };

    const handleSaleClicks = () => {
        setSale({
            product: '',
            price: '',
            date: '',
            state: ''
        });
        setIsEdit(false);
        toggle();
    };

    const keyField = "id";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Sales Opportunity" breadcrumbItem="Sales Opportunity List" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={sales}
                                        isGlobalFilter={true}
                                        isAddSaleOppList={true}
                                        handleSaleClick={handleSaleClicks}
                                        customPageSize={10}
                                        className="custom-header-css"
                                    />
                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader toggle={toggle} tag="h4">
                                            {!!isEdit ? "Edit Sale Opportunity" : "Add Sale Opportunity"}
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
                                                                placeholder="Insert Product"
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
                                                                label="Price"
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
                                                            <Label className="form-label">State</Label>
                                                            <Input
                                                                type="select"
                                                                name="state"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.state || ""}
                                                                invalid={
                                                                    validation.touched.state && validation.errors.state
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                <option value="Progress">Progress</option>
                                                                <option value="Done">Done</option>
                                                                <option value="Not Done">Not Done</option>
                                                            </Input>
                                                            {validation.touched.state && validation.errors.state ? (
                                                                <FormFeedback type="invalid">
                                                                    {validation.errors.state}
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
                                                                className="btn btn-success save-user"
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

export default withRouter(SalesOpportunityList);