import { Component ,input ,output} from '@angular/core';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class Item {
  id = input.required<number>();
  name = input.required<string>();
  salary = input.required<number>();
  onDelete = output<number>();

  deleteItem() {
    if(confirm(`คุณต้องการลบข้อมูลพนักงาน ${this.id()} หรือไม่ ?`)) {
      console.log(`ลบข้อมูลพนักงาน ID: ${this.id()}, ชื่อ: ${this.name()}, เงินเดือน: ${this.salary()}`);
      this.onDelete.emit(this.id());
    }
  }
}
