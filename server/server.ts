/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
import { FoodMenu } from '.././client/src/lib/api.js';

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

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */

app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
