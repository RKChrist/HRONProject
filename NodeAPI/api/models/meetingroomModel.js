var mysqlx = require('mysqlx');
mysqlx.getSession({
  host: 'host',
  port: '33060',
  dbUser: 'root',
  dbPassword: 'my pass'
}).then(function (session) {
  var schema = session.getSchema('MeetingRooms');
  schema.existsInDatabase().then(function (exists) {
    if (!exists) {
      session.createSchema('MeetingRooms').then(function(schema){
      console.log('Schema created');
      session.close();
      });
    }
    else {
      console.log('Schema already exists');
      session.close();
    }
  });
}).catch(function (err) {
  console.log(err.message);
  console.log(err.stack);
});