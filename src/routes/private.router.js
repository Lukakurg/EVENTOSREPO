const express = require("express");
const router = express.Router();
const {
    getEventController,
    getEventControllerId,
    postEventController,
    putEventController,
    deleteEventController
} = require("../controllers/event.controller");

const {
        getCategoryController,
        getCategoryControllerId,
        postCategoryController,
        putCategoryController,
        deleteCategoryController   
    } = require ("../controllers/category.controller")

const payloadMiddleware = require("../middlewares/payload.middleware");
const eventSchema = require("./validations/event.validation")
const categorySchema = require("./validations/category.validation")
const {changePlan} = require('../controllers/auth.controller');
 
//EVENTS
router.get("/events", getEventController);

router.get("/events/:id", getEventControllerId);

router.post("/events", payloadMiddleware(eventSchema), postEventController);

router.delete("/events/:id", deleteEventController)

router.put("/events/:id", putEventController);

//CATEGORY
router.get("/category", getCategoryController);

router.get("/category/:id", getCategoryControllerId);

router.post("/category", payloadMiddleware(categorySchema), postCategoryController);

router.delete("/category/:id", deleteCategoryController)

router.put("/category/:id", putCategoryController);

//USER

router.put("/plan", changePlan);


module.exports = router;