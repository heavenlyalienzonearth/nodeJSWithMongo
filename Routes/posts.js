//All Post Specific URIs

const express = require ('express');
const router = express.Router();
const Post = require ('../Models/Post');

//Root (/) 
router.get('/',(req,res) => {
    res.send('We are having this class Later on Post');
});

// /Post/Specific
router.get('/specific',(req,res) => {
    res.send('We are having this class Later on a Specific Post');
});

// /Post/City
router.get('/city',(req,res) => {
    res.send('We are having this class Later on a Specific Post in a specific city');
});

router.post('/',(req,res) => { 
    //console.log(req.body);
    //console.log(req.body.title);
    //console.log(req.body.description);

    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    let response = {
        'user':'deepak',
        'response':'SuccessfullY inserted the Data.'
    };
    console.log(JSON.stringify(post));
    res.send(JSON.stringify(response))
   // post.save();
});

router.put('/update/:title',(req,res) => { 
    console.log(req.params.title);
    
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    let response = {
        'user':'deepak',
        'response':'SuccessfullY updated the title Data.'
    };
    console.log(JSON.stringify(post));
    res.send(JSON.stringify(response))
   // post.save();
});

router.delete('/delete/:title',(req,res) => { 
    console.log(req.params.title);
    
    let response = {
        'user':'deepak',
        'response':'SuccessfullY deleted the title Data.'
    };
    //console.log(JSON.stringify(post));
    res.send(JSON.stringify(response))
   // post.save();
});

module.exports = router;