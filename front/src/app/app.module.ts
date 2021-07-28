import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';












import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { JobListComponent } from './components/pages/job-list/job-list.component';
import { FavouriteJobComponent } from './components/pages/favourite-job/favourite-job.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { CandidateListComponent } from './components/pages/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './components/pages/candidate-details/candidate-details.component';
import { SingleResumeComponent } from './components/pages/single-resume/single-resume.component';
import { SubmitResumeComponent } from './components/pages/submit-resume/submit-resume.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { CompanyListComponent } from './components/pages/company-list/company-list.component';
import { CompanyDetailsComponent } from './components/pages/company-details/company-details.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateAccountComponent } from './components/pages/create-account/create-account.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SingleProfileComponent } from './components/pages/single-profile/single-profile.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { TermsAndConditionsComponent } from './components/pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserRequestInterceptor } from './user.request.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthGuard } from './services/auth.guard';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyJobsComponent } from './components/pages/my-jobs/my-jobs.component';
import { EditJobComponent } from './services/edit-job/edit-job.component';
import { MyCompanyComponent } from './components/my-company/my-company.component';
import { OffersDetailsComponent } from './components/offers-details/offers-details.component';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { JobTestComponent } from './components/pages/post-a-job/job-test/job-test.component';
import { EditTestJobComponent } from './components/pages/post-a-job/edit-test-job/edit-test-job.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ForgetPasswordComponent } from './components/pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { CandidatTestComponent } from './components/pages/job-list/candidat-test/candidat-test.component';
import { ApplyListComponent } from './components/pages/apply-list/apply-list.component';






@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    AboutComponent,
    JobListComponent,
    FavouriteJobComponent,
    JobDetailsComponent,
    PostAJobComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
    SingleResumeComponent,
    SubmitResumeComponent,
    PricingComponent,
    DashboardComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    LoginComponent,
    CreateAccountComponent,
    ProfileComponent,
    SingleProfileComponent,
    ErrorComponent,
    FaqComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    BlogDetailsComponent,
    BlogComponent,
    MyJobsComponent,
    EditJobComponent,
    MyCompanyComponent,
    OffersDetailsComponent,
    DialogComponent,
    JobTestComponent,
    EditTestJobComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    CandidatTestComponent,
    ApplyListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,

    NgSelectModule,
    TagInputModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
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








  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserRequestInterceptor,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
