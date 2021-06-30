import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-test',
  templateUrl: './job-test.component.html',
  styleUrls: ['./job-test.component.scss']
})
export class JobTestComponent implements OnInit {
  test = []
  quiz = { question:"", reponses:[] }
  answer ={answer_content:"", is_true: false}
  constructor() { }

  ngOnInit(): void {
  }
  addQuestion() {
    this.test.push( this.quiz )
    this.answer ={answer_content:"", is_true: false}
    this.quiz = { question:"", reponses:[] }
    console.log( this.test )

  }
  addAnswer() {
    this.quiz.reponses.push( this.answer )
    this.answer ={answer_content:"", is_true: false}
    console.log( this.quiz )
    this.checkAnsewers()
  }

  checkAnsewers(){
    var test = this.quiz.reponses.filter(  x => x.is_true  )
    return test.length

  }

}
