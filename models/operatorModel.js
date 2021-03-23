const db=require('../mysqlHelperFunction/helperfunction')
var request = require('request');
const token_data=require('../router/webhooks')
const dbTable='operator'
const dbFields=['OPT_ID','OPT_NAME',"OPT_DEPT_ID","OPT_EMAIL","STATUS","LAST_LOGIN","LAST_OFFLINE"]
function getoperatoradvance(x){
    let accessToken=token_data.dept_name_token;
    return new Promise((resolve,reject)=>{
   request({       
    url: "https://salesiq.zoho.in/api/v2/testmail/operators/"+x,
    headers: {authorization: "Bearer "+accessToken},
    json:true
    
  },function(error,response) {
    if(!error){
        resolve(response.body)
    }
})
    })    
}
async function addoperatorDetails(req,callback){
    let data2=req

    var i;
    for (i = 0; i < data2.data.length; i++) {
        var delim=","
        var columns=""
        var values=""

        var depart_data=await getoperatoradvance(data2.data[i].id)
        
        
        
    if(data2.data[i].id){
        columns+=dbFields[0]+delim
        values+=data2.data[i].id+delim
        
    }

    if(data2.data[i].nick_name){
        columns+=dbFields[1]+delim
        values+=data2.data[i].nick_name+delim
        
    }
    if(data2.data[i].email_id){
        columns+=dbFields[3]+delim
        values+=data2.data[i].email_id+delim
        
    }
    if(depart_data.data.departments[0]){
        columns+=dbFields[2]+delim
        values+=depart_data.data.departments[0]+delim
    }

    //default addition
    columns+=dbFields[4]+delim
    values+="1"+delim
    columns+=dbFields[5]+delim
    values+="abc"+delim
    columns+=dbFields[6]+delim
    values+="abc"+delim



    

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
    addoperatorDetails,
    
}