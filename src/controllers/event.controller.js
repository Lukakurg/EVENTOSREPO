const Joi = require("joi");
const sendEmail = require("../services/mailjet.service");
const {getEvent, createEvent, deleteEvent, updateEvent, findEvent, getEventPaginated, countEventsById, countEventByCategoryId} = require("../repositories/event.repository")

    const getEventController = async (req, res) => {
        const {id} = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        try{          
            const result = await getEventPaginated(id, page, limit)
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({message: "Ha ocurrido un error:", error});
        }

        
    };

    const getEventControllerId = async (req, res) => {
        const eventId = req.params.id;
        const {id} = req.user;

        try{
            const event = await findEvent(eventId, id)
            if(event){
             res.status(200).json(event)   
            }else{
             res.status(404).json({message: "No se encontro evento"});

            }
        }catch(error){
            res.status(500).json({message: "Ha ocurrido un error: ", error})
        }
    };


    const postEventController = async (req, res) => {
                if (req.user.plan === "plus" && await countEventsById(req.user.id) >= 4) return res.status(429).json({ message: "Límite alcanzado" });

const { body, user} = req;

try{
await createEvent(body, user.id)
res.status(201).json({
    message: "Evento creado",
});
}catch(error){
res.status(500).json({message: "Ha ocurrido un error: ", error})
}

 }



    const putEventController = async (req, res) => {
        const eventId = req.params.id;
        const {body} = req;
        const {id} = req.user;

        try{
            const event = await updateEvent(eventId, id, body);
            res.status(200).json(event);
        }catch(error){
            res.status(500).json({message:"Ha ocurrido un error: ", error})
        }
    };

    const deleteEventController = async (req, res) => {
      const eventId = req.params.id;
      const{id} = req.user;

      try{
        await deleteEvent(eventId, id);
        res.status(200).json({message: "Evento eliminado"});
      }catch(error){
res.status(500).json({message:"Ha ocurrido un error: ", error})
      }
    }

    module.exports = {
        getEventController,
        getEventControllerId,
        postEventController,
        putEventController,
        deleteEventController   
    }
    
    