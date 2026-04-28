// src/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const kdfAlgorithmEnum = pgEnum("kdf_algorithm", ["argon2id", "pbkdf2"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  masterPasswordSalt: text("master_password_salt").notNull(),

  kdfAlgorithm: kdfAlgorithmEnum("kdf_algorithm").notNull().default("argon2id"),

  kdfIterations: integer("kdf_iterations").notNull().default(3),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const passwords = pgTable("passwords", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: varchar("title", { length: 100 }).notNull(),

  encryptedUsername: text("encrypted_username"),
  encryptedPassword: text("encrypted_password").notNull(),
  encryptedUrl: text("encrypted_url"),
  encryptedNotes: text("encrypted_notes"),

  iv: text("iv").notNull(),
  authTag: text("auth_tag").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  passwords: many(passwords),
}));

export const passwordsRelations = relations(passwords, ({ one }) => ({
  user: one(users, {
    fields: [passwords.userId],
    references: [users.id],
  }),
}));
