import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-root',
  imports: [FormsModule, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  name = "Kla Phichitpon"
  age = 24
  address = "chantuburi"

  imageurl = "https://picsum.photos/id/27/367/267"
  size = 200

  username = "admin"
  userPermission = "admin"

  isLogin = true

  data =[
    { id: 1, name: "Kla",  salary: 25000 },
    { id: 2, name: "Phichitpon", salary: 22000 },
    { id: 3, name: "Kla Phichitpon", salary: 27000 },
    { id: 4, name: "AKA", salary: 30000 }
  ]

  isActive = false

  clearData() {
    this.data = []
  }

  showAddress() {
    return "current address " + this.address
  }

  doubleSize() {
    return this.size * 2
  }

  showMessage() {
    alert("Hello World " + this.name)
    console.log("Message")
  }

  toggle() {
  this.isLogin = !this.isLogin;
  }

  changePermission() {
    if (this.userPermission === "admin") {
      this.userPermission = "manager";
    } else if(this.userPermission === "manager") {
      this.userPermission = "customer";
    }else if(this.userPermission === "customer") {
      this.userPermission = "kla";
    }else {
      this.userPermission = "admin";
    }
  }

  toggleMode() {
    this.isActive = !this.isActive;
  }
}
