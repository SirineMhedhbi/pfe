import { Component, OnInit } from "@angular/core";
import { JobsService } from "src/app/services/jobs.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-job-test",
  templateUrl: "./job-test.component.html",
  styleUrls: ["./job-test.component.scss"],
})
export class JobTestComponent implements OnInit {
  test = [];
  quiz = { question: "", reponses: [] };
  answer = { answer_content: "", is_true: false };

  constructor(
    private jobsService: JobsService,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  addQuestion() {
    this.test.push(this.quiz);
    this.answer = { answer_content: "", is_true: false };
    this.quiz = { question: "", reponses: [] };
    console.log(this.test);
    this.toastr.success("Question added successfully", "");
  }
  addAnswer() {
    this.quiz.reponses.push(this.answer);
    this.answer = { answer_content: "", is_true: false };
    console.log(this.quiz);
    this.checkAnsewers();
    this.toastr.success("Answer added successfully", "");
  }

  checkAnsewers() {
    var test = this.quiz.reponses.filter((x) => x.is_true);
    return test.length;
  }
  removeItem(item) {
    this.test = this.test.filter((obj) => obj !== item);
    this.toastr.info("Test removed successfully", "");
  }
  removeAnswer(item) {
    this.quiz.reponses = this.quiz.reponses.filter((obj) => obj !== item);
    this.toastr.success("Answer removed successfully", "");
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
      });
  }
}
