const express = require('express');
require('dotenv').config()

const app = express();
app.get('/api', (req, res) =>{
    res.json({status: 200, mess: 'active'})
})
app.listen(process.env.PORT, (req, res) =>{
    console.log(`active http://localhost:${process.env.PORT}/api`,)
 })