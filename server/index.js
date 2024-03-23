const express = require("express");
const cors = require("cors");
const fetch=(...args)=>
    import('node-fetch').then(({default:fetch})=>fetch(...args));
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


//credentails
const CLIENT_ID="1ffe90f1710c8433e834";
const CLIENT_SECRET="140891d9dc816fa927935ea724b2188402265ecf"


//get data from frontend

app.get('/getAccessToken',async function (req,res){
    // console.log(req.query.code);
    const params = "?client_id="+ CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;
    // console.log(params);
    await fetch("https://github.com/login/oauth/access_token"+params,{
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        // console.log(data);
        res.json(data);
    });
});

//get user data

app.get('/getdata',async function (req,res){
    // const accessToken = req.headers.authorization;
    // if (!accessToken) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }
    req.get("Authorization"); //Bearer Access Token
    await fetch("https://api.github.com/user",{
        method:"GET",
        headers:{
            "Authorization":req.get("Authorization")
        }
    }).then((response)=>{
        if (!response.ok) {
            throw new Error("Unauthorized");
        }
        return response.json();
    }).then((data)=>{
        // console.log(data);
        res.json(data);
    });
})

app.use("/auth",require("./routes/loginroute"));
app.use("/user",require("./routes/user"))
app.listen(5000,()=>{
    console.log("listening to port at 5000");
})