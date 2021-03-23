//const db=require('../mysqlHelperFunction/helperfunction')
var request = require('request');

const dbTable='department'
const dbFields=['DEPT_ID','DEPT_NAME']

function adddepartmentDetails(req,callback){
    let data2=req
    
    var i;
    for (i = 0; i < data2.data.length; i++) {
        var delim=","
        var columns=""
        var values=""

        
    if(data2.data[i].id){
        columns+=dbFields[0]+delim
        values+=data2.data[i].id+delim
        
    }

    if(data2.data[i].name){
        columns+=dbFields[1]+delim
        values+=data2.data[i].name+delim
        
    }
    

    

    let options={
        table:dbTable,
        columns:columns,
        values:values
    }
    db.insert(options,function(err,result){
        if(err){
            return callback(err,null)
        }
        callback(null,result)
    })
    
    
    }



    
}



module.exports={
    adddepartmentDetails,
    
}