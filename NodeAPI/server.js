const express = require("express");
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'testdatabase'
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Import the responseApi.js
const { success, error, validation } = require("./responseApi");
 

app.get("/",(req,res) => {
  try{
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query('SELECT * from PARTICIPANTS', (err, rows)  => {
            
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.status(200).json(success('OK', rows, res.statusCode));
        });
        connection.release(); // return the connection to pool
    });

    
  }
  catch(err){
    res.status(500).json(error('Something went wrong.'));
  }
});

var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
  return rand() + rand(); // to make it longer
};


// POST method route
// Requires a body with FirstName, LastName
app.post('/', (req, res) => {
  if(req.body.FirstName == undefined || req.body.FirstName == "" || req.body.LastName == undefined || req.body.LastName == undefined){
    message = {FirstName: 'Firstname is required.'} + {LastName: 'LastName Is required'}
    res.status(422).json(validation(message))
  }
  
  console.log("This is the first name: " + req.body.FirstName)

  try {
    pool.getConnection((err, connection) => {
      
        
        if(err) throw err;
        
        console.log('connected as id ' + connection.threadId);
        
        const query = 'Insert into PARTICIPANTS(FirstName, LastName, Token) Values ("'  + req.body.FirstName + '", "' + req.body.LastName + '", "' + token() + '")';
        connection.query(query, (err, rows)  => {
            if (err) throw err;
            console.log("1 record inserted");
            res.status(200).json(success('OK', "1 row inserted", res.statusCode));
        });
        connection.release(); // return the connection to pool
    });
  } catch(err) {
    // Do some with error here
    res.status(500).json(error('Something went wrong.', res.statusCode));
  }
})


// Put method route
// Requires a body with FirstName, LastName
app.put('/', (req, res) => {
  if(req.body.FirstName == undefined || req.body.FirstName == "" || req.body.LastName == undefined || req.body.LastName == undefined){
    message = {FirstName: 'Firstname is required.'} + {LastName: 'LastName Is required'} + {Id: 'Id is required'}
    res.status(422).json(validation(message))
  }
  
  console.log("This is the first name: " + req.body.FirstName)

  try {
    pool.getConnection((err, connection) => {
      
        
        if(err) throw err;
        
        console.log('connected as id ' + connection.threadId);
        
        const query = 'UPDATE Participants \n' + 
                      'SET FirstName = "' + req.body.FirstName + '", LastName = "' + req.body.LastName + '" \n';
                      'WHERE "ParticipantID == ' + req.body.Id + ";";
        connection.query(query, (err, rows)  => {
            if (err) throw err;
            console.log("1 record inserted");
            res.status(200).json(success('OK', "1 row Updated", res.statusCode));
        });
        connection.release(); // return the connection to pool
    });
  } catch(err) {
    // Do some with error here
    res.status(500).json(error('Something went wrong.', res.statusCode));
  }
})

// Put method route
// Requires a body with FirstName, LastName
app.put('/', (req, res) => {
  if(req.body.FirstName == undefined || req.body.FirstName == "" || req.body.LastName == undefined || req.body.LastName == undefined){
    message = {FirstName: 'Firstname is required.'} + {LastName: 'LastName Is required'} + {Id: 'Id is required'}
    res.status(422).json(validation(message))
  }
  
  console.log("This is the first name: " + req.body.FirstName)

  try {
    pool.getConnection((err, connection) => {
      
        
        if(err) throw err;
        
        console.log('connected as id ' + connection.threadId);
        
        const query = 'UPDATE Participants \n' + 
                      'SET FirstName = "' + req.body.FirstName + '", LastName = "' + req.body.LastName + '" \n';
                      'WHERE "ParticipantID == ' + req.body.Id + ";";
        connection.query(query, (err, rows)  => {
            if (err) throw err;
            console.log("1 record inserted");
            res.status(200).json(success('OK', "1 row Updated", res.statusCode));
        });
        connection.release(); // return the connection to pool
    });
  } catch(err) {
    // Do some with error here
    res.status(500).json(error('Something went wrong.', res.statusCode));
  }
})


app.listen(3000, () => {
    console.log('Server is running at port 3000');
});