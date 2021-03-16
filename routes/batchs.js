const router = require('express').Router();
const {getAllBatchs, getSingleBatch, createBatch } =  require('../controllers/batchs');

router.get("", getAllBatchs);
router.get("/:id", getSingleBatch);

router.post("", createBatch);

module.exports = router;