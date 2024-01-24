/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  authMiddleware,
  errorMiddleware,
} from './lib/index.js';
import { FoodMenu } from '.././client/src/lib/api.js';
import { nextTick } from 'node:process';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Cart = {
  foodId: number;
  userId: number;
  quantity: number;
};
type Auth = {
  username: string;
  password: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// GETTING THE Foods table from SQL schema

app.get('/api/Food', async (req, res, next) => {
  try {
    // getting the data from the foods table
    const foodsSql = `
    SELECT * from "Food"
      where "category" = 'meal'

  `;

    // Querying into the Foods table
    const queryState = await db.query(foodsSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);
  } catch (err) {
    next(err);
  }
});

// getting the french fries
app.get('/api/Fries', async (req, res, next) => {
  try {
    // getting the data from the foods table
    const sidesSql = `
    SELECT * from "Food"
      where "category" = 'sides'

  `;

    // Querying into the Foods table
    const queryState = await db.query(sidesSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);
  } catch (err) {
    next(err);
  }
});

app.get('/api/Shakes', async (req, res, next) => {
  try {
    // getting the data from the foods table
    const shakesSql = `
    SELECT * from "Food"
      where "category" = 'Creamy Delights'

  `;

    // Querying into the Foods table
    const queryState = await db.query(shakesSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);
  } catch (err) {
    next(err);
  }
});

// Express request allowing you to get
// the entire menu item's the burgers and the shakes and filter thru them

app.get('/api/allMenuItems', async (req, res) => {
  const allMenuItemsSql = `
      SELECT * from "Food"
      where "category" = 'Creamy Delights'
      or "category" = 'meal'
  `;

  // Querying into the Foods table
  const queryState = await db.query(allMenuItemsSql);

  const queryResult = queryState.rows;
  // Calling it with json

  res.status(200).json(queryResult);
});

// Getting the menu item's by there id

app.get('/api/Food/:foodId', async (req, res, next) => {
  try {
    const foodIdPlucker = Number(req.params.foodId);
    if (!foodIdPlucker) {
      throw new ClientError(400, 'Must be a positive integer');
    }

    const menuIdSql = `
      select *
          from "Food"
          where "foodId" = $1
    `;

    const params = [foodIdPlucker];
    const result = await db.query<FoodMenu>(menuIdSql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET request that gets all of my drinks

app.get('/api/SoftDrinks', async (req, res) => {
  const allMenuItemsSql = `
      SELECT * from "Food"
      where "category" = 'Soft drink'
  `;

  // Querying into the Foods table
  const queryState = await db.query(allMenuItemsSql);

  const queryResult = queryState.rows;
  // Calling it with json

  res.status(200).json(queryResult);
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "Users" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
           "hashedPassword"
      from "Users"
     where "username" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */

// CART ITEMS INCREMENTATION CODE

app.get('/api/Carts', authMiddleware, async (req, res) => {
  const dataCartSql = `SELECT * from "Carts" where "userId" = $1`;
  const params = [req.user?.userId];
  const result = await db.query(dataCartSql, params);
  const rows = result.rows;
  res.json(rows);
});

app.post('/api/Carts/add', authMiddleware, async (req, res, next) => {
  try {
    const userIdCartAddSqlData = `
    INSERT INTO "Carts" ("userId" , "foodId" , "quantity")
            VALUES ($1 , $2 , $3)
            RETURNING *

  `;

    const selectCartItems = `
    SELECT * from "Carts" where "userId" = $1 and "foodId" = $2
  `;

    const updateCartsSql = `
      UPDATE "Carts"
        SET "quantity" = "quantity" + 1
        where "userId" = $1 and "foodId" = $2
        RETURNING *
  `;
    const selectAllCartItemSql = `SELECT * from "Carts" where "userId" = $1`;
    // Querying into the Foods table
    const params = [req.user?.userId, req.body.foodId];
    const callingSelect = await db.query(selectCartItems, params);
    if (callingSelect.rowCount === 0) {
      const paramsCall = [req.user?.userId, req.body.foodId, 1];
      const dataBaseEntry = await db.query(userIdCartAddSqlData, paramsCall);
      const selectAllCart = await db.query(selectAllCartItemSql, [
        req.user?.userId,
      ]);
      res.json(selectAllCart.rows);
    } else {
      const paramsCall = [req.user?.userId, req.body.foodId];
      const dataBaseEntry = await db.query(updateCartsSql, paramsCall);
      const selectAllCart = await db.query(selectAllCartItemSql, [
        req.user?.userId,
      ]);
      res.json(selectAllCart.rows);
    }
  } catch (err) {
    next(err);
  }
});

app.delete('/api/Carts/remove', authMiddleware, async (req, res, next) => {
  try {
    const userIdCartRemoveSqlData = `
   UPDATE "Carts"
        SET "quantity" = "quantity" - 1
        where "userId" = $1 and "foodId" = $2
        RETURNING *

  `;

    const selectAllCartItemSql = `SELECT * from "Carts" where "userId" = $1`;

    // DELETE CART ITEMS
    const deleteCartItem = `
      DELETE from "Carts"
      where "userId" = $1 and "foodId" = $2
        RETURNING *
    `;

    const selectCartItems = `
    SELECT * from "Carts" where "userId" = $1 and "foodId" = $2
  `;

    const params = [req.user?.userId, req.body.foodId];
    const callingSelect = await db.query(selectCartItems, params);

    const { quantity } = callingSelect.rows[0] ?? {};
    if (quantity === 1) {
      const paramsCall = [req.user?.userId, req.body.foodId];
      const dataBaseEntry = await db.query(deleteCartItem, paramsCall);
      const selectAllCart = await db.query(selectAllCartItemSql, [
        req.user?.userId,
      ]);
      res.json(selectAllCart.rows);
    } else {
      const paramsCall = [req.user?.userId, req.body.foodId];
      const dataBaseEntry = await db.query(userIdCartRemoveSqlData, paramsCall);
      const selectAllCart = await db.query(selectAllCartItemSql, [
        req.user?.userId,
      ]);
      res.json(selectAllCart.rows);
    }

    //   const userIdCartAddSqlData = `
    //   INSERT INTO "Carts" ("userId" , "foodId" , "quantity")
    //           VALUES ($1 , $2 , $3)
    //           RETURNING *

    // `;

    //   // DELETE CART ITEMS
    //   const deleteCartItem = `
    //     DELETE from "Carts"
    //     SET "quantity" = "quantity" - 1
    //     where "userId" = $1 and "foodId" = $2
    //       RETURNING *
    //   `;

    //   const selectCartItems = `
    //   SELECT * from "Carts" where "userId" = $1 and "foodId" = $2
    // `;

    //
    // Querying into the Foods table
    // const callingSelect = await db.query(selectCartItems, params);
    // if (callingSelect.rowCount === 0) {
    //   const paramsCall = [req.user?.userId, req.body.foodId, 1];
    //   const dataBaseEntry = await db.query(userIdCartAddSqlData, paramsCall);
    //   res.json(dataBaseEntry.rows[0]);
    // } else {
    //   const paramsCall = [req.user?.userId, req.body.foodId];
    //   const dataBaseEntry = await db.query(deleteCartItem, paramsCall);
    //   res.json(dataBaseEntry.rows[0]);
  } catch (err) {
    next(err);
  }
});

// FOOD TABLE JOINING

app.get('/api/joinCartsWithFood/', async (req, res, next) => {
  try {
    const joiningTableSql = `
    SELECT *
    from "Carts"
    join "Food" using ("foodId")

  `;
    // Querying the Foods Table/Joined with the Carts

    const callingSelect = await db.query(joiningTableSql);

    //  QUERYING TO Carts table(maybe)

    res.json(callingSelect.rows);
  } catch (err) {
    next(err);
  }
});

app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
