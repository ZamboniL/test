import React from "react";
import { signIn } from "next-auth/react";
import { act, fireEvent } from "@testing-library/react";
import { renderWithAuth } from "src/test/renderWithAuth";
import LoginForm from "./LoginForm";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    ...originalModule,
    __esModule: true,
    signIn: jest.fn(),
  };
});

const signInMock = signIn as jest.MockedFunction<typeof signIn>;

describe("<LoginForm />", () => {
  test("validation message will appear when user submits invalid form", async () => {
    const component = renderWithAuth(<LoginForm />, {});

    const loginButton = component.getByRole("button", { name: /Login/i });
    await act(async () => {
      loginButton.click();
    });

    expect(
      component.getByText(/Campo email é obrigatório/i)
    ).toBeInTheDocument();

    expect(
      component.getByText(/Campo senha é obrigatório/i)
    ).toBeInTheDocument();

    expect(signIn).not.toBeCalled();
  });

  test("user will be redirected to home page when login is successful", async () => {
    const push = jest.fn();

    const component = renderWithAuth(<LoginForm />, {
      router: { push },
    });

    const email = "test@gmail.com";
    const password = "123456";

    const emailInput = component.getByLabelText(/Email/i);
    const passwordInput = component.getByLabelText(/Senha/i);
    const loginButton = component.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    await act(async () => {
      loginButton.click();
    });

    expect(signInMock).toBeCalledWith("credentials-auth", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    expect(push).toBeCalledWith("/");
  });

  test("error message will appear when login is unsuccessful", async () => {
    const push = jest.fn();

    const component = renderWithAuth(<LoginForm />, {
      router: { push },
    });

    const email = "test@gmail.com";
    const password = "123456";

    const emailInput = component.getByLabelText(/Email/i);
    const passwordInput = component.getByLabelText(/Senha/i);

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    signInMock.mockResolvedValueOnce({
      error: "error",
      ok: false,
      status: 401,
      url: "/",
    });

    const loginButton = component.getByRole("button", { name: /Login/i });

    await act(async () => {
      loginButton.click();
    });

    expect(signIn).toBeCalledWith("credentials-auth", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    expect(push).not.toBeCalled();
    expect(component.getByText(/Credenciais inválidas/i)).toBeInTheDocument();
  });
});
