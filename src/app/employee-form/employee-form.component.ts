import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }
  errormsg:any;
  successmsg:any;
  get_Employee_data_id:any;

  ngOnInit(): void {
    
    this.get_Employee_data_id = this.router.snapshot.paramMap.get('employee_id');
    if (this.get_Employee_data_id) {
      this.service.getSingleEmpData(this.get_Employee_data_id).subscribe((res)=>{
        console.log(res, 'res=>');
        this.EmployeeForm.patchValue({
          employee_id:res.emp_data[0].employee_id,
          employee_name:res.emp_data[0].employee_name,
          address:res.emp_data[0].address,
          tel:res.emp_data[0].tel
        
        })
      });
    }
  }

  EmployeeForm = new FormGroup({
    'employee_id' : new FormControl('',Validators.required),
    'employee_name' : new FormControl('',Validators.required),
    'address' : new FormControl('',Validators.required),
    'tel' : new FormControl('',Validators.required)
  });

  EmployeeSubmit(){
    if (this.EmployeeForm.valid) {
      console.log(this.EmployeeForm.value);
      this.service.createEmpData(this.EmployeeForm.value).subscribe((res)=>{
        console.log(res, 'res=>');
        this.EmployeeForm.reset();
        //this.successmsg = res.message;
        
      });
    } else {
      this.errormsg = "All field is required !";
    }

  }

  //upadte data
  updateEmpData(){
    console.log(this.EmployeeForm.value,'updated employee form');
    if (this.EmployeeForm.valid) {
      this.service.updateEmpData(this.EmployeeForm.value, this.get_Employee_data_id).subscribe((res)=>{
        console.log(res,'res employee Updated');
        alert("อัพเดตข้อมูลพนักงานสำเร็จ")
        
      });
    } else {
      this.errormsg = "All field is required !";
    }
  }
}
