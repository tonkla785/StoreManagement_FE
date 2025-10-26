import { Component, OnInit } from '@angular/core';
import { BillService, BillType } from '../service/billservice';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billdetail',
  imports: [CommonModule],
  templateUrl: './billdetail.html',
  styleUrl: './billdetail.css'
})
export class Billdetail implements OnInit {
  id!: number;
  bill?: BillType;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private billService: BillService
  ) { }

  ngOnInit(): void {
    this.fetchBillDetail();
  }

  fetchBillDetail(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.billService.getBillById(this.id).subscribe({
      next: (data) => {
        this.bill = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'โหลดข้อมูลไม่สำเร็จ';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
