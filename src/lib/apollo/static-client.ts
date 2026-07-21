import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export function getStaticApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.GRAPHQL_URL ??
        process.env.NEXT_PUBLIC_GRAPHQL_URL ??
        process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
        "/graphql",
      headers: {
        "x-app-token": process.env.ERXES_APP_TOKEN ?? "",
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
