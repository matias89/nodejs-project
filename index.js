const mongoose = require('mongoose');
const myApp = require('./myApp');
const dataDb = require('./data/db');
const dataDb = require('./data/db.json');
const UsersModel = require('./models/users');

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

    const commentScheme = mongoose.Schema({
      username: String,
      email: String,
      comment: String
    });

    const articleScheme = mongoose.Schema({
      title: String,
      date: Date,
      copete: String,
      image: String,
      description: String,
    });
    // Pasa Schema a model
    const User = mongoose.model('User', userScheme);

    const Comment = mongoose.model('Comment', commentScheme);

    const Articles = mongoose.model('Articles', articleScheme);
    // Nueva instancia del documento
    const matiasUser = new UsersModel({
      _id: mongoose.Types.ObjectId(),
      name: 'Matías',
      lastname: 'Aybar',
      email: 'matiasaybar89@gmail.com',
    });

    dataDb.comments.forEach(element => {
      const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        username: element.username,
        email: element.email,
        comment: element.comment,
      });
      comment.save(() => {
        console.log('comment added');
      });

    });

    dataDb.articles.forEach(element => {
      const articles = new Articles({
        _id: mongoose.Types.ObjectId(),
        title: element.title,
        date: new Date(),
        copete: element.copete,
        image: element.image,
        description: element.description,
      });
      articles.save(() => {
        console.log('articles added');
      });
    });

    // Guardo en la base de datos
    matiasUser.save(() => {
      console.log('User was added');
    });

    const artScheme = mongoose.Schema({
      title: String,
      date: Date,
      copete: String,
      image: String,
      description: String
    });

    const Article = mongoose.model('Article', artScheme);

    dataDb.articles.forEach(c => {
      const artUser = new Article({
        _id: c._id,
        date: c.date,
        copete: c.copete,
        image: c.image,
        description: c.description,
      });
      artUser.save(() => {
        console.log('art was added :)');
      });
    })
    const commentsScheme = mongoose.Schema({
      userName: String,
      email: String,
      comment: String,
    })
    const Comments = mongoose.model('Comments', commentsScheme);
    dataDb.comments.forEach(c => {
      const objComments = new Comments({
        _id: c._id,
        userName: c.userName,
        email: c.email,
        comment: c.comment
      })
      objComments.save(() => {
        console.log('new objet create was exit')
      });
    })

    myApp.listen(port, () => {
      console.log(`Server running on http://localhost:${port}...`);
    });

  })

  .catch(error => console.log(error));