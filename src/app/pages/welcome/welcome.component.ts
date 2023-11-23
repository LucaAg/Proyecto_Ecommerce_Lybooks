import { Component } from '@angular/core';
import { ApiBookService } from 'src/app/services/api-book.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  imagesArray:any = [];
  imagesArray2:any = [];
  randomNumbers:any[]=[];

  constructor(private auth:AuthService)
  {
    this.fillArrayImage();
  }

  onGoogleLogin()
  {
    try{
      this.auth.loginGoogle();
    }catch(error)
    {
      console.log(error);
    }
  }

  onTwitterLogin()
  {
    try{
      this.auth.loginTwitter();
    }catch(error)
    {
      console.log(error);
    }
  }

  fillArrayImage()
  {
    let randomNumber = 0; 
    for(let i = 0; i < 12;i++)
    {
      randomNumber = Math.floor(Math.random() * (16)) + 1; 
      if(!this.randomNumbers.includes(randomNumber))
      {
        this.randomNumbers.push(randomNumber);
        const image = new Image();
        if(this.imagesArray.length != 6)
        {
          image.src = "../../../assets/Welcome/" + randomNumber + ".jpg";
          this.imagesArray.push(image);
        }
        else
        {
          image.src = "../../../assets/Welcome/" + randomNumber + ".jpg";
          this.imagesArray2.push(image);
        }
      }
      else
      {
        i--;
      }
    }
  }
}
