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
  constructor(private usersService: UsersService,private jobsService: JobsService,private fb: FormBuilder,private router: ActivatedRoute,private route:Router) { 
    this.form = this.fb.group({
      title: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      company_name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      job_salary: new FormControl("", Validators.compose([Validators.required])),
      job_time: new FormControl("", Validators.compose([Validators.required])),
      job_experience: new FormControl("", Validators.compose([Validators.required])),

  });
 
   
}

get f() { return this.form.controls; }


  ngOnInit(): void {
    
    this.jobsService.showJob(this.router.snapshot.paramMap.get('id')).subscribe(result =>{
    
      this.job=result
      console.log(result)

      this.form = this.fb.group({
        title: new FormControl(this.job.offer.title, Validators.compose([Validators.required, Validators.minLength(3)])),
        category: new FormControl(this.job.offer.category, Validators.compose([Validators.required, Validators.minLength(3)])),
        location: new FormControl(this.job.offer.location, Validators.compose([Validators.required, Validators.minLength(3)])),
        description: new FormControl(this.job.offer.description, Validators.compose([Validators.required, Validators.minLength(3)])),
        company_name: new FormControl(this.job.offer.company_name, Validators.compose([Validators.required, Validators.minLength(3)])),
        job_salary: new FormControl(this.job.offer.job_salary, Validators.compose([Validators.required])),
        job_time: new FormControl(this.job.offer.job_time, Validators.compose([Validators.required])),
        job_experience: new FormControl(this.job.offer.job_experience, Validators.compose([Validators.required])),
  
    });
  })


  }
  editJob(){
    console.log(this.form.value)
  this.jobsService.editJob(this.form.value,this.job.offer.id).subscribe((res:any)=>{
    console.log(res)
    this.route.navigate(['my-jobs']);

    
  
  })
  } 







  
}
