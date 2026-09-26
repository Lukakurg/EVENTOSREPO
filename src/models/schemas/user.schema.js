const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String, required:true},
    username:{type: String, required:true, unique:true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    rol:{type: String, enum:["user", "admin"], default:"user"},
    plan:{type: String, enum:["plus", "premium"], default: "plus"},
    active:{type: Boolean, default: false},
},
{
    timestamps:true
}
);

module.exports = userSchema;