import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GoodsReportComponent } from '../goods-report/goods-report.component';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-import-stock',
  templateUrl: './import-stock.component.html',
  styleUrls: ['./import-stock.component.css'],
})
export class ImportStockComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute, 
    public stockDialog : MatDialog
  ) { }
  readproductData: any;
  read_import_product_Data: any[] = [];
  errormsg: any;
  get_imp_product_id: any;
  successmsg: any;
  getEmployeeid :any;
  getDealerid: any;
  TypePdata: any[] = [];

  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'res==>');
      this.readproductData = res.data;
    });

    this.service.getAll_import_product_Data().subscribe((res) => {
      console.log(res, 'res==>');
      this.read_import_product_Data = res.import_product_data;
    });

    this.service.getAllempData().subscribe((res)=>{
      console.log(res, "res==>");
      this.getEmployeeid = res.emp_data;
    });

    this.service.getAll_dealer_Data().subscribe((res)=>{
      console.log(res, "res==>");
      this.getDealerid = res.deal_data;
    });
    
    this.service.getAlltype_of_product_Data().subscribe((res) => {
      console.log(res, 'type_of_product lot get');
      this.TypePdata = res.type_of_product_data;
    });

    // update import product data
    console.log(
      this.router.snapshot.paramMap.get('import_id'),
      'get_import_id'
    );
    this.get_imp_product_id = this.router.snapshot.paramMap.get('import_id');
    if (this.get_imp_product_id) {
      this.service.create_import_product_Data(this.get_imp_product_id).subscribe((res) => {
          console.log(res, 'res=>');
          this.get_imp_product_id.patchValue({
            imp_pID: res.import_product_data[0].import_id,
            im_pro_id: res.import_product_data[0].product_id,
            pro_name: res.import_product_data[0].product_name,
            emp_id: res.import_product_data[0].employee_id,
            dealer_id: res.import_product_data[0].dealer_id,
            DO_IM: res.import_product_data[0].date_of_import,
            DO_T: res.import_product_data[0].date_of_transport,
            amount: res.import_product_data[0].amount,
            price: res.import_product_data[0].price,
            total: res.import_product_data[0].total,
          });
        });
    }
  }

  value1!: number;
  value2!: number;
  result!: number;

  calculate(): void {
    this.result = this.value1 * this.value2;
  }

  imp_product_Form = new FormGroup({
    import_id: new FormControl('', Validators.required),
    product_id: new FormControl('', Validators.required),
    product_name: new FormControl('', Validators.required),
    Tproduct_id: new FormControl('', Validators.required),
    employee_id: new FormControl('', Validators.required),
    dealer_id: new FormControl('', Validators.required),
    date_of_import: new FormControl('', Validators.required),
    date_of_transport: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
  });

  create_import_product_Data() {
    if (this.imp_product_Form.valid) {
      console.log(this.imp_product_Form.value);
      this.service
        .create_import_product_Data(this.imp_product_Form.value)
        .subscribe((res) => {
          console.log(res, 'res=>');
          this.imp_product_Form.reset();
          //this.successmsg = res.message;
        });
    } else {
      this.errormsg = 'All field is required !';
    }
  }
  //upadte import_product data
  import_product_productUpdate() {
    console.log(this.imp_product_Form.value, 'updatedform');
    if (this.imp_product_Form.valid) {
      this.service
        .updateData(this.imp_product_Form.value, this.get_imp_product_id)
        .subscribe((res) => {
          console.log(res, 'resUpdated');
          this.successmsg = res.message;
        });
    } else {
      this.errormsg = 'All field is required !';
    }
  }
  // openReportModal(read_import_product_Data: { import_id :any ; product_name: any; age: any; reportUrl: any; })
  openReportModal(read_import_product_Data: any) {
    const dialogRef = this.stockDialog.open(GoodsReportComponent, {
      width: '80%',
      maxWidth: '800px',
      data: {
        id: read_import_product_Data.import_id,
        name: read_import_product_Data.product_name,
        type : read_import_product_Data.Tproduct_name,
        employee : read_import_product_Data.employee_name,
        date : read_import_product_Data.date_of_import,
        reportUrl: read_import_product_Data.reportUrl
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('ปิดข้อมูลการสังซื้อสินค้า');
    });
  }

  generate_Import_stock_PDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;
    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = [
      'import_id.',
      'product_id',
      'product_name',
      'Tproduct_name',
      'employee_name',
      'dealer_name',
      'date_of_import',
      'date_of_transport',
      'amount',
      'price',
      'total',
    ];

    // Set table rows
    const rows = this.read_import_product_Data.map((obj) => [
      obj.import_id,
      obj.product_id,
      obj.product_name,
      obj.Tproduct_name,
      obj.employee_name,
      obj.dealer_name,
      obj.date_of_import,
      obj.date_of_transport,
      obj.amount,
      obj.price,
      obj.total,
    ]);

    // Add text at the top of the page
    doc.text("Import Stock Bill", 85, 10);

    
    // Auto-table plugin to generate table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 25,
      theme: 'grid',
      styles: { font: thaiFont },
    });

    // Save the PDF
    doc.save('ใบสั่งซื้อสินค้า.pdf');
  }
}
