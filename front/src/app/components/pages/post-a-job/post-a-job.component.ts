import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-a-job', 
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  data
  job
  // jobs=[]
  form: FormGroup;
  constructor(private usersService: UsersService,private jobsService: JobsService,private fb: FormBuilder,private router: Router) { 
    this.form = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      company_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      job_salary: new FormControl('', Validators.compose([Validators.required])),
      job_time: new FormControl('part_time', Validators.compose([Validators.required])),
      job_experience: new FormControl('junior', Validators.compose([Validators.required])),

  });
}

get f() { return this.form.controls; }

  ngOnInit(): void {
   
      
    }
    addJob(){
      console.log(this.form.value)
      this.job=this.form.value
      console.log(this.job)

      
    }
    saveJob(){
      this.data={
        offer:{
        title:  this.form.get('title').value,
        category:  this.form.get('category').value,
        description:  this.form.get('description').value,
        location:  this.form.get('location').value,
        company_name:  this.form.get('company_name').value,
       job_salary:  this.form.get('job_salary').value,
       job_time:  this.form.get('job_time').value,
       job_experience:  this.form.get('job_experience').value,
      }
      
      }
  
       this.jobsService.addJob(this.data).subscribe(

        (response) => {console.log(this.data)
          this.router.navigate(['my-jobs']);
        },
       


        
         (error) => console.log(error)

       )
  
  
    
    }

   
    

   
}
 


