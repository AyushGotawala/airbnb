const express = require('express');
const homeRouter = express.Router();
const homeController = require("../controllers/storeController");

homeRouter.get("/",homeController.getIndex);
homeRouter.get("/homeList",homeController.homeList);
homeRouter.get("/bookings",homeController.getBookings);
homeRouter.get("/Fav-List",homeController.getFavList);
homeRouter.get("/homes/:homeId",homeController.getHomeDetails);
homeRouter.post("/fovorites",homeController.addTofovorites);
homeRouter.post("/remove-fav/:homeId",homeController.removeFav);


module.exports = homeRouter;

