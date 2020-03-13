import { Injectable } from '@angular/core';
import { EmployeeDetail } from './employee-detail.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  formData: EmployeeDetail;
  readonly rootURL = 'https://localhost:44346/api';
  employeeList: EmployeeDetail[];

  constructor(private http:HttpClient) { }

  postEmployeeDetail(){
    return this.http.post(this.rootURL+'/Employees', this.formData);
  }

  putEmployeeDetail(){
    return this.http.put(this.rootURL+'/Employees/'+ this.formData.Code, this.formData);
  }

  deleteEmployeeDetail(code){
    return this.http.delete(this.rootURL+'/Employees/'+ code);
  }

  // refreshList(){
  //   this.http.get(this.rootURL + '/Employees')
  //   .toPromise()
  //   .then(res => this.employeeList = res as EmployeeDetail[],
  //     err => console.log(err));
  // }

  refreshList(){
    this.http.get(this.rootURL + '/Employees')
    .subscribe(
      res => this.employeeList = res as EmployeeDetail[]);
  }
}
