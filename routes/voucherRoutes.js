const express = require("express");
const router = express.Router();

const { authenticateToken, authenticateRoles } = require("../middleware/authMiddleware");

const {
    createVoucher,
    getAll,
    getVoucherById,
    updateVoucher,
    deleteVoucher
} = require("../controllers/voucherController");

router.post("/createVoucher", 
authenticateToken,
authenticateRoles(["admin"]),
createVoucher);

router.get("/getAll", getAll);
router.get("/getVoucherById/:id", getVoucherById);

router.put("/updateVoucher/:id",
authenticateToken, 
authenticateRoles(["admin"]),
updateVoucher);

router.delete(
"/deleteVoucher/:id", 
authenticateToken, 
authenticateRoles(["admin"]), 
deleteVoucher);
module.exports = router;