import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-right">
          <a href="https://linkedin.com/in/camila-browne">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://github.com/salasana7/StackBot">
            <i className="fa fa-github"></i>
          </a>
        </div>
        <div className="footer-left">
          <p>Camila Browne</p>
          <p>November 2020</p>
        </div>
      </footer>
    );
  }
}
