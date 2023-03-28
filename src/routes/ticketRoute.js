const express = require("express");
const ticketController = require("../controllers/ticketController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", ticketController.getTicket);
router.post("/", authenticate, ticketController.createTicket);
router.patch("/:id", authenticate, ticketController.editTicket);

module.exports = router;
