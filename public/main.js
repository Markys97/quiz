 // selected all html element for using in javascript file
let answer_options= document.querySelectorAll('.quiz__list-answer-obtion > li');
let answer_ones= document.querySelectorAll('[data-question="1"]')
let button= document.querySelector('.btn--send');
let button_reset= document.querySelector('.block_resultat')
let table= document.querySelector('.resultat')
let reset_button= document.querySelector('#reset')
let quiz= document.querySelector('.quiz')
let final_result_elt= document.querySelector('.final_result')
console.log(button_reset)
let list_vide=[];
let answerUser=[];
let answerFinalUser1;
let answerFinalUser2
let answerFinalUser3
let answerFinalUser4
let answerFinalUser5

// function to display on html final result
function showResult(result1,result2,parent){
    let td1= document.createElement('td');
    let td2= document.createElement('td');
    td2.className='results';
    let tr= document.createElement('tr');
    td1.textContent=result1;
    td2.textContent=result2;
    tr.appendChild(td1)
    tr.appendChild(td2)

    parent.appendChild(tr)
}

//send my answer choosen to a server side using ajax
answer_options.forEach((item)=>{
    item.addEventListener('click',e=>{
      
        e.target.parentElement.innerHTML=' <div style="color:black; font-size:30px; font-weight:700">played</div>'
 
       let numberQues= e.target.dataset.question;
       let responseUserText=e.target.textContent;
       let ansTab=[numberQues.trim(), responseUserText.trim()]
       answerUser.push(ansTab)
     
       let req= new XMLHttpRequest()

       req.open('post','/test',true);
       req.onreadystatechange=function(){
           if(req.readyState==4 && req.status== 200){
               console.log(req.responseText)
           }
       }

       req.setRequestHeader('content-type','application/x-www-form-urlencoded')

       req.send('answerUser='+JSON.stringify(ansTab))

       if(answerUser.length==5){
           button.classList.remove('disabled')
           button.removeAttribute('disabled')
       }

       

       
    })
})


// button to get answers that i sent to a server side
button.addEventListener('click',e=>{
    e.target.style.opacity='0'
    quiz.style.opacity='0'
    let req= new XMLHttpRequest()

    req.open('get','/getResult',true);

    req.onreadystatechange= function(){
        if(req.readyState==4 && req.status== 200){
            let result= JSON.parse(req.responseText)

            let responseUser=result[0];
            let trueAnswers= result[1];

            
          //  console.log(trueAnswers,trueAnswers.length)
            
            for(let i=0; i<trueAnswers.length;i++){
                        
               
               
                if(trueAnswers[i].answer_option === responseUser[i].answer && trueAnswers[i].question_id === responseUser[i].number ){
                   
                    showResult(responseUser[i].number ,'true',table)
                    list_vide.push(document.querySelectorAll('.results'))
                }else{
                    showResult(responseUser[i].number ,'false',table)
                    list_vide.push(document.querySelectorAll('.results'))
                }
                
            }
            
            
      
        
        }
    }

    req.send()
    button_reset.style.display='block';

})
   
//button to delete in database my answers and refraish a page for starting a new game
reset_button.addEventListener('click',e=>{
    let req= new XMLHttpRequest()
    req.open('get','/newGame',true)
    req.onreadystatechange= function(){
        if(req.readyState==4 && req.status== 200){
            console.log(req.responseText)
        }
    }

    req.send()
    location.reload();
})


