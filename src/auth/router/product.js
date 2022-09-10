const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { productCollection } = require("../models/index");
const productRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

productRouter.get("/product", getAll);
productRouter.post("/product",  creatRecord);
productRouter.put("/product/:id",  updating);
productRouter.delete("/product/:id", deleting);
productRouter.get("/product/:id",  getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newproduct = req.body;
  let newRecored = await productCollection.create(newproduct);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let products = await productCollection.read();
  res.status(200).json(products);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await productCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await productCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.id);
  let recored = await productCollection.read(id);
  res.status(200).json(recored);
}
module.exports = productRouter;
