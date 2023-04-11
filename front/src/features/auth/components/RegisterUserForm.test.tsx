import React from "react";
import { act, fireEvent } from "@testing-library/react";
import { renderWithAuth } from "src/test/renderWithAuth";
import { rest, server } from "src/test/server";
import RegisterUserForm from "./RegisterUserForm";

describe("<RegisterUserForm />", () => {
  test("validation message will appear when user submits invalid form", async () => {
    const component = renderWithAuth(<RegisterUserForm />, {});

    const loginButton = component.getByRole("button", { name: /Cadastrar/i });

    await act(async () => {
      loginButton.click();
    });

    expect(
      component.getByText(/Campo nome é obrigatório/i)
    ).toBeInTheDocument();

    expect(
      component.getByText(/Campo email é obrigatório/i)
    ).toBeInTheDocument();

    expect(component.getByText(/Mínimo de 6 caracteres/i)).toBeInTheDocument();

    expect(
      component.getByText(/Campo confirmação de senha é obrigatório/i)
    ).toBeInTheDocument();
  });

  test("user will be redirected to home page when login is successful", async () => {
    const push = jest.fn();

    const component = renderWithAuth(<RegisterUserForm />, {
      router: { push },
    });

    const name = "test";
    const email = "test@gmail.com";
    const password = "123456";

    const nameInput = component.getByLabelText(/Nome/i);
    const emailInput = component.getByLabelText(/Email/i);
    const passwordInput = component.getByLabelText(/^Senha$/i);
    const confirmPasswordInput = component.getByLabelText(/Confirmar senha/i);

    const loginButton = component.getByRole("button", { name: /Cadastrar/i });

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: password } });

    await act(async () => {
      loginButton.click();
    });

    expect(push).toBeCalledWith("/cadastro/sucesso");
  });

  test("error message will appear when registration is unsuccessful", async () => {
    const push = jest.fn();

    const component = renderWithAuth(<RegisterUserForm />, {
      router: { push },
    });

    const name = "test";
    const email = "test@gmail.com";
    const password = "123456";

    const nameInput = component.getByLabelText(/Nome/i);
    const emailInput = component.getByLabelText(/Email/i);
    const passwordInput = component.getByLabelText(/^Senha$/i);
    const confirmPasswordInput = component.getByLabelText(/Confirmar senha/i);

    const loginButton = component.getByRole("button", { name: /Cadastrar/i });

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: password } });

    server.use(
      rest.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        async (_, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ message: "testErrorMessage" })
          );
        }
      )
    );

    await act(async () => {
      loginButton.click();
    });

    expect(push).not.toBeCalled();
    expect(
      component.getByText(/Erro ao cadastrar usuário/i)
    ).toBeInTheDocument();
  });
});
