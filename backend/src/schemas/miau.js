const { Schema, model } = require("mongoose");

const miauSchema = new Schema({
    text: { type: String, required: true },
    reposts: Number,
    likes: Number,
    views: Number,
    date: { type: String, required: true}

})

const Miau = model("miau", miauSchema);

module.exports = Miau;