import React, { Fragment } from "react";

var date = new Date();

function Footer() {
  return (
    <Fragment>
      <div className="footer">&copy; CodeCertify {date.getFullYear()}</div>
    </Fragment>
  );
}

export default Footer;
