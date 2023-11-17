import React from "react";
import {
  FaInstagramSquare,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./index.css";

const ContactUs = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex flex-column align-items-center mt-3 mt-lg-4">
          <ul className="d-flex justify-content-between align-items-center col-6 col-md-4 col-lg-3">
            <li>
              <FaFacebook className="contact-us-icon" />
            </li>
            <li>
              <FaInstagramSquare className="contact-us-icon" />
            </li>
            <li>
              <FaTwitter className="contact-us-icon" />
            </li>
            <li>
              <FaYoutube className="contact-us-icon" />
            </li>
          </ul>
          <h3>Contact Us</h3>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
