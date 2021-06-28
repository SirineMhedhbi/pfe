import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  data
  skills=[]
  job
  // jobs=[]
  form: FormGroup;
  autocompleteItems = ['Item1', 'item2', 'item3'];
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;


  constructor(private usersService: UsersService, private jobsService: JobsService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.form = this.fb.group({
      title: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      company_name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      job_salary: new FormControl('', Validators.compose([Validators.required])),
      job_time: new FormControl('part_time', Validators.compose([Validators.required])),
      job_experience: new FormControl('junior', Validators.compose([Validators.required])),
      offerSkills: new FormControl('', Validators.compose([Validators.required])),
      contract: new FormControl('', Validators.compose([Validators.required])),
      qualification: new FormControl('', Validators.compose([Validators.required])),




    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {}
  
  
  saveJob() {
    
  //  for (let index = 0; index < this.form.get('offerSkills').value.length; index++) {
  //    const element = this.form.get('offerSkills').value[index];
  //    this.skills=element.value
  //    console.log(this.skills)
  //  }
    this.data = {
      offer: {
        title: this.form.get('title').value,
        category: this.form.get('category').value,
        description: this.form.get('description').value,
        location: this.form.get('location').value,
        company_name: this.form.get('company_name').value,
        job_salary: this.form.get('job_salary').value,
        job_time: this.form.get('job_time').value,
        job_experience: this.form.get('job_experience').value,
        qualification: this.form.get('qualification').value,
        contract: this.form.get('contract').value,
        offerSkills: this.form.get('offerSkills').value,



      }

    }

    this.jobsService.addJob(this.data).subscribe(

      (response) => {
        console.log(this.data)
        this.router.navigate(['my-jobs']);
        this.toastr.success('Job added successfully', '');

      },
      (error) => console.log(error)
    )
    }
    public handleAddressChange(address: Address) {
      this.f.location.setValue(address.formatted_address)
      this.f.lat.setValue(address.geometry.location.lat())
      this.f.lng.setValue(address.geometry.location.lng())
    }
}




