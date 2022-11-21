const express = require('express');
const Tiktok = require('../models/Tiktok');
const router = express.Router();

//@name  tiktok
//@attr  name date
const TikTok = require('../models/Tiktok');

// @route    GET /
// @desc     Get urls
// @access   Public
router.get('/' , async (req , res) => {
    try{
        const urls = await TikTok.find().select("name");
        res.json(urls);
    }
    catch(err){
        res.status(500).send('Server Error');
    }
})

// @route    POST /
// @desc     add urls
// @access   Public
router.post('/', async (req , res) => {
    const urls = await req.body.data;
    const data = [];
    urls.forEach((url , index) => {
        data.push({
            name: url
        })
    })

    try{
        const post = await TikTok.insertMany(data);
        res.json(post);
    } catch(err) {
        res.status(500).send(err.message)
    }
    
})

// @route    POST /check
// @desc     check urls to be already existed
// @access   Public
router.post('/check', async (req , res) => {
    const urls = await req.body.data;
    try{
        const data = await Tiktok.find();
        const newData = [];
        data.forEach((elm , index) => {
            if(urls.includes(elm.name) && !newData.includes(elm.name)) newData.push({name: elm.name});
        })
        res.json(newData);
    } catch(err) {
        res.status(500).send(err.message)
    }
    
})

//@route   DELETE /
//@desc    delete all collections
//@access  Private
router.delete('/' , async (req , res) => {
    try{
        const post = await TikTok.deleteMany({});
        res.json(post);
    } catch(err) {
        throw err;
    }
    
})


module.exports = router;