const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});


const articleSchema = {
    title: String,
    content: String
}; 

const Article = mongoose.model("Article", articleSchema);

app.get('/articles', (req, res) => {
    Article.find((err, availableArticles) => {
        res.send(availableArticles);
    });
}); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});