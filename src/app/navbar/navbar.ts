import { Component, HostListener } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [MatSidenavModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  drawerWidth = 300;
  constructor() {
    this.adjustDrawerWidth();
  }

  @HostListener('window:resize')
  adjustDrawerWidth() {
    const w = window.innerWidth;
    this.drawerWidth = w < 640 ? 150 : w < 1024 ? 250 : 300;
  }
}
