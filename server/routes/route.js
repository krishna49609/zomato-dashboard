    const api = require('../api/api');
    const express = require('express');
    const router = express.Router();

    /**
     * Handles the routing from client
    */
    router.get('/*' , (req,res,next)=>{
        const response = api.load(req.url);
        var result = response.then(
        response =>{
            res.status(201).send(response);
            return res;
        },
        err => {
            res.status(500).json({
                error: err
            }
        )});
    });

    module.exports = router;