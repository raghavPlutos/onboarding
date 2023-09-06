const Customer = require("../models/Customers");
const bcrypt = require("bcrypt");
const {
    generateJWT 
} = require("../utils/token");

const login = async (req, res) =>{
    try {
        const {
            email,
            password
        } = req.body;

        if(!email || !password){
            throw new Error("Please enter all the fields");
        }

        const customer = await Customer.query()
                            .select("")
                            .where("email","=", email);

        if(customer.length === 0){
            throw new Error("This email doesn't exists");
        }

        const checkPass = await bcrypt.compare(password, customer[0].password);
        if(!checkPass){
            throw new Error("Password is invalid");
        }

        const token = generateJWT(customer[0].id, customer[0].email, customer[0].role)

        res.json({
            token,
            id: customer[0].id,
            name: customer[0].name,
            email: customer[0].email,
            role: customer[0].role
        })
        
    } catch (err) {
        console.log(err);
        res.json({err: err.message});
    }
}

const signup = async (req, res) =>{
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if(!name || !email || !password){
            throw new Error("Please enter all the fields");
        }

        const checkEmail = await Customer.query()
                                    .select("email")
                                    .where("email","=", email);
        console.log(checkEmail);

        if(checkEmail.length !== 0){
            throw new Error("This email already exists");
        }


        const customer = await Customer.query().insert({
            name, email, password, role: "user"
        })
        console.log(customer);
        const token = generateJWT(customer.id, customer.email, customer.role)
        console.log(token);
        res.json({
            token,
            id: customer.id,
            name: customer.name,
            email: customer.email,
            role: customer.role
        });

    } catch (err) {
        res.json({err: err.message});
    }
}


module.exports = {
    login,
    signup
}