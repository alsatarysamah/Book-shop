const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { bookCollection } = require("../models/index");
const bookRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

bookRouter.get("/book", bearer, acl("read"), getAll);
bookRouter.post("/book", bearer, acl("create"), creatRecord);
bookRouter.put("/book/:id", bearer, acl("update"), updating);
bookRouter.delete("/book/:id", bearer, acl("delete"), deleting);
bookRouter.get("/book/:id", bearer, acl("read"), getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newbook = req.body;
  let newRecored = await bookCollection.create(newbook);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let books = await bookCollection.read();
  res.status(200).json(books);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await bookCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await bookCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.id);
  let recored = await bookCollection.read(id);
  res.status(200).json(recored);
}
module.exports = bookRouter;
