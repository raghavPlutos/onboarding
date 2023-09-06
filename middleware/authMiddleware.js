const Customer = require("../models/Customers");
const { verifyJWT } = require("../utils/token");


const authenticateToken = async (req, res, next) =>{
    try{
        if(req.headers.authorization && 
            req.headers.authorization.startsWith("Bearer")){
            const token = req.headers.authorization.split(" ")[1];
            
            const decodedData = verifyJWT(token);
            if(!decodedData){
                throw new Error("Invalid token");
            }
            const customers = await Customer.query()
                                .select("email", "id", "role")
                                .where("id", "=", decodedData.id);

            req.customers = customers;

        }else{  
            throw new Error("Token doesn't exist");
        }

        return next();

    }
    catch(err){
        console.log(err);
        return res.status(401).json({err: err.message});
    }
}


const authenticateRoles = (roles) =>{
    return (req,res,next) => {
        if(roles.includes(req.customers[0].role))
            next();
        else{
            res.status(StatusCodes.UNAUTHORIZED).json({err: "Access not provided"})
        }
    }
}

module.exports = {
    authenticateToken,
    authenticateRoles
}