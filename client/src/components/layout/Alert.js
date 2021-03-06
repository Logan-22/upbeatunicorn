import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts, width = 75 }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className={`alert alert-${alert.alertType} w-${width}`} key={alert.id}>
      <h1>{alert.msg}</h1>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  width: PropTypes.string,
};
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
