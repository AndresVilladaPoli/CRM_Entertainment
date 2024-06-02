import PropTypes from 'prop-types';
import React, { useState, useContext } from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";


import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";


import logo from "../../assets/images/logosp.png";


import { withTranslation } from "react-i18next";

import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";


const Header = props => {
  const [search, setsearch] = useState(false);
  // const { theme, toggleThemeContext } = useContext(ThemeContext);

  // function handleThemeToggle() {
  //   console.log("Botón de cambio de tema presionado");
  //   console.log("Tema actual:", theme);
  //   toggleTheme(); // Intenta cambiar el tema
  // }

  const [darkMode, setDarkMode] =useState(false);

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }

  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
    document.body.classList.toggle('light-mode', darkMode);
  };

  return (
    <React.Fragment>
      <header id="page-topbar"> 
        <div className="navbar-header">
          <div className="d-flex">

            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  style={{marginTop: "20px"}}
                  placeholder={props.t("Search") + "..."}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>


            <button
              type="button"
              onClick={toggleDarkMode}
              className="btn btn-sm px-3 font-size-16 header-item"
              id="theme-toggle-btn"
            >
              {darkMode ? '☀️ Modo Oscuro' : '🌙 Modo Claro'}
            </button>


            <ProfileMenu />

            <div
               onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
            
            </div>
          </div>
        </div>
      </header>

    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const {
    layoutType,
    showRightSidebar,
    leftMenu,
    leftSideBarType,
  } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
