import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(public service:EmployeeDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm)
  {
    if(form!=null)
    form.resetForm();
    this.service.formData = {
      Code: 0,
      FirstName:'',
      LastName:'',
      Type:'',
      Department:'',
      TwoWheeler: false,
      FourWheeler: false
    }
  }

  insertRecord(form: NgForm)
  {
    this.service.postEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Added Successfully','Employee Details')
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
