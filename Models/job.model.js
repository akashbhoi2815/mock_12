const mongoose = require("mongoose");
const { Schema } = mongoose;


const noteSchema = new Schema({

    companyName: { type: String, required: true },
    postedAt: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String },
    role: { type: String, required: true },
    level: { type: String, required: true },
    position: { type: String, required: true },
    language: { type: Array, required: true },
    contract: { type: String, required: true },
    id: { type: String }
});

const JobModel = mongoose.model("user", noteSchema);

module.exports = {
    JobModel
};
