import { Component } from '@angular/core';
import { ProductService, ProductType } from '../service/productservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-createproduct',
  imports: [CommonModule, FormsModule],
  templateUrl: './createproduct.html',
  styleUrl: './createproduct.css'
})
export class Createproduct {
  @ViewChild('productForm') productForm!: NgForm;
  product: Partial<ProductType> = {};
  errorMessage = '';
  loading = false;

  constructor(private productService: ProductService, private router: Router) { }

  createProduct() {

    this.productForm.form.markAllAsTouched();

    if (this.productForm.invalid) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }
    this.loading = true;
    this.productService.createProduct(this.product as ProductType).subscribe({
      next: (res) => {
        this.loading = false;
        this.router.navigate(['/product']);
        alert('สร้างสินค้าสำเร็จ!');
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'เกิดข้อผิดพลาดในการสร้างสินค้า';
        console.error(err);
        alert('บันทึกล้มเหลว!')
      }
    });
  }
}
