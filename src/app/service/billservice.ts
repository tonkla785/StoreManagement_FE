import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BillType {
  saleId: number;
  saleDate: string;
  saleName: string;
  saleTokenId: string;
  saleTotal: number;
  saleDetails: BillDetail[];
}

export interface ProductType {
  productId: number;
  productDate: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  tokenId: string;
}

export interface BillDetail {
  saleId: number;
  saleDetailId: number;
  productId: ProductType;
  quantitySale: number;
  priceSale: number;
}

export interface ApiResponse<T> {
  responseStatus: number;
  responseMessage: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class BillService {

  constructor(private http: HttpClient) { }

  getBills(): Observable<BillType> {
    return this.http.get<ApiResponse<BillType>>(`http://localhost:8080/sales/`).pipe(map(res => res.data));
  }

  getBillById(saleId: number): Observable<BillType> {
    return this.http.get<ApiResponse<BillType>>(`http://localhost:8080/sales/${saleId}`).pipe(map(res => res.data));
  }

  createBill(billDetails: { productId: number; quantity: number; billName: string }[]): Observable<any> {
    return this.http.post(`http://localhost:8080/sales/create`, billDetails);
  }


  updateBill(id: number, billDetails: { productId: number; quantity: number; billName: string }[]): Observable<any> {
    return this.http.put(`http://localhost:8080/sales/update/${id}`, billDetails);
  }

  deleteBill(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/sales/delete/${id}`);
  }

  searchBills(keyword: string): Observable<BillType> {
    return this.http.get<ApiResponse<BillType>>(`http://localhost:8080/sales/search?keyword=${keyword}`).pipe(map(res => res.data));
  }
}
