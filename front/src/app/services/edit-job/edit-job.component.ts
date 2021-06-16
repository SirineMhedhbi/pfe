import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../jobs.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {
  form: FormGroup;
  job
  autocompleteItems = ['Item1', 'item2', 'item3'];

  constructor(private usersService: UsersService, private jobsService: JobsService, private fb: FormBuilder, private router: ActivatedRoute, private route: Router) {
    this.form = this.fb.group({
      title: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      company_name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      job_salary: new FormControl("", Validators.compose([Validators.required])),
      job_time: new FormControl("", Validators.compose([Validators.required])),
      job_experience: new FormControl("", Validators.compose([Validators.required])),
      offerSkills: new FormControl('', Validators.compose([Validators.required])),
      contract: new FormControl('', Validators.compose([Validators.required])),
      qualification: new FormControl('', Validators.compose([Validators.required])),

    });
  }

  get f() { return this.form.controls; }


  ngOnInit(): void {

    this.jobsService.showJob(this.router.snapshot.paramMap.get('id')).subscribe(result => {

      this.job = result

      this.form = this.fb.group({
        title: new FormControl(this.job.title, Validators.compose([Validators.required, Validators.minLength(3)])),
        category: new FormControl(this.job.category, Validators.compose([Validators.required, Validators.minLength(3)])),
        location: new FormControl(this.job.location, Validators.compose([Validators.required, Validators.minLength(3)])),
        description: new FormControl(this.job.description, Validators.compose([Validators.required, Validators.minLength(3)])),
        company_name: new FormControl(this.job.company_name, Validators.compose([Validators.required, Validators.minLength(3)])),
        job_salary: new FormControl(this.job.job_salary, Validators.compose([Validators.required])),
        job_time: new FormControl(this.job.job_time, Validators.compose([Validators.required])),
        job_experience: new FormControl(this.job.job_experience, Validators.compose([Validators.required])),
        offerSkills: new FormControl(this.job.offerSkills, Validators.compose([Validators.required])),
        contract: new FormControl(this.job.contract, Validators.compose([Validators.required])),
        qualification: new FormControl(this.job.qualification, Validators.compose([Validators.required])),


      });
    })


  }
  editJob() {
    this.jobsService.editJob(this.form.value, this.job.offer.id).subscribe((res: any) => {
      this.route.navigate(['my-jobs']);
    })
  }








}
