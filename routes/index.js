var express = require('express');
var router = express.Router();

/* GET langing page. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    name: "myapp",
    version: "0.0.1",
    description: "Develop Rest API using node.js express server",
    task: ["Provide API for user registration.",
      "Login API for the registered user. Login should generate session id and return in login response", "Update profile API of the user. API should use session id returned in the login response",
      "Rest API should use middleware for authentication to avoid hacking.",
      "Failed login should be restricted to 3 times with 1 minute."
    ]
  });
});
module.exports = router;