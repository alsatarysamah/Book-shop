'use strict';

const booksModel = (sequelize, DataTypes) => sequelize.define('books', {
  name: { type: DataTypes.STRING, required: true },
  author: { type: DataTypes.STRING, required: true }

});

module.exports = booksModel;