var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "world"
  });
   
  var databaseName = "myDatabase";

  con.connect(function(err) {
    console.log("[create database in MySql] - block BEGIN ");  
    if (err) throw err;
    varId = 6;
    con.query("create database "+databaseName, function (err, result, fields) {
      if (err) throw err;
     // console.log(result);
    });
    con.end();
     
    console.log("[create database in MySql] - block END");
   
  });