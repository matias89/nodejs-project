const mongoose = require('mongoose');
const myApp = require('./myApp');
const json = require('./data/db')
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

        //Define Schema comments
        const commentSchema = mongoose.Schema({
            username: String,
            email: String,
            comment: String
        });
        //Pasa schema a model
        const Comment = mongoose.model('Comment', commentSchema);
        json.comments.forEach(data => {
            //Nueva instancia del documento
            const commen = new Comment({
                _id: mongoose.Types.ObjectId(),
                username: data.username,
                email: data.email,
                comment: data.comment
            });
            commen.save(() => {
                console.log('Comment was added');
            });
        });
        //Define Schema articles
        const articlesSchema = mongoose.Schema({
            title: String,
            date: Date,
            copete: String,
            image: String,
            description: String
        });
        //Pasa Shema a model
        const Articles = mongoose.model('Articles', articlesSchema);
        json.articles.forEach(items => {
            //Nueva instancia del documento
            const article = new Articles({
                _id: mongoose.Types.ObjectId(),
                title: items.title,
                date: new Date(),
                copete: items.copete,
                image: items.image,
                description: items.description
            })
            article.save(() => {
                console.log('Article was added')
            });
        })

        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));