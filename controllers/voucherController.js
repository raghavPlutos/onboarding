const Voucher = require("../models/Vouchers");
const Customer = require("../models/Customers");
const createVoucher = async (req, res) =>{
    try {
        const {
            code,
            company_name,
            description,
            type,
            expiry
        } = req.body;

        const voucher = await Voucher.query().insert({            
            code,
            company_name,
            description,
            type,
            expiry: expiry,
            used: false,
            // usedBy: req.customers[0].id
        })
        // const voucher = await (await Customer.relatedQuery('voucher')).for(1).insert({
        //     code,
        //     company_name,
        //     description,
        //     type,
        //     expiry: expiry,
        //     used: false
        // //     usedBy: 1
        // })
        console.log(voucher);
        res.json(voucher);
    } catch (err) {
        console.log(err);
        res.json({err: err.message, e: err})
    }
}


const getAll = async (req, res) =>{
    try {
        console.log(req.query);
        const {type} = req.query;
        let vouchers;
        if(type){
            vouchers = await Voucher.query().where("type","=", type);
        }else
            vouchers = await Voucher.query();
        res.json(vouchers);
    } catch (err) {
        res.json({err: err.message});
    }
}

const getVoucherById = async (req, res) =>{
    try {
        const id= req.params.id;
        const vouchers = await Voucher.query().where("id","=",id).limit(1);
    
        res.json(vouchers);
    } catch (err) {
        res.json({err: err.message});
    }
}

const updateVoucher = async (req, res) =>{
    try {

        let keys = ["company_name", "description", "type","expiry"]
        let obj = {};
        keys.forEach(function(arg){
            if(req.body[arg]){
                obj[arg] = req.body[arg];
            }
        })
        
        const vouchers = await Voucher.query()
                            .update(obj)
                            .where("id","=",req.params.id);

        res.json(vouchers);
    } catch (err) {
        res.json({err: err.message});
    }
}

const deleteVoucher = async (req, res) =>{
    try {
        const vouchers = await Voucher.query().deleteById(req.params.id);
        res.json({message: "deleted successfully", vouchers});
    } catch (err) {
        res.json({err: err.message});
    }
}

module.exports = {
    createVoucher,
    getAll,
    getVoucherById,
    updateVoucher,
    deleteVoucher
}