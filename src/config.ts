import dotenv from "dotenv";

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const IS_DEBUG = process.env.IS_DEBUG?.toLocaleLowerCase() === "true";
if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}
