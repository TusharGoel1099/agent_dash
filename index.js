var express=require('express');

const webhooksRouter=require('./router/webhooks')
var app=express();
app.use(express.json())


app.get('/',(req,res)=>{
    res.send({message:'success'})
})


app.use('/',webhooksRouter);



app.listen(1338,function(req,res){
   console.log('server listening at port no. 1338');
});


