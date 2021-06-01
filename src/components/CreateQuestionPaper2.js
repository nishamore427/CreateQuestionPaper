import React from "react";
import './CreateQuestionPaper.css'
import Switch from "react-switch";
import uuid from "react-uuid";
import DeleteIcon from '@material-ui/icons/Delete';

export default class CreateQuestionPaper2 extends React.Component{
    question = {
        isMCQ: false,
        topic:'',
        subTopic : '',
        statement:'',
        isImage:false,
        file:null,
        path:null,
        // answer:'',
        answer : [],
        options:[],
        optionData:''
    };
    quizModel = {
        grade:'',
        topic:[],
        questionQuantity:1,
        students:[],
        questions:[],
        selectedTopic:{},
        selectedTopicData:'',
        selectedGrade:'',
        selectedStudents:[],
        selectedTotalQuestion :0,
        selectedSubtopicData:'',
        questionData:'',
        subtopics:[],
        quizName:null,
        quizGroup:'General',
        remarks:''
    };
    getDefaultQuestionModel = () => {
        return  {
            isMCQ:false,
            topic:'',
            subTopic : '',
            statement:'',
            isImage:false,
            file:'',
            path:'',
            // answer:'',
            answer:[],
            options:[],
            optionData:''
        };
    };
    resetQuestion=()=>{
        this.question.topic= '';
        this.question.subTopic = '';
        this.question.statement ='';
        this.question.isImage = false;
        this.question.isMCQ = false;
        this.question.answer = [];
        this.question.options = [];
        this.question.answerData = this.getSimpleAnswerHtml(this.question);
        this.question.key = uuid();

    }
    constructor(props) {
        super(props);
        this.defaultInitializationModel();
        this.state = this.question;
    }
    defaultInitializationModel(){
        this.question.addOptionButton = this.getAddOptionButton();
        this.decideIsMCQ( this.question.isMCQ);
       
    }
    onDrop(picture) {
        if(!('files' in picture.target)){
            return ;
        }
        const file = picture.target.files[0];
        this.question.path = file.name;
        const reader = new FileReader();
        reader.onload = (ev) =>{
            this.question.file = ev.target.result;
            this.setState(this.question);
        };
        reader.readAsDataURL(file);
    }
    handleChangeforImage(checked){
        
        this.question.isImage = checked;
        this.setState(this.question);
    }
    handleChangeforSwitch(checked){
        
        this.question.isMCQ = checked;
        this.decideIsMCQ( this.question.isMCQ);
        this.setState(this.question);
    }
    getSimpleOptionHtml = (question)=>{
        const html = question.options.map((option,index)=>(
       
          <span 
              className="full-height-width center  "
              
            //   onContextMenu = {(ev) => this.getContextMenu(ev,index) } 
          > 
          <input 
              name = {this.question.questionId} 
             className="mx-auto"
              value={index} 
              type="radio"
              checked = {option.selected}
              onChange={(ev)=>{
                  this.DeselectAllOptions(question);
                  const index = Number(ev.target.value);
                  question.options[index].selected = true;
                  
                  
                //   this.question.answer = this.question.options[index].value;
                  this.question.answer = index;
                 
                  alert(index);
                  this.question.optionData = this.getSimpleOptionHtml(this.question);
                  this.setState(this.question);
              }}
                  

          />
          <input 
              type="text"
            //   className="inline"
              value={this.getEMptyString(this.question.options[index].value)}
              onChange={(ev)=>{
                  this.question.options[index].value = ev.target.value;
                  this.question.optionData = this.getSimpleOptionHtml(this.question);
                  this.setState(this.question);


              }}
          />
           <span>
           <i 
           class="fa fa-times" 
           aria-hidden="true" 
           onClick = {(ev)=>{this.deleteOption(index)}}
           ></i>
           </span>
            
          </span>));
        return html;
  } 
  deleteOption = (index) => {
    if(this.question.options.length === 2){
        alert("Atleast Two options Needed ..you can not delete");
        return;
    }
   
    this.question.options.splice(Number(index),1);
    this.question.optionData = this.getSimpleOptionHtml(this.question);
    this.setState(this.question);
};

decideIsMCQ = (mcq) => {

    if(mcq === 'true' || mcq === true){
        this.question.optionData = this.getSimpleOptionHtml(this.question);
        this.question.addOptionButton  = this.getAddOptionButton();
    }else{
        this.question.optionData = '';
        this.question.addOptionButton = '';
    }
};
addOptionClickHandler = () => {
    if(!Array.isArray(this.question.options)){
        this.question.options = [];
        
    }
    if(this.question.options.length === 4 ){
        alert("You can add at most 4 options");
        return;
    }
    let index = 1;
    for(let option of this.question.options){
        if(option.value === null || option.value === undefined){
            alert("please enter value in option no : "+ index );
            return;
        }
        if(option.value.trim().length === 0){
            alert("please enter value in option no : "+ index );
            return;
        }
        index++;
    }
    let option = window.prompt("Enter new Option");
    if(option){
        option = option.trim();
    }
    if(!option){
        alert("option should not be blank !");
        return;
    }else if(this.isDuplicateOption(this.question.options, option)){
        alert("option should not be duplicate ! ");
        return;
    }
    const op = {
        value :option,
        image:null
   };
   console.log( this.question);
    this.question.options.push(op);
    this.question.optionData = this.getSimpleOptionHtml(this.question);
    console.log( this.question);
    this.setState(this.question);
    
};
getEMptyString = (data) =>{
    if(data == null || data === 'null'){
     return '';   
    }
    return data;
 };
 DeselectAllOptions=(question)=>{
    for(let option of question.options){
        option.selected = false;
    }
}
isDuplicateOption = (options , value) => {
    value = value || '';
    value = value.trim().toUpperCase();
    for(let option of options){
        if(option.value.trim().toUpperCase() === value ){
            return true;
        }
    }
    return false;
}


getAddOptionButton = () => {
    const button = (
        <div className="add-option-btn border">
        <button onClick = {this.addOptionClickHandler} >add option</button>
        </div>
    );
    return button;
};
getMCQAnswer(question){
    let index = -1;
    if(!isNaN(question.answer)){
        index = Number(question.answer);
    }
    if(Array.isArray(question.answer) && question.answer.length > 0){
        index = Number(question.answer[0].value);
    }
    if(index === -1){
        return 'answer is not available';
    }
    if(!Array.isArray(question.options) || question.options.length === 0){
        question.options = [];
        return '';
    }
    console.log("----------------------------------");
    console.log(question);
    const origenalAnswer = question.options[index];
    if(!origenalAnswer){
        return 'answer not available';
    }
    return origenalAnswer.value;
}
incrementAnswer_Event = (ev)=>{
    ev.preventDefault();
    this.answerIncrement();
    this.setState(this.model);
};
addAnswer(){
    // let answer = {};
    // answer.preLabel = '';
    // answer.value = ''
    // answer.postLabel = '';
    if(!Array.isArray(this.question.answer)){
        this.question.answer = [];
        
    }
    let index = 1;
    for(let answer of this.question.answer){
        if(answer.value === null || answer.value === undefined){
            alert("please enter value in answer no : "+ index );
            return;
        }
        if(answer.value.trim().length === 0){
            alert("please enter value in answer no : "+ index );
            return;
        }
        index++;
    }
    
    
    const answer = {
        preLabel :'',
        value:'',
        postLabel:''
   };
    this.question.answer.push(answer);
    this.question.answerData = this.getSimpleAnswerHtml(this.question);
   
    this.setState(this.question);
}
getSimpleAnswerHtml = (question)=>{
    const html = question.answer.map((answer,index)=>(
   
      <span
          className="full-height-width center "
      > 
      {/* <input 
          name = {this.question.questionId} 
         className="mx-auto"
          type="text"
          onChange={(ev)=>{
              this.question.answer = this.question.answer[index].value;
              this.question.answerData = this.getSimpleAnswerHtml(this.question);
              this.setState(this.question);
          }}
      /> */}
      {/* <input 
          type="text"
          value={this.getEMptyString(this.question.answer[index].value)}
          onChange={(ev)=>{
              this.question.anser[index].value = ev.target.value;
              this.question.answerData = this.getSimpleAnswerHtml(this.question);
              this.setState(this.question);
          }}
      /> */}
      {this.AnsWithLables(answer,index)}
       {/* <span>
            <i 
                class="fa fa-times" 
                aria-hidden="true" 
                onClick = {(ev)=>{this.deleteAnswer(index)}}
            >
            </i>
        </span>  */}
      </span>));
  
          
      
      
  
  return html;
} 
AnsWithLables(answer,index){
    // if(!isNaN(this.question.answer)){
    //     this.question.answer = [{
    //         preLabel:null,
    //         value:this.question.answer,
    //         postLabel:null
    //     }];
    // }
    // this.question.answer = (Array.isArray(this.question.answer))?this.question.answer:[];
            return(
                <div style={{width:"100%"}} >
                {/* { this.state.answer.map((answer,index)=>( */}
                <div 
                    // className="row"
                    // className="switch-placement"
                    style = {{
                    display:'flex',
                    flexDirection:'row',
                    width:'100%'
                    }} 
                >
                    <div>
                        <label for="userInput">Pre-Label: </label>
                        <input 
                            rows="2" 
                            cols="20"  
                            wrap="hard"
                            type="text" 
                            // value={answer.preLabel}
                            onChange = {
                                (ev)=>{
                                this.answerPreLableBinding(answer,ev)
                                    this.ValidateAnswer(answer,index);
                                    this.setState(this.question);
                                
                                }
                            }
                        />
                    </div>
                    <div >
                        <div>
                        <label for="userInput">Ans: </label>
                        <input 
                            rows="2" 
                            cols="20"  
                            wrap="hard"
                            type="text" 
                            // value = {answer.value}
                            onChange = {(ev)=>{
                                this.answerValueBinding(answer,ev)
                                        this.ValidateAnswer(answer,index);
                                        this.setState(this.question);
                            }}
                            required
                        />
                    </div>
                    <div>
                    <span id="span">
                    {answer.answerValueIncorrect}
                    </span>
                    </div>
                    </div>
                    <div>
                    <label for="userInput">Post-Label: </label>
                        <input 
                            rows="2" 
                            cols="20"  
                            wrap="hard"
                            type="text" 
                            // value={answer.postLabel}
                            onChange = {
                                (ev)=>{
                                this.answerPostLableBinding(answer,ev)
                                    this.ValidateAnswer(answer,index);
                                    this.setState(this.question);
                                
                                }
                            }   
                        />
                    </div>
                    <div>
                    <span 
                    className="dot center"
                            //  style={{alignItems:'center',justifyContent:'center'}}
                        >
                            <i 
                                class="fa fa-times" 
                                aria-hidden="true" 
                                style={{color:'black',alignItems:'center',justifyContent:'center'}}
                                onClick = {(ev)=>{this.deleteAnswer(index)}}
                            >
                            </i>
                        </span>
                    </div>                    
        </div>
        {/* ))} */}
        </div>);
}
addQuestion=(ev)=>{
       
    if(this.isEmpty(this.question)){
        return;
    }
    
    
    const question = {};
    question.topic = {};
    question.subTopic = {};
    question.mainImage ={};
    question.topic.topicName = this.question.topic;
    question.subTopic.name = this.question.subTopic;
    question.questionId = null;
    question.statement = this.question.statement;
    question.isImage = this.question.isImage;
     question.mainImage.path = this.question.path;
    //  question.mainImage.path = null;
     question.mainImage.file = this.question.file;
    question.isMCQ = this.question.isMCQ;
    question.answer = this.question.answer;
    question.options = this.question.options;
    this.updateQuestionlist(question);
    this.question = this.getDefaultQuestionModel();
    this.resetQuestion();
    this.setState(this.question);
}
addTopicData=(ev)=>{
    this.question.topic= ev.target.value
   this.setState(this.question);
}
addSubTopicData=(ev)=>{
   this.question.subTopic= ev.target.value
  this.setState(this.question);
}
addStatementData = (ev)=>{
   // this.question.statement= ev.target.value
   this.question.statement = ev.target.innerHTML;
   this.setState(this.question);
}
isEmpty = (data) =>{
    if(this.isEmptyAnswerValue(data)){
        return true;
    }
    if(!data.statement || data.statement.trim().length === 0){
        alert("Please Enter Question Statement");
        return true;
    }
    if(data.isMCQ){
        if(data.answer === undefined){
            alert("Please Enter answer");
            return true;
        }
    }else{
        console.log(data.answer.length);
        if( !Array.isArray(data.answer) || data.answer.length === 0 ){
        
            alert("Please add Atleast One Answer");
            return true;
        }
        // if(!data.answer || data.answer.trim().length === 0){
        //     alert("Please Enter answer");
        //     return true;

        // }
    }
    
    if(data.isImage && (data.path === null || data.file.trim().length === 0)){
        // if(data.isImage && ( data.file.trim().length === 0)){
    
        alert("Please Enter image");
        return true;
    }
    if(Array.isArray(data.options) && data.options.length === 0 && data.isMCQ){
        alert("Please add Atleast Two Option");
        return true;
    }
    
   
    return false;
    
};
isEmptyAnswerValue=(question)=>{
    if(question.isMCQ || question.isMCQ === 'true'){
        if(question.answer === undefined){
            alert("Answer Required!");
            return true;
        }
    }else{
        if(!Array.isArray(question.answer)){
            question.answer = [];
        }
        for(let answer of question.answer){
            if(!answer.value || answer.value.trim().length === 0) {
                alert("Answer Value Required!");
                return true;
            }
        }
        

    }
    console.log(question);

      
    
   return false; 
}
ValidateAnswer(answer,index){
       
    if(this.isEmptyData(answer.value)){
        
        answer.answerValueIncorrect ="Answer Should not be blank";
        return false;
    } else{
        answer.answerValueIncorrect = '';
        
    }
}
createElipse = (questions) =>{
    if(!questions){
        alert("question is not there!");
        return [];
    }
    for(let question of questions){
        let ellipse = '';
        
        for(let i = 0 ; i < 20 && i < question.statement.length ; i ++){
            ellipse += question.statement.charAt(i);
        }
      
        if(question.statement.length > 20){
            ellipse += '.....';
        }
        
        this.createElipseForTopic(question);
        this.createElipseForSubTopic(question);
        question.statementWithElipse = ellipse;
    }
};
createElipseForSubTopic = (question) =>{
    
    let ellipse = '';
    if(!question.subTopic.name){
        ellipse += '...';
        question.subTopic.SubtopicNameWithElipse =ellipse;
       return ;
    }
    
    for(let i=0 ; i< 10 && question.subTopic.name.length ; i++){
        ellipse += question.subTopic.name.charAt(i);
    }
    if(question.subTopic.name.length > 10){
        ellipse += '...';
    }
   question.subTopic.SubtopicNameWithElipse =ellipse;
}



createElipseForTopic = (question) =>{
    
    let ellipse = '';
    if(!question.topic.topicName){
        ellipse += '...';
        question.topic.topicNameWithElipse =ellipse;
        return ;
    }
    
    for(let i=0 ; i< 10 && question.topic.topicName.length ; i++){
        ellipse += question.topic.topicName.charAt(i);
    }
    if(question.topic.topicName.length > 10){
        ellipse += '...';
      
    }
    question.topic.topicNameWithElipse =ellipse;
}
selectedFalse=(questions)=>{
    for(let question of questions){
        for(let option of question.options){
            option.selected = false;
        }
    }
}
updateQuestionlist = (question) => {
    this.quizModel.questions = this.quizModel.questions.concat(question);
    this.createElipse(this.quizModel.questions);
    this.selectedFalse(this.quizModel.questions);
    this.setState(this.quizModel);
};
isEmptyData(data){
    let dataType = typeof data;
    if(dataType == null || dataType == undefined){
        return true;
    }
    if(dataType == 'string'){
        return (data.trim().length == 0);
    }
    return false;
}
answerPostLableBinding(entity,ev){
    entity.postLabel = ev.target.value;
    this.setState(this.question);
}
answerPreLableBinding(entity,ev){
    entity.preLabel = ev.target.value;
    this.setState(this.question);
}
answerValueBinding(entity,ev){
    entity.value = ev.target.value;
    this.setState(this.question);
}
deleteQuestion = (index) =>{
    console.log(index);
    this.quizModel.questions.splice(Number(index),1);
    this.setState(this.quizModel);
}



answerIncrement = ()=>{
    if(this.question.answer.length  >= 4){
        this.question.answer.length = 4;
        alert("You Can not Add more than 4 answer fields!");
        
        return;
    }
    this.addAnswer();
}
render(){
        return(
            <div className="">
                <div className="heading-style">
                <label style={{fontSize:"20px",padding:"5px"}}>Create Question Paper</label>
                
                </div>
                <div className="body-style">
                    <div  className="row">
                        <label className="font-width">Topic</label>
                        <input 
                            type="text"
                            value ={this.state.topic}
                            onChange={(ev)=>{this.addTopicData(ev)}}
                            className = "font-width"
                        />
                        <label className="font-width">Subtopic</label>
                        <input 
                            type="text"
                            value ={this.state.subTopic}
                            onChange={(ev)=>{this.addSubTopicData(ev)}}
                            className = "font-width"
                        />
                        <label className="font-width">Problem</label>
                        {/* <input
                            type="text" 
                            value ={this.state.statement}
                            onChange={(ev)=>{this.addStatementData(ev)}}
                        /> */}
                        <span 
                            id="problemQuery" 
                            style={{fontSize: '2 rem'}}
                            class="form-control form-control-dashed" 
                            role="textbox" 
                            contenteditable="true"
                            value ={this.state.statement}
                            onInput={(ev)=>{this.addStatementData(ev)}}
                        ></span>
                        <div className="switch-placement">
                        <div className="border">
                        <label className="font-width">isImage:</label>
                        <Switch
                            onChange={(ev)=>{this.handleChangeforImage(ev)}} 
                            value={true}
                            checked={this.state.isImage}
                        />

                        {this.state.isImage ?
                        <div className="border">
                        <input 
                            type="file" 
                            onChange={this.onDrop.bind(this)}
                        />
                        <img 
                            src={this.state.file} 
                            alt="xsds"

                        />
                        </div>
                        :<div></div>}

                        </div>
                        <div className="border">
                        <label className="font-width">isMCQ:</label>
                        <Switch
                            onChange={(ev)=>{this.handleChangeforSwitch(ev)}} 
                            value={true}
                            checked={this.state.isMCQ}
                        />
                        {this.state.isMCQ ?
                            <div className="font-width">{this.state.addOptionButton}
                            {this.state.optionData}
                            </div>
                            :
                            <div></div>
                           
                        }

                        
                        </div>
                        
                        </div>
                        <div>
                        {this.state.isMCQ 
                        ?
                        <div>
                        <label className="font-width">Answer:</label>
                        <input 
                            type="text"
                            value = {this.getMCQAnswer(this.state)}
                            className = "font-width"
                        />
                        </div>
                        :
                        <>
                        {this.state.answerData}
                        </>
                        }
                        {
                            this.state.isMCQ ?'':
                            <div>
                            <button onClick = {this.incrementAnswer_Event} className="font-width">Add Answer</button>
                            </div>
                        }
                       
                        </div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",background:"red",height:"100%",width:"100%"}}>
                        <button 
                                    // class="btn rounded-pill mx-auto btn-justified btn-pink" 
                                    // className="heading-style"
                                    className="font-width"
                                    type="submit"
                                    onClick={(ev)=>{this.addQuestion(ev)}}
                                >Add Question
                        </button>
                        </div>
                             
                    </div>


                </div>
                <div className=" border pink-color body-style2" >
                        <heading className="font-width2">System Generated Questions List</heading>
                        </div>
                        <div className="body-style2 pink-color">
                        <table class="table table-striped table-bordered " >
                                
                                <thead>
                                  <tr>
                                    <th scope="col-1" className="font-width" style={{color:"white"}}>Sr.</th>
                                    <th scope="col-4" className="font-width" style={{color:"white"}}>Question</th>
                                    <th scope="col-2" className="font-width" style={{color:"white"}}>Topic</th>
                                    <th scope="col-2" className="font-width" style={{color:"white"}}>Subtopic</th>
                                    <th scope="col-1" className="font-width" style={{color:"white"}}>QType - isMCQ</th>
                                    <th scope="col-2" className="font-width" style={{color:"white"}}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                               this.quizModel.questions.map((question , index)=>(
                                    <tr>
                                        <th scope="row" className="font-width" >{(index+1)}</th>
                                        <td className="font-width"  style={{color:"white"}}>{question.statementWithElipse}</td>
                                        <td className="font-width" style={{color:"white"}}>{question.topic.topicNameWithElipse}</td>
                                        <td className="font-width" style={{color:"white"}}>{question.subTopic.SubtopicNameWithElipse}</td>
                                        <td className="font-width" style={{color:"white"}}>
                                        {
                                            (question.isMCQ === 'true' || question.isMCQ === true)? 'yes' : 'no'
                                        }
                                        
                                        </td>
                                        <td className="font-width" style={{color:"white"}}>
                                            
                                                <DeleteIcon
                                                    onClick={(ev)=>{this.deleteQuestion(index)}}
                                                />
                                            
                                                
                                        </td>
                                    </tr>
                               ))
                                }
                                 </tbody>
                               </table>
                               </div>
            </div>
        )
    }
}