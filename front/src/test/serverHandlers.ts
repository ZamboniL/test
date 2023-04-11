import { rest } from "msw";

const handlers = [
  rest.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    async (req, res, ctx) => {
      const { email, name } = await req.json<{ email: string; name: string }>();

      return res(
        ctx.json({
          email,
          name,
          id: 50,
        })
      );
    }
  ),

  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: 1,
            date: "2022-01-15T19:20:30.000Z",
            product: "CURSO DE BEM-ESTAR",
            price: "12750",
            seller: "JOSE CARLOS",
            type: {
              id: 1,
              description: "Venda produtor",
              signal: "+",
            },
          },
          {
            id: 3,
            date: "2022-01-15T22:20:30.000Z",
            product: "CURSO DE BEM-ESTAR",
            price: "12750",
            seller: "JOSE CARLOS",
            type: {
              id: 1,
              description: "Venda produtor",
              signal: "+",
            },
          },
        ])
      );
    }
  ),
];

export { handlers };
