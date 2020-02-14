const mongoose = require('mongoose');
const myApp = require('./myApp');
const port = 3001;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test_com_8_3')
    .then(() => {
        console.log('Connected successfully ...');
        // Define Schema
        const userScheme = mongoose.Schema({
            name: String,
            lastname: String,
            email: String
        });
        // Pasa Schema a model
        const User = mongoose.model('User', userScheme);
        // Nueva instancia del documento
        const matiasUser = new User({
            _id: mongoose.Types.ObjectId(),
            name: 'Matías',
            lastname: 'Aybar',
            email: 'matiasaybar89@gmail.com',
        });
        // Guardo en la base de datos
        matiasUser.save(() => {
            console.log('User was added');
        });
        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));