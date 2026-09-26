const Joi = require("joi");
const sendEmail = require("../services/mailjet.service");
const {getCategory, createCategory, deleteCategory, updateCategory, findCategory, getCategoryPaginated} = require("../repositories/category.repository")
const {countEventByCategoryId} = require("../repositories/event.repository")

    const getCategoryController = async (req, res) => {
        
        const {id} = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        try{          
            const result = await getCategoryPaginated(id, page, limit)
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message: "Ha ocurrido un error:", error});
        }

        
    };

    const getCategoryControllerId = async (req, res) => {
        const eventId = req.params.id;
        const {id} = req.user;
if (req.user.rol !== "admin") return res.status(403).json({message: "Error"})
        try{
            const event = await findCategory(eventId, id)
            if(event){
             res.status(200).json(event)   
            }
        }catch(error){
            res.status(500).json({message: "Ha ocurrido un error: ", error})
        }
    };


    const postCategoryController = async (req, res) => {
        if (req.user.rol !== "admin") return res.status(403).json({message: "Error"})
const { body, user} = req;

try{
await createCategory(body, user.id)
res.status(201).json({
    message: "Categoria creada",
});
}catch(error){
res.status(500).json({message: "Ha ocurrido un error: ", error})
}

 }



    const putCategoryController = async (req, res) => {
        if (req.user.rol !== "admin") return res.status(403).json({message: "Error"})

        const categoryId = req.params.id;
        const {body} = req;
        const {id} = req.user;

        try{
            const category = await updateCategory(categoryId, id, body);
            res.status(200).json(category);
        }catch(error){
            res.status(500).json({message:"Ha ocurrido un error: ", error})
        }
    };

    const deleteCategoryController = async (req, res) => {
        if (req.user.rol !== "admin") return res.status(403).json({message: "Error"})

      const categoryId = req.params.id;
      const{id} = req.user;
        if(await countEventByCategoryId(categoryId) > 0) return res.status(409).json({ message: "No se puede eliminar, tiene eventos asociados" });
      try{
        await deleteCategory(categoryId, id);
        res.status(200).json({message: "Categoria eliminado"});
      }catch(error){
res.status(500).json({message:"Ha ocurrido un error: ", error})
      }
    }

    module.exports = {
        getCategoryController,
        getCategoryControllerId,
        postCategoryController,
        putCategoryController,
        deleteCategoryController   
    }
    
    