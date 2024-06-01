import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementDataComponent } from './management-data/management-data.component';
import { ImportStockComponent } from './import-stock/import-stock.component';
import { EmployeeComponent } from './employee/employee.component';
import { DealerComponent } from './dealer/dealer.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PickingSystemComponent } from './picking-system/picking-system.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { DealerFormComponent } from './dealer-form/dealer-form.component';
import { ShippingStockComponent } from './shipping-stock/shipping-stock.component';

const routes: Routes = [
  {path: 'management',component:ManagementDataComponent},
  {path: 'import_product',component:ImportStockComponent},
  {path: 'import_product/:import_id',component:ImportStockComponent},
  {path: 'employee',component:EmployeeComponent},
  {path: 'Pdealer',component:DealerComponent},
  {path: 'CreateProduct',component:CreateProductComponent},
  {path: 'CreateProduct/:product_id',component:CreateProductComponent},
  {path: 'PickingSystem',component:PickingSystemComponent},
  {path: 'EmployeeForm',component:EmployeeFormComponent},
  {path: 'EmployeeForm/:employee_id',component:EmployeeFormComponent},
  {path: 'DealerForm',component:DealerFormComponent},
  {path: 'DealerForm/:dealer_id',component:DealerFormComponent},
  {path: 'shipping',component:ShippingStockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
