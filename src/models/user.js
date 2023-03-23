module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  User.associate = (db) => {
    User.hasMany(db.Ticket, {
      foreignKey: {
        name: "userId",
      },
      onDelete: "RESTRICT",
    });
  };
  return User;
};
