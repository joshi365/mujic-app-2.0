import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({
  mobileNumber,
  onSubmitHandler,
  password,
  setMobileNumber,
  setPasword,
}) => {
  return (
    <React.Fragment>
      <div className="main-login-div">
        <div className="container center-div form-data ">
          <form onSubmit={onSubmitHandler}>
            {/* HEADER PART */}
            <h1 data-testid="header" className="header-text p-1">
              Welcome To My Mujic App
            </h1>
            <h4
              data-testid="header2"
              style={{ color: "#f5f507" }}
              className="mid-text mb-4"
            >
              Login To Continue
            </h4>
            {/* HEADER PART */}

            <div className="col-12">
              <input
                type="text"
                className="input-login mb-4"
                placeholder="Mobile Number"
                autoCorrect="false"
                name="number"
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
                value={mobileNumber}
              />
            </div>

            <div className="col-12">
              <input
                type="password"
                className="input-login"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
                value={password}
              />
            </div>

            <button type="submit" className="login-button mt-4 mb-2">
              Login
            </button>

            <h4 style={{ color: "#f5f507" }} className="normal-text ">
              <b>
                Not A Member <br />
                <Link className="ml-2" to="signup" style={{ color: "#ff0505" }}>
                  SIGN-UP
                </Link>
              </b>
            </h4>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
