import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  passwordPattern:string=".{6,}";
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  formUser: FormGroup;
  newUser:User = new User();
  //@ts-ignore
  photoReference:AngularFireStorageReference;
  file:any;
  spinner:boolean = false;

  constructor(private formBuilder:FormBuilder,private angularFireStorage: AngularFireStorage,
    private authServ:AuthService, private router:Router)
  {
    this.formUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required,Validators.pattern(this.passwordPattern)]],
      rePassword: ['', [Validators.required,Validators.pattern(this.passwordPattern)]],
      image: ['', [Validators.required]],
    });

  }

  async signUpUser()
  {
    if(this.formUser.valid && this.formUser.getRawValue().password == this.formUser.getRawValue().rePassword)
    {
      this.spinner = true; 
      await this.photoReference.put(this.file).then(async () => {
        this.photoReference.getDownloadURL().subscribe((urlImg) => {
          this.newUser.image = urlImg;
          this.newUser.name = this.formUser.getRawValue().name;
          this.newUser.lastName = this.formUser.getRawValue().lastName;
          this.newUser.age = this.formUser.getRawValue().age;
          this.newUser.email = this.formUser.getRawValue().email;
          this.newUser.password = this.formUser.getRawValue().password;
          this.authServ.userRegister(this.newUser);
          setTimeout(()=>{
            this.formUser.reset();
            this.newUser = new User();
            this.spinner = false;
          },2000);  
          this.router.navigateByUrl("welcome");   
        });
      });   
    }
    else
    {
      this.activateValidators();
    }
  }

  activateValidators() {
    Object.keys(this.formUser.controls).forEach(field => {
      const control = this.formUser.get(field);
      if(control)
      {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }


  loadImage($event: any) 
  {
    this.file = $event.target.files[0];
    const path = 'img ' + Date.now() + Math.random() * 10;
    this.photoReference = this.angularFireStorage.ref(path);
  }
}
