import { Component, OnInit } from '@angular/core';
import { ProductService, ProductType } from '../service/productservice';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editproduct',
  imports: [FormsModule, CommonModule],
  templateUrl: './editproduct.html',
  styleUrl: './editproduct.css'
})
export class Editproduct implements OnInit {
  id!: number;
  product!: ProductType;
  errorMessage = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProductId();
  }

  fetchProductId(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(this.id).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error(err),
    });
  }

  saveChanges(form: any): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วน';
      return;
    }

    this.loading = true;
    if (this.product) {

      this.productService.updateProduct(this.id, this.product).subscribe({
        next: (res) => {
          this.loading = false;
          alert('บันทึกสำเร็จ!')
          this.router.navigate(['/product']);
        },
        error: (err) => {
          alert('บันทึกล้มเหลว!')
          this.loading = false;
          this.errorMessage = 'เกิดข้อผิดพลาดในการแก้ไขสินค้า';
        },
      });
    }
  }
}
