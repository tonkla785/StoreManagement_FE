import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ProductType {
  productId: number;
  productDate: string;
  productName: string;
  productPrice: number;
  productAmount: number;
  tokenid: string;
}

export interface ApiResponse<T> {
  responseStatus: number;
  responseMessage: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType> {
    return this.http.get<ApiResponse<ProductType>>(`http://localhost:8080/service/`).pipe(map(res => res.data));
  }

  getProductById(id: number): Observable<ProductType> {
    return this.http.get<ApiResponse<ProductType>>(`http://localhost:8080/service/${id}`).pipe(map(res => res.data));
  }

  updateProduct(id: number, product: ProductType): Observable<any> {
    return this.http.put(`http://localhost:8080/service/update/${id}`, product);
  }

  createProduct(product: ProductType): Observable<any> {
    return this.http.post(`http://localhost:8080/service/product`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/service/delete/${id}`);
  }
}
