// src/db/seed.ts
import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";

const main = async () => {
  const insertedUser = await db
    .insert(users)
    .values({
      username: "bagii",
      email: "bagii@example.com",
      passwordHash: "fake_hash_for_testing",
      masterPasswordSalt: "fake_salt_for_testing",
      kdfAlgorithm: "argon2id",
      kdfIterations: 3,
    })
    .returning();

  console.log("User created:");
  console.log(insertedUser);
};

main().catch((error) => {
  console.error("Seed failed:");
  console.error(error);
});
