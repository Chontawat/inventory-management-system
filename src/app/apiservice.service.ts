import { Injectable, Query } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { jsPDF } from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient ) {}
  //connect frontend to backend
  apiUrl = 'http://localhost:3500/product'
  apiUrlemp = 'http://localhost:3500/employee'
  import_productUrl ='http://localhost:3500/import_product'
  dealerUrl = 'http://localhost:3500/dealer'
  picking_product_Url = 'http://localhost:3500/picking_product'
  product_lot_url = 'http://localhost:3500/product_lot'
  Tproduct_url_api = 'http://localhost:3500/type_of_product'

  
  //product สินค้า
  //get all data
  getProductData_PDF(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3500/api/product');
    // แทน 'https://example.com/api/inventory' ด้วย URL ของ API หรือสคริปต์ที่คุณใช้ในการเรียกข้อมูลจากฐานข้อมูล
  }
  getAllData():Observable<any>{
    return this._http.get(`${this.apiUrl}`);
  }
  //get single product data//
  getSingleData(product_id:any):Observable<any>{
    let pId = product_id;
    return this._http.get(`${this.apiUrl}/${pId}`);
  }
  //create data//
  createData(data:any):Observable<any>{
    console.log(data,'createapi=>')
    return this._http.post(`${this.apiUrl}`,data);
  }
  //update data//
  updateData(data:any, product_id:any):Observable<any>{
    let pId = product_id;
    return this._http.put(`${this.apiUrl}/${pId}`,data);
  }
  //delete data//
  deleteData(product_id:any):Observable<any>{
    let pId = product_id;
    return this._http.delete(`${this.apiUrl}/${pId}`);
  }


  //employee พนักงาน
  //get all employee data//
  getAllempData():Observable<any>{
    return this._http.get(`${this.apiUrlemp}`);
  }
  //get single product data//
  getSingleEmpData(employee_id:any):Observable<any>{
    let pId = employee_id;
    return this._http.get(`${this.apiUrlemp}/${pId}`);
  }
  //create employee data//
  createEmpData(data:any):Observable<any>{
    console.log(data,'createapi=>')
    return this._http.post(`${this.apiUrlemp}`,data);
  }
  //delete Employee Data//
  deleteEmpData(employee_id:any):Observable<any>{
    let EmpId = employee_id;
    return this._http.delete(`${this.apiUrlemp}/${EmpId}`);
  }
  //update Employee Data//
  updateEmpData(data:any, employee_id:any):Observable<any>{
    let EmpId = employee_id;
    return this._http.put(`${this.apiUrlemp}/${EmpId}`,data);
  }

  //dealer ผู้จัดจำหน่าย
  //get all dealer data
  getAll_dealer_Data():Observable<any>{
    return this._http.get(`${this.dealerUrl}`);
  }
  //get single product data//
  getSingleDealerData(dealer_id:any):Observable<any>{
    let pId = dealer_id;
    return this._http.get(`${this.dealerUrl}/${pId}`);
  }
  //create employee data//
  createDealerData(data:any):Observable<any>{
    console.log(data,'createapi=>')
    return this._http.post(`${this.dealerUrl}`,data);
  }
  //delete Employee Data//
  deleteDealerData(dealer_id:any):Observable<any>{
    let D_Id = dealer_id;
    return this._http.delete(`${this.dealerUrl}/${D_Id}`);
  }
  //update Employee Data//
  updateDealerData(data:any, dealer_id:any):Observable<any>{
    let D_Id = dealer_id;
    return this._http.put(`${this.dealerUrl}/${D_Id}`,data);
  }


  //import_product สั่งซื้อสินค้า
  //get all import_product data//
  getAll_import_product_Data():Observable<any>{
    return this._http.get(`${this.import_productUrl}`);
  }
  //create import_product_data//
  create_import_product_Data(import_product_data:any):Observable<any>{
    console.log(import_product_data,'createapi=>')
    return this._http.post(`${this.import_productUrl}`,import_product_data);
  }
  //get single import_product_data//
  get_import_product_SingleData(import_id:any):Observable<any>{
    let imp_pro_Id = import_id;
    return this._http.get(`${this.import_productUrl}/${imp_pro_Id}`);
  }

  //picking_product เบิกสินค้า
  //get all picking_product data//
  getAll_picking_product_Data():Observable<any>{
    return this._http.get(`${this.picking_product_Url}`);
  }

  //create import_product_data//
  create_picking_product_Data(picking_product_id:any):Observable<any>{
    console.log(picking_product_id,'createapi=>')
    return this._http.post(`${this.picking_product_Url}`,picking_product_id);
  }

  //update import_product data
  update_import_product_data_api(import_id:number) :Observable<any>{
    let impo_id = import_id;
    return this._http.put(`${this.picking_product_Url}/${impo_id}`,{});
  }

  //product_lot ล็อตสินค้า
  //get all product_lot
  getAll_product_lot_Data():Observable<any>{
    return this._http.get(`${this.product_lot_url}`);
  }
  //create product_lot data//
  create_product_lot_Data(product_lot_data:any):Observable<any>{
    console.log(product_lot_data,'createapi=>')
    return this._http.post(`${this.product_lot_url}`,product_lot_data);
  }

  //update product_lot data
  update_product_lot(lot_id: number, product_remain: number): Observable<any> {
    return this._http.put(`${this.product_lot_url}/${lot_id}`, { product_remain });
  }



  //api ประเภทสินค้า
  getAlltype_of_product_Data():Observable<any>{
    return this._http.get(`${this.Tproduct_url_api}`);
  }
  //api single ประเภทสินค้า
  getSingle_type_of_product_Data(Tproduct_id:any):Observable<any>{
    let TId = Tproduct_id;
    return this._http.get(`${this.Tproduct_url_api}/${TId}`);
  }

  generatePDF(product_id:any):Observable<any>{
    let pId = product_id;
    return this._http.get(`${this.apiUrl}/${pId}`,{observe:'response',responseType:'blob'});
  }

  generatePDF2(product_id:any):Observable<Blob>{
    let pId = product_id;
    return this._http.get(`${this.apiUrl}/${pId}`,{responseType:'blob'});
  }


}
