import React from "react";
import Header from "./Header";
import { signOut } from "next-auth/react";
import { renderWithAuth } from "src/test/renderWithAuth";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    ...originalModule,
    __esModule: true,
    signOut: jest.fn(),
  };
});

describe("<Header />", () => {
  test("when user is not authenticated show only login link", () => {
    const component = renderWithAuth(<Header />, {
      isAuthenticated: false,
    });

    const loginLink = component.getByText(/Login/i);
    const logoutLink = component.queryByText(/Sair/i);

    expect(loginLink).toBeInTheDocument();
    expect(logoutLink).not.toBeInTheDocument();
  });

  test("when user is authenticated show only logout link", () => {
    const component = renderWithAuth(<Header />, {
      isAuthenticated: true,
    });

    const loginLink = component.queryByText(/Login/i);
    const logoutLink = component.getByText(/Sair/i);

    expect(loginLink).not.toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  test("when user click on logout link call signOut", () => {
    const component = renderWithAuth(<Header />, {
      isAuthenticated: true,
    });

    const logoutLink = component.getByText(/Sair/i);
    logoutLink.click();

    expect(signOut).toBeCalled();
  });
});
