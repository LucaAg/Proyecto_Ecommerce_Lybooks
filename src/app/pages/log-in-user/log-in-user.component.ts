import { ElementRef, ViewChild, AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in-user',
  templateUrl: './log-in-user.component.html',
  styleUrls: ['./log-in-user.component.css']
})
export class LogInUserComponent {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  patternContraseña:string=".{6,}";
  formLogin: FormGroup;
  email:string = "";
  password:string = "";
  spinner:boolean = false;
  popUp:boolean = false;
  popUpMessage:string = '';

  constructor(private formBuilder:FormBuilder,
    private auth:AuthService,
    private router: Router)
    {
      this.formLogin = this.formBuilder.group({
        email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
        password: ['', [Validators.required,Validators.pattern(this.patternContraseña)]],
      });
    }
    

    async logIn() {
      if (this.formLogin.valid) 
      {
        this.email = this.formLogin.getRawValue().email;
        this.password = this.formLogin.getRawValue().password;
        //let verificacion:string = "";
        try {
          await this.auth.logInWithEmailAndPassw(this.email, this.password).then(()=>{
            this.activateSpinner().then(()=>{
              this.router.navigateByUrl("home");
              });
            });       
          } catch (error:any) {
           this.customPopUp(this.auth.createMessage(error.code));
        }
      }
      else
      {
        this.activateValidators();
      }
    }

    customPopUp(message:string)
    {
      console.log(message);
      this.popUpMessage = message;
      this.popUp = true;
    }

    activateSpinner(): Promise<void> {
      return new Promise<void>((resolve) => {
        this.spinner = true;
        setTimeout(() => {
          this.spinner = false;
          resolve();
        }, 2500);
      });
    }

    activateValidators() {
      Object.keys(this.formLogin.controls).forEach(field => {
        const control = this.formLogin.get(field);
        if(control)
        {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
    
    closePopUp()
    {
      this.popUp = false;
      this.popUpMessage = '';
    }
}
