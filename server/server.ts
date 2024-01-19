/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

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

app.get('/api/Food' , async(req , res , next) => {

 try{
   // getting the data from the foods table
  const foodsSql = `
    SELECT * from "Food"
      where "category" = 'meal'

  `


  // Querying into the Foods table
  const queryState = await db.query(foodsSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);

 }catch(err){
  next(err)
 }

})

app.get('/api/Shakes' , async(req , res , next) => {

   try{
   // getting the data from the foods table
  const shakesSql = `
    SELECT * from "Food"
      where "category" = 'Creamy Delights'

  `


  // Querying into the Foods table
  const queryState = await db.query(shakesSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);

 }catch(err){
  next(err)
 }
})



// Express request allowing you to get
// the entire menu item's the burgers and the shakes and filter thru them

app.get('/api/Food' , async(req , res) => {
  const allMenuItemsSql = `
      SELECT * from "Food"
      where "category" = 'Creamy Delights'
      or "category" = 'meal'
  `

   // Querying into the Foods table
  const queryState = await db.query(allMenuItemsSql);

    const queryResult = queryState.rows;
    // Calling it with json

    res.status(200).json(queryResult);
})


// app.post('/api/Foods' , async(req , res) => {
//   // Using destructuring to get the item's in my Final project Menu
//   // burger's menu
//   const {DoubleDouble , CheeseBurger , Hamburger } = req.body
//   // shakes menu
//   const {ChocolateShake , StrawberryShake , VanillaShake} = req.body
//   // soft drink's menu
//   const {}


// })






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
