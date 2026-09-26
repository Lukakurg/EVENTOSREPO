const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const findUserByUsername = async (username) => {
    return await User.findOne({username:username})
}
const findUserById = async (userId) => {
    return await User.findOne({_id:userId})
}

const saveUser = async (name, username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name:name,
        username:username,
        email:email,
        password:hashedPassword 
    });
    const res = await newUser.save();
    return res;
}

const updateUser = async (userId, payload) => {
    const user = await User.findOne({
        _id:userId,
    });

    console.log(user);
    
    if(user){
        Object.entries(payload).forEach(([key, value]) => {
            user[key] = value;
        })
        await user.save();
    }
    return user;
};

module.exports = {
    findUserByUsername,
    saveUser,
    updateUser,
    findUserById
}