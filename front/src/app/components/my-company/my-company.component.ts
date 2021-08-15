import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-company',
  templateUrl: './my-company.component.html',
  styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
  form: FormGroup;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  company
  filePath
  constructor(private usersService: UsersService,private companyService: CompanyService,private jobsService: JobsService,private fb: FormBuilder,private router: ActivatedRoute,private route:Router, private toastr: ToastrService) { 
    this.form = this.fb.group({
      title: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      category: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      location: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      linkedin: new FormControl("", Validators.compose([Validators.required])),
      github: new FormControl("", Validators.compose([Validators.required])),
      facebook: new FormControl("", Validators.compose([Validators.required])),
      instagram: new FormControl("", Validators.compose([Validators.required])),
      gmail: new FormControl("", Validators.compose([Validators.required])),
      site: new FormControl("", Validators.compose([Validators.required])),
      twitter: new FormControl("", Validators.compose([Validators.required])),
      lat: new FormControl('', Validators.compose([Validators.required])),
      lng: new FormControl('', Validators.compose([Validators.required])),
      image: new FormControl('', Validators.compose([Validators.required])),





  });
 
   
}

get f() { return this.form.controls; }




  ngOnInit(): void {


    this.companyService.userCompany().subscribe(result =>{
    
      this.company=result
      console.log(result)
      this.filePath = environment.baseUrl + this.company.avatar


      this.form = this.fb.group({
        title: new FormControl(this.company.title, Validators.compose([Validators.required, Validators.minLength(3)])),
        category: new FormControl(this.company.category, Validators.compose([Validators.required, Validators.minLength(3)])),
        location: new FormControl(this.company.location, Validators.compose([Validators.required, Validators.minLength(3)])),
        description: new FormControl(this.company.description, Validators.compose([Validators.required, Validators.minLength(3)])),
        linkedin: new FormControl(this.company.linkedin, Validators.compose([Validators.required])),
        github: new FormControl(this.company.github, Validators.compose([Validators.required])),
        facebook: new FormControl(this.company.facebook, Validators.compose([Validators.required])),
        instagram: new FormControl(this.company.instagram, Validators.compose([Validators.required])),
        gmail: new FormControl(this.company.gmail, Validators.compose([Validators.required])),
        site: new FormControl(this.company.site, Validators.compose([Validators.required])),
        twitter: new FormControl(this.company.twitter, Validators.compose([Validators.required])),
        lat: new FormControl(this.company.lat, Validators.compose([Validators.required])),
        lng: new FormControl(this.company.lng, Validators.compose([Validators.required])),
        image: new FormControl('', Validators.compose([Validators.required])),

  


    });
  })


  }
  updateCompany(){
    console.log(this.form.value)
  this.companyService.updateCompany(this.form.value).subscribe((res:any)=>{
    console.log(res)
    this.toastr.success('Company Updated', '');
    
  
  })
  } 
  public handleAddressChange(address: Address) {
    this.f.location.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }
  imagePreview(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result
      this.form.patchValue({
        image: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  }

