const mongoose = require('mongoose');
const myApp = require('./myApp');
const port = 3001;
const json = require('./data/db');
//const comment = [{json.comment}];


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/test_com_8_3')
    .then(() => {
        console.log('Connected successfully ...');
        // Define Schema
        const userScheme = mongoose.Schema({
            name: String,
            lastname: String,
            email: String,
            userName: String,
            email: String,
            comment: String,
            title: String,
            date: Date,
            copete: String,
            image: String,
            description: String
        });
        // Pasa Schema a model
        const User = mongoose.model('User', userScheme);
        // Nueva instancia del documento
        const matiasUser = new User({
            _id: mongoose.Types.ObjectId(),
            name: 'Ramiro',
            lastname: 'Gisone',
            email: 'ramirogisone@gmail.com',
        });
        // Guardo en la base de datos
        matiasUser.save(() => {
            console.log('User was added');
        });
        //Comments
        const Comment = mongoose.model('Comment', userScheme);
        // Nueva instancia del documento
        json.comments.forEach(date => {
            const ramaComment = new Comment({
                _id: mongoose.Types.ObjectId(),
                userName: 'rama',
                email: 'ramirogisone@gmail.com',
                comment: 'Prueba de comentarios'
            });
            ramaComment.save(() => {
                console.log('Comments was added');
            });
        });
        //Articles
        const Article = mongoose.model('Article', userScheme);
        // Nueva instancia del documento
        json.articles.forEach(date => {
            const ramaArticle = new Article({
                _id: mongoose.Types.ObjectId(),
                title: 'Título de la noticia',
                date: new Date(),
                copete: 'Copete',
                image: 'Aca va una imagen',
                description: 'Descripción de la noticia'
            });
            ramaArticle.save(() => {
                console.log('Article was added');
            });
        })
        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));