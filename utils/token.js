const jwt = require("jsonwebtoken");


const generateJWT = (id, email, role) =>{
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}

const verifyJWT = (token) =>{
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
}

module.exports = {generateJWT, verifyJWT};