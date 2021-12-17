import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import $ from "jquery";
import Swal from "sweetalert2";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernm: ""
    };
  }
  componentDidMount() {
    var cookie_userid = cookie.load("userid");
    var cookie_usernm = cookie.load("username");
    var cookie_password = cookie.load("userpassword");

    if (cookie_userid != undefined) {
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      cookie.save("userid", cookie_userid, { path: "/", expires });
      cookie.save("username", cookie_usernm, { path: "/", expires });
      cookie.save("userpassword", cookie_password, { path: "/", expires });

      $(".menulist").show();
      $(".hd_top").show();
    } else {
      $(".menulist").hide();
      $(".hd_top").hide();
    }
    this.callSessionInfoApi();
  }

  callSessionInfoApi = (type) => {
    axios
      .post("/api/LoginForm?type=SessionConfirm", {
        token1: cookie.load("userid"),
        token2: cookie.load("username")
      })
      .then((response) => {
        this.setState({ usernm: response.data.token2 });
      })
      .catch((error) => {
        this.sweetalert(
          "작업중 오류가 발생하였습니다.",
          error,
          "error",
          "닫기"
        );
      });
  };

  sweetalert = (title, contents, icon, confirmButtonText) => {
    Swal.fire({
      title: title,
      text: contents,
      icon: icon,
      confirmButtonText: confirmButtonText
    });
  };

  myInfoHover() {
    $(".hd_left > li > .box1").stop().fadeIn(400);
  }

  myInfoLeave() {
    $(".hd_left > li > .box1").stop().fadeOut(400);
  }

  logout = async (e) => {
    cookie.remove("userid", { path: "/" });
    cookie.remove("username", { path: "/" });
    cookie.remove("userpassword", { path: "/" });
    window.location.href = "/login";
  };

  render() {
    return (
      <header className="gnb_box">
        <div className="hd_top">
          <div className="top_wrap ct1 af">
            <ul className="hd_left af">
              <li
                className="my1"
                onMouseEnter={this.myInfoHover}
                onMouseLeave={this.myInfoLeave}
              >
                <b>내정보</b>
                <div className="box0 box1">
                  <ul>
                    <li>
                      <a>내 정보 수정</a>
                    </li>
                    <li>
                      <a href="javascript:" onClick={this.logout}>
                        로그아웃
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="my2">
                <b>
                  <span>0</span>알림
                </b>
              </li>
            </ul>
            <div className="hd_right">
              <p>
                <span>'{this.state.usernm}'</span>님 반갑습니다.
              </p>
            </div>
          </div>
        </div>
        <div className="h_nav ct1 af">
          <div className="logo">
            <Link to={"/"}>
              <img
                src={require("../../img/layout/logo.jpg").default}
                height="65px"
                width="200px"
                alt=""
              />
            </Link>
          </div>
          <nav className="gnb gnb_admin">
            <ul className="af">
              <li className="menulist">
                <Link to={"/UserApproval"}>사용자 관리</Link>
              </li>
              <li className="menulist">
                <Link to={"/AdminResearchProject"}>Research Projects 관리</Link>
              </li>
              <li className="menulist">
                <Link to={"/SoftwareList"}>Software Tools 관리</Link>
              </li>
              <li className="menulist">
                <Link to={"/AdminDataSourceList"}>Data Sources 관리</Link>
              </li>
              {/* 드롭다운 이벤트 */}
              <li className="menulist">
                <Link to={"/floatPopulationList"}>유동인구 조회</Link>
                <ul className="gn_2">
                  <li>
                    <Link to={"/community/notice"}>공지사항</Link>
                  </li>
                </ul>
              </li>
              <li className="menulist">
                <Link to={"/SubCodeManage"}>Sub code 관리</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
