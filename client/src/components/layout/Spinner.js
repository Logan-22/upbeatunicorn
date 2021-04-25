import React, { Fragment } from "react";
import { connect } from "react-redux";
import spinnerLight from "./Spinner_Light.gif";
import spinnerDark from "./Spinner_Dark.gif";
import PropTypes from "prop-types";

const Spinner = ({ theme }) => {
  return (
    <Fragment>
      <div className="hundred-perc nav-margin">
        <div className="center-cont">
          <img
            src={theme === "light" ? spinnerLight : spinnerDark}
            className="spinner"
            alt="loading"
          />
        </div>
      </div>
    </Fragment>
  );
};

Spinner.propTypes = {
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(Spinner);
