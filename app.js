var express    =  require("express");
var bodyParser =  require("body-parser");

var app =  express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});
