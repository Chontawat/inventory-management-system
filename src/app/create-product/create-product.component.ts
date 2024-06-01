import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute, private dialog : MatDialogModule,
    // public dialogRef: MatDialogRef<CreateProductComponent>,
    // @Inject(MAT_DIALOG_DATA) public rec: any,
  ) { }
  errormsg:any;
  successmsg:any;
  getProduct_id:any;

  ngOnInit(): void {
    this.getProduct_id = this.router.snapshot.paramMap.get('product_id');
    if (this.getProduct_id) {
      this.service.getSingleData(this.getProduct_id).subscribe((res)=>{
        console.log(res, 'res=>');
        this.productForm.patchValue({
          product_id:res.data[0].product_id,
          product_name:res.data[0].product_name,
          Tproduct_id:res.data[0].Tproduct_id,
          dealer_id:res.data[0].dealer_id,
          price:res.data[0].price,
          c_unit:res.data[0].c_unit
        })
      });
    }
    //this.loadData(this.rec.product_id);
  }

  productForm = new FormGroup({
    'product_id' : new FormControl('',Validators.required),
    'product_name' : new FormControl('',Validators.required),
    'Tproduct_id' : new FormControl('',Validators.required),
    'dealer_id' : new FormControl('',Validators.required),
    'price' : new FormControl('',Validators.required),
    'c_unit' : new FormControl('',Validators.required)

  });

  // loadData(product_id: string): void {
  //   this.service.getSingleData(product_id).subscribe(response => {
  //     this.rec = response;
  //   });
  // }

  // onCloseClick(): void {
  //   this.dialogRef.close();
  // }

  productSubmit(){
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.service.createData(this.productForm.value).subscribe((res)=>{
        console.log(res, 'Add data sucessfully');
        alert("บันทึกข้อมูลสำเร็จ");
        this.productForm.reset();
        
      });
    } else {
      this.errormsg = "All field is required !";
    }

  }

  //upadte data
  productUpdate(){
    console.log(this.productForm.value,'updatedform');
    if (this.productForm.valid) {
      this.service.updateData(this.productForm.value, this.getProduct_id).subscribe((res)=>{
        console.log(res,'Data Updated sucessfully');
        alert("อัพเดตข้อมูลสำเร็จ");
        
      });
    } else {
      this.errormsg = "All field is required !";
    }
  }

}
