require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ProjectRoute = require('./routes/Project.route');
const app = express();

app.use(cors({
  origin: process.env.CLIENT_HOST
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ProjectRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server is running AT ${PORT}.`);
});

app.get('/', (_, res) => {
  return res.json({
    message: "Projects API is running successfully!"
  });
});

(async () => {
  const db = require('./database');
  try {
    await db.sync();
    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
})();