import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.css']
})
export class DealerFormComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }
  get_dealer_data_id:any;
  errormsg:any;
  successmsg:any;
  

  ngOnInit(): void {
    this.get_dealer_data_id = this.router.snapshot.paramMap.get('dealer_id');
    if (this.get_dealer_data_id) {
      this.service.getSingleDealerData(this.get_dealer_data_id).subscribe((res)=>{
        console.log(res, 'res=>');
        this.DealerForm.patchValue({
          dealer_id:res.deal_data[0].dealer_id,
          dealer_name:res.deal_data[0].dealer_name,
          address:res.deal_data[0].address,
          tel:res.deal_data[0].tel
        
        })
      });
    }


  }

  DealerForm = new FormGroup({
    'dealer_id' : new FormControl('',Validators.required),
    'dealer_name' : new FormControl('',Validators.required),
    'address' : new FormControl('',Validators.required),
    'tel' : new FormControl('',Validators.required)
  });

  Dealer_Submit(){
    if (this.DealerForm.valid) {
      console.log(this.DealerForm.value);
      this.service.createDealerData(this.DealerForm.value).subscribe((res)=>{
        console.log(res, 'res=>');
        this.DealerForm.reset();
        //this.successmsg = res.message;
        
      });
    } else {
      this.errormsg = "All field is required !";
    }

  }

  //upadte data
  updateDealerData(){
    console.log(this.DealerForm.value,'updated Dealer form');
    if (this.DealerForm.valid) {
      this.service.updateDealerData(this.DealerForm.value, this.get_dealer_data_id).subscribe((res)=>{
        console.log(res,'res employee Updated');
        this.successmsg = res.message;
        
      });
    } else {
      this.errormsg = "All field is required !";
    }
  }

}
