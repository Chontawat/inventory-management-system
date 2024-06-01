import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],

})
export class EmployeeComponent implements OnInit {
  
  
  constructor(private service:ApiserviceService) { 
    
  }
  @ViewChild(MatSort) empSort! : MatSort;
  readempData: any[] = [];
  sucessmsg:any;
  searchEmp : string = '';

  displayedColumns: string[] = ['employee_id','employee_name','address','tel','edit','delete'];
  dataSource = new MatTableDataSource<any>();

 

  ngOnInit(): void {
    this.getAllempData();
    this.dataSource.sort = this.empSort;

  }


  public getAllempData() {
    this.service.getAllempData().subscribe((res)=>{
      console.log(res, "res==>");
      this.dataSource.data = res.emp_data;
    });
  }

  //delete employee data
  deleteEmpData(employee_id:any){
    console.log(employee_id,'Delete employee_id ==>');
    this.service.deleteEmpData(employee_id).subscribe((res)=>{
      console.log(res, "delete emp res==>");
      // this.sucessmsg = res.messsage;
      this.getAllempData();
    });
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generate_EmpPDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;
    
   
    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = ['EmpNo.', 'EmployeeName', 'Address', 'Number'];

    // Set table rows
    const rows = this.dataSource.data.map(obj => [obj.employee_id, obj.employee_name, obj.address, obj.tel]);

    // Add text at the top of the page
    doc.text("Employee Data Report File", 78, 10);

    // Auto-table plugin to generate table
    
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      styles: { font: thaiFont }
    });

    // Save the PDF
    doc.save('All Employee data Report File.pdf');
  }
  

}
