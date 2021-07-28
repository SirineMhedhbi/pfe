import { serializeNodes } from "@angular/compiler/src/i18n/digest";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { filter } from "rxjs/operators";
import { DialogComponent } from "src/app/components/common/dialog/dialog.component";
import { JobsService } from "src/app/services/jobs.service";

@Component({
  selector: "app-candidat-test",
  templateUrl: "./candidat-test.component.html",
  styleUrls: ["./candidat-test.component.scss"],
})
export class CandidatTestComponent implements OnInit {
  test = [];
  quiz = { question: "", reponses: [] };
  answer = { answer_content: "", is_true: false };
  idtest;
  t = [];
  q = { id: "", rep: [] };
  m;

  constructor(
    private jobsService: JobsService,
    private router: ActivatedRoute,
    private matDialog: MatDialog,
    private toastr: ToastrService,
    private route: Router

  ) { }


  ngOnInit(): void {
    this.jobsService
      .showTest(this.router.snapshot.paramMap.get("id"))
      .subscribe((res: any) => {
        console.log(res);
        this.test = res.questions;
        this.idtest = res.id;
        for (let index = 0; index < this.test.length; index++) {
          const q = this.test[index];
          console.log(q);
          this.t.push({ question_id: q.id, answers: [] });
        }
        console.log(this.t);
      });

  }

  checkValue(e) {
    console.log(e);
    console.log(e.source.value.id);
    console.log(e.source.value.question_id);
    this.m = this.t.findIndex(
      (item) => e.source.value.question_id === item.question_id
    );
    console.log(this.m);
    if (e.source.checked) {
      this.t[this.m].answers.push(e.source.value.id);
    } else {
      this.t[this.m].answers = this.t[this.m].answers.filter(
        (item) => e.source.value.id !== item
      );
    }
    console.log(this.t);
  }
  testresult() {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { title: "Are you sure to validate your answers? " }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        this.jobsService.testresult(this.t, this.idtest).subscribe((res: any) => {
          console.log(res.success);
          if (res.success) {
            this.toastr.success(res.message, '');
            this.route.navigate(['/job-list']);

          } else {
            this.toastr.warning(res.message, '');
            if (res.redirect) {
              this.route.navigate(['/job-list']);

            }
          }
        });
      }
    });

  }

}
