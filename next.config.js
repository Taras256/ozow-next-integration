module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/notify",
        headers: [
          {
            key: "x-custom-header",
            value: "HTTP/1.0 200 OK",
          },
        ],
      },
    ]
  },
}