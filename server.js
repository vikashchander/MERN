const express = require('express'),
    connectDB = require('./config/db'),

    server = express();

// connect DB
connectDB();

// Init middleware
server.use(express.json({extended: false}));

server.get('/', (req, res) => {
    res.send("server start now ");
})   

// routes 
server.use('/api/users', require('./routes/api/users'));
server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/posts', require('./routes/api/posts'));
server.use('/api/profile', require('./routes/api/profile'));



const Port = process.env.PORT || 3000;

server.listen(Port, () => {
    console.log(`server start at ${Port}`);
})