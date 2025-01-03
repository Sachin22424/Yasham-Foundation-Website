const mongoose = require('mongoose');

const navSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    dropdowns: [
        {
            title: {
                type: String,
                required: true
            },
            links: [
                {
                    name: {
                        type: String,
                        required: true
                    },
                    url: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

const Nav = mongoose.model('Nav', navSchema);

module.exports = Nav;