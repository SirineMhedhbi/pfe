import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './companies/companies.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
    declarations: [

        CompaniesComponent,

        EditCompanyComponent],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        AdminRoutingModule,
        GooglePlaceModule,
        MatDialogModule,
        MatCheckboxModule,
        MatTabsModule,
        MatRadioModule,
        MatBadgeModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class AdminModule { }