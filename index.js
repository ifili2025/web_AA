const express = require ("express");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "public/txt/vanasonad.txt";
const visitLog= "public/txt/visitlog.txt";
const bodyparser = require("body-parser");
// loome rakenduse, mis kaivitab express raamistiku
const app = express();
// määran lehtede renderdaja (view engine)
app.set("view engine", "ejs");
//mudame public kataloogi veebiserverile kattesaadavaks
app.use(express.static("public"));
//asun paringut parsima. parameeter lopus on false, kui ainult tekst ja true, kui muud infot ka
app.use(bodyparser.urlencoded({extended: false}));

app.get("/", (req, res) =>{
    //res.send("Express.js rakendus lakski kaima");
    res.render("index");
});

app.get("/timenow", (req,res)=>{
    res.render("timenow", {wd: dateEt.weekDay(), date: dateEt.longDate()});
});

app.get("/visitregistered", (req, res) => {
    res.render("visitregistered", { firstName: req.query.firstName , lastName:req.query.lastName });
    //res.render("visitregistered", { firstName: req.query.firstName , lastName:req.query.lastName });
});

app.get("/vanasonad", (req, res)=>{
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.render("genericlist", {h2: "Vanasõnad", listData: ["Vabandame, ühtki vanasõna ei leitud!"]});
		}
		else {
			res.render("genericlist", {h2: "Vanasõnad", listData: data.split(";")});
		}
	});
});

app.get("/visitlog", (req,res)=>{
    fs.readFile(visitLog, "utf8", (err, data)=>{
        if(err){
            res.render("visitlog",{h2: "Külastajate nimekiri", listData: ["Keegi ei ole enda külastust salvestanud"]});
        } else {
            res.render("visitlog",{h2: "Külastajate nimekiri", listData: data.split(";").filter(item => item.trim() !== "")});
        }
    });
});

app.get("/regvisit", (req,res)=>{
    res.render("regvisit");
});

app.post("/regvisit", (req, res) => {
    const firstName = req.body.firstNameInput;
    const lastName = req.body.lastNameInput;
    fs.open("public/txt/visitlog.txt", "a", (err, file) => {
        if (err){
            throw err;
        } else {
            fs.appendFile("public/txt/visitlog.txt", 
            firstName + " " + lastName + " " + dateEt.longDate() + " kell " + dateEt.time() + ";", 
            (err) => {
                if (err) {
                    throw err;
                }
            //console.log("Salvestatud!");
            //redirect koos renderiga ei kasuta. (ei saa)
                //res.redirect(`/visitregistered?firstName=${firstName}&lastName=${lastName}`);
                res.redirect(`/visitregistered?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`);
            }
         );
        }  
    });
});




app.listen(5316);
