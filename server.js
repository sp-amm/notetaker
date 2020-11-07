//NPM Dependencies
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();


const PORT = process.env.PORT || 8080;

//Express app to handle data parsing
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

//Refer to routes file
//require("./routes/apiroutes")(app);
//require("./routes/htmlroutes")(app);

//API Routes
//API get request to display data when user visits the page. 
app.get("/api/notes", function(req, res){
    fs.readFile(notes, (err, data) => { 
        if (err) throw err;
        let databaseContent = JSON.parse(data)
        return (databaseContent);
    })
    res.json(databaseContent);
})

//API Post request to handle the user submitted data.
app.post("/api/notes", function(req, res){
    notes.push(req.body);
    JSON.parse(notes)
    res.json(true);
})

//API delete request to delete when requested.
app.delete("api/notes/:id", function(req, res){

});


//HTML Routes
app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req,res)=> {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes.html", (req,res)=> {
    res.sendFile(path.join(__dirname, "notes.html"));
});

//Server Listening
app.listen(PORT, function(){
    console.log(`App listening on PORT: ${PORT}`);
});