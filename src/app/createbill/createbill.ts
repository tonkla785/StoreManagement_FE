import { Component, OnInit } from '@angular/core';
import { ProductService, ProductType } from '../service/productservice';
import { BillService } from '../service/billservice';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createbill',
  imports: [CommonModule, FormsModule],
  templateUrl: './createbill.html',
  styleUrl: './createbill.css'
})
export class Createbill implements OnInit {
  @ViewChild('billForm') billForm!: NgForm;
  products: ProductType[] = [];
  cart: any[] = [];
  saleName = '';
  saleTotal = 0;

  constructor(private productService: ProductService, private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.fecthProducts();
  }

  fecthProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        console.log(data);
      },
      error: (err) => {
        console.error('โหลดข้อมูลไม่สำเร็จ', err);
      }
    });
  }

  addToCart(product: ProductType) {
    const existing = this.cart.find(item => item.product.productId === product.productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.calculateTotal();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.productId !== productId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.saleTotal = this.cart.reduce(
      (sum, item) => sum + item.product.productPrice * item.quantity,
      0
    );
  }

  submitBill(form: any) {

    this.billForm.form.markAllAsTouched();

    // ตรวจสอบชื่อบิล
    if (!this.saleName || this.saleName.trim() === '') {

      alert('⚠️ กรุณากรอกชื่อบิล / ชื่อลูกค้า');
      return;
    }

    // ตรวจสอบว่าสินค้าในตะกร้าว่างไหม
    if (this.cart.length === 0) {
      alert('⚠️ กรุณาเลือกสินค้าอย่างน้อย 1 รายการ');
      return;
    }

    // ตรวจสอบจำนวนสินค้าว่าเป็นค่าบวกหรือไม่
    for (const item of this.cart) {
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        alert(`⚠️ กรุณาระบุจำนวนสินค้าสำหรับ "${item.product.productName}" ให้ถูกต้อง`);
        return;
      }
    }

    // สร้าง payload ส่งไป backend
    const payload = this.cart.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
      billName: this.saleName,
    }));

    // ส่งข้อมูลไป backend
    this.billService.createBill(payload).subscribe({
      next: (res) => {
        alert('✅ สร้างบิลสำเร็จ!');
        this.router.navigate(['/bill']);
        console.log(res);

        // ล้างค่า
        this.cart = [];
        this.saleName = '';
        this.saleTotal = 0;
        form.resetForm();
      },
      error: (err) => {
        alert('❌ เกิดข้อผิดพลาด: ' + (err.error?.responseMessage || err.message));
      },
    });
  }



}
