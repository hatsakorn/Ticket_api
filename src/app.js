const express = require("express");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const { sequelize } = require("./models");
const app = express();

app.use(express.json());

sequelize.sync({ force: true });

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log({ message: `Server is running on port ${port}` })
);
