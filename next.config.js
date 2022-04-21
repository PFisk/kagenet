/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    APP_ID: process.env.NEXT_PUBLIC_PARSE_APPLICATION_ID,
    JS_KEY: process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY,
    HOST_URL: process.env.NEXT_PUBLIC_PARSE_HOST_URL,
  }
}
