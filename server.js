//NPM Dependencies
const fs = require("fs");
const path = require("path");
const notes = require("./db.json");
const express = require("express");
const { networkInterfaces } = require("os");
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
    fs.readFile("db.json", (err, notes) => { 
        if (err) console.error("Something went wrong.");
        notes = JSON.parse(notes);
        //console.log(notes);
        res.json(notes);
    });
});

//API Post request to handle the user submitted data.
//* POST `/api/notes` - Should receive a new note to save on the request body, 
//add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function(req, res){

    id = notes.length + 1;   
    newNote = {
        title: req.body.title,
        text: req.body.text,
        id: id,
    }
    notes.push(newNote);
    
    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) console.error("Something went wrong.");
        res.json(notes);
    });
        
});

//API delete request to delete when requested.
//* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note
// to delete. This means you'll need to find a way to give each note a unique `id` when 
//it's saved. In order to delete a note, you'll need to read all notes from the `db.json` 
//file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
app.delete("/api/notes/:id", async function(req, res){
     
        
    let data = await fs.readFileSync('db.json');
    //console.log(data);
    let list = await JSON.parse(data);
    console.log(list);
    console.log(req.params.id);
    //console.log(list[1].id);
     
    
/*      function filterByID(list){
        if(list.id !== req.params.id){
        return true
        } 
    }; */

    let newJson = []; 
    
    function filterByID(list){
        if (list.id !== parseInt(req.params.id)){
            return list.id;
            };
        };

    newJson = await list.filter(filterByID);
    console.log(newJson); 
 /*    deleteNoteId = req.params.id;
    console.log(deleteNoteId)
    let data = fs.readFileSync('db.json');
    let list = JSON.parse(data);
    let noteToDelete = list.deleteId;
    notes = list.filter((deleteNoteId) => {return list.id !== noteToDelete}) */
    //console.log(id);
   //delete notes[id];
  //  console.log(notes); 
    await fs.writeFile("db.json", JSON.stringify(newJson), (err) => {
        if (err) console.error("Something went wrong.");
        res.json(notes);
    }); 
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