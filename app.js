const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app=express();
const port=3000;

//create a connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

//connect

connection.connect((err)=>{
    if (err) {
        console.error('Error connecting to database:', err);
        return;
      }
      console.log('connected to database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true}));

//serve the html form
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/login.html');
});

// handle form submition
app.post('/submit',(req,res)=>{
    const{ name1,password1 }= req.body;

    //insert data
    const query = 'INSERT INTO user (name,password1) VALUES (?, ?)';
    connection.query(query,[name1,password1], (err, result)=>{
        if(err){
            console.error('Error inserting data',err);
            res.send('Error submittion data');
        }   else{
            console.log('Data submitted successsfully');
            // res.sendFile(__dirname+'/login.html');

            // retrive data
            // select all data
            const query1='SELECT * FROM user';

            //Execute the query
            connection.query(query1,(err,results)=>{
                if (err) {
                    console.error('Error fetching data from database:', err);
                    res.send('Error fetching data');
                  } else {
                    // Render the simple html page with the retrived data
                    const html= `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>User Data</title>
                    </head>
                    <body>
                    <h1>User Data</h1>
                    <ul>
                        ${results.map(result => `<li>${result.name} - ${result.password1}</li>`).join('')}
                    </ul>
                    </body>
                    </html>
                    `;
                    res.send(html);
                  }   
            });
        }
    });
});

//start the server
app.listen(port, ()=>{
    console.log(`Server Listening the port ${port}`);
});