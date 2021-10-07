//All Post Specific URIs

const express = require ('express');
const router = express.Router();

//Root (/) 
router.get('/',(req,res) => {
    res.send('We are the users Here.');
});

// /User/specificUser
router.get('/specificUser',(req,res) => {
    res.send('I am a Specific User Here.');
});

module.exports = router;