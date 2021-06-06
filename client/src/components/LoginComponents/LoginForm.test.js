import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

describe("testing login page", () => {
  const onClickCallBack = jest.fn();

  const renderComp = (
    <Router>
      <LoginForm
        setMobileNumber={onClickCallBack}
        setPasword={onClickCallBack}
      />
    </Router>
  );

  describe("login form tests", () => {
    test("render the login form properly", () => {
      const component = render(renderComp);
      const headerElm = component.getByTestId("header");
      expect(headerElm.textContent).toBe("Welcome To My Mujic App");
    });
  });

  test("checking password and mobile input component", async () => {
    render(renderComp);
    await waitFor(
      () =>
        fireEvent.change(screen.getByPlaceholderText("Mobile Number"), {
          target: { value: "8859540293" },
        }),
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "password" },
      })
    );
    //checking input after change
    expect(screen.queryByPlaceholderText("Mobile Number").value).toBe(
      "8859540293"
    );
    expect(screen.queryByPlaceholderText("Password").value).toBe("password");
  });
});
