import React from "react";

var date = new Date();

function Footer() {
  return <div className="footer">&copy; CodeCertify {date.getFullYear()}</div>;
}
export default Footer;
