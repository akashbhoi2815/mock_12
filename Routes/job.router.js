const { Router } = require("express");
const jobRouter = Router();
const { JobModel } = require("../Models/job.model");

jobRouter.get("/", async (req, res) => {
  const notes = await JobModel.find({});
  res.send(notes);
});

jobRouter.post("/create", async (req, res) => {
    try {
        const user = await JobModel.insertMany([req.body]);
        res.send(user)
      } catch (error) {
        return res.send(error)
      }
});

jobRouter.get("/searchtitle/:title", async (req, res) => {
  let { title } = req.params;
  const notes = await JobModel.find({});
  let val = [];
  for (let i = 0; i < notes.length; i++) {
    let tc = title.toLowerCase();
    for(let j=0; j<notes[i].language.length; j++){
        if (notes[i].language[j].toLowerCase().trim() === tc) {
            val.push(notes[i]);
          }
    }
  }
  res.send(val);
});

module.exports = { jobRouter };
