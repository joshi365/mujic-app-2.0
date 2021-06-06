import React, { useState } from "react";
import LoginForm from "../../components/LoginComponents/LoginForm";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPasword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      number: mobileNumber,
      password: password,
    };
    console.log(loginData);
  };

  return (
    <React.Fragment>
      <LoginForm
        onSubmitHandler={onSubmitHandler}
        mobileNumber={mobileNumber}
        password={password}
        setMobileNumber={setMobileNumber}
        setPasword={setPasword}
      />
    </React.Fragment>
  );
};

export default Login;
