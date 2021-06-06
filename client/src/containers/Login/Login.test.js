import { render } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";

describe("testing login page", () => {
  const renderComp = (
    <Router>
      <Login />
    </Router>
  );

  describe("Login Component tests", () => {
    test("render properly", () => {
      render(renderComp);
    });
  });

  test("onSubmitFunction of Login page", () => {});
});
