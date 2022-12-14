const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);

