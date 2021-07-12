import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-candidat-test',
  templateUrl: './candidat-test.component.html',
  styleUrls: ['./candidat-test.component.scss']
})
export class CandidatTestComponent implements OnInit {
  test = []
  quiz = { question:"", reponses:[] }
  answer ={answer_content:"", is_true: false}
  idtest

  constructor(private jobsService: JobsService, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.jobsService.showTest(this.router.snapshot.paramMap.get("id")).subscribe((res: any) => {
      console.log(res);
      this.test=res.questions
      this.idtest=res.id
      console.log(this.test)


    });
  }

}
