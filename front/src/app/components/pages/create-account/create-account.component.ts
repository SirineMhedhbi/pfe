import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  public show: boolean = false;
  public Editor = ClassicEditor;

  company
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  companies
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private companyService: CompanyService, private toastr: ToastrService) {

  }


  signUpUser() {
    console.log(this.form.value)
    this.authService.signUp(this.form.value).subscribe(
      (result: any) => {
        if (result['status'] == 'success') {
          this.form.reset();
          this.router.navigate(['login']);
          this.toastr.success('You have to confirm your account via Email', 'SignUp succesfully');
        }
      }
    )
  }
  changeRole(item) {
    console.log(item.value)
    // if(event.target.value=="candidat"){
    //   debugger
    // }
    if (item.value == "candidat") {
      this.show = false
      this.form.controls.company_id.setValue("")


      // this.show=true
    }
    else {
      this.show = !this.show;

    }
    // this.show = !this.show;
  }
  showCompany() {

  }

  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.companyService.showCompany().subscribe(result => {
      this.companies = result

    })
    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      nickname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      birthday: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(''),
      post: new FormControl('', Validators.compose([Validators.required])),
      company_id: new FormControl(''),
      lat: new FormControl('', Validators.compose([Validators.required])),
      lng: new FormControl('', Validators.compose([Validators.required])),


    });

  }

  public handleAddressChange(address: Address) {
    this.f.address.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }

}
