import React, { Fragment } from "react";
import { connect } from "react-redux";

const Spinner = ({ theme }) => {
  return (
    <Fragment>
      <div className={theme}>
        <div className="spinner-cont">
          <img
            src={theme === "light" ? "Spinner_Light.gif" : "Spinner_Dark.gif"}
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
