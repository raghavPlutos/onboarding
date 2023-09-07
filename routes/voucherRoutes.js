const express = require("express");
const router = express.Router();

const { authenticateToken, authenticateRoles } = require("../middleware/authMiddleware");
const csvUpload = require("../middleware/csvUploadMiddleware");

const {
    createVoucher,
    getAll,
    getVoucherById,
    updateVoucher,
    deleteVoucher,
    createVoucherCSV
} = require("../controllers/voucherController");

router.post("/createVoucher", 
authenticateToken,
authenticateRoles(["admin"]),
createVoucher);

router.post("/createVoucherCsv",
authenticateToken,
authenticateRoles(["admin"]),
csvUpload.single("vouchers"),
createVoucherCSV
)

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