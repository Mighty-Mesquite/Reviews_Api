const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'reviewsapi'
})

connection.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected');
  }
});

module.exports = connection;