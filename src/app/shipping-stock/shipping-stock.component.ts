import { Component, OnInit } from '@angular/core';
import { ImportStockComponent } from '../import-stock/import-stock.component';
import { MatTableDataSource } from '@angular/material/table';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-shipping-stock',
  templateUrl: './shipping-stock.component.html',
  styleUrls: ['./shipping-stock.component.css'],

})
export class ShippingStockComponent implements OnInit {
  displayedColumns: string[] = ['import_id', 'product_id', 'product_name', 'Tproduct_name', 'employee_name','dealer_name','date_of_import','date_of_transport','amount','price','total'];
  dataSource = new MatTableDataSource<any>();

  read_import_product_Data: any[] = [];

  constructor(private services : ApiserviceService, private _http: HttpClient ) { }

  ngOnInit(): void {

    this.getAll_import_product_Data()

    


  }

  public getAll_import_product_Data(){
    this.services.getAll_import_product_Data().subscribe((res)=>{ 

      this.read_import_product_Data = res.import_product_data;
      console.log(res, "Import data get");
    });
  }

  import_id!: number;
  quantity!: number;
  message!: string;

  update_import_product_data_module(import_id : any) : void {
    this.services.update_import_product_data_api(import_id).subscribe(() =>{
      this.getAll_import_product_Data();
    })
  }

  generate_Import_data_PDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;
    //
   
    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = ['import_id', 'product_id', 'product_name', 'Tproduct_id', 'employee_id', 'dealer_id', 'date_of_import', 'date_of_transport', 'amount', 'price', 'total'];

    // Set table rows
    const rows = this.read_import_product_Data.map(obj => [obj.import_id, obj.product_id, obj.product_name, obj.Tproduct_name, obj.employee_name, obj.dealer_name, obj.date_of_import, obj.date_of_transport , obj.amount, obj.price, obj.total]);

    // Add text at the top of the page
    doc.text("Import Data Report File", 80, 10);

    // Auto-table plugin to generate table
    
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      styles: { font: thaiFont }
    });

    // Save the PDF
    doc.save('All Import Data Report File.pdf');
  }


  

}
