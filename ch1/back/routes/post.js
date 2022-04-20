const express = require('express');
const { User, Post } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
    await Post.create({
        content: req.body.content,
    })
});

router.delete('/', (req, res) =>{

})

module.exports = router;