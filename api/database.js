const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/BD_TIENDA_CELULARES';

mongoose.connect(URI, {useNewUrlParser: true})
    .then(db => {
        console.log('DB is connected');
    })
    .catch(err => console.error(err));

module.exports = mongoose;