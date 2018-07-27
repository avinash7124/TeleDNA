const express = require('express');
const Check_Auth = require("../middleware/check-auth");
const Auth_Restriction = require("../middleware/auth_restricted");

const Controller_user = require('../controller/user');

var router = express.Router();

/* GET users listing. */
router.get('/user', function (req, res, next) {
  res.json('User registraton');
});

router.post('/user/register', Controller_user.user_Registration);

router.post('/user/login', Auth_Restriction, Controller_user.user_Login);

router.post('/user/update', Check_Auth, Controller_user.user_Update)

module.exports = router;