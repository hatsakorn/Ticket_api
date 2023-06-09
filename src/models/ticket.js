module.exports = (sequelize, DataTypes) => {
  const statusTicket = ["Pending", "Accepted", "Resolved", "Rejected"];
  const Ticket = sequelize.define(
    "Ticket",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      contactInformation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM(...statusTicket),
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
    },
    {
      underscored: true,
    }
  );
  Ticket.associate = (db) => {
    Ticket.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };
  return Ticket;
};
