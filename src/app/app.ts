import { Component } from '@angular/core';
import { Header } from './header/header';
import { Item } from './item/item';

@Component({
  selector: 'app-root',
  imports: [Header,Item],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  data = [
    { id: 1, name: "Kla",salary:25000 },
    { id: 2, name: "Tao",salary:50000 },
    { id: 3, name: "Tot",salary:40000 },
  ]

  removeDataById(id: number) {
    this.data = this.data.filter((emp) => emp.id !== id)
  }
}
