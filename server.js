const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3008;

// Connect database using mongoose
const url = 'mongodb://localhost:27017/articlesDB'

mongoose.connect(url, ({useNewUrlParser: true, useUnifiedTopology: true}))
.then(() => {
    console.log("Database connected")
})
.catch((err) => {
    console.log(err)
})


// Create a Schema
const newsSchema = {
    author: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true},
    urlToImage: {type: String, required: true},
    publishedAt: {type: Date, default: Date.now, timestamps: true},
    content: {type: String, required: true}
}

// Create a model
const Article = mongoose.model("Article",newsSchema)

// Middleware setup
app.use(bodyParser.urlencoded({
    extended: true
}))

//////////////////////// ROUTES START FROM HERE /////////////////////////////////////
app.get('/articles', (req,res) => {
    Article.find((err,foundArticles) => {
        if(!err){
            res.send(foundArticles)
        }
        else{
            res.send(err)
        }
    }).sort({publishedAt: -1})
})

// POST ROUTE ////////////////////  WORKING PROPERLY ///////////////////
app.post('/articles', (req,res) => {
    const newArticle = new Article({
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        publishedAt: req.body.publishedAt,
        content: req.body.content,
    })
    newArticle.save((err) => {
        if(!err){
            res.send("successfully saved in database")
        }
        else{
            res.send(err)
        }
    })

})

//////////////////////////////////////////////////// END OF POST ROUTE /////////////////////////

/////////////////// WORKING ON SPECIFIC ROUTES //////////////////////////////
//                Targetting the title || Author routes

/*
app.get('/articles/:articleTitle', (req,res) => {
    Article.find({ $or:[{title: req.params.articleTitle},
        {author: req.params.articleTitle}]}, (err,foundArticles) => {
        if(!err){
            res.send(foundArticles)
        }
        else{
            res.send(err)
        }
    })
})
*/
////////////////////////// Targetting the title && author ////////////
app.get('/articles/:title%3DgadgetNews%26author%3Dalok', (req,res) => {
    Article.find({title:gadgetNews},{author:alok}, (err,foundArticles) => {
        if(!err){
            res.send(foundArticles)
        }
        else{
            res.send(err)
        }
    })
})





// Create the server
app.listen(PORT, () => {
    console.log(`Listening to the ${PORT}`)
})