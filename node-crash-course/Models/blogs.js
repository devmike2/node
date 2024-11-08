const { type } = require('express/lib/response');
const mongoose =  require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is Required']
    },
    snippet: {
        type: String,
        required: [true, 'Snippet field is Required']
    },
    body: {
        type: String,
        required: [true, 'Body field is Required']
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog