import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}



@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  displayedColumns: string[] = ['dealer_id','dealer_name','address','tel','actions'];
  dataSource = new MatTableDataSource<any>();
  read_dealer_Data: any[] = [];

  @ViewChild(MatSort) dealerSort! : MatSort;
  


  ngOnInit(): void {
    this.getAll_dealer_Data();
    this.dataSource.sort = this.dealerSort;
  }

  public getAll_dealer_Data() {
    this.service.getAll_dealer_Data().subscribe((res)=>{
      console.log(res, "res==>");
      this.dataSource.data = res.deal_data;
    });
  }


  //delete dealer data
  deleteDealerData(dealer_id:any){
    console.log(dealer_id,'Delete dealer_id ==>');
    this.service.deleteDealerData(dealer_id).subscribe((res)=>{
      console.log(res, "delete dealer res==>");
      // this.sucessmsg = res.messsage;
      this.getAll_dealer_Data();
    });
  }

  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  generate_DealerPDF() {
    const doc = new jsPDF() as jsPDFWithPlugin;
    
   
    const thaiFont = 'Taviraj';

    // Set Thai font
    doc.addFont('./assets/fonts/Taviraj-Light.ttf', 'Roboto', 'Light');
    doc.setFont('Taviraj');

    // Set table columns
    // const columns = ['รหัสสินค้า', 'ชื่อสินค้า', 'ประเภทสินค้า', 'ตัวแทนจัดจำหน่าย', 'ราคา', 'หน่วยนับ'];
    const columns = ['DealerNo.', 'DealerName', 'Address', 'tel'];

    // Set table rows
    const rows = this.dataSource.data.map(obj => [obj.dealer_id, obj.dealer_name, obj.address, obj.tel]);

    // Add text at the top of the page
    doc.text("Dealer Data Report File", 80, 10);

    // Auto-table plugin to generate table
    
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      theme: 'grid',
      styles: { font: thaiFont }
    });

    // Save the PDF
    doc.save('All Dealer Data Report File.pdf');
  }
}
