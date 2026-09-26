const Category = require("../models/category.model");

const getCategory = async() => {
    const category = await Category.find({
       
    });

    return category;
}

const findCategory = async(categoryId) => {
    return await Category.findOne({
        _id:categoryId,
        
    })
};

const createCategory = async (categoryData, userId) => {
    const newCategory = new Category({
        ...categoryData,
        userId
    });
    await newCategory.save();
    return newCategory;
};

const deleteCategory = async (categoryId, userId) => {
    return await Category.deleteOne({_id: categoryId, userId: userId})
};

const updateCategory = async (categoryId, userId, payload) => {
    const category = await Category.findOne({
        _id:categoryId,
        userId: userId
    });

    console.log(category);
    
    if(category){
        Object.entries(payload).forEach(([key, value]) => {
            category[key] = value;
        })
        await category.save();
    }
    return category;
};

const getCategoryPaginated = async(page = 1, limit = 5) => {
    const skip = (page -1) * limit;

    const [categories, total] = await Promise.all([
        Category.find({}).skip(skip).limit(limit),
        Category.countDocuments({})
    ])

    return {
      data: categories,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
}

module.exports = {
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    findCategory,
    getCategoryPaginated
}
