import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,

  Button,
 
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";


//import action
// import { getChartsData as onGetChartsData } from "../../store/actions";






import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";


const Dashboard = props => {
 
  document.title = "Dashboard | SpectraSphere";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Home")}
            breadcrumbItem={props.t("Home")}
          />

        

          
        </Container>
      </div>

    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
 
};

export default withTranslation()(Dashboard);
