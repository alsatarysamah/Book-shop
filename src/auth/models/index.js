'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');
const itemsModel=require ("./items")
const DataCollection=require("./lib/data-collection");

const bookModel=require("./book")
const catModel =require("./cat")
const productModel = require('./product.js');
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

const itemTable = itemsModel(sequelize, DataTypes);
const itemCollection=new DataCollection(itemTable);

const catTable = catModel(sequelize, DataTypes);
const catCollection=new DataCollection(catTable);

const productTable = productModel(sequelize, DataTypes);
const productCollection=new DataCollection(productTable);
module.exports = {
  db: sequelize,
  users: users(sequelize, DataTypes),
  itemCollection:itemCollection,
  bookCollection:bookCollection,
  catCollection:catCollection,
  productCollection:productCollection

};
