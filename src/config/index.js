let env = "development";
if (process.env.NODE_ENV == "production") {
  env = "production"
}

module.exports = {
  development: {
    baseUrl: "http://61.142.244.16:18990/fsty/", //dev
    conmonUrl:"http://61.142.244.16:18990/fsty/"
  },
  production: {
    baseUrl: "https://fs-omc.com/fsmis/", //prods
    conmonUrl:"http://61.142.244.16:18990/fsty/"
  }
}[env || 'development'];
