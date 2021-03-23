const express=require('express')
var request = require('request');
const operatorModel=require('../models/operatorModel')
const departmentModel=require('../models/departmentModel')
const router=new express.Router()
var token=require('../tokens/tokens')
router.get('/operator',async(req,res)=>{
    var accessToken=token_data.listoperator_token;
    
    request({
        url: "https://salesiq.zoho.in/api/v2/testmail/operators",
        headers: {authorization: "Bearer "+accessToken},
        json:true
        
      }, function(err,response) {
        
        operatorModel.addoperatorDetails(response.body,function(err,data){
          if(err){
              res.status(400).send(err)
          }else{
              res.status(200).send(data)
          }
      })
        
      });

    
});

router.get('/department',async(req,res)=>{

    var accessToken=token.token_data.listdepartment_token;
    console.log(accessToken);
    request({
        url: "https://salesiq.zoho.in/api/v2/testmail/departments",
        headers: {authorization: "Bearer "+accessToken},
        json:true
        
      }, function(err,response) {
        
        departmentModel.adddepartmentDetails(response.body,function(err,data){
          if(err){
              res.status(400).send(err)
          }else{
              res.status(200).send(data)
          }
      })
        
      });
    
});



module.exports=router