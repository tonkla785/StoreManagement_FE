import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ProductSale {
  productId: number;
  productName: string;
  totalQuantity: number;
}

interface ApiResponse {
  responseStatus: number;
  responseMessage: string;
  data: ProductSale[];
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private baseUrl = 'https://storemanagement-be.onrender.com/dashboard';

  constructor(private http: HttpClient) {}

  getAllProductSales(): Observable<ProductSale[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/sum-all-products`)
      .pipe(map(res => res.data));
  }

  getMonthlySale(): Observable<number> {
    return this.http.get<{ data: number }>(`${this.baseUrl}/monthly-sale`)
      .pipe(map(res => res.data));
  }

  getSalesBetween(start: string, end: string): Observable<number> {
    return this.http.get<{ data: number }>(
      `${this.baseUrl}/sale-range?start=${start}&end=${end}`
    ).pipe(map(res => res.data));
  }
}
