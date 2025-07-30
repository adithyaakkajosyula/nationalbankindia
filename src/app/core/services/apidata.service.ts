import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, catchError, throwError, of } from 'rxjs';
import { ApplicationRegisterModel } from 'src/app/models/applicationRegister';
@Injectable({
  providedIn: 'root'
})

export class ApidataService{
   isLocal : boolean = window.location.hostname === 'localhost';

  private baseUrl: string = this.isLocal ? 'https://localhost:44306/api/': 'https://nationalbank-api.azurewebsites.net/api/';
  constructor(private http:HttpClient){};
   qualificationa = of([
  {id:"1",qualification:"SSC"},
  {id:"2",qualification:"Degree"},
  {id:"3",qualification:"Inter"},
  {id:"4",qualification:"Occational"},
  {id:"5",qualification:"PG"}
]);

 documenttypes = of([
  {id:1,documenttype:"Aadhar"},
  {id:2,documenttype:"PAN"},
  {id:3,documenttype:"Income"},
  {id:4,documenttype:"BankAccount"},
  {id:5,documenttype:"Others"}
]);

  hobbies = of([
  {id:"1",hobbietype:"Running"},
  {id:"2",hobbietype:"Walking"},
  {id:"3",hobbietype:"Reading"},
  {id:"4",hobbietype:"Watching"},
  {id:"5",hobbietype:"Playing"}
]);

  public getcountries() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}ApiDataService/countries`);
  };


public getstates(): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}ApiDataService/states`);
};

 public getdistricts(): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}ApiDataService/districts`);
};

public getappraisals() {
  return of([
    {id:"1",name:"adithya"},
    {id:"2",name:"anji"},
    {id:"3",name:"hari"},
    {id:"4",name:"pavan - [1]"}
  ]);
}
getApplications(): Observable<ApplicationRegisterModel[]> {
  return this.http.get<ApplicationRegisterModel[]>(`${this.baseUrl}ApplicationRegister/GetApplicationsList`);
}

getApplicationById(id: number): Observable<ApplicationRegisterModel> {
  return this.http.get<ApplicationRegisterModel>(`${this.baseUrl}ApplicationRegister/getapplications/${id}`);
}

createApplication(formData : any): Observable<any> {
  const formDataString = Array.from(formData.entries())
  .map((entry: [string, string | File]) => `${entry[0]}: ${entry[1]}`)
  .join('\n');
console.log(formDataString);
  return this.http.post<any>(`${this.baseUrl}ApplicationRegister/AddApplication`, formData).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error occurred while creating application:', error);
      const errorMessage = JSON.stringify(error.error?.errors);
      alert(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
}

updateApplication(application: ApplicationRegisterModel): Observable<ApplicationRegisterModel> {
  return this.http.put<ApplicationRegisterModel>(`${this.baseUrl}/${application.id}`, application);
}

deleteApplication(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
public viewFile(id: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}ApplicationRegister/ViewFile/${id}`, {
    responseType: 'blob'
  });
}

}