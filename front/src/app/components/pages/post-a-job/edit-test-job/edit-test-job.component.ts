import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  idtest
  
  constructor( private jobsService: JobsService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private route:  Router) { }

  ngOnInit(): void {
 
      this.jobsService.showTest(this.router.snapshot.paramMap.get("id")).subscribe((res: any) => {
        console.log(res);
        this.test=res.questions
        this.idtest=res.id
        console.log(this.test)


      });

    
  }
  addQuestion() {

    this.jobsService.addquestion(this.quiz, this.idtest ).subscribe((res: any) => {
      console.log(res);
      this.test.push(res);
        console.log(this.test)
       this.answer = { answer_content: "", is_true: false };
    this.quiz = { question: "", reponses: [] };
    this.toastr.info("Question added successfully", "");

    });
   
   
  }
  addAnswer() {
    this.quiz.reponses.push(this.answer);
    this.answer = { answer_content: "", is_true: false };
    console.log(this.quiz);
    this.checkAnsewers();
    this.toastr.info("Answer added successfully", "");
  }

  checkAnsewers() {
    var test = this.quiz.reponses.filter((x) => x.is_true);
    return test.length;
  }
  removeItem(item) {
    this.test = this.test.filter((obj) => obj !== item);
    this.toastr.info("question removed successfully", "");
  }
  removeAnswer(item) {
    this.quiz.reponses = this.quiz.reponses.filter((obj) => obj !== item);
    this.toastr.info("Answer removed successfully", "");
  }
  removeQA(item) {
    console.log(item);
    for (let i = 0; i < this.test.length; i++) {
      const q = this.test[i];
      console.log(q);
      for (let i = 0; i < q.reponses.length; i++) {
        const r = q.reponses[i];
        q.reponses = q.reponses.filter((obj) => obj !== item);
      }
    }
  }



  validateTest() {
    this.jobsService
      .addTest(this.test, this.router.snapshot.paramMap.get("id"))
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.success("Success", "Test validated");
        this.route.navigate(['my-jobs'])
      });
  }
  removeQuestion(id){
    if (this.test.length > 3) {
      this.jobsService.deleteQuestion(id).subscribe((res:any)=>{
        this.test = this.test.filter(item => item.id !== id);
        this.toastr.success('Question Removed', '');
      })
    }else{
      this.toastr.warning('Test must have at least three questions', 'Question can not be removed');
    }
   
   
  }
  editQuestion(item) {
    this.jobsService.editQuestion(item.question_content,item.id).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Question Updated', '');
    })

  }
  editAnswer(item) {
    this.jobsService.editAnswer(item.answer_content,item.id).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Answer Updated', '');
    })

  }
 

}