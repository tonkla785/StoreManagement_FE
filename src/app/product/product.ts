import { Component, OnInit } from '@angular/core';
import { ProductService, ProductType } from '../service/productservice';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  products: ProductType[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('โหลดข้อมูลไม่สำเร็จ', err);
        this.errorMessage = 'ไม่สามารถโหลดข้อมูลได้';
        this.loading = false;
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  createProduct() {
    this.router.navigate(['/createproduct']);
  }

  deleteProduct(id: number) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('ลบสินค้าสำเร็จ');
          this.fetchProducts();
        },
        error: (err) => {
          console.error('เกิดข้อผิดพลาดในการลบสินค้า:', err);
          alert('ไม่สามารถลบสินค้าได้');
        }
      });
    }
  }

}
