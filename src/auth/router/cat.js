const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { catCollection } = require("../models/index");
const catRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

catRouter.get("/cat",  getAll);
catRouter.post("/cat", creatRecord);
catRouter.put("/cat/:id",  updating);
catRouter.delete("/cat/:id", deleting);
catRouter.get("/cat/:id", getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newcat = req.body;
  let newRecored = await catCollection.create(newcat);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let cats = await catCollection.read();
  res.status(200).json(cats);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await catCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await catCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.id);
  let recored = await catCollection.read(id);
  res.status(200).json(recored);
}
module.exports = catRouter;
