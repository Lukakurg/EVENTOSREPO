const mongoose = require("mongoose");
const categorySchema = require("./schemas/category.schema")

const Category = mongoose.model("Category", categorySchema)
module.exports = Category;
