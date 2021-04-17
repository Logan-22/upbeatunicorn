import React, { Fragment } from "react";
import { connect } from "react-redux";
import spinnerLight from "./Spinner_Light.gif";
import spinnerDark from "./Spinner_Dark.gif";

const Spinner = ({ theme }) => {
  return (
    <Fragment>
      <div className={theme}>
        <div className="spinner-cont">
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

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(Spinner);
