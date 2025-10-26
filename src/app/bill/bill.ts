import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService, BillType } from '../service/billservice';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bill',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './bill.html',
  styleUrl: './bill.css'
})
export class Bill implements OnInit, OnDestroy {
  bills: BillType[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  searchKeyword: string = '';

  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private billService: BillService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBills();

    // Subscription สำหรับ realtime search
    this.subscription = this.searchSubject.pipe(
      debounceTime(300),           // รอ 300ms หลังหยุดพิมพ์
      distinctUntilChanged(),      // ตรวจสอบว่า keyword ไม่ซ้ำกับครั้งก่อน
      switchMap((keyword) => {
        if (!keyword.trim()) {
          // ถ้า keyword ว่าง -> โหลดบิลทั้งหมด
          return this.billService.getBills();
        } else {
          return this.billService.searchBills(keyword);
        }
      })
    ).subscribe({
      next: (data: any) => {
        this.bills = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('ค้นหาไม่สำเร็จ', err);
        this.errorMessage = 'เกิดข้อผิดพลาดในการค้นหา';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSearchChange(keyword: string) {
    this.loading = true;
    this.searchSubject.next(keyword);
  }

  fetchBills(): void {
    this.loading = true;
    this.billService.getBills().subscribe({
      next: (data: any) => {
        this.bills = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('โหลดข้อมูลไม่สำเร็จ', err);
        this.errorMessage = 'ไม่สามารถโหลดข้อมูลได้';
        this.loading = false;
      }
    });
  }

  createBill() { this.router.navigate(['/createbill']); }
  detailBill(id: number) { this.router.navigate(['/billdetail', id]); }
  editBill(id: number) { this.router.navigate(['/editbill', id]); }
  deleteBill(id: number) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบิลนี้?')) {
      this.billService.deleteBill(id).subscribe({
        next: () => {
          alert('ลบบิลสำเร็จ');
          this.fetchBills();
        },
        error: (err) => {
          console.error('ลบบิลไม่สำเร็จ', err);
          alert('เกิดข้อผิดพลาดในการลบบิล');
        }
      });
    }
  }
}
