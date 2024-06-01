import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-picking-system',
  templateUrl: './picking-system.component.html',
  styleUrls: ['./picking-system.component.css'],
})
export class PickingSystemComponent implements OnInit {

  inventoryForm: FormGroup;
  productId?: number;
  remainingStock?: number;

  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute,
    private _http: HttpClient,
    private fb: FormBuilder
  ) {
    this.inventoryForm = this.fb.group({
      lot_id: new FormControl('', Validators.required),
      product_remain: new FormControl('', Validators.required)
    });
  }
 

  readproductData: any;
  readAllPickingProduct: any[] = [];
  errormsg: any;
  empData: any;
  pro_lot_data: any[] = [];
  


  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'Product data get');
      this.readproductData = res.data;
    });

    this.service.getAll_picking_product_Data().subscribe((res) => {
      console.log(res, 'Picking data get');
      this.readAllPickingProduct = res.picking_product_data;
    });

    this.service.getAllempData().subscribe((res) => {
      console.log(res, 'Employee data get');
      this.empData = res.emp_data;
    });

    this.service.getAll_product_lot_Data().subscribe((res) => {
      console.log(res, 'Product lot get');
      this.pro_lot_data = res.product_lot_data;
    });

    // this.inventoryForm = this.fb.group({
    //   productId: [''],
    //   quantity: ['']
    // });

  }

  value1!: number;
  value2!: number;
  result!: number;

  calculate(): void {
    this.result = this.value1 * this.value2;
  }

  picking_product_Form = new FormGroup({
    picking_id: new FormControl('', Validators.required),
    lot_id: new FormControl('', Validators.required),
    product_id: new FormControl('', Validators.required),
    product_name: new FormControl('', Validators.required),
    employee_id: new FormControl('', Validators.required),
    date_of_picking: new FormControl('', Validators.required),
    amount_of_picking: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
  });

  Submit_picking_product_Data() {
    if (confirm('ต้องการเบิกสินค้าชินนี้หรือไม่ ?')) {
      this.picking_product_Form.valid;
      console.log(this.picking_product_Form.value);
      this.service.create_picking_product_Data(this.picking_product_Form.value).subscribe((res) => {
          console.log(res, 'res=>');
          this.picking_product_Form.reset();
          alert('ทำการเบิกสินค้าสำเร็จ');
          //this.successmsg = res.message;
        });
    } else {
      this.errormsg = 'All field is required !';
    }
  }

  public getall_product_lot() {
    this.service.getAll_product_lot_Data().subscribe((res) => {
      console.log(res, 'Product lot get');
      this.pro_lot_data = res.product_lot_data;
    });
  }

  //โหลดไฟล์ PDF
  generate_Picking_data_PDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;

    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = [
      'picking_id.',
      'lot_id',
      'product_id',
      'product_name',
      'employee_name',
      'date_of_picking',
      'amount_of_picking',
      'price',
      'total',
    ];

    // Set table rows
    const rows = this.readAllPickingProduct.map((obj) => [
      obj.picking_id,
      obj.lot_id,
      obj.product_id,
      obj.product_name,
      obj.employee_name,
      obj.date_of_picking,
      obj.amount_of_picking,
      obj.price,
      obj.total,
    ]);

    // Add text at the top of the page
    doc.text('Picking Data Report File', 80, 10);

    // Auto-table plugin to generate table

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      styles: { font: thaiFont },
    });

    // Save the PDF
    doc.save('All Picking Data Report File.pdf');
  }

  updateInventory() {
    console.log("test update product lot",this.inventoryForm.value);
    const { lot_id, product_remain } = this.inventoryForm.value;
    this.service.update_product_lot(lot_id, product_remain).subscribe(response => {
      this.remainingStock = response.product_remain;
  
    });
  }
  

}
