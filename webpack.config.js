resolve: {
  fallback: {
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "assert": require.resolve("assert/"),
    "url": require.resolve("url/"),
  },
},
