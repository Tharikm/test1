const mysql= require('mysql');

// create a connection to mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// connect to mysql server
connection.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL: ',err);
        throw err;
    }

    console.log('connected to MySQL');

    // create database
    connection.query('CREATE DATABASE IF NOT EXISTS u177739635_Wahhaabdb', (err,results)=>{
        if(err){
            console.error('Error creating database:', err);
            throw err;
        }

        console.log('database created successfully');

        //use created database
        connection.query('USE test',(err)=>{
            if(err){
                console.error('Error selecting database: ',err);
                throw err;
            }

            //create a table user
            const createTableQuery=`
            CREATE TABLE IF NOT EXISTS user(
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                whatsapp varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                message varchar(255) NOT NULL
            )`;

            connection.query(createTableQuery, (err)=>{
                if(err){
                    console.error('Error creating table: ',err);
                    throw err;
                }

                console.log('Table created successfully');

                //close connection
                connection.end();
            });
        });
    });
});