'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');
const DataCollection=require("./lib/data-collection");

const bookModel=require("./book")

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);



const bookTable = bookModel(sequelize, DataTypes);
const bookCollection=new DataCollection(bookTable);


module.exports = {
  db: sequelize,
  users: users(sequelize, DataTypes),

  bookCollection:bookCollection
};
