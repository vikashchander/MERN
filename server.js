const express = require('express');

const server = express();

server.get('/',(req,res)=>{
     res.send("server start now ");
})


const Port = process.env.PORT || 5000;

server.listen(Port,  ()=>{
    console.log(`server start at ${Port}`);
})