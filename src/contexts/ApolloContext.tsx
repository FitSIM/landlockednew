"use client";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider as ApolloProviderContainer } from "@apollo/client/react";
import { ApolloLink, split } from "@apollo/client/link";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { setContext } from "@apollo/client/link/context";

const graphqlUrl =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ??
  (process.env.NEXT_PUBLIC_ERXES_API_URL
    ? `${process.env.NEXT_PUBLIC_ERXES_API_URL}/gateway/graphql`
    : "/graphql");

const wsUrl = process.env.NEXT_PUBLIC_ERXES_WSS_URL
  ? `${process.env.NEXT_PUBLIC_ERXES_WSS_URL}/gateway/graphql`
  : graphqlUrl.replace(/^http/, "ws");

const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: "include",
});

// WebSocket connections only exist in the browser; on the server every
// operation goes through the HTTP link.
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(createClient({ url: wsUrl }))
    : null;

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    headers: {
      ...headers,
      "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN ?? "",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const err of error.errors) {
      if (
        err.message === "token expired" ||
        err.extensions?.code === "SUBREQUEST_HTTP_ERROR"
      ) {
        return forward(operation);
      }
    }
  }
});

const splitLink = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clientPortalCurrentUser: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: ApolloLink.from([errorLink, authLink, splitLink]),
});

export const ApolloProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloProviderContainer client={client}>
      {children}
    </ApolloProviderContainer>
  );
};
