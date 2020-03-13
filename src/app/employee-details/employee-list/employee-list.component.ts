import { Component, OnInit } from '@angular/core';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/app/shared/employee-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public service:EmployeeDetailService,
    private toastr:ToastrService) { }

  searchText: any;
  itemsPerPage = 5;
  p: any;

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();

    console.log(this.service)
  }

  populateForm(el:EmployeeDetail){
    this.service.formData = Object.assign({},el);
    //Object.assign(this.service.formData,el);

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

  updateRecord(form: NgForm)
  {
    this.service.putEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Updated Successfully','Employee Details')
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  onDelete(code: number){
    if(confirm('Are you sure to delete this Record ?')) {
    this.service.deleteEmployeeDetail(code)
    .subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted Successfully', 'Payment Detail Register')
      },
    err => {
      console.log(err);
    });
    }
  }

}
