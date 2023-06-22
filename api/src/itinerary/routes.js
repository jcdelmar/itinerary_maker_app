const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//Itinerary Routes
router.get("/itinerary", controller.getAllItinerary);
router.post("/itinerary", controller.addItinerary);
router.get("/itinerary/getLatestItinerary", controller.getLatestItinerary);
router.get("/itinerary/:id", controller.getItinerary);
router.put("/itinerary/deleteItinerary/:id", controller.deleteItinerary);
router.put("/itinerary/updateItinerary/:id", controller.updateItinerary);

//Itinerary Days Routes
router.get("/day/:id", controller.getAllItineraryDays);
router.post("/day", controller.addItineraryDay);
router.get("/day/getDay/:id", controller.getItineraryDay);
router.put("/day/deleteDay/:id", controller.deleteItineraryDay);
router.put("/day/updateDay/:id", controller.updateItineraryDay);

//Todos Routes
router.get("/todo/:id", controller.getItineraryTodos);
router.post("/todo", controller.addTodo);
router.get("/todo/getTodo/:id", controller.getTodo);
router.put("/todo/deleteTodo/:id", controller.deleteTodo);
router.put("/todo/updateTodo/:id", controller.updateTodo);

module.exports = router;
