import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
        <footer className="footer">
            <ul>
              <li className="priv"><a href="#n">개인정보처리방침</a></li>
              <li className="em_bt"><a href="#n">이메일주소무단수집거부</a></li>
            </ul>
            <div className="ft_p">
              <span>주소 : {this.props.footer_address}</span>
              <span>Tel : {this.props.footer_tel}</span>
              {/* <span>Email : {props.footer_email}</span> */}
              {/* <span>Mobile : {props.footer_mobile}</span> */}
            </div>
            <p>COPYRIGHT &copy; 2019 RT-ROD, ALL RIGHTS RESERVED.{this.props.name}</p>
        </footer>
    );
  }
}

export default Footer;