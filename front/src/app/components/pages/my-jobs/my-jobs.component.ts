import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  form: FormGroup;
  company
  data
  jobs
  job={title:"",category:"",company_name:"",location:"",offer_type:"",job_experience:"",job_salary:"",job_time:"",description:""}

  constructor(private usersService: UsersService,private jobsService: JobsService,private fb: FormBuilder) { 
    this.form = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      job_salary: new FormControl('', Validators.compose([Validators.required])),
      job_time: new FormControl('part_time', Validators.compose([Validators.required])),
      job_experience: new FormControl('junior', Validators.compose([Validators.required])),

  })
  
  }

  ngOnInit(): void {
    this.jobsService.userJobs().subscribe((res:any)=>{
      this.jobs = res.offers
      console.log(res.company)
      this.company=res.company 
      console.log(res)

    })
    

  }
  

  removeJob(id){
    this.jobsService.deleteJob(id).subscribe((res:any)=>{
      this.jobs = this.jobs.filter(function(el) { return el.id != id });
      console.log(this.jobs)
    })
   
  }
  
  
  

 

}
