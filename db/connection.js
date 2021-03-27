const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'ec2-54-183-213-207.us-west-1.compute.amazonaws.com',
  port: 3306,
  user: 'root4',
  password: 'password',
  database: 'reviewsapi',
  waitForConnection: true,
  connectionLimit: 1000,
  connectionTimeout: 60*60*1000,
  queueLimit: 0
})

connection.getConnection((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('connected');
  }
});

module.exports = connection;
