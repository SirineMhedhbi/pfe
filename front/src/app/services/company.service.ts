import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) {

   }
   showCompany(){
    return this.http.get('/company/index',
  
     ) }
     
     showCom (id){
      return this.http.get('/company/show/'+id);
  
    }
    companyLast(){
      return this.http.get('/company/company',
    
       ) }
     
     editCompany(company,id){
      console.log(company)
      return this.http.put('/offers/update/'+ id,
      {
        "title":company.title,
        "category":company.category,
        "location":company.location,
        "linkedin":company.linkedin,
        "facebook":company.facebook,
        "github":company.github,
        "instagram":company.instagram,


  
        
      })
    }


    userCompany(){
      return this.http.get('/company/userCompany/',
      )}

      updateCompany(company){
      return this.http.put('/company/updateCompany/',
      {
        "title":company.title,
        "category":company.category,
        "location":company.location,
        "linkedin":company.linkedin,
        "facebook":company.facebook,
        "github":company.github,
        "instagram":company.instagram,
        "description":company.description,
        "site":company.site,
        "gmail":company.gmail,
        "twitter":company.twitter,



  
        
      })

      }

      getCategories(){
        return this.http.get('/categories/index/',
        )}
}
