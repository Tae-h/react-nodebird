const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    res.json([
        {id: 1, content: 'post'},
    ]);
});

router.delete('/', (req, res) =>{
    res.json([
        {id: 1, content: 'delete'},
    ]);
})

module.exports = router;