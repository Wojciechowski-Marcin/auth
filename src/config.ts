export const NODE_ENV = process.env.NODE_ENV;
const IS_TEST = NODE_ENV === "test";

export const PORT = process.env.PORT;
export const MONGO_PORT = process.env.MONGO_PORT;
export const MONGO_URL = IS_TEST
  ? process.env.MONGO_URL || ""
  : `mongodb://auth_db:${MONGO_PORT}`;

export const SECRET_JWT_KEY = "dev";
