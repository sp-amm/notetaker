const path = require("path");

app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index.html", (req,res)=> {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes.html", (req,res)=> {
    res.sendFile(path.join(__dirname, "notes.html"));
});