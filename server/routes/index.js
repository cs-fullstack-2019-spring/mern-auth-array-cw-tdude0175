var express = require('express');
var router = express.Router();


router.get('/failure', (req,res)=>
{
  res.send("FAILED TO COMPLETE ACTION");
});

module.exports = router;
