import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-edit-test-job',
  templateUrl: './edit-test-job.component.html',
  styleUrls: ['./edit-test-job.component.scss']
})
export class EditTestJobComponent implements OnInit {

  test = []
  quiz = { question:"", reponses:[] }
  answer ={answer_content:"", is_true: false}
  
  constructor(private jobsService: JobsService, private router: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  addQuestion() { 
    this.test.push( this.quiz )
    this.answer ={answer_content:"", is_true: false}
    this.quiz = { question:"", reponses:[] }
    console.log( this.test )
    this.toastr.success('Question added successfully', '');


  }
  addAnswer() {
    this.quiz.reponses.push( this.answer )
    this.answer ={answer_content:"", is_true: false}
    console.log( this.quiz )
    this.checkAnsewers()
    this.toastr.success('Answer added successfully', '');

  }

  checkAnsewers(){
    var test = this.quiz.reponses.filter(  x => x.is_true  )
    return test.length

  }
  removeItem(item){
    this.test = this.test.filter(obj => obj !== item);
    this.toastr.success('Test removed successfully', '');

 }

  

  validateTest(){
    this.jobsService.addTest(this.test,this.router.snapshot.paramMap.get('id')).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Success', 'Test validated');


    })

  }

}
