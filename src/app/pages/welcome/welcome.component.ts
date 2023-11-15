import { Component } from '@angular/core';
import { ApiBookService } from 'src/app/services/api-book.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private apiBook:ApiBookService)
  {
    console.log(apiBook.fetchData());
  }
}
