import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  form: FormGroup;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  company
  constructor(private usersService: UsersService,private companyService: CompanyService,private jobsService: JobsService,private fb: FormBuilder,private router: ActivatedRoute,private route:Router) { 
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




  });
 
   
}

get f() { return this.form.controls; }




  ngOnInit(): void {


    this.companyService.showCom(this.router.snapshot.paramMap.get('id')).subscribe(result =>{
      this.company=result
      
      this.form = this.fb.group({

        title: new FormControl(this.company.company.name, Validators.compose([Validators.required, Validators.minLength(3)])),
        category: new FormControl(this.company.company.category, Validators.compose([Validators.required, Validators.minLength(3)])),
        location: new FormControl(this.company.company.location, Validators.compose([Validators.required, Validators.minLength(3)])),
        description: new FormControl(this.company.company.description, Validators.compose([Validators.required, Validators.minLength(3)])),
        linkedin: new FormControl(this.company.company.linkedin, Validators.compose([Validators.required])),
        github: new FormControl(this.company.company.github, Validators.compose([Validators.required])),
        facebook: new FormControl(this.company.company.facebook, Validators.compose([Validators.required])),
        instagram: new FormControl(this.company.company.instagram, Validators.compose([Validators.required])),
        gmail: new FormControl(this.company.company.gmail, Validators.compose([Validators.required])),
        site: new FormControl(this.company.company.site, Validators.compose([Validators.required])),
        twitter: new FormControl(this.company.company.twitter, Validators.compose([Validators.required])),
        lat: new FormControl(this.company.company.lat, Validators.compose([Validators.required])),
        lng: new FormControl(this.company.company.lng, Validators.compose([Validators.required])),
  


    });
  })


  }
  updateCompany(){
    console.log(this.form.value)
  this.companyService.editCompany(this.form.value,this.router.snapshot.paramMap.get('id')).subscribe((res:any)=>{
    console.log(res)
    this.route.navigate(['admin/companies']);

    
  
  })
  } 
  public handleAddressChange(address: Address) {
    this.f.location.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }
}
