import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

var date = new Date();

function Footer({ theme }) {
  return (
    <div className={theme}>
      <div className="footer">&copy; CodeCertify {date.getFullYear()}</div>
    </div>
  );
}

Footer.propTypes = {
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(Footer);
