import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/productservice';
import { BillService } from '../service/billservice';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editbill',
  imports: [CommonModule, FormsModule],
  templateUrl: './editbill.html',
  styleUrl: './editbill.css'
})
export class Editbill implements OnInit {
  @ViewChild('editbillForm') editbillForm!: NgForm;

  products: any[] = [];
  cart: any[] = [];
  saleName = '';
  saleTotal = 0;
  billId!: number;

  constructor(
    private productService: ProductService,
    private billService: BillService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.billId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProducts();
    this.loadBill();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => this.products = data,
      error: (err) => console.error('โหลดสินค้าล้มเหลว', err)
    });
  }

  loadBill() {
    this.billService.getBillById(this.billId).subscribe({
      next: (res: any) => {
        if (res) {
          const bill = res; // ไม่ต้อง res.data

          this.saleName = bill.saleName;

          this.cart = bill.saleDetails.map((d: any) => ({
            product: {
              productId: d.productId.productId,
              productName: d.productId.productName,
              productPrice: d.productId.productPrice
            },
            quantity: d.quantitySale
          }));

          this.calculateTotal();
        } else {
          console.error('ไม่พบข้อมูลบิลใน response', res);
        }
      },
      error: (err) => console.error('โหลดบิลล้มเหลว', err)
    });
  }


  addToCart(product: any) {
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

  updateBill(form: NgForm) {
    form.form.markAllAsTouched();

    if (!this.saleName || this.saleName.trim() === '') {
      alert('⚠️ กรุณากรอกชื่อบิล / ชื่อลูกค้า');
      return;
    }

    if (this.cart.length === 0) {
      alert('⚠️ กรุณาเลือกสินค้าอย่างน้อย 1 รายการ');
      return;
    }

    for (const item of this.cart) {
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        alert(`⚠️ กรุณาระบุจำนวนสินค้าสำหรับ "${item.product.productName}" ให้ถูกต้อง`);
        return;
      }
    }

    const payload = this.cart.map((item) => ({
      productId: item.product.productId,
      quantity: item.quantity,
      billName: this.saleName
    }));

    this.billService.updateBill(this.billId, payload).subscribe({
      next: () => {
        alert('✅ อัปเดตบิลสำเร็จ!');
        this.router.navigate(['/bill']);
      },
      error: (err) => alert('❌ เกิดข้อผิดพลาด: ' + (err.error?.responseMessage || err.message))
    });
  }
}
