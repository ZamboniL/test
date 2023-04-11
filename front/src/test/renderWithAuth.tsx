import { Session } from "next-auth";
import { render as defaultRender } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];

type AuthRenderOptions = DefaultParams[1] & {
  session?: Partial<Session>;
  router?: Partial<NextRouter>;
  isAuthenticated?: boolean;
};

const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  forward: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const mockSession: Session = {
  id: 1,
  token: "example-token",
  email: "johndoe@test.com",
  expires: "2021-01-01",
};

export function renderWithAuth(
  ui: RenderUI,
  {
    session,
    router,
    wrapper,
    isAuthenticated,
    ...options
  }: AuthRenderOptions = {}
) {
  if (!wrapper) {
    wrapper = ({ children }) => {
      const [queryClient] = useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: { retry: false },
              mutations: { retry: false },
            },
            logger: {
              error: () => ({}),
              log: () => ({}),
              warn: () => ({}),
            },
          })
      );
      return (
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          <SessionProvider
            session={
              isAuthenticated
                ? {
                    ...mockSession,
                    ...session,
                  }
                : null
            }
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </SessionProvider>
        </RouterContext.Provider>
      );
    };
  }

  return defaultRender(ui, { wrapper, ...options });
}
