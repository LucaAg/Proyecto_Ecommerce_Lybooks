import { Component, HostListener, AfterViewInit } from '@angular/core';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  navUl:any;
  checkBox:any;
  checkValue:boolean = true;
  ngAfterViewInit()
  {
    this.navUl = document.getElementById('navUl');
    this.checkBox = document.getElementById('check') as HTMLInputElement;
    this.navUl.classList.add('hide');
    this.getScreenSize();
  }

  toggleMenu()
  {
    this.navUl.classList.toggle('hide');
  }

  @HostListener('window:resize')
  getScreenSize(): void
  {
    if(window.innerWidth > 856)
    {
      this.navUl.classList.remove('hide');
    }
  }
}
