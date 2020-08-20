import mongoose from "mongoose";

import { MONGO_URL } from "../config";

export const setUpDatabase = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (err) =>
    console.error(`ERROR: DBConnection: ${err}`),
  );
  mongoose.set("useCreateIndex", true);
};

export const tearDownDatabase = () => {
  mongoose.disconnect();
};
