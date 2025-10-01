const express = require ("express");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "public/txt/vanasonad.txt";
const bodyparser = require("body-parser");
const { asyncWrapProviders } = require("async_hooks");
//
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

app.get("/vanasonad", (req,res)=>{
    fs.readFile(textRef, "utf8", (err, data)=>{
        if(err){
            res.render("genericlist",{h2: "Vanasõnad", listData: ["Vabandame, ühtki vanasõnu ei leitud"]});
        } else {
            res.render("genericlist",{h2: "Vanasõnad", listData: data.split(";")});
        }
    });
});

app.get("/regvisit", (req,res)=>{
    res.render("regvisit");
});

app.post("/regvisit", (req, res)=>{
    console.log(req.body);
    //avan tekstifaili kirjutamiseks sellisel moel, et kui teda pole, luuakse (parameeter "a")
	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		}
		else {
			//faili senisele sisule lisamine
			fs.appendFile("public/txt/visitlog.txt", req.body.nameInput + ";", (err)=>{
				if(err){
					throw(err);
				}
				else {
					console.log("Salvestatud!");
					res.render("regvisit");
				}
			});
		}
	});
});


app.listen(5316);
