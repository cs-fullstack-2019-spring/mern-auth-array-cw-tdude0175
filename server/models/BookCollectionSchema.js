var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema
(
    {
        username:{type:String, required:true, max:100},
        password:{type:String, required:true, max:100},
        books:
            [
                {type:String}
            ]
    }
);


module.exports = mongoose.model("bookCollection", BookSchema);