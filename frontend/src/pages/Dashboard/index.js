import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import {
  Container,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Col,
  Row
} from "reactstrap"
import { Link } from "react-router-dom"



import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import MonthlyEarning from "./MonthlyEarning"
const Dashboard = props => {
  document.title = "Dashboard | SpectraSphere"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Home")}
            breadcrumbItem={props.t("Home")}
          />

          <Row>
            <Col xl="6" style={{ border: '6px', border: 'radius', color: 'black'}}  >
              <MonthlyEarning
                name="Contacts"
                route="/contacts-list"
                
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6"  style={{ border: '6px', border: 'radius', color: 'black'}} >
              <MonthlyEarning
                name="Sales History"
                route="/sales-history"
                
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6"  style={{ border: '6px', border: 'radius', color: 'black'}} >
              <MonthlyEarning
                name="Sales Opportunity"
                route="/sales-opportunity"
                
              />
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Dashboard)
