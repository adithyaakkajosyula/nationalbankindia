import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, catchError, throwError } from 'rxjs';
import { ApplicationRegisterModel } from 'src/app/models/applicationRegister';
@Injectable({
  providedIn: 'root'
})

export class ApidataService{
  private baseUrl: string = 'https://localhost:44306/api/';
  constructor(private http:HttpClient){};
   qualificationa = new Observable((observer) => {
      let users = [
        {id:"1",qualification:"SSC"},
        {id:"2",qualification:"Degree"},
        {id:"3",qualification:"Inter"},
        {id:"4",qualification:"Occational"},
        {id:"5",qualification:"PG"}
      ]
  
      observer.next(users); // This method same as resolve() method from Angular 1
      console.log("am done");
      observer.complete();//to show we are done with our processing
      // observer.error(new Error("error message"));
  
  });

  documenttypes = Observable.create((observer :any) => {
      let documenttypes = [
        {id:"1",documenttype:"Aadhar"},
        {id:"2",documenttype:"PAN"},
        {id:"3",documenttype:"Income"},
        {id:"4",documenttype:"BankAccount"},
        {id:"5",documenttype:"Others"}
      ]
  
      observer.next(documenttypes); // This method same as resolve() method from Angular 1
      console.log("am done");
      observer.complete();//to show we are done with our processing
      // observer.error(new Error("error message"));
  
  });

  hobbies = Observable.create((observer :any) => {
      let hobbitypes = [
        {id:"1",hobbietype:"Running"},
        {id:"2",hobbietype:"Walking"},
        {id:"3",hobbietype:"Reading"},
        {id:"4",hobbietype:"Watching"},
        {id:"5",hobbietype:"Playing"}
      ]
  
      observer.next(hobbitypes); // This method same as resolve() method from Angular 1
      console.log("am done");
      observer.complete();//to show we are done with our processing
      // observer.error(new Error("error message"));
  
  });

  public getcountries() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}ApiDataService/countries`);
  };


public getstates(): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}ApiDataService/states`);
};

 public getdistricts(): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}ApiDataService/districts`);
};

public getappraisals(){
  let appraisals = Observable.create((observer :any) => {
    let appraisaltypes = [
      {id:"1",name:"adithya"},
      {id:"2",name:"anji"},
      {id:"3",name:"hari"},
      {id:"4",name:"pavan - [1]"}
    ]

    observer.next(appraisaltypes); // This method same as resolve() method from Angular 1
    console.log("am done");
    observer.complete();
});
    return appraisals;
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

}