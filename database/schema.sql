set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "Food" (
  "foodId" serial PRIMARY KEY,
  "name" text,
  "imageUrl" text,
  "background" text,
  "price" int,
  "description" text,
  "notice" text,
  "category" text
);

CREATE TABLE "Users" (
  "userId" serial PRIMARY KEY,
  "hashedPassword" text,
  "username" text
);

CREATE TABLE "Carts" (
  "userId" int,
  "foodId" int,
  "quantity" int,
  PRIMARY KEY ("userId", "foodId")
);

ALTER TABLE "Carts" ADD FOREIGN KEY ("userId") REFERENCES "Users" ("userId");

ALTER TABLE "Carts" ADD FOREIGN KEY ("foodId") REFERENCES "Food" ("foodId");
