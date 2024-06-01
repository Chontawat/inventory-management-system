import { Component, OnInit,ElementRef ,ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-goods-report',
  templateUrl: './goods-report.component.html',
  styleUrls: ['./goods-report.component.css']
})
export class GoodsReportComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GoodsReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiserviceService) { }

    read_import_product_Data: any;
      

  ngOnInit(){
    this.service.getAll_import_product_Data().subscribe((res) => {
      console.log(res, 'res==>');
      this.read_import_product_Data = res.import_product_data;
    });

  
   
    
  }
  onClose(): void {
    this.dialogRef.close();
  }
  


}
