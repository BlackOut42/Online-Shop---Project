const express = require("express");

const inventoryController = require("../controllers/inventory-controller");

const router = express.Router();

router.get("/",inventoryController.getInventory)
router.post("/add", inventoryController.buyCart);
// router.patch("/remove",inventoryController.sellItem);

module.exports = router;
