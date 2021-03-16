const Batch = require('../models/Batch');

exports.getSingleBatch = async (req, res) => {    
    try {
        const batch = await Batch.findById(req.params.id);

        if(!batch) {
            return res.status(400).json({
                success: false,
                message: `no Batch found with this id ${req.params.id}`
            })
        }

        res.status(200).json({
            success: true,
            data: batch
        })
    } catch(ex){
        res.status(401).send({
            success: false,
            message: 'bad request'
        });
    }
}

exports.getAllBatchs = async (req, res) => {    
    try {
        const batchs = await Batch.find();

        if(!batchs) {
            return res.status(400).json({
                success: false,
                message: `no batchs yet`
            })
        }

        res.status(200).json({
            success: true,
            data: batchs
        })
    } catch(ex){
        res.status(401).send({
            success: false,
            message: 'bad request'
        });
    }
}


exports.createBatch = async (req, res) => {    
    try {
        const {number, size, color, quantity} = req.body;
        const newBatch = new Batch({number, size, color, quantity});
        await newBatch.save();
        res.status(200).json({
            success: true,
            data: newBatch
        })
    } catch (ex){
        res.status(400).json({
            success: false,
            message: ex.message
        })
    }
}