const { Ticket, User, sequelize } = require("../models");
const createError = require("../utils/create-error");

exports.getTicket = async (req, res, next) => {
  try {
    const value = await Ticket.findAll({
      // where: {
      //   userId: req.user.id,
      // },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    res.status(200).json(value);
  } catch (err) {
    next(err);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.user.id;
    value.userId = userId;

    const sameTitle = await Ticket.findOne({
      where: { title: value.title, userId: userId },
    });
    if (sameTitle) {
      createError("Title is already created");
    }

    await Ticket.create(value);
    res.status(200).json("Ticket has been created successfully");
  } catch (err) {
    next(err);
  }
};

exports.editTicket = async (req, res, next) => {
  try {
    const value = req.body;
    const userId = req.user.id;
    const ticketId = req.params.id;

    const findId = await Ticket.findOne({
      where: {
        userId: userId,
        id: +ticketId,
      },
    });

    if (!findId) {
      createError("Ticket is not found");
    }
    await Ticket.update(value, {
      where: { userId: userId, id: +ticketId },
    });

    res.status(200).json("Ticket is updated");
  } catch (err) {
    next(err);
  }
};

exports.countAllTicket = async (req, res, next) => {
  try {
    const count = await Ticket.count();
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
exports.countPending = async (req, res, next) => {
  try {
    const count = await Ticket.count({ where: { status: "Pending" } });
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
exports.countAccepted = async (req, res, next) => {
  try {
    const count = await Ticket.count({ where: { status: "Accepted" } });
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
exports.countResolved = async (req, res, next) => {
  try {
    const count = await Ticket.count({ where: { status: "Resolved" } });
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
exports.countRejected = async (req, res, next) => {
  try {
    const count = await Ticket.count({ where: { status: "Rejected" } });
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
