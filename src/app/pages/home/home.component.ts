import { Component, HostListener, OnInit, AfterViewInit  } from '@angular/core';
import * as Glider from 'glider-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  slidesToShow: number = 4;
  slidesToScroll: number = 4;
  //@ts-ignore
  gliderInstance: Glider;

  ngOnInit() 
  {
    this.getScreenSize();
  }

  ngAfterViewInit()
  {
    //@ts-ignore
    this.gliderInstance = new Glider(document.querySelector('.carrousel-list'), {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
      dots: '.carrousel-indicator',
      arrows: {
        prev: '.last-carrousel',
        next: '.next-carrousel'
      }
    });
     
  }

  @HostListener('window:resize')
  getScreenSize(): void {
    var slidesAux = this.slidesToShow;
    if(window.innerWidth > 900)
    {
      this.slidesToShow = 4;
      this.slidesToScroll = 4;
    }
    else if(window.innerWidth > 700)
    {
      this.slidesToShow = 3;
      this.slidesToScroll = 3;
    }
    else
    {
      this.slidesToShow = 2;
      this.slidesToScroll = 2;
    }
      
    if(slidesAux != this.slidesToShow && this.gliderInstance)
    {
      this.gliderInstance.setOption({
        slidesToShow: this.slidesToShow,
        slidesToScroll: this.slidesToScroll,

      });
    }
  }
}
