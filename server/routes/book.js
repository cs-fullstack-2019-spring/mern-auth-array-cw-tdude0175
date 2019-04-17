var express = require('express');
var router = express.Router();
var BookCollection = require("../models/BookCollectionSchema");

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    BookCollection.findOne({username:req.session.username},(err,results)=>
    {
        if(results)
        {
            console.log("found something");
            return res.send(results);
        }
        else
            {
                console.log("could not find anything");
                return res.send("Could not find anything");
            }
    });
});

router.post("/addBook", (req,res)=>
{
    console.log(req.body.username);
    console.log("making the book");
    BookCollection.findOneAndUpdate({username:req.body.username},
        {$push: {books: req.body.books}}, (err,results)=>
    {
        if(err) res.send(err);
        else res.send("Added book to user Model");
    })
});

module.exports = router;
