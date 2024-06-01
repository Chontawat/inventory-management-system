import { Component, OnInit,ElementRef ,ViewChild,Inject  } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { HttpClientModule } from '@angular/common/http';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
(<any>jsPDF).fonts = {
  Taviraj: {
    normal: 'Taviraj-Light.ttf',
    bold: 'Taviraj-Bold.ttf',
    italics: 'Taviraj-Italic.ttf',
    bolditalics: 'Taviraj-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Sukhumvit: {
    normal: 'SukhumvitSet-Text.ttf',
    bold: 'SukhumvitSet-Bold.ttf',
    italics: 'SukhumvitSet-Thin.ttf',
    bolditalics: 'SukhumvitSet-Medium.ttf'
  }
};



@Component({
  selector: 'app-management-data',
  templateUrl: './management-data.component.html',
  styleUrls: ['./management-data.component.css']
})

export class ManagementDataComponent implements OnInit {

  constructor(private service:ApiserviceService, private productDialog : MatDialog) { }
  readproductData: any[] = [];
  searchText: any;
  data1: any[] = [];
  // searchResults: any[] = [];

  
  ngOnInit(): void {

    this.getAlldata();
    
  }
  //get all Data
  getAlldata() {
    this.service.getAllData().subscribe((res)=>{
      console.log(res, "Get all product data");
      this.readproductData = res.data;
      
    });

    
  }

  //get Product delete
  deleteProductID(product_id:any){
    if (confirm("ต้องการลบข้อมูลนี้หรือไม่ ?")) {
      this.service.deleteData(product_id).subscribe((res)=>{
        console.log(res, "deleteres==>");
        alert("ลบข้อมูสำเร็จ");
        this.getAlldata();
  
      });console.log(product_id,'Delete product_id ==>');
      
    }else{
      alert("ข้อมูลนี้ไม่ถูกลบ")
      console.log('This product data was not delete');
    }

  }

  openDialog() : void{
    this.productDialog.open(CreateProductComponent,{
      width: '40%'
    })
  }

  openEditProduct(product_id: string): void {
    this.productDialog.open(CreateProductComponent, {
      width: '400px',
      data: { id : product_id }
    });
  }

  
  // generatePDF(): void {
  //   this.service.getAllData().subscribe((data: any) => {
  //     const documentDefinition = {
  //       content: [
  //         { text: 'Product Data Report', style: 'header' },
  //         { text: JSON.stringify(data), styles: 'data' },
  //       ],

  //       styles: {
          
  //         header: {
  //           fontSize: 18,
  //           bold: true
  //         },
  //         data: {

  //           font: 'Taviraj',
  //           fontSize: 14
  //         }
  //       },
  //     };

  //     // (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  //     pdfMake.createPdf(documentDefinition).download('data.pdf');
  //   });
  // }

  
  //   generatePDF_1() {
  //     this.service.getAllData().subscribe((data: any) => {
  //     const documentDefinition = {
  //       content: [
  //         { text: 'สวัสดี pdfmake', fontFamily: 'Taviraj' },
  //         { text: JSON.stringify(data), styles: 'data' } // Example Thai text
  //       ],
  //       defaultStyle: {
  //         font: 'Taviraj'
  //       }
  //     };
  //     pdfMake.createPdf(documentDefinition).download('All Product data Report File.pdf');
  //   });
  // }
  
  generatePDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;
    
   
    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    //D:\Myfinalproject\projdesign1\front\node_modules\pdfmake\examples\fonts
    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = ['No.', 'ProName', 'Protype', 'Dealer', 'Price', 'Amount'];

    // Set table rows
    const rows = this.readproductData.map(obj => [obj.product_id, obj.product_name, obj.Tproduct_name, obj.dealer_name, obj.price, obj.c_unit]);

    // Add text at the top of the page
    doc.text("Product Data Report File", 80, 10);

    // Auto-table plugin to generate table
    
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      styles: { font: thaiFont }
    });

    // Save the PDF
    doc.save('All Product Data Report File.pdf');
  }

}


