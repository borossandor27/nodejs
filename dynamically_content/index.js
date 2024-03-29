//-- https://www.geeksforgeeks.org/how-to-dynamically-add-html-content-when-documents-are-inserted-in-collection-using-node-js/

const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
var bodyParser = require('body-parser')

const data = [{
    title: "This is first blog",
    content: "This is first blog content."
},
{
    title: "This is second blog",
    content: "This is second blog content."
},
{
    title: "This is third blog",
    content: "This is third blog content."
}
]

app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.render("home", {
        data: data
    })
})

app.post("/", (req, res) => {
    const inputTitle = req.body.inputTitle
    const inputContent = req.body.inputContent
    data.push({
        title: inputTitle,
        content: inputContent
    })
    res.render("home", {
        data: data
    })
})

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})