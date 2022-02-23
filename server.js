const express= require('express');
const myslq= require('mysql');
const bodyParser= require('body-parser');


app= express();
const PORT=process.env.PORT || 2000;

// middlewear------------------------------------
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser())
app.set('view engine','ejs')

const connection= myslq.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'quiz'
})



app.get('/',(req,res)=>{
    let questionDatas;
    let answerObtionDatas;

    connection.query('select * from question',(err,result)=>{
        if(err){
            throw err;
        }else {

            questionDatas= result;

            connection.query('select * from answer',(err,result)=>{
                if(err){
                    throw err;
                }else {
                    answerObtionDatas=result;
                   
                    
                   
                }
                res.render('home',{questionDatas,answerObtionDatas})
            })
        }


      

        
    })

  
})



app.post('/test',(req,res)=>{

    let array = JSON.parse(req.body.answerUser);

  connection.query('insert into useranswer (number,answer) values(?,?)',[array[0],array[1]])

  res.send('succes')
})


 app.get('/getResult',(req,res)=>{
     let trueAnswer;
     let userAnswers;

        connection.query('select * from  useranswer ',(err,result)=>{
            if(err){
                throw err
            }else{
                userAnswers= result;
                 trueAnswer;
                connection.query(`select * from answer where question_id in (1,2,3,4,5) and correct=true`,(err,ress)=>{
                    if(err){
                        throw err
                    }else{
                        trueAnswer=ress
                    }
                  res.json([userAnswers,trueAnswer])
                })
            
                
            }
      
        
        })
        
     
    })
   


app.get('/newGame',(req,res)=>{
    connection.query(' DELETE FROM useranswer')
    res.send('deleted')
    
})



   
 






app.listen(PORT,()=> console.log(`server run on PORT ${PORT}`))





