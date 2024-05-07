import React from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

const MonthlyEarning = ( {name = '', content = '', route = '#'} ) => {
  return (
    <React.Fragment>
      {" "}
      <Card style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardBody>
          <CardTitle className="mb-4">{name}</CardTitle>
          <Row>
            <Col sm="6">
              <p className="text-muted mb-0">
                {content}
              </p>
            </Col>
          </Row>
          <div className="mt-4" >
                <Link
                  to={route}
                  className="btn btn-primary waves-effect waves-light btn-sm"
                  style={{backgroundColor:'#8F6FA0'}}
                >
                  View<i className="mdi mdi-arrow-right ms-1"></i>
                </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MonthlyEarning;
