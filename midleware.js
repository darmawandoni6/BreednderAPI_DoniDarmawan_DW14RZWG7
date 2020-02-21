const expressJwt = require("express-jwt");
exports.authenticated = expressJwt({ secret: "darmawan" });
