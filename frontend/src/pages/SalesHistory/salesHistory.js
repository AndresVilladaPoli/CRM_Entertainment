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
import { Product, Price, Date, Name, State } from "./salesHistoryCol";
import Breadcrumbs from "components/Common/Breadcrumb";

import {
    getSales as onGetSales,
} from "store/saleshistory/actions";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

const SalesHistory = props => {
    document.title = "Sales History | SpectraSphere";

    const dispatch = useDispatch();

    const { sales } = useSelector(state => ({
        sales: state.saleshistory.sales,
    }));

    const [salesHistory, setSalesHistory] = useState([]);
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

    useEffect(() => {
        setSalesHistory(sales.filter(sale => sale.state === "Done"));
    }, [sales]);

    const toggle = () => {
        setModal(!modal);
    };

    const keyField = "id";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Sales History" breadcrumbItem="Sales History List" />
                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={salesHistory}
                                        isGlobalFilter={true}
                                        customPageSize={10}
                                        className="custom-header-css"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default withRouter(SalesHistory);