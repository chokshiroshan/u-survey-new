import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyDCor4HaH5QqPA6DO82wKYIuXCLZibktx4",
    authDomain: "u-survey-new.firebaseapp.com",
    databaseURL: "https://u-survey-new.firebaseio.com",
    projectId: "u-survey-new",
    storageBucket: "u-survey-new.appspot.com",
    messagingSenderId: "872528796495"
  };
  firebase.initializeApp(config);

  class Usurvey extends Component {
    nameSubmit(event){
      var studentName = this.refs.name.value;
      this.setState({studentName: studentName},function(){
        console.log(this.state);
      });
    }
    answerSelected(event){
      var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    }else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
  }else if(event.target.name === 'answer3'){
    answers.answer3 = event.target.value;
  }else if(event.target.name === 'answer4'){
    answers.answer4 = event.target.value;
  }else if(event.target.name === 'answer5'){
    answers.answer5 = event.target.value;
  }
  this.setState({answers: answers},() => {
    console.log(this.state);
  });
}
    questionSubmitted(){
      firebase.database().ref('Usurvey/' + this.state.uid).set({
        studentName : this.state.studentName,
        answers : this.state.answers
      });
      this.setState({isSubmitted: true});
    }
    constructor(props){
      super(props);

      this.state = {
        uid : uuid.v1(),
        studentName: '',
        answers: {
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          answer5: ''
        },
        isSubmitted: false
      };
      this.nameSubmit = this.nameSubmit.bind(this);
      this.answerSelected = this.answerSelected.bind(this);
      this.questionSubmitted = this.questionSubmitted.bind(this);
    }
    render(){
      var studentName;
      var questions;
      if(this.state.studentName==='' && this.state.isSubmitted === false){
        studentName = <div>
          <h1>What is Your Name?</h1>
      <form onSubmit={this.nameSubmit}><input className='namy' type='text' placeholder='Enter Name.' ref='name' /></form>
    </div>;
    questions = '';
  }else if(this.state.studentName !== '' && this.state.isSubmitted===false){
    if(this.state.answers.answer4 === 'yes'){
        var ifvar = <div className="card">
        <label>Are u satisfied by our courses?</label><br />
        <input type="radio" name="answer5" value="yes" onChange={this.answerSelected} />yes
        <input type="radio" name="answer5" value="no" onChange={this.answerSelected} />no
        <input type="radio" name="answer5" value="maybe" onChange={this.answerSelected} />maybe
      </div>;
      }
    studentName=<div>
      <h1>Hello , { this.state.studentName }</h1>
    </div>;
    questions=<div>
      <h1>Here are some Questions</h1>
        <form onSubmit={this.questionSubmitted}>
            <div className="card">
              <label>What kind of course you like the most:</label><br />
              <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
              <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
              <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
            </div>
            <div className="card">
              <label>You are a:</label><br />
              <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />Student
              <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} />in-job
              <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} />looking-job
            </div>
            <div className="card">
              <label>Is online learning helpful:</label><br />
              <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />yes
              <input type="radio" name="answer3" value="no" onChange={this.answerSelected} />no
              <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} />maybe
            </div>
            <div className="card">
              <label>Have you ever enrolled in our any course?</label><br />
              <input type="radio" name="answer4" value='yes' onChange={this.answerSelected} />yes
              <input type="radio" name="answer4" value='no' onChange={this.answerSelected} />no
            </div>
            { ifvar }

            <input className="feedback-button" type="submit" value="submit"  />
          </form>
    </div>;
  }
        else if(this.state.isSubmitted===true){
          studentName = <h1>Thank you, { this.state.studentName }</h1>;
        }
      return(
        <div>
          {studentName}
        -------------------------------------
          {questions}
        </div>
      );
    }
  }

  export default Usurvey;
