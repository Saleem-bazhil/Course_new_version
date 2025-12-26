require("dotenv").config();
const connectDB = require("../src/config/database");
const app = require("./app");

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
