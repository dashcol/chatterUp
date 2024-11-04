import dotenv from "dotenv";
dotenv.config();

import { server } from "./server.js";
import { connectToMongoDb } from "./dbconfig.js";

server.listen(3000, () => {
  console.log("listening on port 3000");
  connectToMongoDb();
});
