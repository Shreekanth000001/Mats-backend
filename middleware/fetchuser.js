const jwt = require('jsonwebtoken');
const JWS_SECRET = 'password';

const fetchuser = (req, res, next) => {

    const token = req.header('authToken');
    if (!token) {
        res.status(401).send({ error: 'validate a auth token' });
    }
    try {
        const data = jwt.verify(token, JWS_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'validate a auth token' });
    }

}

module.exports = fetchuser;