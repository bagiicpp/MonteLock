// src/db/test.ts
import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";

const main = async () => {
  const result = await db.select().from(users).limit(1);

  console.log("Database connected successfully");
  console.log(result);
};

main().catch((error) => {
  console.error("Database connection failed");
  console.error(error);
});
