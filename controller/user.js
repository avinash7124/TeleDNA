const Joi = require('joi');
const User_Model = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwt_key = process.env.jwt_key;



const userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    username: Joi.string().min(3).max(30).required(),
    contactno: Joi.array().unique()
});


exports.user_Registration = async (req, res, next) => {
    try {
        const result = Joi.validate(req.body, userSchema);
        // Error in validation
        if (result.error) {
            res.status(412);
            res.json({
                "status": "error",
                "code": "412",
                'message': 'Data entered is not valid. Please try again.',
                "error": result.error.details[0].message
            });
        }

        if (result.error == null) {
            const user = await User_Model.findUser(result.value.email);
            if (user[0]) {
                res.status(409).json({
                    "status": "confict",
                    "code": "409",
                    'message': 'Email is already in use.',
                });
            } else {
                bcrypt.hash(result.value.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500);
                        res.json({
                            "status": "err",
                            "code": "500",
                            'message': "try agin ",
                        });
                    } else {
                        result.value.password = hash;
                        const newUser = {
                            id: result.value.email,
                            userdetails: result.value
                        }
                        User_Model.addUser(newUser);
                        res.status(201);
                        res.json({
                            "status": "success",
                            "code": "201",
                            'message': 'Registration successfully for ' + result.value.email + ', go ahead and login..',
                            "userId": result.value.email
                        });
                    }
                });

            }
        }
    } catch (error) {
        next(error)
    }
}

exports.user_Login = async (req, res, next) => {
    try {
        var user = await User_Model.findUser(req.body.email);
        if (user[0]) {
            bcrypt.compare(req.body.password, user[0][2].userdetails.password, (err, responce) => {
                if (err) {
                    res.status(401);
                    return res.json({
                        "status": "fail",
                        "code": "401",
                        'message': 'Invalid userId and Password',
                    });
                }
                if (responce) {
                    const token = jwt.sign({
                        id: user[0][2].id
                    }, jwt_key, {
                        expiresIn: '30m'
                    });
                    res.status(200);
                    return res.json({
                        "status": "success",
                        "code": "200",
                        "email": user[0][2].id,
                        "jwtToken": token

                    });
                }
                res.status(401);
                res.json({
                    "status": "fail",
                    "code": "401",
                    'message': 'Invalid userId and Password',
                });

            });
        } else {
            res.status(401);
            res.json({
                "status": "fail",
                "code": "401",
                'message': 'Invalid userId and Password',
            });
        }
    } catch (error) {
        next(error)
    }
}


exports.user_Update = async (req, res, next) => {
    var userId=req.userData.id;
    try {
        if (req.body.password) {
            bcrypt.compare(req.body.password, user[0][2].userdetails.password, (err, responce) => {
                if (err) {
                    res.status(401);
                    return res.json({
                        "status": "fail",
                        "code": "400",
                        'message': 'Update faild Try Again ',
                    });
                }
                if (responce) {
                    req.body.password = responce; 
                    User_Model.updateUser(userId,req.body);
                    res.status(204);
                    return res.json({
                        "status": "success",
                        "code": "204",
                        'message': 'update',
                    });
                }
                res.status(400);
                return res.json({
                    "status": "fail",
                    "code": "400",
                    'message': 'Update faild Try Again ',
                });

            });

        } else {
            User_Model.updateUser(userId,req.body);
            res.status(200);
            return res.json({
                "status": "success",
                "code": "200",
                'message': 'update',
            });
        }

    } catch (error) {
        next(error)
    }
}