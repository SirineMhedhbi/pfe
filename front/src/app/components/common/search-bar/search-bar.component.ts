import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  form: FormGroup;
  categories
  selectedValue=-1
  constructor(private fb: FormBuilder, private companyService: CompanyService, private _router: Router, private _route: ActivatedRoute) { 
    this.form = this.fb.group({
      title: new FormControl(''),
      category: new FormControl(-1),
      address: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
  
    });
    this.companyService.getCategories().subscribe((res: any) => {
      
      this.categories = res
      
    })
    }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   title: new FormControl(''),
    //   category: new FormControl(''),
    //   address: new FormControl(''),
    //   lat: new FormControl(''),
    //   lng: new FormControl(''),
  
    // });

    this._route.queryParams
      .subscribe(params => {
        if(params.query){
          let data = JSON.parse(params.query)
          console.log(data) 
          this.selectedValue = data.category
          this.form = this.fb.group({
            title: new FormControl(data.title),
            category: new FormControl(data.category),
            address: new FormControl(data.address),
            lat: new FormControl(data.lat),
            lng: new FormControl(data.lng),
        
          });
        }
         // { orderby: "price" }
      }
    );
  
    
    
    
  }
  get f() { return this.form.controls; }

  public handleAddressChange(address: Address) {
    this.f.address.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }

  addressChanged(e){
    if (e.target.value == "") {
      this.f.lat.setValue("")
    this.f.lng.setValue("")
      
    }

  }

  onSubmit(){
    if (this._router.url.includes("job")) {
      this._router.navigate([], {
        queryParams: {
          query: JSON.stringify(this.form.value)
        },
        queryParamsHandling: 'merge',
      }); 
    } else {
      this._router.navigate(['job-list'], {
        queryParams: {
          query: JSON.stringify(this.form.value)
        },
        queryParamsHandling: 'merge',
      });
    }
    
  }
  resetForm(){
    this.f.lat.setValue("")
    this.f.lng.setValue("")
    this.f.title.setValue("")
    this.f.category.setValue(-1)
    this.f.address.setValue("")

    this._router.navigate([], {
      queryParams: {
        query: JSON.stringify(this.form.value)
      },
      queryParamsHandling: 'merge',
    });
  }
}
