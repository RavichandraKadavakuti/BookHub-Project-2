import React, { useState } from "react";
import "./index.css";
import { InitialFetchAPiState, LoginApi } from "../Utilities";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {
  const [fetchState, setFetchState] = useState(InitialFetchAPiState.INITIAL);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [check, setCheck] = useState(false);

  const onchangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const onchangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onsubmitForm = async (event) => {
    event.preventDefault();
    try {
      setFetchState(InitialFetchAPiState.INPROGRESS);
      const path = "login";
      const bodyData = { username: userName, password: password };
      const apiData = await LoginApi(path, bodyData);
      const token = apiData.jwt_token;
      Cookies.set("jwt_token", token, { expires: 30 });
      const { history } = props;
      history.replace("/");
    } catch (error) {
      setErrorMsg(error.message);
      setFetchState(InitialFetchAPiState.FAILURE);
    }
  };

  const toggleCheck = (event) => {
    setCheck(event.target.checked);
  };

  const token = Cookies.get("jwt_token");

  if (token !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="login-page d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between">
          <div className="d-lg-none text-center col-12">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171023/Ellipse_99_zd6zhv.png"
              alt="sm-logo-banner"
              className="img-fluid"
            />
          </div>
          <div className="d-none d-lg-block col-5">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171065/Rectangle_1467_nd6rrh.png"
              alt="lg-logo-banner"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-12 col-lg-5 border border-dark rounded p-3 mt-5">
            <div className="text-center mb-3 mb-lg-5">
              <img
                src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171066/Group_7732_pif35n.png"
                alt="login-form-logo"
                className="img-fluid"
              />
            </div>
            <form onSubmit={onsubmitForm}>
              <div className="d-flex flex-column my-3">
                <label htmlFor="userName" className="form-label">
                  UserName
                </label>
                <input
                  type="text"
                  placeholder="User Name"
                  id="userName"
                  className="form-control-lg border-0"
                  value={userName}
                  onChange={onchangeUserName}
                />
              </div>
              <div className="d-flex flex-column my-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={check ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  className="form-control-lg border-0"
                  value={password}
                  onChange={onchangePassword}
                />
              </div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="check"
                  className="form-check-input"
                  value={check}
                  onClick={toggleCheck}
                />
                <label htmlFor="check">Show Password</label>
              </div>
              <div className="d-grid my-3">
                <button type="submit" className="btn btn-lg btn-warning">
                  {fetchState === InitialFetchAPiState.INPROGRESS
                    ? "Loading...."
                    : "Login"}
                </button>
              </div>

              {fetchState === InitialFetchAPiState.FAILURE && (
                <div className="alert alert-danger">{errorMsg}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
