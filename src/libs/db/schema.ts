import {
  pgTable,
  serial,
  text,
  pgEnum,
  date,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  pets: many(pets),
}));

export const petType = pgEnum("type", ["cat", "dog", "bird"]);

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: petType("type").notNull(),
  birthDate: date("birth_date"),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
});

export const petsRelations = relations(pets, ({ many }) => ({
  tutors: many(users),
}));

export const usersToPets = pgTable(
  "users_to_pets",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    petId: integer("pet_id")
      .notNull()
      .references(() => pets.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.petId),
  })
);

export const usersToPetsRelations = relations(usersToPets, ({ one }) => ({
  pet: one(pets, {
    fields: [usersToPets.petId],
    references: [pets.id],
  }),
  user: one(users, {
    fields: [usersToPets.userId],
    references: [users.id],
  }),
}));
