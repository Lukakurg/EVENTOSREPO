const {findUserByUsername, saveUser, updateUser, findUserById} = require("../repositories/user.repository");
const {isValidPassword} = require("../utils/validatePassword");
const jwt = require("jsonwebtoken");

const postAuthLogin = async (req, res) => {
    const {body} = req;
    const {username, password} = body;
    const user = await findUserByUsername(username);


if(!user){
    return res.status(400).json({message: "Usuario o contraseña incorrectos"});
}

const isValidPass = await isValidPassword(password, user.password);

if(!isValidPass){
     return res.status(400).json({message: "Usuario o contraseña incorrectos"});
}

const userId = user._id.toString();

const token = jwt.sign({id: userId, username: user.name, rol: user.rol, plan: user.plan}, process.env.AUTH_SECRET_KEY, {expiresIn: '1h'})
res.json({token: token})
}

const postAuthRegister = async (req, res) => {
    const {body} = req;
    const{username, name,email,password} = body;
    const user = await findUserByUsername(username);

    console.log("usuario encontrado: ", user)
    if(user){
        return res.status(400).json({message: "Usuario creado"})
    }

    try{
        await saveUser(name, username, email, password);
        res.status(201).json({message:"Usuario creado"})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Ocurrio un error: ", error})
    }
}


   const changePlan = async (req, res) => {
    const {id} = req.user;

    const usuario = await findUserById(id);
console.log(usuario);
    if (usuario.rol === "admin") 
        return res.status(403).json({ message: "Los admins no pueden cambiar de plan" });
    
    if (usuario.plan === "premium") 
        return res.status(403).json({ message: "Ya es premium" });

    const plan = { plan: "premium" };
    try {
        const user = await updateUser(id, plan);
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: "Ha ocurrido un error: ", error });
    }
};
module.exports = {
    postAuthLogin,
    postAuthRegister,
    changePlan
}