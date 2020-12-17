var express    =  require("express");
var bodyParser =  require("body-parser");
// var mongoose   = require("mongoose");

var app =  express();

// mongoose.connect(url, {
//     useNewUrlParser: true,
//
//     useCreateIndex: true,
//
//     useUnifiedTopology: true,
//
//     useFindAndModify: false
// }).then(() => {
//     console.log("Connected to Database");
// }).catch(err => {
//     console.log(err.message);
// });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/first", (req, res) => {
    res.render("first");
});

app.get("/second", (req, res) => {
    res.render("second");
});

///////////////////////////////////////////////////////////////////////////////

app.get("/MA101", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/PH101", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/CH101", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/CE101", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/EE101", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/ME110", (req, res) => {
    res.send("Something will be coming soon")
});

app.get("/PH110", (req, res) => {
    res.send("Something will be coming soon")
});

////////////////////////////////////////////////////////////////////////////////

app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});
