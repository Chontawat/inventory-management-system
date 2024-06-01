import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementDataComponent } from './management-data/management-data.component';
import { ImportStockComponent } from './import-stock/import-stock.component';
import { EmployeeComponent } from './employee/employee.component';
import { DealerComponent } from './dealer/dealer.component';

import { HttpClientModule } from "@angular/common/http";
import { ApiserviceService } from "./apiservice.service";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateProductComponent } from './create-product/create-product.component';
import { PickingSystemComponent } from './picking-system/picking-system.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DealerFormComponent } from './dealer-form/dealer-form.component';
import { GoodsReportComponent } from './goods-report/goods-report.component';
import { ShippingStockComponent } from './shipping-stock/shipping-stock.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { SearchPipe } from './search.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatSidenavContainer } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {jsPDF} from 'jspdf';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    AppComponent,
    ManagementDataComponent,
    ImportStockComponent,
    EmployeeComponent,
    
    DealerComponent,
    CreateProductComponent,
    PickingSystemComponent,
    EmployeeFormComponent,
    DealerFormComponent,
    GoodsReportComponent,
    ShippingStockComponent,
    SearchPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule
    

    
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
