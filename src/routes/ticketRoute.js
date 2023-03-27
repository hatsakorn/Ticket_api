const express = require("express");
const ticketController = require("../controllers/ticketController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/", ticketController.getTicket);
router.post("/", authenticate, ticketController.createTicket);
router.patch("/:id", authenticate, ticketController.editTicket);
router.get("/count", ticketController.countAllTicket);
router.get("/pending", ticketController.countPending);
router.get("/accepted", ticketController.countAccepted);
router.get("/resolved", ticketController.countResolved);
router.get("/rejected", ticketController.countRejected);

module.exports = router;
