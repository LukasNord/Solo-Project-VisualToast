const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();
const arraySort = require('../modules/arraySorting.module');


// Checks to make sure the user is logged to hit any routes where we use the middleware
var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()){
      return next();
    }
    res.send('Must be logged in to access reports!');
  }


// get reports for the user // 
router.get('/getReports', isAuthenticated,(req,res)=>{
    
    const getReportQuery = `SELECT * FROM user_speeches WHERE user_speeches.user_id = $1 ORDER BY date ASC`;
            
    pool.query(getReportQuery,[req.user.id])
        .then((result)=>{
          let arraySortResult = arraySort(result.rows);
          //console.log('-------->test: ', test);
          
          res.send(arraySortResult);
           
        }).catch((err)=>{
            console.log('error getting reports: ', err);
            
        });

}); // end get Reports



          //*** Admin Reports  ***//

router.get('/getAdminReports', isAuthenticated,(req,res)=>{
    
  const getReportQuery = `SELECT * FROM user_speeches ORDER BY date ASC`;
          
  pool.query(getReportQuery)
      .then((result)=>{
        // let arraySortResult = arraySort(result.rows);
          console.log('----> ADMIN REPORTS: ', result.rows);
          
        
        //res.send(result.rows);
         
      }).catch((err)=>{
          console.log('error getting reports: ', err);
          
      });

}); // end get Reports



















  module.exports = router;