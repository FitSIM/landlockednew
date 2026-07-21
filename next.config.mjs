import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GRAPHQL_URL: "https://landlockedmn.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_ENDPOINT: "https://landlockedmn.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_ERXES_API_URL: "https://landlockedmn.next.erxes.io",
    NEXT_PUBLIC_ERXES_WSS_URL: "wss://landlockedmn.next.erxes.io",
    NEXT_PUBLIC_ERXES_CMS_ID: "6a3e1052efbb68d03bf95af5",
    NEXT_PUBLIC_ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImtwTEdIbXBrSUR3LWJpMk5aNUNpWSIsImlhdCI6MTc4MjQ0ODY3OX0.KSvLtiYyyNDvU4zJG4j0ay2nowNnxtNo4tPQvcJlLOE",
    ERXES_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImtwTEdIbXBrSUR3LWJpMk5aNUNpWSIsImlhdCI6MTc4MjQ0ODY3OX0.KSvLtiYyyNDvU4zJG4j0ay2nowNnxtNo4tPQvcJlLOE",
  },
};

export default withNextIntl(nextConfig);
