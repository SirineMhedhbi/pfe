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
  companies
  filePath
  form: FormGroup;
  pdfFilePath
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private companyService: CompanyService, private toastr: ToastrService) {

  }


 
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.companyService.showCompany().subscribe(result => {
      this.companies = result
      console.log(this.companies)

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
      image: new FormControl(''),
      uploaded_cv: new FormControl(''),
    });

  }
  signUpUser() {
    console.log(this.form.value)
    if(this.form.value.image == ""){
      this.toastr.warning('Please chose an image', '');
      return
    }
    if(this.form.value.uploaded_cv == "" && this.form.value.role == "candidat"){
      this.toastr.warning('Please upload your cv', '');
      return
    }
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

      this.pdfFilePath = undefined
      // this.show=true
    }
    else {
      this.show = !this.show;

    }
    // this.show = !this.show;
  }
  showCompany() {

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

  public handleAddressChange(address: Address) {
    this.f.address.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }
  uploadCv(files){
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      this.pdfFilePath = reader.result
      this.form.patchValue({
        uploaded_cv: reader.result
      });
      
    }
    reader.readAsDataURL(file)
  }
  // previewCv(){
  //   // window.open(this.pdfFilePath, "_blank");
  //   // window.open("data:application/pdf," + encodeURI(this.pdfFilePath)); 
  //   let pdfWindow = window.open("");
  // pdfWindow.document.write("<html<head><title>oki</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>");
  // pdfWindow.document.write("<body><embed width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(this.pdfFilePath)+"#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>");
  // }

}
