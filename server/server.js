const express = require('express');
const path = require('path');

const db = require('../db/connection.js')

const app = express();
const port = 3000;
const sortable = ['newest', 'helpful', 'relevant']

app.get('/reviews/', (req,res) => {
  if(req.query.sort === undefined || !sortable.includes(req.query.sort)) {
    req.query.sort = 'review_id'
  }
  if(req.query.sort === 'newest') {
    req.query.sort = 'date desc'
  }
  if(req.query.sort === 'helpful') {
    req.query.sort = 'helpfulness desc'
  }
  if(req.query.sort === 'relevant') {
    req.query.sort = 'helpfulness desc'
  }
  if(req.query.page === '' || req.query.page === undefined || parseInt(req.query.page, 10) !== parseInt(req.query.page, 10)) {
    req.query.page = "1";
  }
  if(req.query.count === '' || req.query.count === undefined || parseInt(req.query.count, 10) !== parseInt(req.query.count, 10)) {
    req.query.count = "5";
  }
  let responseobj = {
   product: req.query.product_id,
   page: req.query.page || "1",
   count: req.query.count || "5",
   results: []
  }
  db.query(`select reviews.*, reviewer.reviewer_name from reviews, reviewer where reviews.product_id=${req.query.product_id} and reviewer.id=reviews.reviewer_id order by ${req.query.sort} limit ${(Number(req.query.page) - 1) * Number(req.query.count)},${req.query.count}` , (err, data) => {
    if(err){
      console.log(err);
    } else {
      const datalength = data.length;
      var counter = 0;
      if(data.length < 1) {
        res.send(responseobj)
      } else {
        data.map(review => {
          db.query(`select * from photos where fromReview=${review.review_id}`, (err, data) =>{
            if(err) {
              console.log(err)
            } else {
              counter = counter + 1;
              review.photo = data;
              responseobj.results.push(review);
              if(counter === datalength) {
                res.send(responseobj);
              }
            }
          })
        })
      }
    }
  })
})





app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
})