const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const {spawn} = require("child_process");
const { assert } = require("console");

let URL = "mongodb+srv://Saumya_1503:Saumya@1503@2002@cluster0.vuzhm.mongodb.net/test1?authSource=admin&replicaSet=atlas-73ffe3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const PY_SCRIPT_PATH = `${process.cwd()}/python_scripts/automation_script.py`;

const PORT = process.env.PORT || 8080;

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

// mongoose.connect(URL, {useNewUrlParser: true, useCreateIndex: true,
//     useUnifiedTopology: true,})
//     .then((res)=>{
//         console.log("Database Connected Successfully");
//         app.listen(PORT, ()=>{console.log(`Listening on ${PORT}`)});  
//     })
//     .catch((err)=>{console.log(err)} );

app.get('/', (req, res) => {
    res.send('Amizone Feedback Server')
})


app.post("/", async (req, res) => {

    const {Username, Password} = req.body;

    try {

        const process = spawn('python3', [
            PY_SCRIPT_PATH,
            Username,
            Password,
        ]);
  
        var msg;

        process.stdout.on('data', (data) => {

            console.log("Success Data", data.toString());

            msg = data.toString()
  
        });
  
        process.stderr.on('data', (data) => {
  
            console.log("Error Data", data); 
  
        });
  
        process.on('close', (code) => {
  
            console.log(`processed closed with code ${code}`);
        
            if(msg==="error\n") {
                res.send({err:"Error_Auth"}).status(424);
            }
            else {
                res.send({msg:"Success"}).status(200);
            }

          
        });         
        
      } catch (err) {
  
        console.log(err)
        res.send({err:"Error"});
        
      }
  
    
})

app.listen(PORT, ()=>{console.log(`Listening on ${PORT}`)});  