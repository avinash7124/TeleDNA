module.exports = (req, res, next) => {
    try {
        var sess = req.session;
        if (sess.count) {
            sess.id = req.body.email;
            sess.count = sess.count + 1;
        } else {
            sess.count = 1;
        }
     //   console.log(req.session);
        if (sess.count <= 3) {
            next();
        } else {
            return res.status(401).json({
                message: 'Auth failed try after some time'

            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed try after some time'

        });
    }
};