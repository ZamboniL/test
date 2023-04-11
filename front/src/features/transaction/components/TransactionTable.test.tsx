import React from "react";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { renderWithAuth } from "src/test/renderWithAuth";
import { rest, server } from "src/test/server";
import TransactionTable from "./TransactionTable";

describe("<TransactionTable />", () => {
  test("should render loading state", () => {
    const component = renderWithAuth(<TransactionTable />);

    expect(component.getByText("Carregando...")).toBeInTheDocument();
  });

  test("should render error state", async () => {
    const component = renderWithAuth(<TransactionTable />);

    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        (_, res, ctx) => {
          return res(ctx.status(400));
        }
      )
    );

    waitFor(() => {
      expect(
        component.getByText(/Ocorreu um erro ao carregar os dados/i)
      ).toBeInTheDocument();
    });
  });

  test("should render table", () => {
    const component = renderWithAuth(<TransactionTable />);

    waitFor(() => {
      expect(component.getByText(/JOSE CARLOS/i)).toBeInTheDocument();
      expect(component.getByText(/CURSO DE BEM-ESTAR/i)).toBeInTheDocument();
      expect(component.getByText(/15\/01\/2022 19:20:30/i)).toBeInTheDocument();
      expect(component.getByText(/R\$ 12.750,00/i)).toBeInTheDocument();
    });
  });

  test("when negative transaction should render red text", () => {
    const component = renderWithAuth(<TransactionTable />);

    waitFor(() => {
      expect(component.getByText(/-R\$ 12.750,00/i)).toHaveStyle({
        color: "red",
      });
    });
  });
});
